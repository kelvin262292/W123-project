"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";

// VNPay configuration
const VNPAY_CONFIG = {
  vnp_TmnCode: process.env.VNPAY_TMN_CODE || "DEMO",
  vnp_HashSecret: process.env.VNPAY_HASH_SECRET || "DEMO_SECRET",
  vnp_Url: process.env.VNPAY_URL || "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
  vnp_ReturnUrl: process.env.VNPAY_RETURN_URL || "http://localhost:5173/payment/vnpay/return",
};

// MoMo configuration
const MOMO_CONFIG = {
  partnerCode: process.env.MOMO_PARTNER_CODE || "DEMO",
  accessKey: process.env.MOMO_ACCESS_KEY || "DEMO_ACCESS_KEY",
  secretKey: process.env.MOMO_SECRET_KEY || "DEMO_SECRET_KEY",
  endpoint: process.env.MOMO_ENDPOINT || "https://test-payment.momo.vn/v2/gateway/api/create",
  redirectUrl: process.env.MOMO_REDIRECT_URL || "http://localhost:5173/payment/momo/return",
  ipnUrl: process.env.MOMO_IPN_URL || "http://localhost:5173/api/payment/momo/ipn",
};

// ZaloPay configuration
const ZALOPAY_CONFIG = {
  app_id: process.env.ZALOPAY_APP_ID || "2553",
  key1: process.env.ZALOPAY_KEY1 || "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
  key2: process.env.ZALOPAY_KEY2 || "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
  endpoint: process.env.ZALOPAY_ENDPOINT || "https://sb-openapi.zalopay.vn/v2/create",
  callback_url: process.env.ZALOPAY_CALLBACK_URL || "http://localhost:5173/api/payment/zalopay/callback",
};

// VNPay payment creation
export const createVNPayPayment = action({
  args: {
    orderId: v.id("orders"),
    amount: v.number(),
    orderInfo: v.string(),
  },
  handler: async (ctx, args) => {
    const crypto = await import("crypto");
    
    const vnp_TxnRef = `${args.orderId}_${Date.now()}`;
    const vnp_Amount = args.amount * 100; // VNPay requires amount in VND cents
    const vnp_CreateDate = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14);
    
    const vnp_Params: Record<string, string> = {
      vnp_Version: "2.1.0",
      vnp_Command: "pay",
      vnp_TmnCode: VNPAY_CONFIG.vnp_TmnCode,
      vnp_Amount: vnp_Amount.toString(),
      vnp_CreateDate,
      vnp_CurrCode: "VND",
      vnp_IpAddr: "127.0.0.1",
      vnp_Locale: "vn",
      vnp_OrderInfo: args.orderInfo,
      vnp_OrderType: "other",
      vnp_ReturnUrl: VNPAY_CONFIG.vnp_ReturnUrl,
      vnp_TxnRef,
    };

    // Sort parameters
    const sortedParams = Object.keys(vnp_Params).sort();
    const signData = sortedParams.map(key => `${key}=${vnp_Params[key]}`).join('&');
    
    // Create signature
    const hmac = crypto.createHmac('sha512', VNPAY_CONFIG.vnp_HashSecret);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
    
    vnp_Params.vnp_SecureHash = signed;

    // Build payment URL
    const paymentUrl = VNPAY_CONFIG.vnp_Url + '?' + 
      Object.keys(vnp_Params).map(key => `${key}=${encodeURIComponent(vnp_Params[key])}`).join('&');

    return { paymentUrl, transactionRef: vnp_TxnRef };
  },
});

// MoMo payment creation
export const createMoMoPayment = action({
  args: {
    orderId: v.id("orders"),
    amount: v.number(),
    orderInfo: v.string(),
  },
  handler: async (ctx, args) => {
    const crypto = await import("crypto");
    
    const orderId = `${args.orderId}_${Date.now()}`;
    const requestId = orderId;
    
    const rawSignature = `accessKey=${MOMO_CONFIG.accessKey}&amount=${args.amount}&extraData=&ipnUrl=${MOMO_CONFIG.ipnUrl}&orderId=${orderId}&orderInfo=${args.orderInfo}&partnerCode=${MOMO_CONFIG.partnerCode}&redirectUrl=${MOMO_CONFIG.redirectUrl}&requestId=${requestId}&requestType=captureWallet`;
    
    const signature = crypto.createHmac('sha256', MOMO_CONFIG.secretKey)
      .update(rawSignature)
      .digest('hex');

    const requestBody = {
      partnerCode: MOMO_CONFIG.partnerCode,
      accessKey: MOMO_CONFIG.accessKey,
      requestId,
      amount: args.amount,
      orderId,
      orderInfo: args.orderInfo,
      redirectUrl: MOMO_CONFIG.redirectUrl,
      ipnUrl: MOMO_CONFIG.ipnUrl,
      extraData: "",
      requestType: "captureWallet",
      signature,
      lang: "vi",
    };

    try {
      const response = await fetch(MOMO_CONFIG.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();
      
      if (result.resultCode === 0) {
        return { paymentUrl: result.payUrl, transactionRef: orderId };
      } else {
        throw new Error(`MoMo payment creation failed: ${result.message}`);
      }
    } catch (error) {
      throw new Error(`MoMo API error: ${error}`);
    }
  },
});

// ZaloPay payment creation
export const createZaloPayPayment = action({
  args: {
    orderId: v.id("orders"),
    amount: v.number(),
    orderInfo: v.string(),
  },
  handler: async (ctx, args) => {
    const crypto = await import("crypto");
    
    const transId = Math.floor(Math.random() * 1000000);
    const order = {
      app_id: ZALOPAY_CONFIG.app_id,
      app_trans_id: `${new Date().toISOString().slice(0, 10).replace(/-/g, '')}_${transId}`,
      app_user: "user123",
      app_time: Date.now(),
      item: JSON.stringify([{
        itemid: args.orderId,
        itemname: args.orderInfo,
        itemprice: args.amount,
        itemquantity: 1
      }]),
      embed_data: JSON.stringify({
        redirecturl: "http://localhost:5173/payment/zalopay/return"
      }),
      amount: args.amount,
      description: args.orderInfo,
      callback_url: ZALOPAY_CONFIG.callback_url,
    };

    // Create signature
    const data = `${order.app_id}|${order.app_trans_id}|${order.app_user}|${order.amount}|${order.app_time}|${order.embed_data}|${order.item}`;
    const mac = crypto.createHmac('sha256', ZALOPAY_CONFIG.key1).update(data).digest('hex');
    
    const orderWithMac = { ...order, mac };

    try {
      const response = await fetch(ZALOPAY_CONFIG.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(orderWithMac as any).toString(),
      });

      const result = await response.json();
      
      if (result.return_code === 1) {
        return { paymentUrl: result.order_url, transactionRef: orderWithMac.app_trans_id };
      } else {
        throw new Error(`ZaloPay payment creation failed: ${result.return_message}`);
      }
    } catch (error) {
      throw new Error(`ZaloPay API error: ${error}`);
    }
  },
});

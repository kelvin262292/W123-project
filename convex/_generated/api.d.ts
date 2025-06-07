/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as admin from "../admin.js";
import type * as auth from "../auth.js";
import type * as banners from "../banners.js";
import type * as cart from "../cart.js";
import type * as categories from "../categories.js";
import type * as fileStorage from "../fileStorage.js";
import type * as http from "../http.js";
import type * as notificationActions from "../notificationActions.js";
import type * as notifications from "../notifications.js";
import type * as orders from "../orders.js";
import type * as paymentActions from "../paymentActions.js";
import type * as payments from "../payments.js";
import type * as products from "../products.js";
import type * as router from "../router.js";
import type * as seed from "../seed.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  admin: typeof admin;
  auth: typeof auth;
  banners: typeof banners;
  cart: typeof cart;
  categories: typeof categories;
  fileStorage: typeof fileStorage;
  http: typeof http;
  notificationActions: typeof notificationActions;
  notifications: typeof notifications;
  orders: typeof orders;
  paymentActions: typeof paymentActions;
  payments: typeof payments;
  products: typeof products;
  router: typeof router;
  seed: typeof seed;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

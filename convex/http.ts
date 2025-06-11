import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";

const http = httpRouter();

// Helper function to add security headers
function addSecurityHeaders(response: Response): Response {
  // Content-Security-Policy (CSP)
  // This is a basic example. You should customize this based on your actual needs.
  // 'self' allows resources from the same origin.
  // 'unsafe-inline' for scripts/styles is generally not recommended but often needed for development/some libraries.
  // Consider using nonces or hashes for inline scripts/styles in production.
  // *.convex.cloud is needed for Convex's own services.
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self' *.convex.cloud; frame-ancestors 'none';"
  );

  // HTTP Strict Transport Security (HSTS)
  // Forces browsers to use HTTPS for a specified duration.
  // Only set this if you are certain your site will only be served over HTTPS.
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains; preload"
  );

  // X-Content-Type-Options
  // Prevents browsers from MIME-sniffing a response away from the declared content-type.
  response.headers.set("X-Content-Type-Options", "nosniff");

  // X-Frame-Options
  // Prevents clickjacking by disallowing embedding the page in iframes.
  response.headers.set("X-Frame-Options", "DENY");

  // Referrer-Policy
  // Controls how much referrer information is sent with requests.
  response.headers.set("Referrer-Policy", "no-referrer-when-downgrade");

  // Permissions-Policy (formerly Feature-Policy)
  // Allows or disallows the use of browser features. Customize as needed.
  response.headers.set(
    "Permissions-Policy",
    "geolocation=(), microphone=(), camera=()"
  );

  // X-XSS-Protection
  // Enables the XSS filter in older browsers. Modern browsers handle this differently.
  response.headers.set("X-XSS-Protection", "1; mode=block");

  return response;
}

// Health check route
http.route({
  path: "/health",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    const response = new Response("OK", {
      status: 200,
      headers: new Headers({
        "Content-Type": "text/plain",
      }),
    });
    return addSecurityHeaders(response);
  }),
});

// Payment webhook route
http.route({
  path: "/payments/webhook/:provider",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const provider = request.path.split("/").pop(); // Extract provider from path
    if (!provider) {
      const response = new Response("Provider not specified", { status: 400 });
      return addSecurityHeaders(response);
    }
    try {
      // Call the actual webhook handler in payments.ts
      const result = await ctx.runAction(api.payments.webhook, {
        provider,
        requestBody: await request.text(),
        headers: Object.fromEntries(request.headers.entries()), // Pass headers for signature verification
      });

      const response = new Response(JSON.stringify(result), {
        status: 200,
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      });
      return addSecurityHeaders(response);
    } catch (error: any) {
      console.error(`Error processing ${provider} webhook:`, error);
      const response = new Response(error.message || "Internal Server Error", { status: 500 });
      return addSecurityHeaders(response);
    }
  }),
});

// API documentation route
http.route({
  path: "/api/docs",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    // Serve API documentation
    const apiDocs = {
      version: "1.0",
      endpoints: [
        { path: "/health", method: "GET", description: "Health check endpoint" },
        { path: "/payments/webhook/:provider", method: "POST", description: "Payment webhook endpoint" },
        { path: "/api/docs", method: "GET", description: "API documentation" }
      ]
    };
    
    const response = new Response(JSON.stringify(apiDocs, null, 2), {
      status: 200,
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });
    return addSecurityHeaders(response);
  }),
});

// Catch-all route for any other undefined HTTP requests
http.route({
  path: "/{*:path}", // Matches any path
  method: "GET", // Or other methods if needed
  handler: httpAction(async (ctx, request) => {
    const response = new Response("Not Found", {
      status: 404,
      headers: new Headers({
        "Content-Type": "text/plain",
      }),
    });
    return addSecurityHeaders(response);
  }),
});

export default http;

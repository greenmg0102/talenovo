import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  apiRoutes: [], // Remove "/api/webhooks/clerk" from apiRoutes array
  publicRoutes: [
    "/",
    "/contact",
    "/premium",
    "/api/webhooks/clerk",
    "/api/webhooks/stripe",
    "/api/stripe/create-checkout-session",
    "/api/stripe/test",
    "/api/automation/scrapping-start",
    "/api/service/geo",
    "/api/user/landing-job",
    "/api/user/user-profile/user-premium-status"
  ], // Add "/api/webhooks/clerk" to publicRoutes
  ignoredRoutes: [], // Optionally add "/api/webhooks/clerk" to ignoredRoutes
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};


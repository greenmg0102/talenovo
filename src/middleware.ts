import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // debug: true,
  apiRoutes: [], // Remove "/api/webhooks/clerk" from apiRoutes array
  publicRoutes: [
    "/",
    "/premium",
    "/terms",
    "/policy",
    "/refund",
    "/api/webhooks/clerk",
    "/api/webhooks/stripe",
    "/api/stripe/create-checkout-session",
    "/api/stripe/test",
    "/api/automation/scrapping-start",
    "/api/service/geo",
    "/api/user/about-edit",
    "/api/user/landing-job",
    "/api/user/user-profile/user-premium-status",
    "/api/user/my-jobs",
    "/api/user/newsletter-confirm"
  ], // Add "/api/webhooks/clerk" to publicRoutes
  ignoredRoutes: [], // Optionally add "/api/webhooks/clerk" to ignoredRoutes
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};


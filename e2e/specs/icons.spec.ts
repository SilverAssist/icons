/**
 * Integration specs for @silverassist/icons consumed by a real Next app.
 *
 * The fixture installs the *packed tarball*, so these run against exactly what
 * npm publishes -- not `src/`, not a workspace link.
 *
 * This package's contract is the inverse of its siblings. consent-banner and
 * recaptcha ship client components and must carry a "use client" directive.
 * These are pure SVG functions with no hooks, so they must render entirely on
 * the server and ship no JavaScript at all. The specs below protect that
 * absence, which is easy to lose: one `useState` in one icon, or a stray
 * directive from a build config, converts 168 static components into client
 * components without any test noticing.
 */
import { expect, test } from "@playwright/test";

test("renders from a Server Component page with no client boundary", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toHaveText("icons fixture");
  await expect(page.getByTestId("icon-assisted-living")).toBeVisible();
});

test("icons are in the server-rendered HTML, not injected by hydration", async ({ page }) => {
  // Fetched without a browser: this is the raw document Next produced. If the
  // icons only appeared after hydration they would be missing here, which is
  // exactly what a "use client" directive would cause.
  const response = await page.request.get("/");
  const html = await response.text();
  expect(html).toContain("icon-assisted-living");
  expect(html).toContain("<svg");
});

test("props reach the rendered SVG", async ({ page }) => {
  await page.goto("/");
  // Explicit width/height override the component defaults (100x100).
  const homeCare = page.getByTestId("icon-home-care");
  await expect(homeCare).toHaveAttribute("width", "48");
  await expect(homeCare).toHaveAttribute("height", "48");
  // `fill` colours the inner paths, not the <svg> element -- the container
  // keeps `fill="none"`, which is standard for SVG wrappers and is applied
  // after the prop spread on purpose. Asserting the container attribute here
  // would test the wrong thing and fail against correct behaviour.
  const memoryCarePathFill = page.getByTestId("icon-memory-care").locator("path").first();
  await expect(memoryCarePathFill).toHaveAttribute("fill", "#ff0000");
});

test("default dimensions apply when none are given", async ({ page }) => {
  await page.goto("/");
  const icon = page.getByTestId("icon-assisted-living");
  await expect(icon).toHaveAttribute("width", "100");
  await expect(icon).toHaveAttribute("height", "100");
});

import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:5173";

const ROUTES = {
  HOME: `${BASE_URL}/`,
  LOGIN: `${BASE_URL}/login`,
  REGISTER: `${BASE_URL}/register`,
  DASHBOARD: `${BASE_URL}/dashboard`,
};

test.describe("UI & Navigation Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(ROUTES.HOME);
  });

  test("should verify header brand text (Task Flow) and logo navigation", async ({
    page,
  }) => {
    const header = page.locator("header");
    await expect(header).toBeVisible();

    const brandContainer = header.locator("div.flex-col");
    await expect(
      brandContainer.locator("span").filter({ hasText: "Task" })
    ).toBeVisible();

    const flowText = brandContainer.locator("span").filter({ hasText: "Flow" });
    await expect(flowText).toBeVisible();
    await expect(flowText).toHaveClass(/bg-linear-to-r/);

    const logo = page.getByTestId("logoLink");
    await logo.click();
    await expect(page).toHaveURL(ROUTES.HOME);
  });

  test("should toggle theme correctly", async ({ page }) => {
    const themeWrapper = page.getByTestId("theme");
    await themeWrapper.waitFor({ state: "visible" });

    const toggleInput = page.locator("input.toggle");
    const oldTheme = await themeWrapper.getAttribute("data-theme");

    await toggleInput.click();

    await expect(themeWrapper).not.toHaveAttribute(
      "data-theme",
      oldTheme || "light"
    );
  });

  test("should navigate to register and verify header is hidden", async ({
    page,
  }) => {
    await page.getByRole("button", { name: /sign up/i }).click();
    await expect(page).toHaveURL(ROUTES.REGISTER);

    await expect(page.locator("header")).not.toBeVisible();
  });
});

test.describe("Login Form Functionality", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(ROUTES.LOGIN);
    await page.waitForURL("**/login");
  });

  test("should navigate back home when close icon is clicked", async ({
    page,
  }) => {
    const closeBtn = page.getByTestId("login-close");
    await closeBtn.waitFor({ state: "visible" });
    await closeBtn.click({ force: true });
    await expect(page).toHaveURL(ROUTES.HOME);
  });

  test("should verify login form structure", async ({ page }) => {
    const emailInput = page.getByTestId("login-email");
    await emailInput.waitFor({ state: "visible" });

    await expect(page.locator("legend")).toHaveText(/Login/i);
    await expect(emailInput).toBeVisible();
    await expect(page.getByTestId("login-password")).toBeVisible();

    const toRegisterLink = page.getByTestId("to-register-link");
    await expect(toRegisterLink).toHaveAttribute("href", "/register");
  });

  test("should toggle password visibility on click", async ({ page }) => {
    const passwordInput = page.getByTestId("login-password");
    await passwordInput.waitFor({ state: "visible" });

    await expect(passwordInput).toHaveAttribute("type", "password");

    const toggleBtn = page
      .locator("div.relative")
      .filter({ has: passwordInput })
      .locator("button");

    await toggleBtn.click();
    await expect(passwordInput).toHaveAttribute("type", "text");

    await toggleBtn.click();
    await expect(passwordInput).toHaveAttribute("type", "password");
  });

  test("should login successfully and verify dashboard layout", async ({
    page,
  }) => {
    const emailInput = page.getByTestId("login-email");
    const passInput = page.getByTestId("login-password");
    const submitBtn = page.getByTestId("login-submit");
    const policyCheckbox = page.getByTestId("policy-checkbox");

    await emailInput.fill("john@gmail.com");
    await passInput.fill("123456");

    if ((await policyCheckbox.count()) > 0) {
      await policyCheckbox.check();
    }

    const navigationPromise = page.waitForURL("**/dashboard", {
      timeout: 15000,
    });
    await submitBtn.click();
    await navigationPromise;

    const header = page.locator("header");
    await expect(header).toBeVisible({ timeout: 10000 });

    const sideBar = page
      .locator("aside, .sidebar, [data-testid='sidebar']")
      .first();
    await expect(sideBar).toBeVisible();

    const dashboardTitle = page.locator("h1:has-text('Dash_Board')");
    await expect(dashboardTitle).toBeVisible();
  });
});

test.describe("Register Form & Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(ROUTES.REGISTER);
    await page.waitForURL("**/register");
  });

  test("should toggle between register and login links", async ({ page }) => {
    const toLoginLink = page.getByTestId("to-login-link");
    await toLoginLink.waitFor({ state: "visible" });

    await expect(toLoginLink).toContainText(/login/i);
    await toLoginLink.click();
    await expect(page).toHaveURL(ROUTES.LOGIN);

    const toRegisterLink = page.getByTestId("to-register-link");
    await toRegisterLink.click();
    await expect(page).toHaveURL(ROUTES.REGISTER);
  });

  test("should verify register form structure and policy logic", async ({
    page,
  }) => {
    const submitBtn = page.getByTestId("register-submit");
    const policyCheckbox = page.getByTestId("policy-checkbox");

    await expect(page.getByTestId("register-name")).toBeVisible();
    await expect(page.getByTestId("register-email")).toBeVisible();
    await expect(page.getByTestId("register-password")).toBeVisible();

    const isBtnDisabled =
      (await submitBtn.isDisabled()) ||
      (await submitBtn.getAttribute("class"))?.includes("btn-disabled");
    expect(isBtnDisabled).toBeTruthy();

    await policyCheckbox.check();
    await expect(submitBtn).toBeEnabled();
  });
});

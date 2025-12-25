import { test, expect } from "@playwright/test";

// Используем baseURL из конфига, поэтому тут только пути
const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
};

test.describe("Registration & Policy Logic", () => {
  test.beforeEach(async ({ page }) => {
    // Ждем, пока сеть станет свободной, даем 60 сек на просыпание сервера
    await page.goto(ROUTES.REGISTER, {
      waitUntil: "networkidle",
      timeout: 60000,
    });
  });

  test("should toggle between register and login links", async ({ page }) => {
    await page.getByTestId("to-login-link").click();
    await expect(page).toHaveURL(new RegExp(ROUTES.LOGIN));
    await page.getByTestId("to-register-link").click();
    await expect(page).toHaveURL(new RegExp(ROUTES.REGISTER));
  });

  test("should keep submit disabled until form is valid and policy is accepted", async ({
    page,
  }) => {
    const submitBtn = page.getByTestId("register-submit");
    const checkbox = page.getByTestId("policy-checkbox");

    await expect(submitBtn).toBeDisabled();

    await page.getByTestId("register-name").fill("Test User");
    await page.getByTestId("register-email").fill("test_e2e@example.com");
    await page.getByTestId("register-password").fill("Password123!");

    // Кнопка все еще заблокирована без чекбокса
    await expect(submitBtn).toBeDisabled();

    await checkbox.check();
    await expect(submitBtn).toBeEnabled();
  });

  test("should navigate back home when close icon is clicked", async ({
    page,
  }) => {
    await page.getByTestId("register-close").click();
    await expect(page).toHaveURL(ROUTES.HOME);
  });
});

test.describe("Login Form Functionality", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(ROUTES.LOGIN, { waitUntil: "networkidle", timeout: 60000 });
  });

  test("should verify login form structure", async ({ page }) => {
    await expect(page.locator("form")).toBeVisible();
    await expect(page.getByTestId("login-email")).toBeVisible();
    await expect(page.getByTestId("login-password")).toBeVisible();
  });

  test("should login successfully and redirect to dashboard", async ({
    page,
  }) => {
    // Увеличиваем таймаут именно для этого теста (сервер может долго думать)
    test.setTimeout(90000);

    await page.getByTestId("login-email").fill("test@example.com");
    await page.getByTestId("login-password").fill("Password123!");

    const submitBtn = page.getByTestId("login-submit");
    await expect(submitBtn).toBeEnabled();

    await submitBtn.click();

    // Ждем именно перехода на дашборд
    await expect(page).toHaveURL(new RegExp(ROUTES.DASHBOARD), {
      timeout: 40000,
    });

    // Проверяем, что заголовок дашборда появился
    const title = page.getByTestId("dashboard-title");
    await expect(title).toBeVisible({ timeout: 20000 });
  });
});

test.describe("UI & Navigation Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(ROUTES.HOME, { waitUntil: "networkidle" });
  });

  test("should toggle theme correctly", async ({ page }) => {
    const themeWrapper = page.getByTestId("theme");
    const toggle = page.getByTestId("toggle");

    const oldTheme = await themeWrapper.getAttribute("data-theme");
    await toggle.click();

    // Ждем небольшую задержку для смены темы
    await page.waitForTimeout(500);
    const newTheme = await themeWrapper.getAttribute("data-theme");
    expect(newTheme).not.toBe(oldTheme);
  });
});

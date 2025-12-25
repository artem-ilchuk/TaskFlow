import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  /* Увеличиваем общий таймаут на один тест до 60 секунд (из-за "холодного" старта сервера) */
  timeout: 60000,

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1, // Добавим 1 попытку пересдачи локально
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",

  expect: {
    /* Таймаут для каждой проверки (например, expect(locator).toBeVisible()) */
    timeout: 10000,
  },

  use: {
    /* Базовый URL, чтобы в тестах писать просто await page.goto('/') */
    baseURL: "https://task-flow-qis6.vercel.app",

    /* Собирать трассировку при первом провале */
    trace: "on-first-retry",

    /* Делать скриншот при падении теста */
    screenshot: "only-on-failure",

    /* Записывать видео при падении (помогает увидеть лаги сервера) */
    video: "retain-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    /* Если хочешь ускорить прогон, можешь пока закомментировать firefox и webkit */
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});

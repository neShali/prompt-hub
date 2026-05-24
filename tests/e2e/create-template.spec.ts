import { expect, test } from '@playwright/test';

test('пользователь регистрируется и создаёт шаблон промпта', async ({ page }) => {
  await page.goto('/');

  await page.evaluate(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
  });

  await page.goto('/register');

  await page.getByLabel('Имя').fill('Алексей');
  await page.getByLabel('Email').fill(`alexey-${Date.now()}@example.com`);
  await page.getByLabel('Пароль', { exact: true }).fill('password123');
  await page.getByLabel('Повторите пароль').fill('password123');

  const registerButton = page.getByRole('button', { name: 'Зарегистрироваться' });
  await expect(registerButton).toBeEnabled();
  await registerButton.click();

  await expect(page).toHaveURL(/\/profile/);

  await page.getByRole('link', { name: 'Создать шаблон' }).first().click();
  await expect(page).toHaveURL(/\/profile\/templates\/new/);

  await page.getByLabel('Название шаблона').fill('План публикаций для запуска продукта');
  await page
    .getByLabel('Описание')
    .fill('Шаблон помогает быстро подготовить план публикаций для запуска продукта');
  await page.getByLabel('Категория').selectOption('marketing');
  await page.getByLabel('Переменные').fill('product, audience, channels');
  await page
    .getByLabel('Текст промпта')
    .fill('Создай план публикаций для запуска {{product}} для аудитории {{audience}}.');

  const saveButton = page.getByRole('button', { name: 'Сохранить шаблон' });
  await expect(saveButton).toBeEnabled();
  await saveButton.click();

  await expect(page).toHaveURL(/\/profile\/templates/);

  await expect(
    page.getByRole('heading', {
      name: 'План публикаций для запуска продукта',
      exact: true,
    })
  ).toBeVisible();
});

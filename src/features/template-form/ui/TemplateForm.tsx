'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { saveTemplate } from '@/features/template-form/model/storage';
import {
  templateFormSchema,
  TTemplateFormValues,
} from '@/features/template-form/model/schema';
import { promptCategories } from '@/shared/mock/prompts';

import styles from './TemplateForm.module.css';

const defaultValues: TTemplateFormValues = {
  title: '',
  description: '',
  category: 'marketing',
  promptText: '',
  variables: '',
  isPublic: false,
};

type TTemplateFormProps = {
  mode: 'create' | 'edit';
  templateId?: string;
  initialValues?: TTemplateFormValues;
};

export function TemplateForm({ mode, templateId, initialValues }: TTemplateFormProps) {
  const router = useRouter();
  const [submitMessage, setSubmitMessage] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<TTemplateFormValues>({
    resolver: zodResolver(templateFormSchema),
    mode: 'onChange',
    defaultValues: initialValues ?? defaultValues,
  });

  const promptText = watch('promptText');

  const insertSnippet = (snippet: string) => {
    const currentValue = getValues('promptText');
    const prefix = currentValue.trim().length > 0 ? '\n\n' : '';

    setValue('promptText', `${currentValue}${prefix}${snippet}`, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onSubmit = async (values: TTemplateFormValues) => {
    setSubmitMessage('');
    await new Promise((resolve) => window.setTimeout(resolve, 450));

    const savedTemplate = saveTemplate(values, templateId);
    setSubmitMessage(
      mode === 'create'
        ? 'Шаблон сохранён в разделе «Мои шаблоны».'
        : 'Изменения шаблона сохранены.'
    );

    router.push(`/profile/templates?updated=${savedTemplate.id}`);
  };

  return (
    <form className={styles.form} noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.grid}>
        <div className={styles.mainFields}>
          <div className={styles.field}>
            <label htmlFor="title">Название шаблона</label>
            <input
              aria-invalid={Boolean(errors.title)}
              id="title"
              placeholder="Например: Контент-план для запуска продукта"
              type="text"
              {...register('title')}
            />
            {errors.title ? (
              <p className={styles.error} role="alert">
                {errors.title.message}
              </p>
            ) : null}
          </div>

          <div className={styles.field}>
            <label htmlFor="description">Описание</label>
            <textarea
              aria-invalid={Boolean(errors.description)}
              id="description"
              placeholder="Коротко объясните, для какой задачи подходит шаблон"
              rows={4}
              {...register('description')}
            />
            {errors.description ? (
              <p className={styles.error} role="alert">
                {errors.description.message}
              </p>
            ) : null}
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="category">Категория</label>
              <select
                aria-invalid={Boolean(errors.category)}
                id="category"
                {...register('category')}
              >
                {promptCategories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
              {errors.category ? (
                <p className={styles.error} role="alert">
                  {errors.category.message}
                </p>
              ) : null}
            </div>

            <div className={styles.field}>
              <label htmlFor="variables">Переменные</label>
              <input
                id="variables"
                placeholder="product, audience, goal"
                type="text"
                {...register('variables')}
              />
            </div>
          </div>

          <div className={styles.field}>
            <div className={styles.editorHeader}>
              <label htmlFor="promptText">Текст промпта</label>
              <span>{promptText.length} символов</span>
            </div>

            <div className={styles.toolbar} aria-label="Быстрые вставки редактора">
              <button type="button" onClick={() => insertSnippet('## Heading')}>
                Заголовок
              </button>
              <button type="button" onClick={() => insertSnippet('{{variable}}')}>
                Переменная
              </button>
              <button type="button" onClick={() => insertSnippet('<context></context>')}>
                XML-тег
              </button>
              <button type="button" onClick={() => insertSnippet('→ следующий шаг')}>
                Стрелка
              </button>
              <button type="button" onClick={() => insertSnippet('+++Format')}>
                Декоратор
              </button>
            </div>

            <textarea
              aria-invalid={Boolean(errors.promptText)}
              className={styles.promptTextarea}
              id="promptText"
              placeholder="Опишите роль модели, контекст, задачу и формат ответа"
              rows={14}
              {...register('promptText')}
            />
            {errors.promptText ? (
              <p className={styles.error} role="alert">
                {errors.promptText.message}
              </p>
            ) : null}
          </div>
        </div>

        <aside className={styles.sidePanel}>
          <div className={styles.panelCard}>
            <h2>Настройки публикации</h2>
            <label className={styles.checkbox}>
              <input type="checkbox" {...register('isPublic')} />
              <span>Сделать шаблон публичным</span>
            </label>
            <p>
              Публичные шаблоны будут доступны в каталоге после модерации. Пока данные
              сохраняются локально в браузере.
            </p>
          </div>

          <div className={styles.panelCard}>
            <h2>Проверка структуры</h2>
            <ul>
              <li>Есть понятная роль модели</li>
              <li>Описан контекст задачи</li>
              <li>Указан формат ответа</li>
              <li>Переменные оформлены как {'{{var}}'}</li>
            </ul>
          </div>
        </aside>
      </div>

      <div className={styles.actions}>
        <button className={styles.submitButton} disabled={!isValid || isSubmitting} type="submit">
          {isSubmitting
            ? 'Сохраняем'
            : mode === 'create'
              ? 'Сохранить шаблон'
              : 'Сохранить изменения'}
        </button>
        <Link className="secondaryLink" href="/profile/templates">
          К моим шаблонам
        </Link>
      </div>

      {submitMessage ? (
        <p className={styles.success} role="status" aria-live="polite">
          {submitMessage}
        </p>
      ) : null}
    </form>
  );
}

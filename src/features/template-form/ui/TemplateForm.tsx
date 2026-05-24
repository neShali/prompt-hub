'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { type ChangeEvent, useCallback, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { saveTemplate } from '@/features/template-form/model/storage';
import {
  templateFormSchema,
  TTemplateFormValues,
} from '@/features/template-form/model/schema';
import { promptCategories } from '@/shared/mock/prompts';

import styles from './TemplateForm.module.css';

const PromptEditor = dynamic(
  () => import('@/features/prompt-editor/ui/PromptEditor').then((mod) => mod.PromptEditor),
  {
    loading: () => (
      <div className={styles.editorSkeleton} aria-live="polite">
        Загружаем редактор промпта
      </div>
    ),
  }
);

const defaultValues: TTemplateFormValues = {
  title: '',
  description: '',
  category: 'marketing',
  promptText: '',
  variables: '',
  isPublic: false,
};

type TTemplateTextField = Exclude<keyof TTemplateFormValues, 'isPublic'>;

type TTemplateFieldEvent = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;

type TTemplateFormProps = {
  mode: 'create' | 'edit';
  templateId?: string;
  initialValues?: TTemplateFormValues;
};

export function TemplateForm({ mode, templateId, initialValues }: TTemplateFormProps) {
  const router = useRouter();
  const [submitMessage, setSubmitMessage] = useState('');
  const [formSnapshot, setFormSnapshot] = useState<TTemplateFormValues>(
    initialValues ?? defaultValues
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TTemplateFormValues>({
    resolver: zodResolver(templateFormSchema),
    mode: 'onChange',
    defaultValues: initialValues ?? defaultValues,
  });

  const isFormValid = useMemo(
    () => templateFormSchema.safeParse(formSnapshot).success,
    [formSnapshot]
  );

  const updateTextField = useCallback(
    (field: TTemplateTextField) => (event: TTemplateFieldEvent) => {
      const value = event.target.value;

      setFormSnapshot((currentValues) => ({
        ...currentValues,
        [field]: value,
      }));
    },
    []
  );

  const updatePublicState = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const isPublic = event.target.checked;

    setFormSnapshot((currentValues) => ({
      ...currentValues,
      isPublic,
    }));
  }, []);

  const updatePromptText = useCallback((value: string) => {
    setFormSnapshot((currentValues) => ({
      ...currentValues,
      promptText: value,
    }));
  }, []);

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
              {...register('title', { onChange: updateTextField('title') })}
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
              {...register('description', {
                onChange: updateTextField('description'),
              })}
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
                {...register('category', { onChange: updateTextField('category') })}
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
                {...register('variables', { onChange: updateTextField('variables') })}
              />
            </div>
          </div>

          <Controller
            control={control}
            name="promptText"
            render={({ field }) => (
              <PromptEditor
                error={errors.promptText?.message}
                id="promptText"
                label="Текст промпта"
                value={field.value}
                onChange={(value) => {
                  field.onChange(value);
                  updatePromptText(value);
                }}
              />
            )}
          />
        </div>

        <aside className={styles.sidePanel}>
          <div className={styles.panelCard}>
            <h2>Настройки публикации</h2>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                {...register('isPublic', { onChange: updatePublicState })}
              />
              <span>Сделать шаблон публичным</span>
            </label>
            <p>
              Публичные шаблоны будут доступны в каталоге после публикации.
              Это удобно, если шаблоном нужно поделиться с другими пользователями.
            </p>
          </div>

          <div className={styles.panelCard}>
            <h2>Проверка структуры</h2>
            <ul>
              <li>Есть понятная роль модели</li>
              <li>Описан контекст задачи</li>
              <li>Указан формат ответа</li>
              <li>Переменные оформлены в формате {'{{var}}'}</li>
            </ul>
          </div>
        </aside>
      </div>

      <div className={styles.actions}>
        <button className={styles.submitButton} disabled={!isFormValid || isSubmitting} type="submit">
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

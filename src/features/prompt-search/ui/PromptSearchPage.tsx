'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useEffect, useMemo, useState } from 'react';

import { PromptCard } from '@/entities/prompt/ui/PromptCard';
import { useDebouncedValue } from '@/shared/lib/debounce/useDebouncedValue';
import { promptCategories } from '@/shared/mock/prompts';
import { TSearchResponse } from '@/shared/types/prompt';
import { Breadcrumbs } from '@/widgets/Breadcrumbs/Breadcrumbs';

import styles from './PromptSearchPage.module.css';

const MIN_QUERY_LENGTH = 3;

const createSearchUrl = ({ query, category }: { query: string; category: string }) => {
  const params = new URLSearchParams();
  const normalizedQuery = query.trim();

  if (normalizedQuery.length >= MIN_QUERY_LENGTH) {
    params.set('q', normalizedQuery);
  }

  if (category) {
    params.set('category', category);
  }

  const queryString = params.toString();

  return queryString ? `/search?${queryString}` : '/search';
};

export function PromptSearchPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlQuery = searchParams.get('q') ?? '';
  const urlCategory = searchParams.get('category') ?? '';

  const [query, setQuery] = useState(urlQuery);
  const [category, setCategory] = useState(urlCategory);
  const [data, setData] = useState<TSearchResponse | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuggestionsLoading, setIsSuggestionsLoading] = useState(false);
  const [error, setError] = useState('');

  const debouncedQuery = useDebouncedValue(query, 450);
  const debouncedCategory = useDebouncedValue(category, 250);

  const queryIsTooShort = query.trim().length > 0 && query.trim().length < MIN_QUERY_LENGTH;
  const hasSearchParams = Boolean(urlQuery || urlCategory);

  useEffect(() => {
    setQuery(urlQuery);
    setCategory(urlCategory);
  }, [urlQuery, urlCategory]);

  useEffect(() => {
    const normalizedQuery = debouncedQuery.trim();

    const currentUrl = searchParams.toString() ? `${pathname}?${searchParams}` : pathname;

    if (normalizedQuery.length > 0 && normalizedQuery.length < MIN_QUERY_LENGTH) {
      const params = new URLSearchParams();

      if (debouncedCategory) {
        params.set('category', debouncedCategory);
      }

      const nextUrl = params.toString() ? `/search?${params.toString()}` : '/search';

      setSuggestions([]);

      if (nextUrl !== currentUrl) {
        router.replace(nextUrl, { scroll: false });
      }

      return;
    }

    const nextUrl = createSearchUrl({
      query: debouncedQuery,
      category: debouncedCategory,
    });

    if (nextUrl !== currentUrl) {
      router.replace(nextUrl, { scroll: false });
    }
  }, [debouncedCategory, debouncedQuery, pathname, router, searchParams]);

  useEffect(() => {
    const normalizedQuery = urlQuery.trim();

    if (!urlCategory && normalizedQuery.length === 0) {
      setData(null);
      setError('');
      setIsLoading(false);
      return;
    }

    if (normalizedQuery.length > 0 && normalizedQuery.length < MIN_QUERY_LENGTH) {
      setData(null);
      setError('Введите минимум 3 символа для поиска.');
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();
    const params = new URLSearchParams();

    if (normalizedQuery) params.set('q', normalizedQuery);
    if (urlCategory) params.set('category', urlCategory);

    setIsLoading(true);
    setError('');

    fetch(`/api/search?${params.toString()}`, {
      method: 'GET',
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) {
          const body = await response.json().catch(() => null);
          throw new Error(body?.message ?? 'Не удалось выполнить поиск.');
        }

        return response.json() as Promise<TSearchResponse>;
      })
      .then((responseData) => {
        setData(responseData);
      })
      .catch((requestError: unknown) => {
        if (requestError instanceof DOMException && requestError.name === 'AbortError') {
          return;
        }

        setData(null);
        setError(
          requestError instanceof Error
            ? requestError.message
            : 'Не удалось выполнить поиск. Попробуйте ещё раз.'
        );
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, [urlCategory, urlQuery]);

  useEffect(() => {
    const normalizedQuery = debouncedQuery.trim();

    if (normalizedQuery.length < MIN_QUERY_LENGTH) {
      setSuggestions([]);
      setIsSuggestionsLoading(false);
      return;
    }

    const controller = new AbortController();
    const params = new URLSearchParams({ q: normalizedQuery, mode: 'suggest' });

    setIsSuggestionsLoading(true);

    fetch(`/api/search?${params.toString()}`, {
      method: 'GET',
      signal: controller.signal,
    })
      .then((response) => response.json() as Promise<{ suggestions: string[] }>)
      .then((responseData) => {
        setSuggestions(responseData.suggestions);
      })
      .catch((requestError: unknown) => {
        if (requestError instanceof DOMException && requestError.name === 'AbortError') {
          return;
        }

        setSuggestions([]);
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsSuggestionsLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, [debouncedQuery]);

  const resultTitle = useMemo(() => {
    if (!hasSearchParams) return 'Начните поиск';
    if (isLoading) return 'Ищем подходящие шаблоны';
    if (error) return 'Поиск не выполнен';
    if (!data || data.total === 0) return 'Ничего не найдено';

    return `Найдено шаблонов: ${data.total}`;
  }, [data, error, hasSearchParams, isLoading]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (query.trim().length > 0 && query.trim().length < MIN_QUERY_LENGTH) {
      return;
    }

    router.push(createSearchUrl({ query, category }));
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    router.push(createSearchUrl({ query: suggestion, category }));
  };

  return (
    <section className="pageSection">
      <div className="container">
        <Breadcrumbs />

        <div className={styles.hero}>
          <span className="badge">GET-поиск с debounce</span>
          <h1>Поиск по шаблонам промптов</h1>
          <p>
            Введите минимум 3 символа. Запрос и выбранная категория сохраняются в
            адресной строке, поэтому результат восстанавливается после перезагрузки.
          </p>
        </div>

        <form className={styles.searchForm} method="get" action="/search" onSubmit={handleSubmit}>
          <div className={styles.searchField}>
            <label htmlFor="q">Поисковый запрос</label>
            <input
              autoComplete="off"
              id="q"
              name="q"
              placeholder="Например: frontend, контент, исследование"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />

            {queryIsTooShort ? (
              <p className={styles.hint} role="status">
                Введите минимум 3 символа для отправки запроса.
              </p>
            ) : null}

            {query.trim().length >= MIN_QUERY_LENGTH ? (
              <div className={styles.suggestions} aria-label="Поисковые подсказки">
                {isSuggestionsLoading ? <span>Загружаем подсказки</span> : null}

                {!isSuggestionsLoading && suggestions.length > 0
                  ? suggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </button>
                    ))
                  : null}
              </div>
            ) : null}
          </div>

          <div className={styles.categoryField}>
            <label htmlFor="category">Категория</label>
            <select
              id="category"
              name="category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="">Все категории</option>
              {promptCategories.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <button className={styles.submitButton} disabled={queryIsTooShort} type="submit">
            Найти
          </button>
        </form>

        <section className={styles.results} aria-live="polite">
          <div className={styles.resultsHeader}>
            <h2>{resultTitle}</h2>
            {hasSearchParams ? (
              <Link href="/search">Сбросить поиск</Link>
            ) : null}
          </div>

          {!hasSearchParams ? (
            <div className={styles.emptyState}>
              <p>
                Можно искать по названию, описанию, тегам, переменным и тексту промпта.
              </p>
            </div>
          ) : null}

          {isLoading ? (
            <div className={styles.stateCard}>Загрузка результатов</div>
          ) : null}

          {error ? <div className={styles.errorCard}>{error}</div> : null}

          {!isLoading && !error && data?.total === 0 ? (
            <div className={styles.emptyState}>
              <p>Попробуйте изменить запрос или выбрать другую категорию.</p>
            </div>
          ) : null}

          {!isLoading && !error && data && data.results.length > 0 ? (
            <div className={styles.grid}>
              {data.results.map((prompt) => (
                <PromptCard key={prompt.id} prompt={prompt} />
              ))}
            </div>
          ) : null}
        </section>
      </div>
    </section>
  );
}

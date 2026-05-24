'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { PromptCard } from '@/entities/prompt/ui/PromptCard';
import { useDebouncedValue } from '@/shared/lib/debounce/useDebouncedValue';
import { promptCategories } from '@/shared/mock/prompts';
import { TSearchResponse } from '@/shared/types/prompt';
import { Breadcrumbs } from '@/widgets/Breadcrumbs/Breadcrumbs';

import styles from './PromptSearchPage.module.css';

const MIN_QUERY_LENGTH = 3;

const createSearchUrl = ({
  query,
  category,
}: {
  query: string;
  category: string;
}) => {
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
  const searchParamsString = searchParams.toString();
  const skipNextUrlSyncRef = useRef(false);

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
  const normalizedQuery = query.trim();
  const normalizedDebouncedQuery = debouncedQuery.trim();

  const queryIsTooShort =
    normalizedQuery.length > 0 && normalizedQuery.length < MIN_QUERY_LENGTH;
  const debouncedQueryIsTooShort =
    normalizedDebouncedQuery.length > 0 &&
    normalizedDebouncedQuery.length < MIN_QUERY_LENGTH;
  const hasActiveSearch = Boolean(
    debouncedCategory || normalizedDebouncedQuery.length >= MIN_QUERY_LENGTH,
  );

  useEffect(() => {
    if (skipNextUrlSyncRef.current) {
      skipNextUrlSyncRef.current = false;
      return;
    }

    setQuery(urlQuery);
    setCategory(urlCategory);
  }, [urlCategory, urlQuery]);

  useEffect(() => {
    if (debouncedQueryIsTooShort) {
      setSuggestions([]);
      return;
    }

    const currentUrl = searchParamsString
      ? `${pathname}?${searchParamsString}`
      : pathname;
    const nextUrl = createSearchUrl({
      query: debouncedQuery,
      category: debouncedCategory,
    });

    if (nextUrl !== currentUrl) {
      skipNextUrlSyncRef.current = true;
      router.replace(nextUrl, { scroll: false });
    }
  }, [
    debouncedCategory,
    debouncedQuery,
    debouncedQueryIsTooShort,
    pathname,
    router,
    searchParamsString,
  ]);

  useEffect(() => {
    if (!debouncedCategory && normalizedDebouncedQuery.length === 0) {
      setData(null);
      setError('');
      setIsLoading(false);
      return;
    }

    if (debouncedQueryIsTooShort) {
      setData(null);
      setError('');
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();
    const params = new URLSearchParams();

    if (normalizedDebouncedQuery) params.set('q', normalizedDebouncedQuery);
    if (debouncedCategory) params.set('category', debouncedCategory);

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
        if (
          requestError instanceof DOMException &&
          requestError.name === 'AbortError'
        ) {
          return;
        }

        setData(null);
        setError(
          requestError instanceof Error
            ? requestError.message
            : 'Не удалось выполнить поиск. Попробуйте ещё раз.',
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
  }, [debouncedCategory, debouncedQueryIsTooShort, normalizedDebouncedQuery]);

  useEffect(() => {
    if (normalizedDebouncedQuery.length < MIN_QUERY_LENGTH) {
      setSuggestions([]);
      setIsSuggestionsLoading(false);
      return;
    }

    const controller = new AbortController();
    const params = new URLSearchParams({
      q: normalizedDebouncedQuery,
      mode: 'suggest',
    });

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
        if (
          requestError instanceof DOMException &&
          requestError.name === 'AbortError'
        ) {
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
  }, [normalizedDebouncedQuery]);

  const resultTitle = useMemo(() => {
    if (queryIsTooShort) return 'Продолжайте вводить запрос';
    if (!hasActiveSearch) return 'Начните поиск';
    if (isLoading && !data) return 'Ищем подходящие шаблоны';
    if (error) return 'Поиск не выполнен';
    if (!data || data.total === 0) return 'Ничего не найдено';

    return `Найдено шаблонов: ${data.total}`;
  }, [data, error, hasActiveSearch, isLoading, queryIsTooShort]);

  const renderedResults = useMemo(() => {
    if (!data?.results.length) return null;

    return data.results.map((prompt) => (
      <PromptCard key={prompt.id} prompt={prompt} />
    ));
  }, [data]);

  const shouldShowInitialState = !hasActiveSearch && !queryIsTooShort;
  const shouldShowShortQueryState = queryIsTooShort;
  const shouldShowInitialLoading = isLoading && !data;
  const shouldShowError = Boolean(error);
  const shouldShowEmptyResults =
    !isLoading &&
    !error &&
    hasActiveSearch &&
    !queryIsTooShort &&
    data?.total === 0;
  const shouldShowResults =
    !queryIsTooShort && !error && Boolean(renderedResults);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (
        normalizedQuery.length > 0 &&
        normalizedQuery.length < MIN_QUERY_LENGTH
      ) {
        return;
      }

      const nextUrl = createSearchUrl({ query, category });
      skipNextUrlSyncRef.current = true;
      router.push(nextUrl);
    },
    [category, normalizedQuery.length, query, router],
  );

  const handleReset = useCallback(() => {
    setQuery('');
    setCategory('');
    setData(null);
    setError('');
    setSuggestions([]);
    skipNextUrlSyncRef.current = true;
    router.replace('/search', { scroll: false });
  }, [router]);

  const handleSuggestionClick = useCallback(
    (suggestion: string) => {
      setQuery(suggestion);
      skipNextUrlSyncRef.current = true;
      router.push(createSearchUrl({ query: suggestion, category }));
    },
    [category, router],
  );

  return (
    <section className="pageSection">
      <div className="container">
        <Breadcrumbs />

        <div className={styles.hero}>
          <span className="badge">Поиск по каталогу</span>
          <h1>Поиск по шаблонам промптов</h1>
          <p>
            Найдите подходящий шаблон по задаче, теме или категории. Подсказки
            помогут быстрее перейти к нужному результату.
          </p>
        </div>

        <form
          className={styles.searchForm}
          method="get"
          action="/search"
          onSubmit={handleSubmit}
        >
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

            <div className={styles.helperSlot} aria-live="polite">
              {queryIsTooShort ? (
                <p className={styles.hint}>Введите ещё несколько символов.</p>
              ) : null}
            </div>

            <div
              className={styles.suggestions}
              aria-label="Поисковые подсказки"
            >
              {normalizedQuery.length >= MIN_QUERY_LENGTH &&
              !isSuggestionsLoading &&
              suggestions.length > 0
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

          <button
            className={styles.submitButton}
            disabled={queryIsTooShort}
            type="submit"
          >
            Найти
          </button>
        </form>

        <section className={styles.results} aria-live="polite">
          <div className={styles.resultsHeader}>
            <div>
              <h2>{resultTitle}</h2>
              {isLoading && data ? (
                <span className={styles.loadingBadge}>Обновляем</span>
              ) : null}
            </div>
            {hasActiveSearch || query || category ? (
              <button
                className={styles.resetButton}
                type="button"
                onClick={handleReset}
              >
                Сбросить поиск
              </button>
            ) : null}
          </div>

          {shouldShowShortQueryState ? (
            <div className={styles.emptyState}>
              <p>Продолжайте вводить запрос, чтобы увидеть результаты.</p>
            </div>
          ) : shouldShowInitialState ? (
            <div className={styles.emptyState}>
              <p>
                Можно искать по названию, описанию, тегам, переменным и тексту
                промпта.
              </p>
            </div>
          ) : shouldShowInitialLoading ? (
            <div className={styles.stateCard}>Загрузка результатов</div>
          ) : shouldShowError ? (
            <div className={styles.errorCard}>{error}</div>
          ) : shouldShowEmptyResults ? (
            <div className={styles.emptyState}>
              <p>Попробуйте изменить запрос или выбрать другую категорию.</p>
            </div>
          ) : null}

          {shouldShowResults ? (
            <div className={styles.grid}>{renderedResults}</div>
          ) : null}
        </section>
      </div>
    </section>
  );
}

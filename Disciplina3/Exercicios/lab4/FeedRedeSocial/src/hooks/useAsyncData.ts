import { useState, useCallback, useEffect } from 'react';

export interface UseAsyncDataReturn<T> {
  data: T | null;
  setData: React.Dispatch<React.SetStateAction<T | null>>;
  loading: boolean;
  error: string | null;
  execute: () => Promise<T | undefined>;
}

export interface UseAsyncDataOptions<T> {
  immediate?: boolean;
  initialData?: T | null;
}

export function useAsyncData<T>(
  asyncFn: () => Promise<T>,
  options: UseAsyncDataOptions<T> = {}
): UseAsyncDataReturn<T> {
  const { immediate = true, initialData = null } = options;
  const [data, setData] = useState<T | null>(initialData);
  const [loading, setLoading] = useState<boolean>(immediate);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await asyncFn();
      setData(response);
      return response;
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'Ocorreu um erro ao carregar os dados.';
      setError(errorMessage);
      return undefined;
    } finally {
      setLoading(false);
    }
  }, [asyncFn]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate, execute]);

  return { data, setData, loading, error, execute };
}

export default useAsyncData;

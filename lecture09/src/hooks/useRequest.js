import { useState, useEffect, useCallback } from 'react';

const useRequest = (requestFunc, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await requestFunc();
      setData(response);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [requestFunc]);

  useEffect(() => {
    fetchData();
  }, [fetchData, ...dependencies]);

  return { data, loading, error, refresh: fetchData };
};

export default useRequest;

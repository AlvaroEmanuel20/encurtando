import { useEffect, useState } from 'react';
import { ApiError } from '../lib/interfaces';
import { AxiosError } from 'axios';
import { apiClient } from '../lib/apiClient';
import { useNavigate } from 'react-router-dom';

export default function useQuery<T>(url: string) {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ApiError>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = (await apiClient.get<T>(url)).data;

        setData(res);
        setIsLoading(false);
        return res;
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          if (error.response.status === 401) navigate('/login');

          setError({
            statusCode: error.response.status,
            message: error.response.data.message,
            context: error.response.data.context,
          });
        }

        setIsLoading(false);
      }
    };

    fetch();
  }, [url]);

  return { data, isLoading, error };
}

import { useState } from 'react';
import { ApiError } from '../lib/types';
import { apiClient } from '../lib/apiClient';
import { AxiosError } from 'axios';

export default function useMutation(
  url: string,
  method: 'post' | 'delete' | 'patch' | 'put',
  onError?: (error: ApiError | undefined) => void,
  formData?: boolean
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError>();

  const mutate = async <T, K>(data?: T) => {
    setIsLoading(true);

    try {
      let res: K;

      if (formData) {
        res = (
          await apiClient<K>({
            method,
            url,
            data,
            headers: { 'Content-Type': 'multipart/form-data' },
          })
        ).data;
      } else {
        res = (await apiClient<K>({ method, url, data })).data;
      }

      setIsLoading(false);
      return res;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (onError) {
          onError({
            statusCode: error.response?.data.statusCode,
            message: error.response?.data.message,
            context: error.response?.data.context,
          });
        }

        setError({
          statusCode: error.response?.data.statusCode,
          message: error.response?.data.message,
          context: error.response?.data.context,
        });
      }

      setIsLoading(false);
    }
  };

  return { mutate, isLoading, error };
}

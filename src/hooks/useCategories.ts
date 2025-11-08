import { useCallback, useEffect, useState } from 'react';
import { CategoryService } from '../services/api/categoryService';
import type { ListCategoriesRequest } from '../services/api/categoryService';
import type { PaginatedResponse } from '../services/api/types';
import type { Category } from '../models/category';
import { useAuth } from '../context/AuthContext';
import { ApiException } from '../services/api/ApiException';

interface UseCategoriesRequest extends Omit<ListCategoriesRequest, 'token'> {
}

interface UseCategoriesResponse {
    data: PaginatedResponse<Category> | null;
    loading: boolean;
    error: any;
    reload: (request?: UseCategoriesRequest) => Promise<PaginatedResponse<Category> | null>;
    setData: (data: PaginatedResponse<Category> | null) => void;
}

export function useCategories(request?: UseCategoriesRequest): UseCategoriesResponse {
  const [data, setData] = useState<PaginatedResponse<Category> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  const fetchCategories = useCallback(async (req?: UseCategoriesRequest) => {
    try {
      setLoading(true);
      setError(null);

      const res = await CategoryService.listCategories({
        token: token!,
        page: req?.page ?? request?.page ?? 0,
        size: req?.size ?? request?.size ?? 10,
      });

      if (res instanceof ApiException) {
        throw new Error(res.message);
      }

      setData(res);

      return res;
    } catch (error: any) {
      setError(error.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [token, request]);

  useEffect(() => {
    fetchCategories().catch(() => {});
  }, [fetchCategories]);

  return { data, loading, error, reload: fetchCategories, setData };
}
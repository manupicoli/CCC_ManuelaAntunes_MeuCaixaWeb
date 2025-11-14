import { useCallback, useEffect, useState } from 'react';
import { CategoryService } from '../services/api/categoryService';
import type { ListCategoriesRequest } from '../services/api/categoryService';
import type { PaginatedResponse } from '../services/api/types';
import type { Category } from '../models/category';
import { useAuth } from '../context/AuthContext';
import { ApiException } from '../services/api/ApiException';
import { useNavigate } from 'react-router-dom';

interface UseCategoriesRequest extends Omit<ListCategoriesRequest, 'token'> {
}

interface UseCategoriesResponse {
    data: PaginatedResponse<Category> | null;
    loading: boolean;
    error: any;
    reload: (request?: UseCategoriesRequest) => Promise<PaginatedResponse<Category> | null>;
    setData: (data: PaginatedResponse<Category> | null) => void;
}

export function useCategories({ page, size }: UseCategoriesRequest): UseCategoriesResponse {
  const [data, setData] = useState<PaginatedResponse<Category> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const fetchCategories = useCallback(async () => {
    try {
      if (!token) {
        logout();
        navigate('/login', { replace: true });
        return null;
      }

      setLoading(true);
      setError(null);

      const res = await CategoryService.listCategories({
        token: token!,
        page,
        size
      });

      if (res instanceof ApiException) {
        throw new Error(res.message);
      }

      setData(res);

      return res;
    } catch (error: any) {
      setError(error.message);

      if (error?.response?.status === 401) {
        logout();
        navigate('/login', { replace: true });
      }

      throw error;
    } finally {
      setLoading(false);
    }
  }, [token, page, size, logout, navigate]);

  useEffect(() => {
    fetchCategories().catch(() => {});
  }, [fetchCategories]);

  return { data, loading, error, reload: fetchCategories, setData };
}
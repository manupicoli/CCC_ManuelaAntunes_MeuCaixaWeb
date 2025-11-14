import { useCallback, useEffect, useState } from "react";
import type { Category } from "../../models/category";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { CategoryService } from "../../services/api/categoryService";
import { ApiException } from "../../services/api/ApiException";

export function useCategory(id?: string) {
    const [data, setData] = useState<Category | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);

    const { token, logout } = useAuth();
    const navigate = useNavigate();

    const fetch = useCallback(async () => {
        if (!id) return;

        if (!token) {
            logout();
            navigate('/login', { replace: true });
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const res = await CategoryService.getCategoryDetails({ id, token });

            if (res instanceof ApiException) {
                throw new Error(res.message);
            }

            setData(res);

            return res;
        } catch (err: any) {
            setError(err);

            if (err?.response?.status === 401) {
                logout();
                navigate('/login', { replace: true });
            }

            if (err?.response?.status === 404) {
                setError("Categoria não encontrada");
            }

            throw err;
        } finally {
        setLoading(false);
        }
  }, [id, token]);

  useEffect(() => {
    fetch().catch(() => {});
  }, [fetch]);

  return { data, loading, error, reload: fetch, setData };
}
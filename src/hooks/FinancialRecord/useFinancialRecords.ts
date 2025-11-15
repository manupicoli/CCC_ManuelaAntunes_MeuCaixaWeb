import { useCallback, useEffect, useState } from 'react';
import { FinancialRecordService } from '../../services/api/FinancialRecord/financialRecordService';
import type { PaginatedResponse } from '../../services/api/types';
import { useAuth } from '../../context/AuthContext';
import { ApiException } from '../../services/api/ApiException';
import { useNavigate } from 'react-router-dom';
import type { FinancialRecord } from '../../models/financialrecord';

interface UseFinancialRecordsInput {
  page: number;
  size: number;
}

interface UseFinancialRecordsResponse {
  data: PaginatedResponse<FinancialRecord> | null;
  loading: boolean;
  error: any;
  reload: () => Promise<PaginatedResponse<FinancialRecord> | null>;
  setData: (data: PaginatedResponse<FinancialRecord> | null) => void;
}

export function useFinancialRecords({ page, size }: UseFinancialRecordsInput): UseFinancialRecordsResponse {
  const [data, setData] = useState<PaginatedResponse<FinancialRecord> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const fetchFinancialRecords = useCallback(async () => {
    try {
      if (!token) {
        logout();
        navigate("/login", { replace: true });
        return null;
      }

      setLoading(true);
      setError(null);

      const res = await FinancialRecordService.listFinancialRecords({
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
        navigate("/login", { replace: true });
      }

      throw error;

    } finally {
      setLoading(false);
    }
  }, [token, page, size, logout, navigate]);

  useEffect(() => {
    fetchFinancialRecords().catch(() => {});
  }, [fetchFinancialRecords]);

  return { data, loading, error, reload: fetchFinancialRecords, setData };
}

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FinancialRecordService } from "../../services/api/financialRecordService";
import { ApiException } from "../../services/api/ApiException";
import type { FinancialRecord } from "../../models/financialrecord";

export function useFinancialRecord(id?: string) {
    const [data, setData] = useState<FinancialRecord | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);

    const { token, logout } = useAuth();
    const navigate = useNavigate();

    const fetch = useCallback(async () => {
        if (!id) return;

        if (!token) {
            logout();
            navigate("/login", { replace: true });
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const res = await FinancialRecordService.getFinancialRecordDetails({
                id,
                token,
            });

            if (res instanceof ApiException) {
                throw new Error(res.message);
            }

            setData(res);
            return res;

        } catch (err: any) {
            setError(err);

            if (err?.response?.status === 401) {
                logout();
                navigate("/login", { replace: true });
            }

            if (err?.response?.status === 404) {
                setError("Registro financeiro não encontrado");
            }

            throw err;

        } finally {
            setLoading(false);
        }
    }, [id, token, logout, navigate]);

    useEffect(() => {
        fetch().catch(() => {});
    }, [fetch]);

    return { data, loading, error, reload: fetch, setData };
}

import { useCallback, useEffect, useState } from "react";
import type { Dashboard } from "../../models/dashboard";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { DashboardService } from "../../services/api/Dashboard/dashboardService";
import { ApiException } from "../../services/api/ApiException";

export function useDashboard() {
    const [data, setData] = useState<Dashboard | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);

    const { token, logout } = useAuth();
    const navigate = useNavigate();

    const fetchDashboard = useCallback(async () => {
    if (!token) {
        logout();
        navigate('/login', { replace: true });
        return;
    }

    setLoading(true);
    setError(null);

    try {
        const res = await DashboardService.getDashboardDetails({ token });

        if (res instanceof ApiException) {
            throw new Error(res.message);
        }

        setData(res);

        return res;
    } catch (error: any) {
        setError(error);

        if (error?.response?.status === 401) {
            logout();
            navigate('/login', { replace: true });
        }

        throw error;
    } finally {
        setLoading(false);
    }
    }, [token]);

    useEffect(() => {
        fetchDashboard().catch(() => {});
    }, [fetchDashboard]);

    return { data, loading, error, reload: fetchDashboard, setData };
}
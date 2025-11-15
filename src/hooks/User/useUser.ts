import { useCallback, useEffect, useState } from "react";
import type { User } from "../../models/user";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { UserService } from "../../services/api/User/userService";
import { ApiException } from "../../services/api/ApiException";

export function useUser() {
    const [data, setData] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);

    const { token, logout } = useAuth();
    const navigate = useNavigate();

    const fetch = useCallback(async () => {
        if (!token) {
            logout();
            navigate("/login", { replace: true });
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const res = await UserService.getUserDetails({ token });

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
        } finally {
            setLoading(false);
        }
    }, [token, logout, navigate]);

    useEffect(() => {
        fetch().catch(() => {});
    }, [fetch]);

    return { data, loading, error, reload: fetch };
}
import type { Dashboard } from "../../../models/dashboard";
import { Api } from "../ApiConfig";
import { ApiException } from "../ApiException";

export interface GetDashboardDetailsRequest {
    token: string;
}

export const DashboardService = {
    async getDashboardDetails(props: GetDashboardDetailsRequest): Promise<Dashboard | ApiException> {
        return await Api().get('/v1/home', {
            headers: { 'Authorization': `Bearer ${props.token}` }
        })
        .then(res => res.data)
        .catch((error) => {
            console.log("Error fetching dashboard data:", error);
            return new ApiException(error.response?.message || "Erro ao buscar dados do dashboard");
        });
    }
};
import { ApiException } from "../ApiException";
import { Api } from "../ApiConfig";

export interface ExportReportRequest {
    token: string;
    customStart: string;
    customEnd: string;
}

export const ReportService = {
    async exportReport(props: ExportReportRequest): Promise<Blob | ApiException> {
        return await Api().post('/v1/report', null, {
            params: {
                customStart: props.customStart,
                customEnd: props.customEnd
            },
            headers: { 'Authorization': `Bearer ${props.token}` },
            responseType: 'blob'
        })
        .then(res => res.data as Blob)
        .catch((error) => {
            console.log("Error exporting report:", error);
            return new ApiException(error.response?.message || "Erro ao exportar relatório");
        });
    }
};
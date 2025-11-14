import type { FinancialRecord } from "../../models/financialrecord";
import { Api } from "./ApiConfig";
import { ApiException } from "./ApiException";
import type { PaginatedResponse } from "./types";

export interface ListFinancialRecordsRequest {
  token: string;
  page?: number;
  size?: number;
  qs?: string;
}

export interface GetFinancialRecordDetailsRequest {
  id: number;
  token: string;
}

export interface CreateUpdateFinancialRecordRequest {
  id?: number;
  token: string;
  customerCode: string;
  type: "INCOME" | "EXPENSE";
  amount: number;
  dueDate: string | null;
  paymentDate: string | null;
  description?: string;
  category: number;
}

export interface DeleteFinancialRecordRequest {
  id: number;
  token: string;
}

export const FinancialRecordService = {
    async listFinancialRecords(request: ListFinancialRecordsRequest): Promise<PaginatedResponse<FinancialRecord> | ApiException> {
        return await Api().get<PaginatedResponse<FinancialRecord>>(`/v1/financialrecord`, {
            params: { ...request },
            headers: { Authorization: `Bearer ${request.token}` },
        })
        .then(res => res.data)
        .catch((error) => {
            console.log("Error fetching financial records:", error);
            return new ApiException(error.response?.message || "Erro ao listar registros financeiros");
        });
    },

    async getFinancialRecordDetails(request: GetFinancialRecordDetailsRequest): Promise<FinancialRecord | ApiException> {
        return await Api().get<FinancialRecord>(`/v1/financialrecord/${request.id}`, { headers: { Authorization: `Bearer ${request.token}` } })
            .then(res => res.data)
            .catch((error) => {
                console.log("Error fetching financial record details:", error);
                return new ApiException(error.response?.message || "Erro ao buscar detalhes do registro financeiro");
            });
    },

    async createFinancialRecord(request: CreateUpdateFinancialRecordRequest): Promise<void | ApiException> {
        await Api().post<FinancialRecord>(`/v1/financialrecord`, request, {
                headers: { 
                    Authorization: `Bearer ${request.token}` 
                } 
            }).catch((error) => {
                console.log("Error creating financial record:", error);
                return new ApiException(error.response?.message || "Erro ao criar registro financeiro");
            });
    },

    async updateFinancialRecord(request: CreateUpdateFinancialRecordRequest): Promise<void | ApiException> {
        await Api().put<FinancialRecord>(`/v1/financialrecord/${request.id}`, request, {
                headers: { 
                    Authorization: `Bearer ${request.token}` 
                } 
            }).catch((error) => {
                console.log("Error updating financial record:", error);
                return new ApiException(error.response?.message || "Erro ao atualizar registro financeiro");
            });
    },
    
    async deleteFinancialRecord(request: DeleteFinancialRecordRequest): Promise<void | ApiException> {
        await Api().delete<void>(`/v1/financialrecord/${request.id}`, { headers: { Authorization: `Bearer ${request.token}` } })
            .catch((error) => {
                console.log("Error deleting financial record:", error);
                return new ApiException(error.response?.message || "Erro ao deletar registro financeiro");
            });
    },
};
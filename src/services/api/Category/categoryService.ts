import type { Category } from "../../../models/category";
import { Api } from "../ApiConfig";
import { ApiException } from "../ApiException";
import type { PaginatedResponse } from "../types";

export interface ListCategoriesRequest {
    token: string;
    page?: number;
    size?: number;
    qs?: string;
}

export interface GetCategoryDetailsRequest {
    id: string;
    token: string;
}

export interface CreateUpdateCategoryRequest {
    id?: string;
    token: string;
    title: string;
    description?: string;
}

export interface DeleteCategoryRequest {
    id: string;
    token: string;
}

export const CategoryService = {
    async listCategories(request: ListCategoriesRequest): Promise<PaginatedResponse<Category> | ApiException> {
        return await Api().get<PaginatedResponse<Category>>(`/v1/category`, {
            params: { ...request },
            headers: { Authorization: `Bearer ${request.token}` },
        })
        .then(res => res.data)
        .catch((error) => {
            console.log("Error fetching categories:", error);
            return new ApiException(error.response?.message || "Erro ao listar categorias");
        });
    },

    async getCategoryDetails(request: GetCategoryDetailsRequest): Promise<Category | ApiException> {
        return await Api().get<Category>(`/v1/category/${request.id}`, { headers: { Authorization: `Bearer ${request.token}` } })
            .then(res => res.data)
            .catch((error) => {
                console.log("Error fetching category details:", error);
                return new ApiException(error.response?.message || "Erro ao buscar detalhes da categoria");
            });
    },

    async createCategory(request: CreateUpdateCategoryRequest): Promise<void | ApiException> {
        await Api().post<Category>(`/v1/category`, request, {
                headers: { 
                    Authorization: `Bearer ${request.token}` 
                } 
            }).catch((error) => {
                console.log("Error creating category:", error);
                return new ApiException(error.response?.message || "Erro ao criar categoria");
            });
    },

    async updateCategory(request: CreateUpdateCategoryRequest): Promise<void | ApiException> {
        await Api().put<Category>(`/v1/category/${request.id}`, request, { headers: { Authorization: `Bearer ${request.token}` } })
            .catch((error) => {
                console.log("Error updating category:", error);
                return new ApiException(error.response?.message || "Erro ao atualizar categoria");
            });
    },

    async deleteCategory(request: DeleteCategoryRequest): Promise<void | ApiException> {
        await Api().delete(`/v1/category/${request.id}`, { headers: { Authorization: `Bearer ${request.token}` } })
            .catch((err) => {
                console.log("Error deleting category:", err);
                return new ApiException(err.response?.message || "Erro ao deletar categoria");
            });
    }
};
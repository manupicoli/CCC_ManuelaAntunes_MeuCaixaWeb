import type { User } from "../../../models/user";
import { Api } from "../ApiConfig";
import { ApiException } from "../ApiException";

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  id: string;
  customerCode: string;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  refreshExpiresIn: string;
}

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  phone: string;
  password: string;
}

interface GetUserDetailsRequest {
  token: string;
}

export interface UpdateUserRequest {
  id: string;
  token: string;
  firstName: string;
  lastName: string;
  companyName: string;
  phone: string;
}

export const UserService = {
  async loginUser(data: LoginRequest): Promise<LoginResponse | ApiException> {
    return await Api().post<LoginResponse>(`/v1/user/login`, data)
    .then(res => res.data)
    .catch((error) => {
        console.log("Error logging in user:", error);
        throw new ApiException(error.response?.message || "Erro ao fazer login");
    });
  },

  async createUser(data: CreateUserRequest): Promise<void | ApiException> {
    await Api().post(`/v1/user/create`, data)
    .catch((error) => {
        console.log("Error creating user:", error);
        throw new ApiException(error.response?.message || "Erro ao criar usuário");
    });
  },

  async getUserDetails(data: GetUserDetailsRequest): Promise<User | ApiException> {
    return await Api().get(`/v1/user`, {
        headers: { Authorization: `Bearer ${data.token}` }
    })
    .then(res => res.data)
    .catch((error) => {
        console.log("Error getting user details:", error);
        throw new ApiException(error.response?.message || "Erro ao obter detalhes do usuário");
    });
  },

  async updateUser(data: UpdateUserRequest): Promise<void | ApiException> {
    await Api().put(`/v1/user/${data.id}`, {
        firstName: data.firstName,
        lastName: data.lastName,
        companyName: data.companyName,
        phone: data.phone
    }, {
        headers: { Authorization: `Bearer ${data.token}` }
    })
    .catch((error) => {
        console.log("Error updating user:", error);
        throw new ApiException(error.response?.message || "Erro ao atualizar usuário");
    });
  },

  async handleLogout(logout: () => void, navigate: (to: string) => void) {
    logout(); 
    navigate('/login');
  }
};
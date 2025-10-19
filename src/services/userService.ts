import api from './api';

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

interface CreateUserRequest {
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  phone: string;
  password: string;
}

export async function loginUser(data: LoginRequest): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>(`/v1/user/login`, data);
  return response.data;
}

export async function createUser(data: CreateUserRequest) {
  const response = await api.post(`/user/create`, data);
  return response.data;
}

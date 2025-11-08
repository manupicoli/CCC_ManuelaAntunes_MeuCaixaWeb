import { Api } from "./ApiConfig";

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
  const response = await Api().post<LoginResponse>(`/v1/user/login`, data);
  return response.data;
}

export async function createUser(data: CreateUserRequest) {
  const response = await Api().post(`/user/create`, data);
  return response.data;
}

export async function handleLogout(logout: () => void, navigate: (to: string) => void) {
  logout(); 
  navigate('/login');
}

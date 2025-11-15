export type UserRole = "ADMIN" | "COLLABORATOR";

export interface User {
    id: string;
    role: UserRole;
    name: string;
    email: string;
    phone?: string;
    companyName: string;
}
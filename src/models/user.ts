export interface User {
    id: string;
    role: "ADMIN" | "COLLABORATOR";
    name: string;
    email: string;
    phone?: string;
    companyName: string;
}
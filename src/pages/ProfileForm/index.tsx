import { useState } from "react";
import { UserService, type CreateUserRequest } from "../../services/api/User/userService";
import { useNavigate } from "react-router-dom";
import AlertModal from "../../components/AlertModal";

export default function ProfileForm() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const [formData, setFormData] = useState<CreateUserRequest>({
        firstName: "",
        lastName: "",
        companyName: "",
        email: "",
        phone: "",
        password: ""
    });

    const [alertData, setAlertData] = useState({
        open: false,
        type: "success" as "success" | "error" | "warning",
        title: "",
        message: "",
    });

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        setError(null);

        for (const key in formData) {
            if (formData[key as keyof CreateUserRequest] === "") {
                setError("Por favor, preencha todos os campos.");
                setLoading(false);
                return;
            }
        }

        setLoading(true);

        try {
            await UserService.createUser(formData);

            setAlertData({
                open: true,
                type: "success",
                title: "Sucesso!",
                message: "Usuário criado com sucesso.",
            });
        } catch (error) {
            setAlertData({
                open: true,
                type: "error",
                title: "Erro",
                message: "Ocorreu um erro ao criar o usuário.",
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="p-8 flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {loading 
            ? <div className="text-2xl font-semibold text-gray-800 text-center">Carregando...</div>
            : <div className="flex flex-col items-center justify-center min-h-screen w-full">
                <div className="mb-6 max-w-lg flex justify-center">
                    <h2 className="text-2xl font-semibold text-gray-800 text-center">Cadastro de usuário</h2>
                </div>

                <div className="w-full max-w-lg">
                    <form onSubmit={handleSubmit} className="w-full bg-white p-6 rounded-lg shadow-sm">
                        <div>
                            <label className="block text-gray-700 mb-1">Nome</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                            <label className="block text-gray-700 mb-1 mt-4">Sobrenome</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1 mt-4">Empresa</label>
                            <input
                                type="text"
                                name="companyName"
                                value={formData.companyName}
                                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-1 mt-4">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />

                            <label className="block text-gray-700 mb-1 mt-4">Telefone</label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-1 mt-4">Senha</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>

                        <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
                                type="submit">
                            Salvar
                        </button>

                        <button className="mt-4 w-full bg-white text-blue-600 py-2 rounded-md font-semibold hover:bg-blue-700 hover:text-white transition-colors cursor-pointer"
                            type="button"
                            onClick={() => navigate(-1)}>
                            Voltar
                        </button>

                        {error && <div className="text-red-500 bg-white p-2 rounded">{error}</div>}
                    </form>
                </div>

            </div>}

            <AlertModal
                open={alertData.open}
                type={alertData.type}
                title={alertData.title}
                message={alertData.message}
                onClose={() => {
                    setAlertData((prev) => ({ ...prev, open: false }));
                    if (alertData.type === "success") {
                        navigate("/login");
                    }
                }}
            />
        </div>
    );
}
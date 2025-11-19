import { useEffect, useState } from "react";
import { useUser } from "../../hooks/User/useUser";
import { useAuth } from "../../context/AuthContext";
import { UserService } from "../../services/api/User/userService";
import AlertModal from "../../components/AlertModal";
import { useNavigate } from "react-router-dom";

type ProfileFormProps = {
    mode?: "view" | "edit";
};

export default function Profile(props: ProfileFormProps) {
    const { data: user, error } = useUser();
    const { token, userId } = useAuth();
    const navigate = useNavigate();

    const isEditable = props.mode !== "view";
    
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        companyName: '',
        phone: ''
    });

    const [alertData, setAlertData] = useState({
        open: false,
        type: "success" as "success" | "error" | "warning",
        title: "",
        message: "",
    });

    useEffect(() => {
        if (user) {
            const parts = (user.name || '').trim().split(/\s+/);
            const firstName = parts.shift() || '';
            const lastName = parts.join(' ');

            setFormData({
                firstName,
                lastName,
                companyName: user.companyName || '',
                phone: user.phone || ''
            });
        }
    }, [user]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!user || !token) {
            setAlertData({ 
                open: true, 
                type: 'error', 
                title: 'Erro', 
                message: 'Usuário não disponível.' 
            });
            return;
        }

        setLoading(true);

        try {
            await UserService.updateUser({
                id: userId!,
                token,
                firstName: formData.firstName,
                lastName: formData.lastName,
                companyName: formData.companyName,
                phone: formData.phone
            });

            setAlertData({ 
                open: true, 
                type: 'success', 
                title: 'Sucesso', 
                message: 'Perfil atualizado.' 
            });
        } catch (err: any) {
            setAlertData({ 
                open: true, 
                type: 'error', 
                title: 'Erro', 
                message: err?.message || 'Falha ao atualizar perfil.' 
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-xl">
                <div className="mb-6 text-center">
                    <h2 className="text-3xl font-semibold text-gray-800">Perfil do usuário</h2>
                </div>

                {error ? (
                    <div className="p-6 text-red-600">{error.message}</div>
                ) : (
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 mb-1">Nome</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        disabled={!isEditable}
                                        className="w-full border border-gray-300 rounded-md p-3"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 mb-1">Sobrenome</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        disabled={!isEditable}
                                        className="w-full border border-gray-300 rounded-md p-3"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-1">Empresa</label>
                                <input
                                    type="text"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                    disabled={!isEditable}
                                    className="w-full border border-gray-300 rounded-md p-3"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-1">Telefone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    disabled={!isEditable}
                                    className="w-full border border-gray-300 rounded-md p-3"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={user?.email || ''}
                                    disabled={true}
                                    className="w-full border border-gray-300 rounded-md p-3 bg-gray-50"
                                />
                            </div>

                            {!isEditable ? (
                                <button
                                    onClick={() => navigate('/perfil/editar')}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
                                >
                                    Editar
                                </button>
                            ) : (
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setAlertData((prev) => ({ ...prev, open: false }));
                                            navigate(-1);
                                        }}
                                        className="px-4 py-2 bg-white border rounded-lg cursor-pointer"
                                    >
                                        Voltar
                                    </button>

                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
                                    >
                                        {loading ? 'Salvando...' : 'Salvar'}
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>
                )}
            </div>

            <AlertModal
                open={alertData.open}
                type={alertData.type}
                title={alertData.title}
                message={alertData.message}
                onClose={() => {
                    setAlertData((prev) => ({ ...prev, open: false }));
                    if (alertData.type === "success") {
                        navigate("/perfil");
                    }
                }}
            />
        </div>
    );
}
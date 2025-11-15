import { useEffect, useState } from "react";
import { useUser } from "../../hooks/User/useUser";

export default function Profile() {
    const { data: user, loading, error } = useUser();
    
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: ""
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name,
                email: user.email,
                phone: user.phone || ""
            });
        }
    }, [user]);

    if (loading) return <div className="p-6">Carregando...</div>;

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Perfil do usuário</h2>
            </div>

            {error ? <div className="p-6 text-red-600">{error.message}</div>
                   : <form className="max-w-lg bg-white p-6 rounded-lg shadow-sm">
                        <div>
                            <label className="block text-gray-700 mb-1">Nome</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                disabled={true}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />

                            <label className="block text-gray-700 mb-1 mt-4">Empresa</label>
                            <input
                                type="text"
                                name="companyName"
                                value={user?.companyName || ""}
                                disabled={true}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-1 mt-4">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                disabled={true}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-1 mt-4">Telefone</label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                disabled={true}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-1 mt-4">Função</label>
                            <input
                                type="text"
                                name="role"
                                value={user?.role === 'ADMIN' ? 'Administrador' : 'Usuário'}
                                disabled={true}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
            </form>}
        </div>
    );
}
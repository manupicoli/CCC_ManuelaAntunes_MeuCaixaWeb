import { Menu, Sidebar, MenuItem } from "react-pro-sidebar";
import { RxDashboard } from "react-icons/rx";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { FaTag } from "react-icons/fa";
// import { HiOutlineDocumentReport } from "react-icons/hi";
// import { IoIosNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { CiMenuBurger } from "react-icons/ci";
import { Link, useNavigate } from 'react-router-dom';
import { MdLogout } from "react-icons/md";
import { handleLogout } from "../../services/userService";
import { useAuth } from "../../context/AuthContext";

interface SidemenuInterface {
  collapsed: boolean;
  onToggle: () => void;
  expandedWidth?: number;
  collapsedWidth?: number;
};

export default function Sidemenu (props: SidemenuInterface) {
    const { logout } = useAuth();
    const navigate = useNavigate();

    return (
        <div style={{ position: 'fixed', left: 0, top: 0, bottom: 0, width: props.collapsed ? props.collapsedWidth : props.expandedWidth, transition: 'width 200ms ease', zIndex: 40 }}>
            <Sidebar collapsed={props.collapsed} className="min-h-screen">
                <Menu closeOnClick={true}>
                    <MenuItem icon={<CiMenuBurger />} onClick={props.onToggle} />
                    <MenuItem icon={<RxDashboard />} component={<Link to="/dashboard" />}> Dashboard </MenuItem>
                    <MenuItem icon={<FaMoneyBillTrendUp />} component={<Link to="/registros-financeiros" />}> Registros </MenuItem>
                    <MenuItem icon={<FaTag />} component={<Link to="/categorias" />}> Categorias </MenuItem>
                    {/* TODO <MenuItem icon={<HiOutlineDocumentReport />} component={<Link to="/relatorios" />}> Relatórios </MenuItem> */}
                    {/* TODO <MenuItem icon={<IoIosNotifications />} component={<Link to="/notificacoes" />}> Notificações</MenuItem> */}
                    <MenuItem icon={<CgProfile />} component={<Link to="/perfil" />}> Perfil </MenuItem>
                    <MenuItem icon={<MdLogout />} onClick={() => handleLogout(logout, navigate)}> Sair </MenuItem>
                </Menu>
            </Sidebar>
        </div>
    );
};
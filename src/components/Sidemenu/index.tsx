import { Menu, Sidebar, MenuItem } from "react-pro-sidebar";
import { RxDashboard } from "react-icons/rx";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { FaTag } from "react-icons/fa";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoIosNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { CiMenuBurger } from "react-icons/ci";

type SidemenuInterface = {
  collapsed: boolean;
  onToggle: () => void;
  expandedWidth?: number;
  collapsedWidth?: number;
};

export default function Sidemenu (props: SidemenuInterface) {
    return (
        <div style={{ position: 'fixed', left: 0, top: 0, bottom: 0, width: props.collapsed ? props.collapsedWidth : props.expandedWidth, transition: 'width 200ms ease', zIndex: 40 }}>
            <Sidebar collapsed={props.collapsed} className="min-h-screen">
                <Menu closeOnClick={true}>
                    <MenuItem icon={<CiMenuBurger />} onClick={props.onToggle} />
                    <MenuItem icon={<RxDashboard />}> Dashboard </MenuItem>
                    <MenuItem icon={<FaMoneyBillTrendUp />}> Registros </MenuItem>
                    <MenuItem icon={<FaTag />}> Categorias </MenuItem>
                    <MenuItem icon={<HiOutlineDocumentReport />}> Relatórios </MenuItem>
                    <MenuItem icon={<IoIosNotifications />}> Notificações</MenuItem>
                    <MenuItem icon={<CgProfile />}> Perfil </MenuItem>
                </Menu>
            </Sidebar>
        </div>
    );
};
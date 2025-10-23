import { useState } from 'react';
import Sidemenu from "../components/Sidemenu";
import LogoutButton from "../components/Logout";
import { Outlet } from 'react-router-dom';

export default function AppLayout() {

    const [collapsed, setCollapsed] = useState(false);
    const expandedWidth = 300;
    const collapsedWidth = 80;

    return (
        <div className="min-h-screen">
            <Sidemenu collapsed={collapsed} 
                      onToggle={() => setCollapsed(c => !c)} 
                      expandedWidth={expandedWidth} 
                      collapsedWidth={collapsedWidth} />

            <div style={{ marginLeft: collapsed ? collapsedWidth : expandedWidth, transition: 'margin-left 200ms ease' }}>
                <div className="flex items-center justify-between p-4">
                    <LogoutButton />
                </div>

                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
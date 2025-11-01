import { useState } from 'react';
import Sidemenu from "../components/Sidemenu";
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
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
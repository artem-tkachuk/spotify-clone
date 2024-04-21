"use client";

import { ReactNode } from 'react';

interface SidebarProps {
    children: ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({
    children
}) => {
    return (
        <div>
            {children}
        </div>
    );
}

export default Sidebar;
import React from 'react';
import ModernSidebar from './ModernSidebar';

const DashboardShell = ({ children, activeTab, setActiveTab, t }) => {
    return (
        <div className="flex bg-[#020617] min-h-screen text-slate-100 font-inter selection:bg-orange-500/30">
            <ModernSidebar activeTab={activeTab} setActiveTab={setActiveTab} t={t} />

            <main className="flex-1 ml-20 md:ml-64 p-4 md:p-10 transition-all duration-300 relative z-10">
                <div className="max-w-6xl mx-auto">
                    {children}
                </div>
            </main>

            {/* Premium Background Decorative Elements - National Accents */}
            <div className="fixed top-[-10%] right-[-5%] w-1/2 h-1/2 bg-orange-600/5 blur-[160px] pointer-events-none z-0"></div>
            <div className="fixed bottom-[-10%] left-[10%] w-1/2 h-1/2 bg-green-600/5 blur-[160px] pointer-events-none z-0"></div>
            <div className="fixed top-1/4 left-1/4 w-1/3 h-1/3 bg-blue-600/[0.03] blur-[180px] pointer-events-none z-0"></div>
        </div>
    );
};

export default DashboardShell;

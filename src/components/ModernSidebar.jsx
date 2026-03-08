import React from 'react';

const ModernSidebar = ({ activeTab, setActiveTab, t }) => {
    const menuItems = [
        { id: 'search', icon: '🔍', label: t.findMatches || 'Search' },
        { id: 'dashboard', icon: '📊', label: 'Dashboard' },
        { id: 'profile', icon: '👤', label: 'Profile' },
        { id: 'saved', icon: '🔖', label: 'Saved' },
        { id: 'settings', icon: '⚙️', label: 'Settings' },
    ];

    return (
        <aside className="w-20 md:w-64 bg-[#0a0f1e]/80 backdrop-blur-3xl border-r border-white/5 flex flex-col h-screen fixed left-0 top-0 z-40 transition-all duration-300">
            <div className="p-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-2xl shadow-lg ring-4 ring-blue-600/20">
                    🇮🇳
                </div>
                <span className="hidden md:block text-xl font-black tracking-tighter text-white">
                    CAREER LENS
                </span>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 group
              ${activeTab === item.id
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                                : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
            `}
                    >
                        <span className="text-2xl group-hover:scale-110 transition-transform">
                            {item.icon}
                        </span>
                        <span className="hidden md:block font-bold truncate text-sm">
                            {item.label}
                        </span>
                    </button>
                ))}
            </nav>

            <div className="p-4">
                <div className="hidden md:block p-4 bg-slate-800/50 rounded-2xl border border-slate-700">
                    <p className="text-[10px] uppercase tracking-widest font-black text-slate-500 mb-2">My Progress</p>
                    <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 w-2/3 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-2 font-bold">Matching Rate: 68%</p>
                </div>
            </div>
        </aside>
    );
};

export default ModernSidebar;

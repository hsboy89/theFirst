import { NavLink, useNavigate } from 'react-router-dom';
import { Home, User, TrendingUp, Calendar, BookOpen, Bell, LogOut } from 'lucide-react';
import { useAuthStore } from '../../../store/authStore';

const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: User, label: 'My Profile', path: '/profile' },
    { icon: TrendingUp, label: 'My Progress', path: '/progress' },
    { icon: Calendar, label: 'Calendar', path: '/calendar' },
    { icon: BookOpen, label: 'Learning Guide', path: '/guide' },
    { icon: Bell, label: 'Bulletin', path: '/bulletin' },
];

export default function Sidebar() {
    const navigate = useNavigate();
    const { user, logout } = useAuthStore();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <aside className="w-64 bg-gradient-to-b from-green-500 to-green-600 min-h-screen p-4 flex flex-col">
            {/* Logo */}
            <div className="text-white text-center py-4 mb-6">
                <h1 className="text-2xl font-bold">The First</h1>
            </div>

            {/* User Profile */}
            <div className="bg-white/20 rounded-xl p-4 mb-6 text-white">
                <div className="flex items-center gap-3">
                    <img
                        src={user?.profileImage || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
                        alt="Profile"
                        className="w-12 h-12 rounded-full bg-white"
                    />
                    <div>
                        <p className="font-semibold">{user?.name}</p>
                        <p className="text-sm opacity-80">Level {user?.level}</p>
                    </div>
                </div>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1">
                <ul className="space-y-2">
                    {menuItems.map((item) => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                                        ? 'bg-white text-green-600 shadow-md'
                                        : 'text-white hover:bg-white/20'
                                    }`
                                }
                            >
                                <item.icon size={20} />
                                <span className="font-medium">{item.label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Logout Button */}
            <div className="border-t border-white/20 pt-4 mt-4">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 bg-red-500 text-white hover:bg-red-600 rounded-lg transition-all"
                >
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
}

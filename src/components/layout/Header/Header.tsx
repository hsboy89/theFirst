import { NavLink } from 'react-router-dom';
import { HelpCircle } from 'lucide-react';

const tabs = [
    { label: 'Home', path: '/' },
    { label: 'Vocabulary', path: '/vocabulary' },
    { label: 'This Week', path: '/this-week' },
    { label: 'Leaderboard', path: '/leaderboard' },
];

export default function Header() {
    return (
        <header className="bg-gradient-to-r from-green-500 to-green-400 px-6 py-3 flex items-center justify-between">
            {/* Tab Navigation */}
            <nav className="flex gap-2">
                {tabs.map((tab) => (
                    <NavLink
                        key={tab.path}
                        to={tab.path}
                        className={({ isActive }) =>
                            `px-6 py-2 rounded-full font-medium transition-all ${isActive
                                ? 'bg-yellow-400 text-gray-800 shadow-md'
                                : 'bg-green-600 text-white hover:bg-green-700'
                            }`
                        }
                    >
                        {tab.label}
                    </NavLink>
                ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
                <button className="bg-yellow-400 text-gray-800 px-4 py-2 rounded-full font-medium flex items-center gap-2 hover:bg-yellow-300 transition-all">
                    <HelpCircle size={18} />
                    Help
                </button>
            </div>
        </header>
    );
}


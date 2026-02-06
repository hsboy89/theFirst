import { useAuthStore } from '../store/authStore';
import Sidebar from '../components/layout/Sidebar/Sidebar';
import Header from '../components/layout/Header/Header';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const progressData = [
    { name: 'Mon', value: 75 },
    { name: 'Tue', value: 85 },
    { name: 'Wed', value: 60 },
    { name: 'Thu', value: 90 },
    { name: 'Fri', value: 70 },
];

const leaderboardData = [
    { rank: 1, name: 'Haeun Park', score: 317, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=haeun' },
    { rank: 2, name: 'Mingu', score: 315, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mingu' },
    { rank: 3, name: 'Seojin', score: 310, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=seojin' },
];

export default function DashboardPage() {
    const user = useAuthStore((state) => state.user);

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 flex flex-col">
                <Header />

                <main className="flex-1 p-6 overflow-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column */}
                        <div className="space-y-6">
                            {/* Profile Card */}
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <div className="flex items-center gap-4 mb-4">
                                    <img
                                        src={user?.profileImage || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
                                        alt="Profile"
                                        className="w-16 h-16 rounded-full border-4 border-green-500"
                                    />
                                    <div>
                                        <h2 className="text-xl font-bold">{user?.name}</h2>
                                        <p className="text-gray-600">{user?.grade}</p>
                                        <span className="inline-block bg-green-500 text-white text-sm px-3 py-1 rounded-full mt-1">
                                            Level {user?.level}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex justify-between text-center border-t pt-4">
                                    <div>
                                        <p className="text-2xl font-bold text-primary-blue">{user?.totalPoints}</p>
                                        <p className="text-sm text-gray-500">Points</p>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-primary-orange">🔥 {user?.streak || 0}</p>
                                        <p className="text-sm text-gray-500">Streak</p>
                                    </div>
                                </div>
                            </div>

                            {/* Leaders Board Preview */}
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                    🏆 Leaders Board
                                </h3>
                                <div className="space-y-3">
                                    {leaderboardData.map((item) => (
                                        <div key={item.rank} className="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
                                            <span className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${item.rank === 1 ? 'bg-yellow-400 text-white' :
                                                    item.rank === 2 ? 'bg-gray-300 text-gray-700' :
                                                        'bg-orange-400 text-white'
                                                }`}>
                                                {item.rank}
                                            </span>
                                            <img src={item.avatar} alt={item.name} className="w-8 h-8 rounded-full" />
                                            <span className="flex-1 font-medium">{item.name}</span>
                                            <span className="font-bold text-green-600">{item.score}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Middle Column - Progress */}
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h3 className="text-lg font-bold mb-4">📊 My Progress</h3>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={progressData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Bar dataKey="value" fill="#6BCF7E" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="grid grid-cols-3 gap-4 mt-4 text-center">
                                <div className="bg-green-50 p-3 rounded-lg">
                                    <p className="text-2xl font-bold text-green-600">30</p>
                                    <p className="text-xs text-gray-600">Words</p>
                                </div>
                                <div className="bg-blue-50 p-3 rounded-lg">
                                    <p className="text-2xl font-bold text-blue-600">5</p>
                                    <p className="text-xs text-gray-600">Quizzes</p>
                                </div>
                                <div className="bg-purple-50 p-3 rounded-lg">
                                    <p className="text-2xl font-bold text-purple-600">3</p>
                                    <p className="text-xs text-gray-600">Lectures</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            {/* Prime Quotes */}
                            <div className="bg-gradient-to-r from-orange-400 to-red-400 rounded-xl shadow-md p-6 text-white">
                                <h3 className="text-lg font-bold mb-3">💡 Today's Quote</h3>
                                <p className="italic">"The only way to do great work is to love what you do."</p>
                                <p className="text-sm mt-2 opacity-80">- Steve Jobs</p>
                            </div>

                            {/* Homework */}
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <h3 className="text-lg font-bold mb-4">📝 Homework</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                                        <input type="checkbox" className="w-5 h-5 accent-green-500" />
                                        <span>Week 1: Vocabulary Quiz</span>
                                    </li>
                                    <li className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                                        <input type="checkbox" className="w-5 h-5 accent-green-500" />
                                        <span>Week 2: Grammar Test</span>
                                    </li>
                                    <li className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg line-through text-gray-400">
                                        <input type="checkbox" className="w-5 h-5 accent-green-500" defaultChecked />
                                        <span>Week 1: Flashcards</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

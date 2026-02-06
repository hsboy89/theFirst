import Sidebar from '../components/layout/Sidebar/Sidebar';
import Header from '../components/layout/Header/Header';
import { useAuthStore } from '../store/authStore';
import { Mail, Phone, School, Award, Calendar, TrendingUp } from 'lucide-react';

export default function ProfilePage() {
    const user = useAuthStore((state) => state.user);

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 flex flex-col">
                <Header />

                <main className="flex-1 p-6">
                    <div className="max-w-4xl mx-auto">
                        {/* Profile Header */}
                        <div className="bg-gradient-to-r from-green-500 to-green-400 rounded-2xl p-8 text-white mb-6">
                            <div className="flex items-center gap-6">
                                <img
                                    src={user?.profileImage || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
                                    alt="Profile"
                                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                                />
                                <div>
                                    <h1 className="text-3xl font-bold">{user?.name}</h1>
                                    <p className="text-lg opacity-90">{user?.grade}</p>
                                    <div className="flex gap-4 mt-4">
                                        <span className="bg-white/20 px-4 py-2 rounded-full">
                                            Level {user?.level}
                                        </span>
                                        <span className="bg-white/20 px-4 py-2 rounded-full">
                                            🔥 {user?.streak || 0} Day Streak
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Profile Info */}
                            <div className="bg-white rounded-2xl shadow-md p-6">
                                <h2 className="text-xl font-bold mb-4">📋 Profile Info</h2>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                        <School className="text-green-500" size={24} />
                                        <div>
                                            <p className="text-sm text-gray-500">School</p>
                                            <p className="font-medium">{user?.school || 'The First Academy'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                        <Mail className="text-blue-500" size={24} />
                                        <div>
                                            <p className="text-sm text-gray-500">Email</p>
                                            <p className="font-medium">{user?.email || 'student@thefirst.com'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                        <Phone className="text-purple-500" size={24} />
                                        <div>
                                            <p className="text-sm text-gray-500">Student ID</p>
                                            <p className="font-medium">{user?.id}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="bg-white rounded-2xl shadow-md p-6">
                                <h2 className="text-xl font-bold mb-4">📊 My Stats</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="text-center p-4 bg-green-50 rounded-xl">
                                        <Award className="mx-auto text-green-500 mb-2" size={32} />
                                        <p className="text-2xl font-bold text-green-600">{user?.totalPoints}</p>
                                        <p className="text-sm text-gray-600">Total Points</p>
                                    </div>
                                    <div className="text-center p-4 bg-blue-50 rounded-xl">
                                        <TrendingUp className="mx-auto text-blue-500 mb-2" size={32} />
                                        <p className="text-2xl font-bold text-blue-600">Top 10%</p>
                                        <p className="text-sm text-gray-600">Ranking</p>
                                    </div>
                                    <div className="text-center p-4 bg-orange-50 rounded-xl">
                                        <Calendar className="mx-auto text-orange-500 mb-2" size={32} />
                                        <p className="text-2xl font-bold text-orange-600">45</p>
                                        <p className="text-sm text-gray-600">Days Active</p>
                                    </div>
                                    <div className="text-center p-4 bg-purple-50 rounded-xl">
                                        <Award className="mx-auto text-purple-500 mb-2" size={32} />
                                        <p className="text-2xl font-bold text-purple-600">12</p>
                                        <p className="text-sm text-gray-600">Badges</p>
                                    </div>
                                </div>
                            </div>

                            {/* Badges */}
                            <div className="bg-white rounded-2xl shadow-md p-6 md:col-span-2">
                                <h2 className="text-xl font-bold mb-4">🏆 My Badges</h2>
                                <div className="flex flex-wrap gap-4">
                                    {['🌟 First Steps', '📚 Bookworm', '🔥 7-Day Streak', '💯 Perfect Score', '🎯 Quiz Master'].map((badge) => (
                                        <span key={badge} className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full font-medium">
                                            {badge}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

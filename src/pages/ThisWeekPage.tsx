import Sidebar from '../components/layout/Sidebar/Sidebar';
import Header from '../components/layout/Header/Header';
import { BookOpen, Layers, HelpCircle, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const weeklyItems = [
    {
        title: 'My Words',
        icon: BookOpen,
        color: 'bg-orange-100',
        iconColor: 'text-orange-500',
        path: '/vocabulary',
        count: '30 words'
    },
    {
        title: 'Flashcards',
        icon: Layers,
        color: 'bg-blue-100',
        iconColor: 'text-blue-500',
        path: '/vocabulary',
        count: '10 sets'
    },
    {
        title: 'Quizzes',
        icon: HelpCircle,
        color: 'bg-green-100',
        iconColor: 'text-green-500',
        path: '/quizzes',
        count: '5 quizzes'
    },
    {
        title: 'Reports',
        icon: BarChart3,
        color: 'bg-purple-100',
        iconColor: 'text-purple-500',
        path: '/reports',
        count: 'View all'
    },
];

export default function ThisWeekPage() {
    const navigate = useNavigate();

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 flex flex-col">
                <Header />

                <main className="flex-1 p-6">
                    <div className="max-w-4xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-gray-800">📅 This Week</h1>
                            <p className="text-gray-600 mt-2">February 3 - February 9, 2026</p>
                        </div>

                        {/* Cards Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {weeklyItems.map((item) => (
                                <div
                                    key={item.title}
                                    onClick={() => navigate(item.path)}
                                    className="bg-white rounded-2xl shadow-md p-6 cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1"
                                >
                                    <div className={`w-16 h-16 ${item.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                                        <item.icon size={32} className={item.iconColor} />
                                    </div>
                                    <h3 className="text-center font-semibold text-gray-800">{item.title}</h3>
                                    <p className="text-center text-sm text-gray-500 mt-1">{item.count}</p>
                                    <button className="w-full mt-4 py-2 bg-orange-500 text-white rounded-full text-sm font-medium hover:bg-orange-600 transition-all">
                                        Go →
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Weekly Progress */}
                        <div className="mt-8 bg-white rounded-2xl shadow-md p-6">
                            <h2 className="text-xl font-bold mb-4">📈 Weekly Progress</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="text-center p-4 bg-green-50 rounded-xl">
                                    <p className="text-3xl font-bold text-green-600">25</p>
                                    <p className="text-sm text-gray-600">Words Learned</p>
                                </div>
                                <div className="text-center p-4 bg-blue-50 rounded-xl">
                                    <p className="text-3xl font-bold text-blue-600">3</p>
                                    <p className="text-sm text-gray-600">Quizzes Passed</p>
                                </div>
                                <div className="text-center p-4 bg-purple-50 rounded-xl">
                                    <p className="text-3xl font-bold text-purple-600">85%</p>
                                    <p className="text-sm text-gray-600">Accuracy</p>
                                </div>
                                <div className="text-center p-4 bg-orange-50 rounded-xl">
                                    <p className="text-3xl font-bold text-orange-600">2h</p>
                                    <p className="text-sm text-gray-600">Study Time</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

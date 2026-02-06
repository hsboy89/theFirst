import Sidebar from '../components/layout/Sidebar/Sidebar';
import Header from '../components/layout/Header/Header';
import { BookOpen, HelpCircle, BarChart3, Play, ChevronRight } from 'lucide-react';

const guides = [
    {
        title: 'Getting Started',
        icon: Play,
        color: 'bg-green-500',
        lessons: [
            'How to Login',
            'Navigating the Dashboard',
            'Setting Up Your Profile',
        ]
    },
    {
        title: 'Vocabulary Learning',
        icon: BookOpen,
        color: 'bg-blue-500',
        lessons: [
            'Using Flashcards',
            'Understanding Word Cards',
            'Tracking Your Progress',
            'TTS Pronunciation Guide',
        ]
    },
    {
        title: 'Quizzes & Tests',
        icon: HelpCircle,
        color: 'bg-orange-500',
        lessons: [
            'Quiz Types',
            'Time Limits',
            'Scoring System',
            'Reviewing Mistakes',
        ]
    },
    {
        title: 'Reports & Analytics',
        icon: BarChart3,
        color: 'bg-purple-500',
        lessons: [
            'Understanding Your Stats',
            'Weekly Reports',
            'Monthly Progress',
        ]
    },
];

export default function GuidePage() {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 flex flex-col">
                <Header />

                <main className="flex-1 p-6">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-3xl font-bold mb-2">📖 Learning Guide</h1>
                        <p className="text-gray-600 mb-8">Everything you need to know about using The First</p>

                        {/* Quick Tips */}
                        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-6 text-white mb-8">
                            <h2 className="text-xl font-bold mb-3">💡 Quick Tips</h2>
                            <ul className="space-y-2">
                                <li>• Study at least 15 minutes every day for best results</li>
                                <li>• Use TTS to hear correct pronunciation</li>
                                <li>• Review words you got wrong immediately</li>
                                <li>• Complete weekly quizzes to earn bonus points</li>
                            </ul>
                        </div>

                        {/* Guide Sections */}
                        <div className="space-y-6">
                            {guides.map((guide, index) => (
                                <div key={index} className="bg-white rounded-2xl shadow-md overflow-hidden">
                                    <div className={`${guide.color} p-4 flex items-center gap-4 text-white`}>
                                        <guide.icon size={32} />
                                        <h2 className="text-xl font-bold">{guide.title}</h2>
                                    </div>
                                    <div className="p-4">
                                        <ul className="space-y-2">
                                            {guide.lessons.map((lesson, i) => (
                                                <li key={i}>
                                                    <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                                        <span className="flex items-center gap-3">
                                                            <span className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium">
                                                                {i + 1}
                                                            </span>
                                                            {lesson}
                                                        </span>
                                                        <ChevronRight size={20} className="text-gray-400" />
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Help Section */}
                        <div className="mt-8 bg-yellow-50 rounded-2xl p-6 text-center">
                            <h3 className="text-xl font-bold mb-2">❓ Need More Help?</h3>
                            <p className="text-gray-600 mb-4">Contact your teacher or visit our FAQ section</p>
                            <button className="bg-yellow-500 text-white px-6 py-2 rounded-full font-medium hover:bg-yellow-600 transition-colors">
                                Contact Support
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

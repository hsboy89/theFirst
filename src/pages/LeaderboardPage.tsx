import Sidebar from '../components/layout/Sidebar/Sidebar';
import Header from '../components/layout/Header/Header';
import { Trophy } from 'lucide-react';

const topThree = [
    { rank: 2, name: 'Mingu', score: 317.25, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mingu' },
    { rank: 1, name: 'Haeun Park', score: 317.60, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=haeun' },
    { rank: 3, name: 'Seojin Kim', score: 317.00, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=seojin' },
];

const rankings = [
    { rank: 4, name: 'Eunji', score: 298, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=eunji' },
    { rank: 5, name: 'Minho', score: 285, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=minho' },
];

export default function LeaderboardPage() {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 flex flex-col">
                <Header />

                <main className="flex-1 p-6">
                    <div className="max-w-4xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-3">
                                <Trophy className="text-yellow-500" size={36} />
                                Leaders Board
                            </h1>
                            <p className="text-gray-600 mt-2">Week 18-25 | Round 4</p>
                        </div>

                        {/* Top 3 Podium */}
                        <div className="flex items-end justify-center gap-4 mb-8">
                            {/* 2nd Place */}
                            <div className="text-center">
                                <div className="bg-gray-300 rounded-t-lg p-4 h-32 flex flex-col justify-end">
                                    <img src={topThree[0].avatar} alt={topThree[0].name} className="w-16 h-16 rounded-full mx-auto border-4 border-gray-400" />
                                </div>
                                <div className="bg-gray-200 p-3">
                                    <span className="text-2xl">🥈</span>
                                    <p className="font-semibold">{topThree[0].name}</p>
                                    <p className="text-green-600 font-bold">{topThree[0].score}</p>
                                </div>
                            </div>

                            {/* 1st Place */}
                            <div className="text-center">
                                <div className="bg-yellow-400 rounded-t-lg p-4 h-40 flex flex-col justify-end">
                                    <Trophy className="text-white mx-auto mb-2" size={32} />
                                    <img src={topThree[1].avatar} alt={topThree[1].name} className="w-20 h-20 rounded-full mx-auto border-4 border-yellow-500" />
                                </div>
                                <div className="bg-yellow-300 p-3">
                                    <span className="text-2xl">🥇</span>
                                    <p className="font-semibold text-lg">{topThree[1].name}</p>
                                    <p className="text-green-600 font-bold text-xl">{topThree[1].score}</p>
                                </div>
                            </div>

                            {/* 3rd Place */}
                            <div className="text-center">
                                <div className="bg-orange-300 rounded-t-lg p-4 h-24 flex flex-col justify-end">
                                    <img src={topThree[2].avatar} alt={topThree[2].name} className="w-14 h-14 rounded-full mx-auto border-4 border-orange-400" />
                                </div>
                                <div className="bg-orange-200 p-3">
                                    <span className="text-2xl">🥉</span>
                                    <p className="font-semibold">{topThree[2].name}</p>
                                    <p className="text-green-600 font-bold">{topThree[2].score}</p>
                                </div>
                            </div>
                        </div>

                        {/* Rankings Table */}
                        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Rank</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Student</th>
                                        <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Score</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rankings.map((student) => (
                                        <tr key={student.rank} className="border-t hover:bg-gray-50">
                                            <td className="px-6 py-4 font-bold text-gray-800">{student.rank}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full" />
                                                    <span className="font-medium">{student.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right font-bold text-green-600">{student.score}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* My Ranking */}
                        <div className="mt-6 bg-gradient-to-r from-green-500 to-green-400 rounded-2xl p-6 text-white">
                            <h3 className="font-bold text-lg mb-2">📍 My Ranking</h3>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <span className="text-4xl font-bold">374</span>
                                    <div>
                                        <p className="font-medium">김학생</p>
                                        <p className="text-sm opacity-80">중학교 2학년</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl font-bold">1,250</p>
                                    <p className="text-sm opacity-80">Total Points</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

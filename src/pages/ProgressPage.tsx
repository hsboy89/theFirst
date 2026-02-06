import Sidebar from '../components/layout/Sidebar/Sidebar';
import Header from '../components/layout/Header/Header';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const weeklyData = [
    { name: 'Mon', words: 15, quizzes: 2 },
    { name: 'Tue', words: 20, quizzes: 3 },
    { name: 'Wed', words: 12, quizzes: 1 },
    { name: 'Thu', words: 25, quizzes: 4 },
    { name: 'Fri', words: 18, quizzes: 2 },
    { name: 'Sat', words: 30, quizzes: 5 },
    { name: 'Sun', words: 22, quizzes: 3 },
];

const monthlyData = [
    { name: 'Week 1', score: 75 },
    { name: 'Week 2', score: 82 },
    { name: 'Week 3', score: 78 },
    { name: 'Week 4', score: 90 },
];

const subjectData = [
    { name: 'Vocabulary', value: 40 },
    { name: 'Grammar', value: 25 },
    { name: 'Listening', value: 20 },
    { name: 'Reading', value: 15 },
];

const COLORS = ['#6BCF7E', '#4A90E2', '#FF8C42', '#9B59B6'];

export default function ProgressPage() {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 flex flex-col">
                <Header />

                <main className="flex-1 p-6">
                    <div className="max-w-6xl mx-auto">
                        <h1 className="text-3xl font-bold mb-6">📈 My Progress</h1>

                        {/* Stats Overview */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <div className="bg-white rounded-xl p-6 shadow-md text-center">
                                <p className="text-4xl font-bold text-green-600">142</p>
                                <p className="text-gray-600">Words Learned</p>
                            </div>
                            <div className="bg-white rounded-xl p-6 shadow-md text-center">
                                <p className="text-4xl font-bold text-blue-600">28</p>
                                <p className="text-gray-600">Quizzes Passed</p>
                            </div>
                            <div className="bg-white rounded-xl p-6 shadow-md text-center">
                                <p className="text-4xl font-bold text-orange-600">87%</p>
                                <p className="text-gray-600">Accuracy</p>
                            </div>
                            <div className="bg-white rounded-xl p-6 shadow-md text-center">
                                <p className="text-4xl font-bold text-purple-600">15h</p>
                                <p className="text-gray-600">Study Time</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Weekly Progress */}
                            <div className="bg-white rounded-2xl shadow-md p-6">
                                <h2 className="text-xl font-bold mb-4">📅 Weekly Activity</h2>
                                <div className="h-64">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={weeklyData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Bar dataKey="words" fill="#6BCF7E" name="Words" radius={[4, 4, 0, 0]} />
                                            <Bar dataKey="quizzes" fill="#4A90E2" name="Quizzes" radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Monthly Trend */}
                            <div className="bg-white rounded-2xl shadow-md p-6">
                                <h2 className="text-xl font-bold mb-4">📊 Monthly Trend</h2>
                                <div className="h-64">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={monthlyData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Line type="monotone" dataKey="score" stroke="#FF8C42" strokeWidth={3} dot={{ r: 6 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Subject Distribution */}
                            <div className="bg-white rounded-2xl shadow-md p-6">
                                <h2 className="text-xl font-bold mb-4">📚 Subject Distribution</h2>
                                <div className="h-64 flex items-center justify-center">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={subjectData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={80}
                                                paddingAngle={5}
                                                dataKey="value"
                                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                            >
                                                {subjectData.map((_, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Recent Achievements */}
                            <div className="bg-white rounded-2xl shadow-md p-6">
                                <h2 className="text-xl font-bold mb-4">🏆 Recent Achievements</h2>
                                <div className="space-y-3">
                                    {[
                                        { title: 'Completed 100 words!', date: '오늘', icon: '🎉' },
                                        { title: 'Perfect Quiz Score', date: '어제', icon: '💯' },
                                        { title: '7-Day Streak!', date: '3일 전', icon: '🔥' },
                                        { title: 'Vocabulary Master Lv.5', date: '1주 전', icon: '⭐' },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                            <span className="text-2xl">{item.icon}</span>
                                            <div className="flex-1">
                                                <p className="font-medium">{item.title}</p>
                                                <p className="text-sm text-gray-500">{item.date}</p>
                                            </div>
                                        </div>
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

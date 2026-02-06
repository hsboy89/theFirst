import { useState } from 'react';
import { useNavigate, NavLink, Routes, Route } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import {
    LayoutDashboard,
    BookOpen,
    Users,
    BarChart3,
    Bell,
    Settings,
    LogOut,
    Plus,
    Search,
    Edit,
    Trash2,
    Eye
} from 'lucide-react';

// Admin Sidebar
function AdminSidebar() {
    const navigate = useNavigate();
    const logout = useAuthStore((state) => state.logout);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
        { icon: BookOpen, label: 'Vocabulary', path: '/admin/vocabulary' },
        { icon: Users, label: 'Students', path: '/admin/students' },
        { icon: BarChart3, label: 'Statistics', path: '/admin/statistics' },
        { icon: Bell, label: 'Announcements', path: '/admin/announcements' },
        { icon: Settings, label: 'Settings', path: '/admin/settings' },
    ];

    return (
        <aside className="w-64 bg-gray-900 min-h-screen p-4 flex flex-col">
            <div className="text-white text-center py-4 mb-6">
                <h1 className="text-2xl font-bold">The First</h1>
                <span className="text-xs bg-blue-500 px-2 py-1 rounded-full">ADMIN</span>
            </div>

            <nav className="flex-1">
                <ul className="space-y-2">
                    {menuItems.map((item) => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                end={item.path === '/admin'}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
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

            <div className="border-t border-gray-700 pt-4 mt-4">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-gray-800 rounded-lg transition-all"
                >
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
}

// Dashboard Overview
function DashboardOverview() {
    const stats = [
        { label: 'Total Students', value: '156', change: '+12%', color: 'bg-blue-500' },
        { label: 'Active Today', value: '89', change: '+5%', color: 'bg-green-500' },
        { label: 'Total Words', value: '1,250', change: '+8%', color: 'bg-purple-500' },
        { label: 'Quizzes Completed', value: '432', change: '+15%', color: 'bg-orange-500' },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white rounded-xl shadow-md p-6">
                        <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
                            <LayoutDashboard className="text-white" size={24} />
                        </div>
                        <p className="text-3xl font-bold">{stat.value}</p>
                        <p className="text-gray-500">{stat.label}</p>
                        <p className="text-green-500 text-sm mt-2">{stat.change} this week</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
                    <div className="space-y-4">
                        {[
                            { text: '김학생 completed Word Match quiz', time: '5분 전' },
                            { text: '박학생 reached Level 6', time: '15분 전' },
                            { text: '이학생 memorized 10 new words', time: '1시간 전' },
                            { text: 'New student 최학생 registered', time: '2시간 전' },
                        ].map((activity, i) => (
                            <div key={i} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <div className="flex-1">
                                    <p className="text-sm">{activity.text}</p>
                                    <p className="text-xs text-gray-500">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-xl font-bold mb-4">Top Performers</h2>
                    <div className="space-y-3">
                        {[
                            { name: 'Haeun Park', score: 1250, rank: 1 },
                            { name: 'Mingu Kim', score: 1180, rank: 2 },
                            { name: 'Seojin Lee', score: 1050, rank: 3 },
                        ].map((student) => (
                            <div key={student.rank} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${student.rank === 1 ? 'bg-yellow-500' : student.rank === 2 ? 'bg-gray-400' : 'bg-orange-400'
                                    }`}>
                                    {student.rank}
                                </span>
                                <div className="flex-1">
                                    <p className="font-medium">{student.name}</p>
                                </div>
                                <p className="font-bold text-green-600">{student.score} pts</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Vocabulary Management
function VocabularyManagement() {
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);

    const words = [
        { id: 1, word: 'apple', meaning: '사과', difficulty: 'easy' },
        { id: 2, word: 'beautiful', meaning: '아름다운', difficulty: 'medium' },
        { id: 3, word: 'sophisticated', meaning: '세련된', difficulty: 'hard' },
        { id: 4, word: 'banana', meaning: '바나나', difficulty: 'easy' },
        { id: 5, word: 'computer', meaning: '컴퓨터', difficulty: 'medium' },
    ];

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Vocabulary Management</h1>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600"
                >
                    <Plus size={20} /> Add Word
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center gap-4 mb-6">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search words..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <select className="px-4 py-2 border border-gray-200 rounded-lg">
                        <option>All Difficulty</option>
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                    </select>
                </div>

                <table className="w-full">
                    <thead>
                        <tr className="border-b">
                            <th className="text-left py-3 px-4">Word</th>
                            <th className="text-left py-3 px-4">Meaning</th>
                            <th className="text-left py-3 px-4">Difficulty</th>
                            <th className="text-left py-3 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {words.filter(w => w.word.includes(searchTerm) || w.meaning.includes(searchTerm)).map((word) => (
                            <tr key={word.id} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-4 font-medium">{word.word}</td>
                                <td className="py-3 px-4">{word.meaning}</td>
                                <td className="py-3 px-4">
                                    <span className={`px-2 py-1 rounded-full text-xs ${word.difficulty === 'easy' ? 'bg-green-100 text-green-600' :
                                            word.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                                                'bg-red-100 text-red-600'
                                        }`}>
                                        {word.difficulty}
                                    </span>
                                </td>
                                <td className="py-3 px-4">
                                    <div className="flex items-center gap-2">
                                        <button className="p-2 text-blue-500 hover:bg-blue-50 rounded">
                                            <Edit size={18} />
                                        </button>
                                        <button className="p-2 text-red-500 hover:bg-red-50 rounded">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Add New Word</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Word</label>
                                <input type="text" className="w-full px-4 py-2 border rounded-lg" placeholder="Enter word" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Korean Meaning</label>
                                <input type="text" className="w-full px-4 py-2 border rounded-lg" placeholder="뜻 입력" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Definition</label>
                                <textarea className="w-full px-4 py-2 border rounded-lg" placeholder="Definition in English" rows={2}></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Difficulty</label>
                                <select className="w-full px-4 py-2 border rounded-lg">
                                    <option>Easy</option>
                                    <option>Medium</option>
                                    <option>Hard</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setShowAddModal(false)} className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50">
                                Cancel
                            </button>
                            <button className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                                Add Word
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// Student Management
function StudentManagement() {
    const students = [
        { id: 1, name: '김학생', grade: '중학교 2학년', level: 5, points: 1250, status: 'active' },
        { id: 2, name: '박학생', grade: '중학교 1학년', level: 4, points: 980, status: 'active' },
        { id: 3, name: '이학생', grade: '중학교 3학년', level: 6, points: 1450, status: 'inactive' },
        { id: 4, name: '최학생', grade: '초등학교 6학년', level: 3, points: 650, status: 'active' },
    ];

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Student Management</h1>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600">
                    <Plus size={20} /> Add Student
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center gap-4 mb-6">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search students..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <select className="px-4 py-2 border border-gray-200 rounded-lg">
                        <option>All Status</option>
                        <option>Active</option>
                        <option>Inactive</option>
                    </select>
                </div>

                <table className="w-full">
                    <thead>
                        <tr className="border-b">
                            <th className="text-left py-3 px-4">Student</th>
                            <th className="text-left py-3 px-4">Grade</th>
                            <th className="text-left py-3 px-4">Level</th>
                            <th className="text-left py-3 px-4">Points</th>
                            <th className="text-left py-3 px-4">Status</th>
                            <th className="text-left py-3 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student.id} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                            {student.name[0]}
                                        </div>
                                        <span className="font-medium">{student.name}</span>
                                    </div>
                                </td>
                                <td className="py-3 px-4">{student.grade}</td>
                                <td className="py-3 px-4">
                                    <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-sm">
                                        Lv.{student.level}
                                    </span>
                                </td>
                                <td className="py-3 px-4 font-bold text-green-600">{student.points}</td>
                                <td className="py-3 px-4">
                                    <span className={`px-2 py-1 rounded-full text-xs ${student.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                                        }`}>
                                        {student.status}
                                    </span>
                                </td>
                                <td className="py-3 px-4">
                                    <div className="flex items-center gap-2">
                                        <button className="p-2 text-blue-500 hover:bg-blue-50 rounded">
                                            <Eye size={18} />
                                        </button>
                                        <button className="p-2 text-gray-500 hover:bg-gray-50 rounded">
                                            <Edit size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// Statistics Page
function StatisticsPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Statistics</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-xl font-bold mb-4">Weekly Active Users</h2>
                    <div className="flex items-end justify-between gap-2 h-48">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
                            const heights = [60, 80, 75, 90, 85, 100, 70];
                            return (
                                <div key={day} className="flex-1 flex flex-col items-center gap-2">
                                    <div
                                        className="w-full bg-blue-500 rounded-t-lg"
                                        style={{ height: `${heights[i]}%` }}
                                    />
                                    <span className="text-xs text-gray-500">{day}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-xl font-bold mb-4">Quiz Completion Rate</h2>
                    <div className="flex items-center justify-center h-48">
                        <div className="relative w-40 h-40">
                            <svg className="w-full h-full" viewBox="0 0 36 36">
                                <path
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke="#e5e7eb"
                                    strokeWidth="3"
                                />
                                <path
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke="#3b82f6"
                                    strokeWidth="3"
                                    strokeDasharray="78, 100"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-3xl font-bold">78%</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 lg:col-span-2">
                    <h2 className="text-xl font-bold mb-4">Learning Progress by Level</h2>
                    <div className="space-y-4">
                        {[
                            { level: 'Level 1-2', students: 45, progress: 85 },
                            { level: 'Level 3-4', students: 62, progress: 72 },
                            { level: 'Level 5-6', students: 31, progress: 68 },
                            { level: 'Level 7+', students: 18, progress: 55 },
                        ].map((item) => (
                            <div key={item.level}>
                                <div className="flex justify-between mb-1">
                                    <span className="font-medium">{item.level}</span>
                                    <span className="text-sm text-gray-500">{item.students} students</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div
                                        className="bg-blue-500 h-3 rounded-full"
                                        style={{ width: `${item.progress}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Announcements Page
function AnnouncementsPage() {
    const [showAddModal, setShowAddModal] = useState(false);

    const announcements = [
        { id: 1, title: '2월 월간 테스트 안내', date: '2026-02-05', pinned: true },
        { id: 2, title: '설날 휴강 안내', date: '2026-02-04', pinned: true },
        { id: 3, title: '이번 주 숙제', date: '2026-02-03', pinned: false },
        { id: 4, title: '1월 우수학생 발표', date: '2026-02-01', pinned: false },
    ];

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Announcements</h1>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600"
                >
                    <Plus size={20} /> New Announcement
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
                <table className="w-full">
                    <thead>
                        <tr className="border-b">
                            <th className="text-left py-3 px-4">Title</th>
                            <th className="text-left py-3 px-4">Date</th>
                            <th className="text-left py-3 px-4">Status</th>
                            <th className="text-left py-3 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {announcements.map((item) => (
                            <tr key={item.id} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-4 font-medium">{item.title}</td>
                                <td className="py-3 px-4 text-gray-500">{item.date}</td>
                                <td className="py-3 px-4">
                                    {item.pinned && (
                                        <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs">
                                            Pinned
                                        </span>
                                    )}
                                </td>
                                <td className="py-3 px-4">
                                    <div className="flex items-center gap-2">
                                        <button className="p-2 text-blue-500 hover:bg-blue-50 rounded">
                                            <Edit size={18} />
                                        </button>
                                        <button className="p-2 text-red-500 hover:bg-red-50 rounded">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-lg">
                        <h2 className="text-xl font-bold mb-4">New Announcement</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Title</label>
                                <input type="text" className="w-full px-4 py-2 border rounded-lg" placeholder="공지 제목" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Content</label>
                                <textarea className="w-full px-4 py-2 border rounded-lg" placeholder="공지 내용" rows={5}></textarea>
                            </div>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="w-4 h-4" />
                                <span>Pin this announcement</span>
                            </label>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setShowAddModal(false)} className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50">
                                Cancel
                            </button>
                            <button className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                                Publish
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// Settings Page
function SettingsPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Settings</h1>

            <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-lg font-bold mb-4">General Settings</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Academy Name</label>
                            <input type="text" className="w-full px-4 py-2 border rounded-lg" defaultValue="The First Academy" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Issue Code</label>
                            <input type="text" className="w-full px-4 py-2 border rounded-lg" defaultValue="FIRST2026" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-lg font-bold mb-4">Learning Settings</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Daily Word Goal</label>
                            <input type="number" className="w-full px-4 py-2 border rounded-lg" defaultValue={5} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Quiz Questions per Session</label>
                            <input type="number" className="w-full px-4 py-2 border rounded-lg" defaultValue={10} />
                        </div>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" className="w-4 h-4" defaultChecked />
                            <span>Enable TTS (Text-to-Speech)</span>
                        </label>
                    </div>
                </div>

                <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
                    Save Settings
                </button>
            </div>
        </div>
    );
}

// Main Admin Page
export default function AdminPage() {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <AdminSidebar />

            <div className="flex-1 p-8">
                <Routes>
                    <Route index element={<DashboardOverview />} />
                    <Route path="vocabulary" element={<VocabularyManagement />} />
                    <Route path="students" element={<StudentManagement />} />
                    <Route path="statistics" element={<StatisticsPage />} />
                    <Route path="announcements" element={<AnnouncementsPage />} />
                    <Route path="settings" element={<SettingsPage />} />
                </Routes>
            </div>
        </div>
    );
}

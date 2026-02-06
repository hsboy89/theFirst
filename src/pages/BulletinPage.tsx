import Sidebar from '../components/layout/Sidebar/Sidebar';
import Header from '../components/layout/Header/Header';
import { Bell, Pin, MessageCircle, Calendar } from 'lucide-react';

const announcements = [
    {
        id: 1,
        title: '2월 월간 테스트 안내',
        content: '2월 20일 월간 테스트가 예정되어 있습니다. 범위는 Unit 1-4입니다.',
        date: '2026-02-05',
        isPinned: true,
        type: 'notice',
    },
    {
        id: 2,
        title: '설날 휴강 안내',
        content: '2월 8일~9일은 설날 연휴로 수업이 없습니다.',
        date: '2026-02-04',
        isPinned: true,
        type: 'notice',
    },
    {
        id: 3,
        title: '이번 주 숙제',
        content: 'Vocabulary Unit 3 복습 및 Quiz 완료하기. 마감: 2월 10일',
        date: '2026-02-03',
        isPinned: false,
        type: 'homework',
    },
    {
        id: 4,
        title: '🎉 1월 우수학생 발표',
        content: '1월 우수학생으로 선정된 학생들을 축하합니다! 김민수, 이예은, 박지훈',
        date: '2026-02-01',
        isPinned: false,
        type: 'announcement',
    },
    {
        id: 5,
        title: '새 기능 업데이트',
        content: 'Flashcard에 TTS 기능이 추가되었습니다. 발음 버튼을 눌러 원어민 발음을 들어보세요!',
        date: '2026-01-30',
        isPinned: false,
        type: 'update',
    },
];

export default function BulletinPage() {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 flex flex-col">
                <Header />

                <main className="flex-1 p-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-3xl font-bold">📢 Bulletin Board</h1>
                            <div className="flex gap-2">
                                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                                    2 New
                                </span>
                            </div>
                        </div>

                        {/* Pinned Notices */}
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                <Pin size={18} className="text-red-500" />
                                Pinned Notices
                            </h2>
                            <div className="space-y-3">
                                {announcements.filter(a => a.isPinned).map((item) => (
                                    <div key={item.id} className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="font-bold text-lg">{item.title}</h3>
                                                <p className="text-gray-600 mt-1">{item.content}</p>
                                            </div>
                                            <span className="text-sm text-gray-500 whitespace-nowrap">{item.date}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* All Announcements */}
                        <div>
                            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                <Bell size={18} />
                                All Announcements
                            </h2>
                            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                                {announcements.filter(a => !a.isPinned).map((item, index) => (
                                    <div
                                        key={item.id}
                                        className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${index !== announcements.filter(a => !a.isPinned).length - 1 ? 'border-b' : ''
                                            }`}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className={`p-2 rounded-lg ${item.type === 'homework' ? 'bg-blue-100' :
                                                    item.type === 'announcement' ? 'bg-yellow-100' :
                                                        'bg-green-100'
                                                }`}>
                                                {item.type === 'homework' ? <Calendar size={20} className="text-blue-600" /> :
                                                    item.type === 'announcement' ? <MessageCircle size={20} className="text-yellow-600" /> :
                                                        <Bell size={20} className="text-green-600" />}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="font-semibold">{item.title}</h3>
                                                    <span className="text-sm text-gray-500">{item.date}</span>
                                                </div>
                                                <p className="text-gray-600 text-sm mt-1">{item.content}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

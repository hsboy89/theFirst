import { useState } from 'react';
import { ChevronLeft, ChevronRight, Volume2, Check, BookOpen, HelpCircle, BarChart3, Layers } from 'lucide-react';
import Sidebar from '../components/layout/Sidebar/Sidebar';
import Header from '../components/layout/Header/Header';
import { useVocabStore } from '../store/vocabStore';

type TabType = 'flashcards' | 'mywords' | 'quizzes' | 'reports';

export default function VocabularyPage() {
    const { vocabularies, currentIndex, memorizedWords, markAsMemorized, unmarkMemorized, nextWord, prevWord } = useVocabStore();
    const [activeTab, setActiveTab] = useState<TabType>('flashcards');
    const [showMeaning, setShowMeaning] = useState(false);

    const currentWord = vocabularies[currentIndex];
    const isMemorized = memorizedWords.includes(currentWord?.id);

    const speak = (text: string) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        speechSynthesis.speak(utterance);
    };

    const tabs = [
        { id: 'flashcards', label: 'Flashcards', icon: Layers },
        { id: 'mywords', label: 'My Words', icon: BookOpen },
        { id: 'quizzes', label: 'Quizzes', icon: HelpCircle },
        { id: 'reports', label: 'Reports', icon: BarChart3 },
    ];

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 flex flex-col">
                <Header />

                <main className="flex-1 p-6">
                    {/* Tab Navigation */}
                    <div className="flex gap-2 mb-6">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as TabType)}
                                className={`px-6 py-2 rounded-full font-medium flex items-center gap-2 transition-all ${activeTab === tab.id
                                        ? 'bg-orange-500 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                            >
                                <tab.icon size={18} />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Flashcards Tab */}
                    {activeTab === 'flashcards' && (
                        <div className="max-w-2xl mx-auto">
                            <div
                                className="bg-white rounded-2xl shadow-lg p-8 cursor-pointer transition-transform hover:scale-[1.02]"
                                onClick={() => setShowMeaning(!showMeaning)}
                            >
                                <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden mb-6">
                                    <img
                                        src={currentWord?.imageUrl}
                                        alt={currentWord?.word}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="text-center">
                                    <h1 className="text-4xl font-bold mb-2">{currentWord?.word}</h1>
                                    <p className="text-gray-500 text-lg mb-4">{currentWord?.pronunciation}</p>

                                    {showMeaning && (
                                        <div className="mt-4 p-4 bg-blue-50 rounded-lg text-left">
                                            <p className="text-gray-700"><strong>Definition:</strong> {currentWord?.definition}</p>
                                            <p className="text-gray-700 mt-2"><strong>뜻:</strong> {currentWord?.koreanMeaning}</p>
                                            {currentWord?.exampleSentence && (
                                                <p className="text-gray-600 mt-2 italic">"{currentWord.exampleSentence}"</p>
                                            )}
                                        </div>
                                    )}

                                    <p className="text-sm text-gray-400 mt-4">
                                        (카드를 클릭하면 뜻이 표시됩니다)
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-6">
                                <button
                                    onClick={prevWord}
                                    disabled={currentIndex === 0}
                                    className="p-3 bg-white rounded-full shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronLeft size={24} />
                                </button>

                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => speak(currentWord?.word)}
                                        className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                                    >
                                        <Volume2 size={24} />
                                    </button>

                                    <button
                                        onClick={() => isMemorized ? unmarkMemorized(currentWord?.id) : markAsMemorized(currentWord?.id)}
                                        className={`px-6 py-3 rounded-full font-medium flex items-center gap-2 ${isMemorized
                                                ? 'bg-green-500 text-white'
                                                : 'bg-gray-200 text-gray-700 hover:bg-green-100'
                                            }`}
                                    >
                                        <Check size={20} />
                                        {isMemorized ? 'Memorized!' : 'Mark as Memorized'}
                                    </button>
                                </div>

                                <button
                                    onClick={nextWord}
                                    disabled={currentIndex === vocabularies.length - 1}
                                    className="p-3 bg-white rounded-full shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronRight size={24} />
                                </button>
                            </div>

                            <div className="text-center mt-6">
                                <span className="text-gray-500">
                                    {currentIndex + 1} / {vocabularies.length}
                                </span>
                                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                    <div
                                        className="bg-orange-500 h-2 rounded-full transition-all"
                                        style={{ width: `${((currentIndex + 1) / vocabularies.length) * 100}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* My Words Tab */}
                    {activeTab === 'mywords' && (
                        <div className="max-w-4xl mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {vocabularies.map((word) => {
                                    const isWordMemorized = memorizedWords.includes(word.id);
                                    return (
                                        <div
                                            key={word.id}
                                            className={`bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all cursor-pointer ${isWordMemorized ? 'border-2 border-green-500' : ''
                                                }`}
                                            onClick={() => speak(word.word)}
                                        >
                                            <div className="flex items-start justify-between mb-2">
                                                <div>
                                                    <h3 className="text-xl font-bold">{word.word}</h3>
                                                    <p className="text-sm text-gray-500">{word.pronunciation}</p>
                                                </div>
                                                {isWordMemorized && (
                                                    <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
                                                        ✓ 암기완료
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-gray-700 mb-2">{word.koreanMeaning}</p>
                                            <p className="text-sm text-gray-500">{word.definition}</p>
                                            <div className="mt-3 flex items-center justify-between">
                                                <span className={`text-xs px-2 py-1 rounded-full ${word.difficulty === 'easy' ? 'bg-green-100 text-green-600' :
                                                        word.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                                                            'bg-red-100 text-red-600'
                                                    }`}>
                                                    {word.difficulty}
                                                </span>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); speak(word.word); }}
                                                    className="p-2 text-blue-500 hover:bg-blue-50 rounded-full"
                                                >
                                                    <Volume2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="mt-6 p-4 bg-white rounded-xl shadow-md">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-lg font-semibold">Total Words: {vocabularies.length}</p>
                                        <p className="text-gray-500">Memorized: {memorizedWords.length} / {vocabularies.length}</p>
                                    </div>
                                    <div className="w-32 h-32">
                                        <div className="relative w-full h-full">
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
                                                    stroke="#6BCF7E"
                                                    strokeWidth="3"
                                                    strokeDasharray={`${(memorizedWords.length / vocabularies.length) * 100}, 100`}
                                                />
                                            </svg>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <span className="text-2xl font-bold text-green-600">
                                                    {Math.round((memorizedWords.length / vocabularies.length) * 100)}%
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Quizzes Tab */}
                    {activeTab === 'quizzes' && (
                        <div className="max-w-4xl mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Quiz Categories */}
                                <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all cursor-pointer">
                                    <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                                        <span className="text-3xl">📝</span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Word Match</h3>
                                    <p className="text-gray-600 mb-4">영어 단어와 뜻을 매칭하세요</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">10 questions</span>
                                        <button className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-600">
                                            Start →
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all cursor-pointer">
                                    <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                                        <span className="text-3xl">✍️</span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Spelling Quiz</h3>
                                    <p className="text-gray-600 mb-4">단어의 철자를 맞춰보세요</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">10 questions</span>
                                        <button className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-green-600">
                                            Start →
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all cursor-pointer">
                                    <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                                        <span className="text-3xl">🎧</span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Listening Quiz</h3>
                                    <p className="text-gray-600 mb-4">발음을 듣고 단어를 맞춰보세요</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">10 questions</span>
                                        <button className="bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-600">
                                            Start →
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all cursor-pointer">
                                    <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                                        <span className="text-3xl">🏆</span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Challenge Mode</h3>
                                    <p className="text-gray-600 mb-4">시간 제한 내에 풀어보세요!</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">20 questions</span>
                                        <button className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-orange-600">
                                            Start →
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Quiz Results */}
                            <div className="mt-8 bg-white rounded-2xl shadow-md p-6">
                                <h3 className="text-xl font-bold mb-4">📊 Recent Quiz Results</h3>
                                <div className="space-y-3">
                                    {[
                                        { name: 'Word Match', score: 90, date: '오늘', icon: '📝' },
                                        { name: 'Spelling Quiz', score: 85, date: '어제', icon: '✍️' },
                                        { name: 'Listening Quiz', score: 75, date: '2일 전', icon: '🎧' },
                                    ].map((quiz, i) => (
                                        <div key={i} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                                            <span className="text-2xl">{quiz.icon}</span>
                                            <div className="flex-1">
                                                <p className="font-medium">{quiz.name}</p>
                                                <p className="text-sm text-gray-500">{quiz.date}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className={`text-xl font-bold ${quiz.score >= 80 ? 'text-green-600' : 'text-orange-600'}`}>
                                                    {quiz.score}%
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Reports Tab */}
                    {activeTab === 'reports' && (
                        <div className="max-w-4xl mx-auto">
                            {/* Summary Cards */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                <div className="bg-white rounded-xl p-6 shadow-md text-center">
                                    <p className="text-4xl font-bold text-green-600">{memorizedWords.length}</p>
                                    <p className="text-gray-600 text-sm">암기 완료</p>
                                </div>
                                <div className="bg-white rounded-xl p-6 shadow-md text-center">
                                    <p className="text-4xl font-bold text-blue-600">{vocabularies.length - memorizedWords.length}</p>
                                    <p className="text-gray-600 text-sm">학습 중</p>
                                </div>
                                <div className="bg-white rounded-xl p-6 shadow-md text-center">
                                    <p className="text-4xl font-bold text-orange-600">85%</p>
                                    <p className="text-gray-600 text-sm">평균 점수</p>
                                </div>
                                <div className="bg-white rounded-xl p-6 shadow-md text-center">
                                    <p className="text-4xl font-bold text-purple-600">12</p>
                                    <p className="text-gray-600 text-sm">완료한 퀴즈</p>
                                </div>
                            </div>

                            {/* Weekly Study Chart */}
                            <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
                                <h3 className="text-xl font-bold mb-4">📈 주간 학습 현황</h3>
                                <div className="flex items-end justify-between gap-2 h-40">
                                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
                                        const heights = [60, 80, 45, 90, 70, 100, 55];
                                        return (
                                            <div key={day} className="flex-1 flex flex-col items-center gap-2">
                                                <div
                                                    className="w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg transition-all"
                                                    style={{ height: `${heights[i]}%` }}
                                                />
                                                <span className="text-xs text-gray-500">{day}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Difficulty Distribution */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white rounded-2xl shadow-md p-6">
                                    <h3 className="text-xl font-bold mb-4">📚 난이도별 학습 현황</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex justify-between mb-1">
                                                <span className="text-sm font-medium">Easy</span>
                                                <span className="text-sm text-gray-500">
                                                    {vocabularies.filter(v => v.difficulty === 'easy').length} 단어
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-3">
                                                <div className="bg-green-500 h-3 rounded-full" style={{ width: '70%' }}></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between mb-1">
                                                <span className="text-sm font-medium">Medium</span>
                                                <span className="text-sm text-gray-500">
                                                    {vocabularies.filter(v => v.difficulty === 'medium').length} 단어
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-3">
                                                <div className="bg-yellow-500 h-3 rounded-full" style={{ width: '50%' }}></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between mb-1">
                                                <span className="text-sm font-medium">Hard</span>
                                                <span className="text-sm text-gray-500">
                                                    {vocabularies.filter(v => v.difficulty === 'hard').length} 단어
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-3">
                                                <div className="bg-red-500 h-3 rounded-full" style={{ width: '30%' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-2xl shadow-md p-6">
                                    <h3 className="text-xl font-bold mb-4">🎯 학습 목표</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4 p-3 bg-green-50 rounded-lg">
                                            <span className="text-2xl">✅</span>
                                            <div className="flex-1">
                                                <p className="font-medium">일일 목표</p>
                                                <p className="text-sm text-gray-500">5단어 암기</p>
                                            </div>
                                            <span className="text-green-600 font-bold">완료!</span>
                                        </div>
                                        <div className="flex items-center gap-4 p-3 bg-yellow-50 rounded-lg">
                                            <span className="text-2xl">⏳</span>
                                            <div className="flex-1">
                                                <p className="font-medium">주간 목표</p>
                                                <p className="text-sm text-gray-500">퀴즈 3개 완료</p>
                                            </div>
                                            <span className="text-yellow-600 font-bold">2/3</span>
                                        </div>
                                        <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg">
                                            <span className="text-2xl">🎯</span>
                                            <div className="flex-1">
                                                <p className="font-medium">월간 목표</p>
                                                <p className="text-sm text-gray-500">100단어 마스터</p>
                                            </div>
                                            <span className="text-blue-600 font-bold">{memorizedWords.length}/100</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

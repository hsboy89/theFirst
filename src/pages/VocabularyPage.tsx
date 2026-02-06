import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Volume2, Check, BookOpen, HelpCircle, BarChart3, Layers, X, RotateCcw } from 'lucide-react';
import Sidebar from '../components/layout/Sidebar/Sidebar';
import Header from '../components/layout/Header/Header';
import { useVocabStore } from '../store/vocabStore';

type TabType = 'flashcards' | 'mywords' | 'quizzes' | 'reports';
type QuizType = 'wordmatch' | 'spelling' | 'listening' | 'challenge' | null;

export default function VocabularyPage() {
    const { vocabularies, currentIndex, memorizedWords, markAsMemorized, unmarkMemorized, nextWord, prevWord } = useVocabStore();
    const [activeTab, setActiveTab] = useState<TabType>('flashcards');
    const [showMeaning, setShowMeaning] = useState(false);
    const [activeQuiz, setActiveQuiz] = useState<QuizType>(null);
    const [quizState, setQuizState] = useState({
        currentQuestion: 0,
        score: 0,
        answers: [] as boolean[],
        selectedAnswer: null as number | null,
        userInput: '',
        showResult: false,
        timeLeft: 0,
    });

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

    // Quiz logic
    const shuffleArray = <T,>(array: T[]): T[] => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    const [quizWords, setQuizWords] = useState(vocabularies);

    const startQuiz = (type: QuizType) => {
        setActiveQuiz(type);
        setQuizWords(shuffleArray(vocabularies).slice(0, Math.min(10, vocabularies.length)));
        setQuizState({
            currentQuestion: 0,
            score: 0,
            answers: [],
            selectedAnswer: null,
            userInput: '',
            showResult: false,
            timeLeft: type === 'challenge' ? 60 : 0,
        });
    };

    const getWrongOptions = (correctWord: typeof vocabularies[0]) => {
        const others = vocabularies.filter(v => v.id !== correctWord.id);
        return shuffleArray(others).slice(0, 3);
    };

    const handleWordMatchAnswer = (selectedIndex: number) => {
        const currentQuizWord = quizWords[quizState.currentQuestion];
        const options = [currentQuizWord, ...getWrongOptions(currentQuizWord)];
        const shuffledOptions = shuffleArray(options);
        const correctIndex = shuffledOptions.findIndex(o => o.id === currentQuizWord.id);
        const isCorrect = selectedIndex === correctIndex;

        setQuizState(prev => ({
            ...prev,
            selectedAnswer: selectedIndex,
            score: isCorrect ? prev.score + 1 : prev.score,
            answers: [...prev.answers, isCorrect],
        }));

        setTimeout(() => {
            if (quizState.currentQuestion < quizWords.length - 1) {
                setQuizState(prev => ({
                    ...prev,
                    currentQuestion: prev.currentQuestion + 1,
                    selectedAnswer: null,
                }));
            } else {
                setQuizState(prev => ({ ...prev, showResult: true }));
            }
        }, 1000);
    };

    const handleSpellingSubmit = () => {
        const currentQuizWord = quizWords[quizState.currentQuestion];
        const isCorrect = quizState.userInput.toLowerCase().trim() === currentQuizWord.word.toLowerCase();

        setQuizState(prev => ({
            ...prev,
            score: isCorrect ? prev.score + 1 : prev.score,
            answers: [...prev.answers, isCorrect],
        }));

        setTimeout(() => {
            if (quizState.currentQuestion < quizWords.length - 1) {
                setQuizState(prev => ({
                    ...prev,
                    currentQuestion: prev.currentQuestion + 1,
                    userInput: '',
                }));
            } else {
                setQuizState(prev => ({ ...prev, showResult: true }));
            }
        }, 1000);
    };

    // Timer for challenge mode
    useEffect(() => {
        if (activeQuiz === 'challenge' && quizState.timeLeft > 0 && !quizState.showResult) {
            const timer = setInterval(() => {
                setQuizState(prev => {
                    if (prev.timeLeft <= 1) {
                        return { ...prev, timeLeft: 0, showResult: true };
                    }
                    return { ...prev, timeLeft: prev.timeLeft - 1 };
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [activeQuiz, quizState.timeLeft, quizState.showResult]);

    const renderQuiz = () => {
        if (quizState.showResult) {
            const percentage = Math.round((quizState.score / quizWords.length) * 100);
            return (
                <div className="text-center py-12">
                    <div className="text-6xl mb-4">{percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : '💪'}</div>
                    <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
                    <p className="text-xl text-gray-600 mb-4">
                        Score: {quizState.score} / {quizWords.length} ({percentage}%)
                    </p>
                    <div className="flex justify-center gap-3">
                        {quizState.answers.map((correct, i) => (
                            <span key={i} className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${correct ? 'bg-green-500' : 'bg-red-500'}`}>
                                {correct ? '✓' : '✗'}
                            </span>
                        ))}
                    </div>
                    <div className="mt-8 flex justify-center gap-4">
                        <button onClick={() => startQuiz(activeQuiz)} className="px-6 py-3 bg-blue-500 text-white rounded-full font-medium flex items-center gap-2 hover:bg-blue-600">
                            <RotateCcw size={20} /> Try Again
                        </button>
                        <button onClick={() => setActiveQuiz(null)} className="px-6 py-3 bg-gray-200 text-gray-700 rounded-full font-medium hover:bg-gray-300">
                            Back to Quizzes
                        </button>
                    </div>
                </div>
            );
        }

        const currentQuizWord = quizWords[quizState.currentQuestion];

        switch (activeQuiz) {
            case 'wordmatch': {
                const options = shuffleArray([currentQuizWord, ...getWrongOptions(currentQuizWord)]);
                return (
                    <div className="max-w-2xl mx-auto">
                        <div className="mb-6 flex items-center justify-between">
                            <span className="text-gray-500">Question {quizState.currentQuestion + 1} / {quizWords.length}</span>
                            <span className="text-green-600 font-bold">Score: {quizState.score}</span>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg p-8 text-center mb-6">
                            <p className="text-lg text-gray-500 mb-2">What is the meaning of:</p>
                            <h2 className="text-4xl font-bold mb-2">{currentQuizWord.word}</h2>
                            <p className="text-gray-400">{currentQuizWord.pronunciation}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {options.map((option, i) => (
                                <button
                                    key={i}
                                    onClick={() => quizState.selectedAnswer === null && handleWordMatchAnswer(options.findIndex(o => o.id === option.id) === options.findIndex(o => o.id === currentQuizWord.id) ? i : i)}
                                    disabled={quizState.selectedAnswer !== null}
                                    className={`p-4 rounded-xl text-left transition-all ${quizState.selectedAnswer !== null
                                            ? option.id === currentQuizWord.id
                                                ? 'bg-green-500 text-white'
                                                : quizState.selectedAnswer === i
                                                    ? 'bg-red-500 text-white'
                                                    : 'bg-gray-100'
                                            : 'bg-white shadow-md hover:shadow-lg hover:-translate-y-1'
                                        }`}
                                >
                                    <p className="font-medium">{option.koreanMeaning}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                );
            }

            case 'spelling':
                return (
                    <div className="max-w-2xl mx-auto">
                        <div className="mb-6 flex items-center justify-between">
                            <span className="text-gray-500">Question {quizState.currentQuestion + 1} / {quizWords.length}</span>
                            <span className="text-green-600 font-bold">Score: {quizState.score}</span>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg p-8 text-center mb-6">
                            <p className="text-lg text-gray-500 mb-4">Type the word for:</p>
                            <h2 className="text-2xl font-bold mb-4">{currentQuizWord.koreanMeaning}</h2>
                            <p className="text-gray-500 mb-4">{currentQuizWord.definition}</p>
                            <button onClick={() => speak(currentQuizWord.word)} className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600">
                                <Volume2 size={24} />
                            </button>
                        </div>
                        <div className="flex gap-4">
                            <input
                                type="text"
                                value={quizState.userInput}
                                onChange={(e) => setQuizState(prev => ({ ...prev, userInput: e.target.value }))}
                                onKeyDown={(e) => e.key === 'Enter' && handleSpellingSubmit()}
                                placeholder="Type the word..."
                                className="flex-1 px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-xl"
                                autoFocus
                            />
                            <button onClick={handleSpellingSubmit} className="px-8 py-4 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600">
                                Submit
                            </button>
                        </div>
                    </div>
                );

            case 'listening':
                return (
                    <div className="max-w-2xl mx-auto">
                        <div className="mb-6 flex items-center justify-between">
                            <span className="text-gray-500">Question {quizState.currentQuestion + 1} / {quizWords.length}</span>
                            <span className="text-green-600 font-bold">Score: {quizState.score}</span>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg p-8 text-center mb-6">
                            <p className="text-lg text-gray-500 mb-4">Listen and type the word:</p>
                            <button onClick={() => speak(currentQuizWord.word)} className="w-24 h-24 bg-purple-500 text-white rounded-full hover:bg-purple-600 flex items-center justify-center mx-auto mb-4">
                                <Volume2 size={48} />
                            </button>
                            <p className="text-sm text-gray-400">Click to listen again</p>
                        </div>
                        <div className="flex gap-4">
                            <input
                                type="text"
                                value={quizState.userInput}
                                onChange={(e) => setQuizState(prev => ({ ...prev, userInput: e.target.value }))}
                                onKeyDown={(e) => e.key === 'Enter' && handleSpellingSubmit()}
                                placeholder="Type what you hear..."
                                className="flex-1 px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none text-xl"
                                autoFocus
                            />
                            <button onClick={handleSpellingSubmit} className="px-8 py-4 bg-purple-500 text-white rounded-xl font-medium hover:bg-purple-600">
                                Submit
                            </button>
                        </div>
                    </div>
                );

            case 'challenge': {
                const options = shuffleArray([currentQuizWord, ...getWrongOptions(currentQuizWord)]);
                return (
                    <div className="max-w-2xl mx-auto">
                        <div className="mb-6 flex items-center justify-between">
                            <span className="text-gray-500">Question {quizState.currentQuestion + 1} / {quizWords.length}</span>
                            <div className="flex items-center gap-4">
                                <span className="text-green-600 font-bold">Score: {quizState.score}</span>
                                <span className={`px-4 py-2 rounded-full font-bold ${quizState.timeLeft <= 10 ? 'bg-red-500 text-white' : 'bg-orange-100 text-orange-600'}`}>
                                    ⏱️ {quizState.timeLeft}s
                                </span>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg p-8 text-center mb-6">
                            <h2 className="text-4xl font-bold mb-2">{currentQuizWord.word}</h2>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {options.map((option, i) => (
                                <button
                                    key={i}
                                    onClick={() => {
                                        const isCorrect = option.id === currentQuizWord.id;
                                        setQuizState(prev => ({
                                            ...prev,
                                            score: isCorrect ? prev.score + 1 : prev.score,
                                            answers: [...prev.answers, isCorrect],
                                            currentQuestion: prev.currentQuestion < quizWords.length - 1 ? prev.currentQuestion + 1 : prev.currentQuestion,
                                            showResult: prev.currentQuestion >= quizWords.length - 1,
                                        }));
                                    }}
                                    className="p-4 bg-white rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all"
                                >
                                    <p className="font-medium">{option.koreanMeaning}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                );
            }
        }
    };

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
                                onClick={() => { setActiveTab(tab.id as TabType); setActiveQuiz(null); }}
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
                            {activeQuiz ? (
                                <div>
                                    <button onClick={() => setActiveQuiz(null)} className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-800">
                                        <X size={20} /> Close Quiz
                                    </button>
                                    {renderQuiz()}
                                </div>
                            ) : (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div onClick={() => startQuiz('wordmatch')} className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all cursor-pointer">
                                            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                                                <span className="text-3xl">📝</span>
                                            </div>
                                            <h3 className="text-xl font-bold mb-2">Word Match</h3>
                                            <p className="text-gray-600 mb-4">영어 단어와 뜻을 매칭하세요</p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-500">10 questions</span>
                                                <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium">Start →</span>
                                            </div>
                                        </div>

                                        <div onClick={() => startQuiz('spelling')} className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all cursor-pointer">
                                            <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                                                <span className="text-3xl">✍️</span>
                                            </div>
                                            <h3 className="text-xl font-bold mb-2">Spelling Quiz</h3>
                                            <p className="text-gray-600 mb-4">단어의 철자를 맞춰보세요</p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-500">10 questions</span>
                                                <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium">Start →</span>
                                            </div>
                                        </div>

                                        <div onClick={() => startQuiz('listening')} className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all cursor-pointer">
                                            <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                                                <span className="text-3xl">🎧</span>
                                            </div>
                                            <h3 className="text-xl font-bold mb-2">Listening Quiz</h3>
                                            <p className="text-gray-600 mb-4">발음을 듣고 단어를 맞춰보세요</p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-500">10 questions</span>
                                                <span className="bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium">Start →</span>
                                            </div>
                                        </div>

                                        <div onClick={() => startQuiz('challenge')} className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all cursor-pointer">
                                            <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                                                <span className="text-3xl">🏆</span>
                                            </div>
                                            <h3 className="text-xl font-bold mb-2">Challenge Mode</h3>
                                            <p className="text-gray-600 mb-4">시간 제한 내에 풀어보세요!</p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-500">60 seconds</span>
                                                <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium">Start →</span>
                                            </div>
                                        </div>
                                    </div>

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
                                </>
                            )}
                        </div>
                    )}

                    {/* Reports Tab */}
                    {activeTab === 'reports' && (
                        <div className="max-w-4xl mx-auto">
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

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Volume2, Check } from 'lucide-react';
import Sidebar from '../components/layout/Sidebar/Sidebar';
import Header from '../components/layout/Header/Header';
import { useVocabStore } from '../store/vocabStore';

export default function VocabularyPage() {
    const { vocabularies, currentIndex, memorizedWords, markAsMemorized, nextWord, prevWord } = useVocabStore();
    const [showMeaning, setShowMeaning] = useState(false);

    const currentWord = vocabularies[currentIndex];
    const isMemorized = memorizedWords.includes(currentWord?.id);

    const speak = (text: string) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        speechSynthesis.speak(utterance);
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 flex flex-col">
                <Header />

                <main className="flex-1 p-6">
                    {/* Tab Navigation */}
                    <div className="flex gap-2 mb-6">
                        <button className="px-6 py-2 bg-orange-500 text-white rounded-full font-medium">
                            Flashcards
                        </button>
                        <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full font-medium hover:bg-gray-300">
                            My Words
                        </button>
                        <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full font-medium hover:bg-gray-300">
                            Quizzes
                        </button>
                        <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full font-medium hover:bg-gray-300">
                            Reports
                        </button>
                    </div>

                    {/* Flashcard */}
                    <div className="max-w-2xl mx-auto">
                        <div
                            className="bg-white rounded-2xl shadow-lg p-8 cursor-pointer transition-transform hover:scale-[1.02]"
                            onClick={() => setShowMeaning(!showMeaning)}
                        >
                            {/* Image */}
                            <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden mb-6">
                                <img
                                    src={currentWord?.imageUrl}
                                    alt={currentWord?.word}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Word */}
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

                        {/* Controls */}
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
                                    onClick={() => markAsMemorized(currentWord?.id)}
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

                        {/* Progress */}
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
                </main>
            </div>
        </div>
    );
}

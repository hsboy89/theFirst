import { create } from 'zustand';
import type { Vocabulary } from '../types/vocabulary';
import { mockVocabulary } from '../data/mockVocabulary';

type VocabState = {
    vocabularies: Vocabulary[];
    currentIndex: number;
    memorizedWords: string[];
    setCurrentIndex: (index: number) => void;
    markAsMemorized: (id: string) => void;
    unmarkMemorized: (id: string) => void;
    nextWord: () => void;
    prevWord: () => void;
};

export const useVocabStore = create<VocabState>((set, get) => ({
    vocabularies: mockVocabulary,
    currentIndex: 0,
    memorizedWords: JSON.parse(localStorage.getItem('memorizedWords') || '[]'),

    setCurrentIndex: (index: number) => {
        const { vocabularies } = get();
        if (index >= 0 && index < vocabularies.length) {
            set({ currentIndex: index });
        }
    },

    markAsMemorized: (id: string) => {
        const { memorizedWords } = get();
        if (!memorizedWords.includes(id)) {
            const updated = [...memorizedWords, id];
            set({ memorizedWords: updated });
            localStorage.setItem('memorizedWords', JSON.stringify(updated));
        }
    },

    unmarkMemorized: (id: string) => {
        const { memorizedWords } = get();
        const updated = memorizedWords.filter((wordId) => wordId !== id);
        set({ memorizedWords: updated });
        localStorage.setItem('memorizedWords', JSON.stringify(updated));
    },

    nextWord: () => {
        const { currentIndex, vocabularies } = get();
        if (currentIndex < vocabularies.length - 1) {
            set({ currentIndex: currentIndex + 1 });
        }
    },

    prevWord: () => {
        const { currentIndex } = get();
        if (currentIndex > 0) {
            set({ currentIndex: currentIndex - 1 });
        }
    },
}));

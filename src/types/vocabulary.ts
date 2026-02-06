export type Vocabulary = {
    id: string;
    word: string;
    pronunciation: string;
    partOfSpeech: string;
    definition: string;
    exampleSentence?: string;
    koreanMeaning: string;
    imageUrl?: string;
    difficulty: 'easy' | 'medium' | 'hard';
};

export type UserVocabularyProgress = {
    vocabId: string;
    status: 'learning' | 'memorized' | 'review';
    lastStudiedAt: Date;
};

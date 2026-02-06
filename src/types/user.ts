export type User = {
    id: string;
    name: string;
    email?: string;
    grade: string;
    school?: string;
    profileImage?: string;
    level: number;
    totalPoints: number;
    streak?: number;
};

export type AuthState = {
    user: User | null;
    isAuthenticated: boolean;
};

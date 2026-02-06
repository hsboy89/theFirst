import { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
    onClick?: () => void;
}

export default function Card({ children, className = '', hover = false, onClick }: CardProps) {
    return (
        <div
            className={`bg-white rounded-xl shadow-card p-6 ${hover ? 'hover:shadow-card-hover transition-shadow duration-200 cursor-pointer' : ''
                } ${className}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
}

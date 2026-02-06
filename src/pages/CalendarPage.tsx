import { useState } from 'react';
import Sidebar from '../components/layout/Sidebar/Sidebar';
import Header from '../components/layout/Header/Header';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const events = [
    { date: 6, title: 'Vocabulary Quiz', type: 'quiz', color: 'bg-red-500' },
    { date: 10, title: 'Grammar Test', type: 'test', color: 'bg-blue-500' },
    { date: 15, title: 'Flashcard Review', type: 'study', color: 'bg-green-500' },
    { date: 20, title: 'Monthly Exam', type: 'exam', color: 'bg-purple-500' },
];

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function CalendarPage() {
    const [currentDate] = useState(new Date(2026, 1, 1)); // February 2026

    const getDaysInMonth = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const days = [];
        for (let i = 0; i < firstDay; i++) {
            days.push(null);
        }
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(i);
        }
        return days;
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 flex flex-col">
                <Header />

                <main className="flex-1 p-6">
                    <div className="max-w-5xl mx-auto">
                        {/* Calendar Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-3xl font-bold">📅 Calendar</h1>
                            <div className="flex items-center gap-4">
                                <button className="p-2 hover:bg-gray-200 rounded-full">
                                    <ChevronLeft size={24} />
                                </button>
                                <span className="text-xl font-semibold">February 2026</span>
                                <button className="p-2 hover:bg-gray-200 rounded-full">
                                    <ChevronRight size={24} />
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Calendar Grid */}
                            <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6">
                                {/* Days Header */}
                                <div className="grid grid-cols-7 gap-2 mb-4">
                                    {days.map((day) => (
                                        <div key={day} className="text-center font-semibold text-gray-600 py-2">
                                            {day}
                                        </div>
                                    ))}
                                </div>

                                {/* Calendar Days */}
                                <div className="grid grid-cols-7 gap-2">
                                    {getDaysInMonth().map((day, index) => {
                                        const event = events.find(e => e.date === day);
                                        const isToday = day === 6;

                                        return (
                                            <div
                                                key={index}
                                                className={`aspect-square p-2 rounded-lg ${day ? 'hover:bg-gray-100 cursor-pointer' : ''
                                                    } ${isToday ? 'bg-green-100 border-2 border-green-500' : ''}`}
                                            >
                                                {day && (
                                                    <>
                                                        <span className={`text-sm ${isToday ? 'font-bold text-green-600' : ''}`}>
                                                            {day}
                                                        </span>
                                                        {event && (
                                                            <div className={`${event.color} w-2 h-2 rounded-full mt-1`}></div>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Upcoming Events */}
                            <div className="bg-white rounded-2xl shadow-md p-6">
                                <h2 className="text-xl font-bold mb-4">📌 Upcoming Events</h2>
                                <div className="space-y-3">
                                    {events.map((event, i) => (
                                        <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                            <div className={`w-3 h-3 rounded-full ${event.color}`}></div>
                                            <div className="flex-1">
                                                <p className="font-medium">{event.title}</p>
                                                <p className="text-sm text-gray-500">Feb {event.date}, 2026</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Today's Schedule */}
                                <div className="mt-6 pt-6 border-t">
                                    <h3 className="font-bold mb-3">🎯 Today</h3>
                                    <div className="bg-green-50 p-4 rounded-lg">
                                        <p className="font-semibold text-green-800">Vocabulary Quiz</p>
                                        <p className="text-sm text-green-600">Due at 5:00 PM</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

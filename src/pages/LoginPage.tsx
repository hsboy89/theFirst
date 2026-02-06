import { motion } from 'framer-motion';
import { Headphones, MessageCircle, BookOpen, GraduationCap } from 'lucide-react';
import LoginForm from '../components/auth/LoginForm/LoginForm';
import Card from '../components/common/Card/Card';

export default function LoginPage() {
    const floatingIcons = [
        { Icon: Headphones, x: '10%', y: '20%', delay: 0 },
        { Icon: MessageCircle, x: '85%', y: '15%', delay: 0.2 },
        { Icon: BookOpen, x: '15%', y: '75%', delay: 0.4 },
        { Icon: GraduationCap, x: '80%', y: '70%', delay: 0.6 },
    ];

    return (
        <div className="min-h-screen gradient-blue relative overflow-hidden flex items-center justify-center p-4">
            {/* Floating Icons */}
            {floatingIcons.map(({ Icon, x, y, delay }, index) => (
                <motion.div
                    key={index}
                    className="absolute text-white/20"
                    style={{ left: x, top: y }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{
                        opacity: [0.2, 0.4, 0.2],
                        y: [-20, 0, -20],
                    }}
                    transition={{
                        duration: 3,
                        delay,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                >
                    <Icon size={48} />
                </motion.div>
            ))}

            {/* Login Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md z-10"
            >
                <Card className="backdrop-blur-sm bg-white/95">
                    {/* Logo & Title */}
                    <div className="text-center mb-8">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                            className="inline-block"
                        >
                            <div className="w-20 h-20 mx-auto mb-4 gradient-primary rounded-full flex items-center justify-center">
                                <GraduationCap size={40} className="text-white" />
                            </div>
                        </motion.div>

                        <h1 className="text-4xl font-bold text-gradient mb-2">
                            The First
                        </h1>
                        <p className="text-gray-600">
                            학습의 첫 걸음, The First와 함께
                        </p>
                    </div>

                    {/* Login Form */}
                    <LoginForm />

                    {/* Footer */}
                    <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
                        <p>처음 오셨나요? 관리자에게 문의하여 계정을 받으세요.</p>
                    </div>
                </Card>
            </motion.div>

            {/* Background Decorative Elements */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white/10 to-transparent"></div>
        </div>
    );
}

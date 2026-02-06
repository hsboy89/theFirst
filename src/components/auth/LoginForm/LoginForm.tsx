import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import { User, Lock, Key } from 'lucide-react';

export default function LoginForm() {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);

    const [formData, setFormData] = useState({
        id: '',
        password: '',
        issueCode: '',
    });
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const success = await login(
                formData.id,
                formData.password,
                formData.issueCode || undefined
            );

            if (success) {
                if (rememberMe) {
                    localStorage.setItem('rememberMe', 'true');
                }
                navigate('/');
            } else {
                setError('아이디, 비밀번호 또는 발급코드가 올바르지 않습니다.');
            }
        } catch (err) {
            setError('로그인 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="w-full space-y-5">
            <div>
                <Input
                    name="id"
                    label="학생 ID"
                    type="text"
                    placeholder="아이디를 입력하세요"
                    value={formData.id}
                    onChange={handleChange}
                    icon={<User size={20} />}
                    required
                />
            </div>

            <div>
                <Input
                    name="password"
                    label="비밀번호"
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    value={formData.password}
                    onChange={handleChange}
                    icon={<Lock size={20} />}
                    required
                />
            </div>

            <div>
                <Input
                    name="issueCode"
                    label="발급코드 (선택)"
                    type="text"
                    placeholder="학원 발급코드 (선택사항)"
                    value={formData.issueCode}
                    onChange={handleChange}
                    icon={<Key size={20} />}
                />
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                </div>
            )}

            <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 text-primary-blue rounded focus:ring-2 focus:ring-primary-blue"
                    />
                    <span className="text-sm text-gray-600">로그인 상태 유지</span>
                </label>

                <button
                    type="button"
                    className="text-sm text-primary-blue hover:underline"
                >
                    비밀번호 찾기
                </button>
            </div>

            <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                isLoading={isLoading}
            >
                로그인
            </Button>

            <div className="text-center text-sm text-gray-500">
                테스트 계정: <span className="font-mono text-primary-blue">student1</span> / <span className="font-mono text-primary-blue">password123</span>
            </div>
        </form>
    );
}

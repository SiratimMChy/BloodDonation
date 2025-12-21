import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const PaymentSuccess = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');

    const AxiosSecure = useAxiosSecure();
    useEffect(() => {
        AxiosSecure.post(`/payment-success?session_id=${sessionId}`)

    }, [AxiosSecure, sessionId])

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 10);
        return () => clearTimeout(timer);
    }, []);



    return (
        <div className="min-h-screen bg-linear-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes scaleIn {
                    from {
                        transform: scale(0);
                    }
                    to {
                        transform: scale(1);
                    }
                }
                .animate-fadeInUp {
                    animation: fadeInUp 0.6s ease-out forwards;
                }
                .animate-scaleIn {
                    animation: scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
                }
            `}</style>

            <div className={`max-w-md w-full transition-all duration-500 ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
                <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
                    {/* Success Icon */}
                    <div className="flex justify-center mb-8">
                        <div className="relative animate-scaleIn">
                            <div className="absolute inset-0 bg-green-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                            <CheckCircle className="w-28 h-28 text-green-500 relative" strokeWidth={2} />
                        </div>
                    </div>

                    {/* Message */}
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Donation Successful!
                    </h1>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        Your donation has been processed successfully. Thank you for saving lives!!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
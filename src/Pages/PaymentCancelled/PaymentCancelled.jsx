import React, { useState, useEffect } from 'react';
import { XCircle } from 'lucide-react';

const PaymentCancelled = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 10);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-linear-to-br from-red-50 via-rose-50 to-pink-50 flex items-center justify-center p-4">
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
                    {/* Cancelled Icon */}
                    <div className="flex justify-center mb-8">
                        <div className="relative animate-scaleIn">
                            <div className="absolute inset-0 bg-red-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                            <XCircle className="w-28 h-28 text-red-500 relative" strokeWidth={2} />
                        </div>
                    </div>

                    {/* Message */}
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Donation Cancelled
                    </h1>
                    <p className="text-gray-600 text-lg leading-relaxed mb-2">
                        Your donation was cancelled. No charges have been made to your account.
                    </p>
                    <p className="text-gray-500 text-base">
                        You can try again anytime to support our life-saving mission.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PaymentCancelled;
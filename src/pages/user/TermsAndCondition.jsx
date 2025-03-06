import React, { useState, useEffect } from 'react';
import { ScrollText, Package, CreditCard, Truck, RotateCcw, HeartHandshake } from 'lucide-react';

const TermsAndConditions = () => {
    const [activeSection, setActiveSection] = useState(0);
    const [isVisible, setIsVisible] = useState({});

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    setIsVisible(prev => ({
                        ...prev,
                        [entry.target.id]: entry.isIntersecting
                    }));
                });
            },
            { threshold: 0.5 }
        );

        document.querySelectorAll('.term-section').forEach(section => {
            observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

    const sections = [
        {
            id: 'acceptance',
            title: 'Terms Acceptance',
            icon: <ScrollText className="w-6 h-6" />,
            content: `By accessing our website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our services.`
        },
        {
            id: 'products',
            title: 'Product Information',
            icon: <Package className="w-6 h-6" />,
            content: `All products are described with maximum accuracy. However, we are not responsible for any minor variations in color, packaging, or specifications. Prices are subject to change without prior notice.`
        },
        {
            id: 'payment',
            title: 'Future Payment Options',
            icon: <CreditCard className="w-6 h-6" />,
            content: `Our payment system is currently under development. Once launched, we plan to offer multiple secure payment options including credit cards, debit cards, and digital wallets. All future transactions will be processed through industry-standard secure payment gateways. We will notify all users when payment features become available.`
        },
        {
            id: 'shipping',
            title: 'Future Shipping Policy',
            icon: <Truck className="w-6 h-6" />,
            content: `Shipping times and costs vary by location. Standard shipping typically takes 3-5 business days. Express shipping options are available at checkout. We are not responsible for delays caused by customs or local postal services.`
        },
        {
            id: 'returns',
            title: 'Returns & Refunds',
            icon: <RotateCcw className="w-6 h-6" />,
            content: `Products can be returned before packed open. Items must be unused and in original packaging. Refunds will be processed within 5-7 business days after we receive the returned item.`
        },
        {
            id: 'support',
            title: 'Customer Support',
            icon: <HeartHandshake className="w-6 h-6" />,
            content: `Our customer support team is available 24/7 to assist you. Contact us through email, phone or message for any queries or concerns regarding your orders or our services.`
        }
    ];

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                Terms & Conditions
            </h1>

            <div className="space-y-12">
                {sections.map((section, index) => (
                    <div
                        key={section.id}
                        id={section.id}
                        className={`term-section transform transition-all duration-700 ${isVisible[section.id] ? 'translate-x-0 opacity-100' : 'translate-x-32 opacity-0'
                            }`}
                    >
                        <div className="flex items-start gap-4 group">
                            <div className="relative">
                                <div className={`
                  p-3 rounded-full transition-colors duration-300
                  ${isVisible[section.id] ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'}
                `}>
                                    {section.icon}
                                </div>
                                {index !== sections.length - 1 && (
                                    <div className={`
                    absolute top-12 left-1/2 w-0.5 h-24 -translate-x-1/2
                    transition-colors duration-300
                    ${isVisible[section.id] ? 'bg-blue-300' : 'bg-gray-200'}
                  `} />
                                )}
                            </div>

                            <div className="flex-1">
                                <h2 className={`
                  text-xl font-semibold mb-2 transition-colors duration-300
                  ${isVisible[section.id] ? 'text-blue-600' : 'text-gray-700'}
                `}>
                                    {section.title}
                                </h2>
                                <p className="text-gray-600 leading-relaxed">
                                    {section.content}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 text-center text-sm text-gray-500">
                Last updated: February 2025 • Copyright © 2025 • All rights reserved
            </div>
        </div>
    );
};

export default TermsAndConditions;
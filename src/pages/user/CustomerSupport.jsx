import React, { useState, useEffect } from 'react';
import { Phone, Mail, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';

const CustomerSupportPage = () => {
    const [showFaq, setShowFaq] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    // Simulating page load
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const faqs = [
        {
            question: 'How do I contact customer support?',
            answer: 'You can contact our customer support team via email at veltekindustries@gmail.com, through the live chat on our whatsapp chat at +91-9633799929, or by calling at +91-9633799929 or +91-8111909929'
        },
        {
            question: 'What is your refund & return policy?',
            answer: 'Products can be returned before packed open. Items must be unused and in original packaging. Refunds will be processed within 5-7 business days after we receive the returned item.'
        },
        {
            question: 'How long is the shelf life of your cleaning products?',
            answer: 'Most of our liquid cleaning products have a shelf life of 1-2 years when stored properly in a cool, dry place away from direct sunlight. Check the expiration date printed on each bottle.'
        },
        {
            question: 'How much product should I use for effective cleaning?',
            answer: 'For most surfaces, a small amount (approximately 1-2 capfuls per gallon of water or 2-3 sprays for direct application) is sufficient. Using more product does not necessarily mean better cleaning and may leave residue.'
        },
        {
            question: 'What should I do if the cleaning product gets in my eyes?',
            answer: 'Rinse eyes immediately with plenty of clean water for at least 15 minutes and seek medical attention if irritation persists. Always read and follow the first aid instructions on the product label.'
        },
        {
            question: 'Where can I buy your cleaning products?',
            answer: 'Our products are available at major retailers, supermarkets, home improvement stores. In future, you can purchase through our website.'
        }
    ];

    const toggleFaq = (index) => {
        setShowFaq(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-500 to-purple-600">
                <div className="text-white text-2xl font-bold animate-pulse">
                    Loading Support Center...
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 py-16 px-4 text-center text-white">
                <h1 className="text-4xl font-bold mb-4 animate-fade-in">
                    How can we help you today?
                </h1>
                <p className="text-lg mb-8 max-w-2xl mx-auto">
                    Our support team is here to assist you with any questions or issues
                </p>
            </div>

            {/* Support Options */}
            <div className="max-w-6xl mx-auto py-16 px-4">
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                            <Phone size={24} className="text-green-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Call Us</h3>
                        <p className="text-gray-600 mb-4">Speak directly with a support representative by phone.</p>
                        <div className="space-y-2">
                            <a
                                href="tel:+919633799929"
                                className="text-green-600 font-medium flex items-center hover:text-green-800 transition-colors"
                            >
                                +91-9633799929
                            </a>
                            <a
                                href="tel:+918111909929"
                                className="text-green-600 font-medium flex items-center hover:text-green-800 transition-colors"
                            >
                                +91-8111909929
                            </a>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
                        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                            <Mail size={24} className="text-purple-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Email Support</h3>
                        <p className="text-gray-600 mb-4">Send us an email and we'll get back to you within 24 hours.</p>
                        <a
                            href="mailto:veltekindustries@gmail.com"
                            className="text-purple-600 font-medium flex items-center hover:text-purple-800 transition-colors"
                        >
                            veltekindustries@gmail.com
                        </a>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                            <MessageCircle size={24} className="text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">WhatsApp Chat</h3>
                        <p className="text-gray-600 mb-4">Chat with our team instantly through WhatsApp.</p>
                        <a
                            href="https://wa.me/919633799929"
                            className="text-blue-600 font-medium flex items-center hover:text-blue-800 transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            +91-9633799929
                        </a>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden mb-16">
                    <div className="p-6">
                        <div className="animate-slide-up">
                            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
                            <div className="space-y-4">
                                {faqs.map((faq, index) => (
                                    <div key={index} className="border rounded-lg overflow-hidden">
                                        <button
                                            className="w-full p-4 text-left font-medium flex justify-between items-center hover:bg-gray-50 transition-colors"
                                            onClick={() => toggleFaq(index)}
                                        >
                                            <span>{faq.question}</span>
                                            {showFaq[index] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                        </button>
                                        {showFaq[index] && (
                                            <div className="p-4 bg-gray-50 border-t animate-slide-down">
                                                <p className="text-gray-600">{faq.answer}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CSS animations */}
            <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slide-down {
          from { max-height: 0; opacity: 0; }
          to { max-height: 500px; opacity: 1; }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.4s ease-out;
        }
        
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
        </div>
    );
};

export default CustomerSupportPage;
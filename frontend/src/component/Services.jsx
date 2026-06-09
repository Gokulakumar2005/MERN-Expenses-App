import { ReceiptText, BarChart3, Lock, Camera, Zap, TrendingUp, Calendar, Download } from 'lucide-react';

const Services = () => {
    const services = [
        {
            icon: <ReceiptText size={32} />,
            title: 'Expense Logging',
            description: 'Quickly record every purchase with category, date, amount, and detailed notes. Make expense entry a breeze.',
            color: 'blue'
        },
        {
            icon: <BarChart3 size={32} />,
            title: 'Dashboard Analytics',
            description: 'View comprehensive summaries and spending trends so you can identify where your money is going.',
            color: 'emerald'
        },
        {
            icon: <Lock size={32} />,
            title: 'Secure Authentication',
            description: 'Login safely using email OTP or Google sign-in for fast and secure access to your account.',
            color: 'purple'
        },
        {
            icon: <Camera size={32} />,
            title: 'Receipt Scanning',
            description: 'Upload receipt images and let our AI extract amount, date, and details automatically with OCR technology.',
            color: 'orange'
        },
        {
            icon: <Zap size={32} />,
            title: 'Real-time Tracking',
            description: 'Get instant updates and live notifications for all your transactions and spending milestones.',
            color: 'yellow'
        },
        {
            icon: <TrendingUp size={32} />,
            title: 'Budget Management',
            description: 'Set spending limits for categories and receive alerts when you\'re approaching your budget limits.',
            color: 'red'
        },
        {
            icon: <Calendar size={32} />,
            title: 'Historical Reports',
            description: 'Access detailed reports of your spending history with customizable date ranges and categories.',
            color: 'pink'
        },
        {
            icon: <Download size={32} />,
            title: 'Data Export',
            description: 'Export your transactions and reports in multiple formats including CSV and PDF for record keeping.',
            color: 'cyan'
        }
    ];

    const colorClasses = {
        blue: 'bg-blue-100 text-blue-600',
        emerald: 'bg-emerald-100 text-emerald-600',
        purple: 'bg-purple-100 text-purple-600',
        orange: 'bg-orange-100 text-orange-600',
        yellow: 'bg-yellow-100 text-yellow-600',
        red: 'bg-red-100 text-red-600',
        pink: 'bg-pink-100 text-pink-600',
        cyan: 'bg-cyan-100 text-cyan-600'
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-16 md:py-24">
                <div className="max-w-6xl mx-auto space-y-6">
                    <h1 className="text-5xl md:text-6xl font-black leading-tight">
                        Powerful Features for <br /> Better Money Management
                    </h1>
                    <p className="text-xl text-blue-100 max-w-2xl leading-relaxed">
                        Everything you need to track, manage, and optimize your spending in one beautiful, easy-to-use platform.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
                {/* Services Grid */}
                <div className="space-y-12">
                    <div>
                        <h2 className="text-4xl font-black text-slate-900 mb-4">What We Offer</h2>
                        <p className="text-lg text-slate-600">
                            Expense Tracker delivers simple, powerful tools to help you manage money, track expenses, and plan ahead with confidence.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-lg transition-all group"
                            >
                                <div className={`p-4 ${colorClasses[service.color]} rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform`}>
                                    {service.icon}
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-3">{service.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Benefits Section */}
                <div className="mt-20 space-y-12">
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl font-black text-slate-900">Why Choose Our Services?</h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            We combine the best technology with user-friendly design to provide an unmatched experience.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-10 rounded-[32px] border border-blue-200">
                            <div className="text-4xl font-black text-blue-600 mb-4">🚀</div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3">Fast & Easy</h3>
                            <p className="text-slate-700 leading-relaxed">
                                Get started in seconds. No complicated setup or technical knowledge required. Just add expenses and go.
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-10 rounded-[32px] border border-emerald-200">
                            <div className="text-4xl font-black text-emerald-600 mb-4">🔒</div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3">Secure & Private</h3>
                            <p className="text-slate-700 leading-relaxed">
                                Your financial data is encrypted and protected with industry-standard security measures and compliance.
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 p-10 rounded-[32px] border border-purple-200">
                            <div className="text-4xl font-black text-purple-600 mb-4">📊</div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3">Smart Insights</h3>
                            <p className="text-slate-700 leading-relaxed">
                                Get actionable insights and analytics that help you understand your spending patterns better.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Pricing Section */}
                <div className="mt-20 space-y-12">
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl font-black text-slate-900">Simple, Transparent Pricing</h2>
                        <p className="text-lg text-slate-600">
                            Everything you need to manage your finances. No hidden fees.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* Free Plan */}
                        <div className="bg-white p-10 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-all">
                            <div className="mb-6">
                                <h3 className="text-2xl font-black text-slate-900 mb-2">Free Forever</h3>
                                <p className="text-slate-600 text-sm">Perfect for getting started</p>
                            </div>
                            <div className="mb-8">
                                <p className="text-4xl font-black text-slate-900">$0<span className="text-lg text-slate-600">/month</span></p>
                            </div>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center gap-3 text-slate-700">
                                    <span className="text-emerald-500 font-bold">✓</span> Unlimited expenses
                                </li>
                                <li className="flex items-center gap-3 text-slate-700">
                                    <span className="text-emerald-500 font-bold">✓</span> Basic analytics
                                </li>
                                <li className="flex items-center gap-3 text-slate-700">
                                    <span className="text-emerald-500 font-bold">✓</span> Receipt scanning
                                </li>
                                <li className="flex items-center gap-3 text-slate-700">
                                    <span className="text-emerald-500 font-bold">✓</span> Mobile app
                                </li>
                            </ul>
                            <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold py-3 rounded-2xl transition-all">
                                Get Started
                            </button>
                        </div>

                        {/* Premium Plan */}
                        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-10 rounded-[32px] shadow-xl text-white border border-blue-500 ring-2 ring-offset-4 ring-blue-400">
                            <div className="mb-6">
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full mb-3">
                                    <span className="text-xs font-bold">POPULAR</span>
                                </div>
                                <h3 className="text-2xl font-black mb-2">Premium</h3>
                                <p className="text-blue-100 text-sm">All features + priority support</p>
                            </div>
                            <div className="mb-8">
                                <p className="text-4xl font-black">$4.99<span className="text-lg text-blue-100">/month</span></p>
                            </div>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center gap-3">
                                    <span className="text-blue-200 font-bold">✓</span> Everything in Free
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="text-blue-200 font-bold">✓</span> Advanced analytics
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="text-blue-200 font-bold">✓</span> Priority support
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="text-blue-200 font-bold">✓</span> Export reports
                                </li>
                            </ul>
                            <button className="w-full bg-white hover:bg-slate-100 text-blue-600 font-bold py-3 rounded-2xl transition-all">
                                Start Free Trial
                            </button>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-20 bg-gradient-to-r from-slate-900 to-slate-800 p-12 rounded-[40px] text-white text-center space-y-6">
                    <h2 className="text-4xl font-black">Ready to Transform Your Finances?</h2>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        Join thousands of users who are already taking control of their spending with ExpenseTracker.
                    </p>
                    <button className="bg-white hover:bg-slate-100 text-slate-900 font-bold px-8 py-4 rounded-2xl transition-all shadow-lg inline-block">
                        Get Started Free
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Services;

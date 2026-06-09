import { CheckCircle, Zap, Shield, TrendingUp } from 'lucide-react';

const About = () => {
    const features = [
        {
            icon: <Zap size={24} />,
            title: 'Easy Tracking',
            description: 'Add expenses in seconds and review your spending history with clean charts and reports.',
            color: 'blue'
        },
        {
            icon: <Shield size={24} />,
            title: 'Secure Access',
            description: 'Login securely with email OTP or Google, and keep your account data protected.',
            color: 'emerald'
        },
        {
            icon: <TrendingUp size={24} />,
            title: 'Smart Insights',
            description: 'See your spending patterns, categorize purchases, and make better budgeting decisions.',
            color: 'purple'
        }
    ];

    const benefits = [
        'Track unlimited expenses across categories',
        'Advanced analytics and visualizations',
        'Secure cloud storage for all receipts',
        'Real-time budget monitoring',
        'Mobile-friendly responsive design',
        'Export reports in multiple formats'
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-16 md:py-24">
                <div className="max-w-6xl mx-auto space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
                        <CheckCircle size={16} /> About ExpenseTracker
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black leading-tight">
                        Manage Your Money <br /> with Confidence
                    </h1>
                    <p className="text-xl text-blue-100 max-w-2xl leading-relaxed">
                        ExpenseTracker is your personal finance companion, designed to help you take control of your spending and achieve your financial goals with ease.
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 space-y-20">
                {/* Mission Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
                            Our Mission
                        </div>
                        <h2 className="text-4xl font-black text-slate-900">
                            Simplify Your Financial Life
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            We believe financial management shouldn't be complicated. Our mission is to provide a simple, intuitive platform that helps everyone understand where their money goes and make smarter spending decisions.
                        </p>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            Whether you're tracking daily expenses or planning for the future, ExpenseTracker makes it easy and transparent.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-md transition-all">
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Users Tracking</p>
                            <p className="text-3xl font-black text-slate-900">10K+</p>
                        </div>
                        <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-md transition-all">
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Expenses Tracked</p>
                            <p className="text-3xl font-black text-slate-900">500K+</p>
                        </div>
                        <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-md transition-all">
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Countries</p>
                            <p className="text-3xl font-black text-slate-900">25+</p>
                        </div>
                        <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-md transition-all">
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Uptime</p>
                            <p className="text-3xl font-black text-slate-900">99.9%</p>
                        </div>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="space-y-8">
                    <div>
                        <h2 className="text-4xl font-black text-slate-900 mb-4">Why Choose ExpenseTracker?</h2>
                        <p className="text-lg text-slate-600">We combine powerful features with simplicity to give you the best experience.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-lg transition-all group"
                            >
                                <div className={`p-4 bg-${feature.color}-100 text-${feature.color}-600 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Benefits Section */}
                <div className="bg-white p-12 rounded-[40px] border border-slate-100 shadow-sm">
                    <h2 className="text-4xl font-black text-slate-900 mb-12">What You Get</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="flex items-start gap-4 p-4">
                                <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg flex-shrink-0 mt-1">
                                    <CheckCircle size={20} />
                                </div>
                                <p className="text-slate-700 font-medium text-lg">{benefit}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Story Section */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-12 rounded-[40px] shadow-xl">
                    <h2 className="text-4xl font-black mb-6">Our Story</h2>
                    <div className="space-y-4 text-lg text-slate-200 leading-relaxed max-w-3xl">
                        <p>
                            ExpenseTracker was born from a simple idea: managing finances shouldn't require complex spreadsheets or confusing apps.
                        </p>
                        <p>
                            Our team of developers and designers came together to create a platform that puts users first. We focused on making expense tracking intuitive, fast, and accessible to everyone.
                        </p>
                        <p>
                            Today, thousands of users trust ExpenseTracker to help them understand and manage their spending patterns. We're committed to continuous improvement and listening to our users' needs.
                        </p>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center space-y-6 py-12">
                    <h2 className="text-4xl font-black text-slate-900">Ready to Take Control?</h2>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Join thousands of users who are already managing their finances better with ExpenseTracker.
                    </p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg transition-all hover:-translate-y-0.5">
                        Get Started for Free
                    </button>
                </div>
            </div>
        </div>
    );
};

export default About;

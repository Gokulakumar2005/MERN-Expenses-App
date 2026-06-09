import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white px-6 py-16">
            <div className="max-w-6xl mx-auto grid gap-12 lg:grid-cols-2 items-center">
                <div className="space-y-6">
                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-4 py-2 text-sm font-semibold text-emerald-300">
                        Welcome to Expense Tracker
                    </span>
                    <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">
                        Keep your spending in control and reach your financial goals.
                    </h1>
                    <p className="max-w-2xl text-slate-300 leading-relaxed text-lg">
                        Expense Tracker helps you log expenses, view history, and manage your budget with a clean, easy-to-use interface.
                        Get started for free and see how quickly you can build better money habits.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <Link
                            to="/register"
                            className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-300"
                        >
                            Create Account
                        </Link>
                        <Link
                            to="/login"
                            className="inline-flex items-center justify-center rounded-full border border-slate-600 bg-slate-900/80 px-6 py-3 text-sm font-semibold text-white transition hover:border-emerald-400"
                        >
                            Login
                        </Link>
                    </div>
                </div>
                <div className="rounded-[2rem] bg-slate-900/80 p-8 shadow-2xl shadow-black/40 ring-1 ring-white/10">
                    <div className="space-y-5">
                        <div className="rounded-3xl bg-slate-950/90 p-6">
                            <h2 className="text-lg font-semibold text-white">Monthly Insights</h2>
                            <p className="mt-3 text-slate-400">Track spending by category, compare habits, and make smarter decisions with every purchase.</p>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="rounded-3xl bg-slate-900/90 p-5 shadow-inner shadow-white/5">
                                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Expenses</p>
                                <p className="mt-4 text-3xl font-bold text-emerald-300">₹24,480</p>
                            </div>
                            <div className="rounded-3xl bg-slate-900/90 p-5 shadow-inner shadow-white/5">
                                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Saved</p>
                                <p className="mt-4 text-3xl font-bold text-cyan-300">₹6,120</p>
                            </div>
                        </div>
                        <div className="rounded-3xl bg-slate-950/80 p-5 text-slate-300">
                            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Ready for your next goal?</p>
                            <p className="mt-3 text-base">Use powerful insights, automated expense logging, and fast login to stay on track.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;

import { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Send } from 'lucide-react';
import { toast } from 'react-toastify';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) {
            toast.error('Please fill in all required fields');
            return;
        }

        setIsSubmitting(true);
        setTimeout(() => {
            toast.success('Message sent successfully! We will get back to you soon.');
            setFormData({ name: '', email: '', subject: '', message: '' });
            setIsSubmitting(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-16 md:py-24">
                <div className="max-w-6xl mx-auto space-y-6">
                    <h1 className="text-5xl md:text-6xl font-black leading-tight">
                        Get in Touch
                    </h1>
                    <p className="text-xl text-emerald-100 max-w-2xl leading-relaxed">
                        Have questions or feedback? We'd love to hear from you. Our team is here to help!
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-black text-slate-900 mb-6">Contact Information</h2>
                            <p className="text-slate-600 text-lg leading-relaxed mb-8">
                                Reach out to us through any of these channels. We typically respond within 24 hours.
                            </p>
                        </div>

                        {/* Contact Cards */}
                        <div className="space-y-4">
                            <div className="bg-white p-6 rounded-[28px] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                                <div className="flex items-start gap-4">
                                    <div className="p-4 bg-blue-100 text-blue-600 rounded-xl group-hover:scale-110 transition-transform flex-shrink-0">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 mb-1">Email Us</h3>
                                        <p className="text-slate-600">support@expenseapp.com</p>
                                        <p className="text-sm text-slate-400 mt-2">We'll respond within 24 hours</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-[28px] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                                <div className="flex items-start gap-4">
                                    <div className="p-4 bg-emerald-100 text-emerald-600 rounded-xl group-hover:scale-110 transition-transform flex-shrink-0">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 mb-1">Call Us</h3>
                                        <p className="text-slate-600">+91 98765 43210</p>
                                        <p className="text-sm text-slate-400 mt-2">Mon - Fri, 9am - 6pm IST</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-[28px] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                                <div className="flex items-start gap-4">
                                    <div className="p-4 bg-purple-100 text-purple-600 rounded-xl group-hover:scale-110 transition-transform flex-shrink-0">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 mb-1">Visit Us</h3>
                                        <p className="text-slate-600">123 Finance Street</p>
                                        <p className="text-slate-600">Budget City, India - 400001</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-[28px] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                                <div className="flex items-start gap-4">
                                    <div className="p-4 bg-orange-100 text-orange-600 rounded-xl group-hover:scale-110 transition-transform flex-shrink-0">
                                        <MessageCircle size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 mb-1">Live Chat</h3>
                                        <p className="text-slate-600">Connect with our support team</p>
                                        <p className="text-sm text-slate-400 mt-2">Available during business hours</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm h-fit">
                        <h3 className="text-2xl font-black text-slate-900 mb-6">Send us a Message</h3>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Full Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your name"
                                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Email Address *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="your@email.com"
                                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="What is this about?"
                                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Message *</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Tell us more..."
                                    rows="5"
                                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all resize-none"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold py-3 px-6 rounded-2xl transition-all shadow-lg hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                <Send size={18} />
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* FAQ Preview */}
                <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm">
                    <h3 className="text-3xl font-black text-slate-900 mb-8">Quick Answers</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="font-bold text-slate-900 mb-2 text-lg">Do you have a mobile app?</h4>
                            <p className="text-slate-600">Our web app is fully responsive and works perfectly on mobile devices. A native mobile app is coming soon!</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 mb-2 text-lg">Is my data secure?</h4>
                            <p className="text-slate-600">Yes! We use industry-standard encryption and secure authentication methods to protect your financial data.</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 mb-2 text-lg">What payment methods do you accept?</h4>
                            <p className="text-slate-600">ExpenseTracker is completely free to use! No credit card required to get started.</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 mb-2 text-lg">How can I delete my account?</h4>
                            <p className="text-slate-600">You can request account deletion anytime from your profile settings. Your data will be permanently deleted.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;

import { useState } from 'react';
import { ChevronDown, HelpCircle, Mail, Phone, MessageCircle, Search, BookOpen } from 'lucide-react';

export default function Help() {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      id: 1,
      question: 'How do I add an expense?',
      answer: 'Go to the "Add Expense" section from the dashboard. Fill in the amount, date, category, and optional description. You can also upload a receipt which will be scanned automatically.'
    },
    {
      id: 2,
      question: 'Can I edit or delete expenses?',
      answer: 'Yes! In the "My Expenses" section, you can click on any transaction to edit its details. To delete, use the trash icon. Note that deleted expenses cannot be recovered.'
    },
    {
      id: 3,
      question: 'How does receipt scanning work?',
      answer: 'Upload an image or PDF of your receipt in the receipt upload section. Our AI will extract the amount, date, and description automatically. You can verify and edit these details before saving.'
    },
    {
      id: 4,
      question: 'What are budget limits and how do I set them?',
      answer: 'Budget limits help you control spending in specific categories. Go to the "Budget" section to set monthly limits. We\'ll alert you when you\'re approaching the limit.'
    },
    {
      id: 5,
      question: 'How do I access my financial reports?',
      answer: 'Visit the "Reports" section to view charts, category breakdowns, and spending trends. All reports are generated from your expense data.'
    },
    {
      id: 6,
      question: 'Is my data secure?',
      answer: 'Yes! We use industry-standard encryption and secure login methods. Your data is stored securely and only accessible to your account.'
    },
    {
      id: 7,
      question: 'Can I export my expense data?',
      answer: 'You can download transaction history from the "My Expenses" page. Export options include CSV and PDF formats.'
    },
    {
      id: 8,
      question: 'How do I reset my password?',
      answer: 'Use the "Forgot Password" option on the login page. You\'ll receive an OTP via email to reset your password securely.'
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold mb-4">
            <HelpCircle size={14} /> Support & Guidance
          </div>
          <h1 className="text-5xl font-black text-slate-900 mb-3">Help Center</h1>
          <p className="text-slate-500 text-lg">Find answers to common questions and get support</p>
        </div>

        {/* Search */}
        <div className="mb-10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-400 focus:border-transparent text-lg font-medium placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-[28px] border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all w-fit mb-4">
              <BookOpen size={24} />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Documentation</h3>
            <p className="text-slate-500 text-sm">Read our complete guide</p>
          </div>

          <div className="bg-white p-6 rounded-[28px] border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group">
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-all w-fit mb-4">
              <MessageCircle size={24} />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Contact Support</h3>
            <p className="text-slate-500 text-sm">Chat with our team</p>
          </div>

          <div className="bg-white p-6 rounded-[28px] border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group">
            <div className="p-3 bg-purple-100 text-purple-600 rounded-xl group-hover:bg-purple-600 group-hover:text-white transition-all w-fit mb-4">
              <HelpCircle size={24} />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">FAQ</h3>
            <p className="text-slate-500 text-sm">Quick answers below</p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-100">
            <h2 className="text-2xl font-black text-slate-900">Frequently Asked Questions</h2>
            <p className="text-slate-500 text-sm mt-1">
              {filteredFaqs.length} {filteredFaqs.length === 1 ? 'result' : 'results'} found
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {filteredFaqs.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-slate-500 font-medium">No results found. Try a different search.</p>
              </div>
            ) : (
              filteredFaqs.map((faq) => (
                <div key={faq.id} className="p-6 hover:bg-slate-50 transition-colors cursor-pointer">
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-start justify-between gap-4 text-left"
                  >
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-900 text-left">{faq.question}</h3>
                    </div>
                    <ChevronDown
                      size={24}
                      className={`text-slate-400 flex-shrink-0 transition-transform ${
                        expandedFaq === faq.id ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {expandedFaq === faq.id && (
                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-gradient-to-br from-blue-600 to-blue-700 p-10 rounded-[32px] shadow-xl text-white">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-black mb-3">Still need help?</h3>
            <p className="text-blue-100 mb-6">Our support team is here to help you. Reach out to us through any of these channels.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <Mail size={20} />
                  <div className="text-left">
                    <p className="text-xs text-blue-100">Email</p>
                    <p className="font-bold">support@expensetracker.com</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <Phone size={20} />
                  <div className="text-left">
                    <p className="text-xs text-blue-100">Phone</p>
                    <p className="font-bold">+91 98765 43210</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

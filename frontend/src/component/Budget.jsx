import { useState } from 'react';
import { Plus, Edit2, Trash2, Target, TrendingUp } from 'lucide-react';

export default function Budget() {
  const [budgets, setBudgets] = useState([
    { id: 1, category: 'Food & Dining', limit: 5000, spent: 3200, icon: '🍔' },
    { id: 2, category: 'Shopping', limit: 8000, spent: 4500, icon: '🛍️' },
    { id: 3, category: 'Entertainment', limit: 3000, spent: 1800, icon: '🎬' },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ category: '', limit: '' });

  const addBudget = () => {
    if (formData.category && formData.limit) {
      setBudgets([...budgets, { id: Date.now(), category: formData.category, limit: parseInt(formData.limit), spent: 0, icon: '📊' }]);
      setFormData({ category: '', limit: '' });
      setShowForm(false);
    }
  };

  const deleteBudget = (id) => {
    setBudgets(budgets.filter(b => b.id !== id));
  };

  const totalLimit = budgets.reduce((sum, b) => sum + b.limit, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
              <Target size={14} /> Budget Management
            </div>
            <h1 className="text-5xl font-black text-slate-900">Budget Planner</h1>
            <p className="text-slate-500 text-lg">Create and manage budgets for different categories</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg transition-all hover:-translate-y-0.5"
          >
            <Plus size={20} /> Add Budget
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-500 font-bold uppercase text-xs tracking-widest">Total Budget</h3>
              <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                <Target size={20} />
              </div>
            </div>
            <p className="text-4xl font-black text-slate-900">₹{totalLimit.toLocaleString()}</p>
            <p className="text-slate-400 text-sm mt-2">{budgets.length} active budgets</p>
          </div>

          <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-500 font-bold uppercase text-xs tracking-widest">Total Spent</h3>
              <div className="p-3 bg-orange-100 text-orange-600 rounded-xl">
                <TrendingUp size={20} />
              </div>
            </div>
            <p className="text-4xl font-black text-slate-900">₹{totalSpent.toLocaleString()}</p>
            <p className="text-slate-400 text-sm mt-2">{Math.round((totalSpent / totalLimit) * 100)}% of total</p>
          </div>

          <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-500 font-bold uppercase text-xs tracking-widest">Remaining</h3>
              <div className="p-3 bg-green-100 text-green-600 rounded-xl">
                💰
              </div>
            </div>
            <p className="text-4xl font-black text-slate-900">₹{(totalLimit - totalSpent).toLocaleString()}</p>
            <p className="text-green-600 text-sm mt-2 font-semibold">Spending control: Good</p>
          </div>
        </div>

        {/* Add Budget Form */}
        {showForm && (
          <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-lg mb-10 animated-fade-in">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Create New Budget</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Category (e.g., Food, Shopping)"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="px-4 py-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
              <input
                type="number"
                placeholder="Budget Limit (₹)"
                value={formData.limit}
                onChange={(e) => setFormData({ ...formData, limit: e.target.value })}
                className="px-4 py-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
              <div className="flex gap-2">
                <button
                  onClick={addBudget}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-2xl transition-all"
                >
                  Create
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-2xl transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Budget Cards */}
        <div className="space-y-4">
          {budgets.length === 0 ? (
            <div className="bg-white p-16 rounded-[32px] border border-slate-100 shadow-sm text-center">
              <p className="text-slate-500 font-medium">No budgets created yet. Start by adding your first budget!</p>
            </div>
          ) : (
            budgets.map((budget) => {
              const percentage = Math.round((budget.spent / budget.limit) * 100);
              const isExceeded = percentage > 100;
              const isNearing = percentage > 75;

              return (
                <div key={budget.id} className="bg-white p-6 rounded-[28px] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{budget.icon}</div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{budget.category}</h3>
                        <p className="text-sm text-slate-400">Budget limit: ₹{budget.limit.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-slate-100 rounded-xl transition-all">
                        <Edit2 size={16} className="text-slate-400" />
                      </button>
                      <button onClick={() => deleteBudget(budget.id)} className="p-2 hover:bg-red-50 rounded-xl transition-all">
                        <Trash2 size={16} className="text-red-400" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600 font-medium">Spent: ₹{budget.spent.toLocaleString()}</span>
                      <span className={`font-bold ${isExceeded ? 'text-red-600' : isNearing ? 'text-orange-600' : 'text-green-600'}`}>
                        {percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full transition-all rounded-full ${
                          isExceeded ? 'bg-red-500' : isNearing ? 'bg-orange-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

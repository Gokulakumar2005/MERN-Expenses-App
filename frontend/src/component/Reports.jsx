import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetStats } from "../slices/expenseSlices";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, PieChart as PieChartIcon, BarChart3, DollarSign } from "lucide-react";

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316'];

export default function Reports() {
  const dispatch = useDispatch();
  const { stats } = useSelector((state) => state.Expense);

  useEffect(() => {
    dispatch(GetStats());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold mb-4">
            <TrendingUp size={14} /> Analytics
          </div>
          <h1 className="text-5xl font-black text-slate-900 mb-2">Financial Reports</h1>
          <p className="text-slate-500 text-lg">Visualize your spending patterns and insights</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-500 font-bold uppercase text-xs tracking-widest">Total Spent</h3>
              <div className="p-3 bg-blue-100 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                <DollarSign size={20} />
              </div>
            </div>
            <p className="text-4xl font-black text-slate-900">₹{stats.totalAmount?.toLocaleString?.() ?? 0}</p>
            <p className="text-slate-400 text-sm mt-2">{stats.totalCount ?? 0} transactions</p>
          </div>

          <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-500 font-bold uppercase text-xs tracking-widest">Average Spending</h3>
              <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-all">
                <TrendingUp size={20} />
              </div>
            </div>
            <p className="text-4xl font-black text-slate-900">
              ₹{stats.totalCount ? Math.round(stats.totalAmount / stats.totalCount).toLocaleString() : 0}
            </p>
            <p className="text-slate-400 text-sm mt-2">Per transaction</p>
          </div>

          <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-500 font-bold uppercase text-xs tracking-widest">Categories</h3>
              <div className="p-3 bg-purple-100 text-purple-600 rounded-xl group-hover:bg-purple-600 group-hover:text-white transition-all">
                <PieChartIcon size={20} />
              </div>
            </div>
            <p className="text-4xl font-black text-slate-900">{stats.categoryData?.length ?? 0}</p>
            <p className="text-slate-400 text-sm mt-2">Tracked categories</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Bar Chart */}
          <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                <BarChart3 size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Category Breakdown</h3>
                <p className="text-slate-400 text-xs">Spending by category</p>
              </div>
            </div>
            <div style={{ width: '100%', height: 340 }}>
              {stats.categoryData && stats.categoryData.length > 0 ? (
                <ResponsiveContainer>
                  <BarChart data={stats.categoryData.slice(0, 8)}>
                    <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} />
                    <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        borderRadius: '16px',
                        border: 'none',
                        boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)',
                      }}
                    />
                    <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-slate-400">
                  No data available
                </div>
              )}
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
                <PieChartIcon size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Expense Distribution</h3>
                <p className="text-slate-400 text-xs">Percentage split</p>
              </div>
            </div>
            <div style={{ width: '100%', height: 340 }}>
              {stats.categoryData && stats.categoryData.length > 0 ? (
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={stats.categoryData.slice(0, 6)}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {stats.categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        borderRadius: '16px',
                        border: 'none',
                        boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-slate-400">
                  No data available
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Top Categories Table */}
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Top Spending Categories</h3>
          {stats.categoryData && stats.categoryData.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-slate-100">
                    <th className="px-4 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Category</th>
                    <th className="px-4 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-widest">Amount</th>
                    <th className="px-4 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-widest">Percentage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {stats.categoryData.map((category, index) => (
                    <tr key={index} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                          <span className="font-semibold text-slate-900">{category.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-right text-slate-900 font-bold">₹{category.value.toLocaleString()}</td>
                      <td className="px-4 py-4 text-right">
                        <span className="inline-flex items-center justify-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold">
                          {((category.value / stats.totalAmount) * 100).toFixed(1)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400">
              <p>No spending data available yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

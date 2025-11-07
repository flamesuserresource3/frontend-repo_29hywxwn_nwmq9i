import React, { useMemo, useState } from 'react';

function monthKey(date) {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function getFinancialYear(date) {
  const d = new Date(date);
  const year = d.getMonth() >= 3 ? d.getFullYear() : d.getFullYear() - 1; // FY starts Apr
  return `${year}-${String(year + 1).slice(-2)}`;
}

// Sample data; in a real app this would come from backend
const sampleTrades = [
  { id: 1, date: '2024-04-12', symbol: 'AAPL', side: 'BUY', qty: 10, price: 180, pnl: 120 },
  { id: 2, date: '2024-05-02', symbol: 'TSLA', side: 'SELL', qty: 5, price: 200, pnl: -75 },
  { id: 3, date: '2024-06-18', symbol: 'MSFT', side: 'BUY', qty: 8, price: 330, pnl: 210 },
  { id: 4, date: '2024-08-03', symbol: 'NVDA', side: 'SELL', qty: 3, price: 420, pnl: 55 },
  { id: 5, date: '2025-01-11', symbol: 'AMZN', side: 'BUY', qty: 2, price: 150, pnl: -30 },
  { id: 6, date: '2025-03-22', symbol: 'META', side: 'SELL', qty: 4, price: 375, pnl: 90 },
];

export default function Dashboard() {
  const [fy, setFy] = useState(getFinancialYear(new Date()));

  const months = [
    'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'
  ];

  const allFYs = useMemo(() => {
    const fys = new Set(sampleTrades.map(t => getFinancialYear(t.date)));
    return Array.from(fys).sort();
  }, []);

  const pnlByMonth = useMemo(() => {
    const mapping = months.reduce((acc, m) => ({ ...acc, [m]: 0 }), {});
    sampleTrades
      .filter(t => getFinancialYear(t.date) === fy)
      .forEach(t => {
        const d = new Date(t.date);
        const monthIdx = d.getMonth();
        const fiscalIdx = monthIdx >= 3 ? monthIdx - 3 : monthIdx + 9; // map Apr..Mar -> 0..11
        const monthName = months[fiscalIdx];
        mapping[monthName] += t.pnl;
      });
    return mapping;
  }, [fy]);

  const total = Object.values(pnlByMonth).reduce((a, b) => a + b, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500">Profit & Loss overview by month</p>
        </div>
        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-600">Financial Year</label>
          <select
            value={fy}
            onChange={(e) => setFy(e.target.value)}
            className="rounded-md border-gray-300 focus:border-gray-900 focus:ring-gray-900"
          >
            {allFYs.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-medium text-gray-900 mb-4">Monthly P&L</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {months.map((m) => (
              <div key={m} className="text-center">
                <div className="text-xs text-gray-500 mb-1">{m}</div>
                <div className={`text-sm font-semibold ${pnlByMonth[m] >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>{pnlByMonth[m] >= 0 ? '+' : ''}{pnlByMonth[m].toFixed(0)}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-medium text-gray-900 mb-4">Summary</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Total P&L</span>
              <span className={`font-semibold ${total >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>{total >= 0 ? '+' : ''}{total.toFixed(0)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Best Month</span>
              <span className="font-semibold text-gray-900">
                {Object.entries(pnlByMonth).sort((a,b)=>b[1]-a[1])[0][0]}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Worst Month</span>
              <span className="font-semibold text-gray-900">
                {Object.entries(pnlByMonth).sort((a,b)=>a[1]-b[1])[0][0]}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 mt-6">
        <h3 className="font-medium text-gray-900 mb-4">Recent Trades</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600">
                <th className="py-2 pr-4">Date</th>
                <th className="py-2 pr-4">Symbol</th>
                <th className="py-2 pr-4">Side</th>
                <th className="py-2 pr-4">Qty</th>
                <th className="py-2 pr-4">Price</th>
                <th className="py-2 pr-4">P&L</th>
              </tr>
            </thead>
            <tbody>
              {sampleTrades
                .filter(t => getFinancialYear(t.date) === fy)
                .sort((a,b)=> new Date(b.date) - new Date(a.date))
                .map(t => (
                <tr key={t.id} className="border-t border-gray-100">
                  <td className="py-2 pr-4 text-gray-900">{t.date}</td>
                  <td className="py-2 pr-4">{t.symbol}</td>
                  <td className="py-2 pr-4">{t.side}</td>
                  <td className="py-2 pr-4">{t.qty}</td>
                  <td className="py-2 pr-4">{t.price}</td>
                  <td className={`py-2 pr-4 font-medium ${t.pnl >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>{t.pnl >= 0 ? '+' : ''}{t.pnl}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import React from "react";

const statusConfig = {
  Delivered: { color: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200", dot: "bg-emerald-500" },
  Processing: { color: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200", dot: "bg-amber-500" },
  Shipped: { color: "text-blue-700", bg: "bg-blue-50", border: "border-blue-200", dot: "bg-blue-500" },
};

export default function ProfileInfo({ user, orders, onViewAllOrders }) {
  return (
    <div className="fade-up space-y-6">
      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-[#111827]">Personal Information</h3>
          <button className="flex items-center gap-2 text-sm font-semibold text-[#111827] border border-gray-200 px-4 py-2 rounded-xl hover:bg-gray-50 transition-all">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Edit Profile
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { label: "Full Name", value: user.name },
            { label: "Email Address", value: user.email },
            { label: "Phone", value: user.phone },
          ].map((item, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <p className="text-[10px] tracking-[3px] uppercase text-gray-400 font-semibold mb-1">{item.label}</p>
              <p className="text-[#111827] font-semibold text-sm">{item.value || "—"}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Orders Preview */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-[#111827]">Recent Orders</h3>
          <button onClick={onViewAllOrders} className="text-sm text-[#111827] font-semibold hover:underline">View All →</button>
        </div>
        <div className="space-y-3">
          {orders.slice(0, 2).map((order) => {
            const s = statusConfig[order.status] || statusConfig.Processing;
            return (
              <div key={order.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-[#111827] text-sm">Order #{order.id.split("-")[0]}</p>
                    <p className="text-gray-400 text-xs">{new Date(order.createdAt).toLocaleDateString()} · {order.items?.length || 0} items</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border ${s.color} ${s.bg} ${s.border}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                    {order.status}
                  </span>
                  <p className="font-semibold text-[#111827] text-sm">₹{parseFloat(order.totalAmount).toFixed(2)}</p>
                </div>
              </div>
            );
          })}
          {orders.length === 0 && <p className="text-sm text-gray-500">No orders yet.</p>}
        </div>
      </div>
    </div>
  );
}

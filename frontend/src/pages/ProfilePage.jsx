import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProfile, addAddress, removeAddress } from "../services/userService";
import { getMyOrders } from "../services/orderService";
import { useAuth } from "../hooks/useAuth";
import ProfileHero from "./profile/ProfileHero";
import ProfileInfo from "./profile/ProfileInfo";
import OrderHistory from "./profile/OrderHistory";
import ProfileWishlist from "./profile/ProfileWishlist";
import AddressBook from "./profile/AddressBook";

const mockWishlist = [
  {
    id: 201,
    name: "Vitamin C Serum",
    price: 29.99,
    originalPrice: 39.99,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80",
  },
  {
    id: 202,
    name: "Omega-3 Capsules",
    price: 49.99,
    originalPrice: 59.99,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80",
  },
  {
    id: 203,
    name: "Collagen Powder",
    price: 34.99,
    originalPrice: 44.99,
    image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400&q=80",
  },
];

const tabs = ["Overview", "Orders", "Wishlist", "Addresses"];

export default function ProfilePage() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [activeTab, setActiveTab] = useState("Overview");
  const [wishlist, setWishlist] = useState(mockWishlist);
  const [newAddress, setNewAddress] = useState("");
  const [showAddressForm, setShowAddressForm] = useState(false);

  const { data: userProfile, isLoading: isUserLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const { data: ordersData, isLoading: isOrdersLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: getMyOrders,
  });

  const addAddrMut = useMutation({
    mutationFn: addAddress,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["profile"] });
      setNewAddress("");
      setShowAddressForm(false);
    },
  });

  const remAddrMut = useMutation({
    mutationFn: removeAddress,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  if (isUserLoading || isOrdersLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        Loading Profile...
      </div>
    );
  }

  const user = userProfile || { name: "Guest User", email: "" };
  const orders = ordersData?.data || [];
  const addresses = user.addresses || [];

  const removeWishlist = useCallback(
    (id) => setWishlist((prev) => prev.filter((i) => i.id !== id)),
    [],
  );

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation: fadeUp 0.5s ease both; }
      `}</style>

      <ProfileHero
        user={user}
        orders={orders}
        wishlist={wishlist}
        addresses={addresses}
      />

      <div className="max-w-[1400px] mx-auto px-3 lg:px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-2xl p-1.5 shadow-sm border border-gray-100 mb-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 min-w-max py-2.5 px-5 rounded-xl text-sm font-semibold transition-all ${activeTab === tab ? "bg-[#111827] text-white shadow-md" : "text-gray-500 hover:text-[#111827] hover:bg-gray-50"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "Overview" && (
          <ProfileInfo
            user={user}
            orders={orders}
            onViewAllOrders={() => setActiveTab("Orders")}
          />
        )}

        {activeTab === "Orders" && <OrderHistory orders={orders} />}

        {activeTab === "Wishlist" && (
          <ProfileWishlist wishlist={wishlist} onRemove={removeWishlist} />
        )}

        {activeTab === "Addresses" && (
          <AddressBook
            addresses={addresses}
            onRemove={(id) => remAddrMut.mutate(id)}
            isRemoving={remAddrMut.isPending}
            newAddress={newAddress}
            setNewAddress={setNewAddress}
            showAddressForm={showAddressForm}
            setShowAddressForm={setShowAddressForm}
            onSave={(addr) => addAddrMut.mutate(addr)}
            isSaving={addAddrMut.isPending}
          />
        )}
      </div>
    </div>
  );
}

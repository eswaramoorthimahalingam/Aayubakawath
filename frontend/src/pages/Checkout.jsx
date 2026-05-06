import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getProfile, addAddress } from "../services/userService";
import { getCart } from "../services/cartService";
import { createOrder } from "../services/orderService";
import CheckoutSteps from "./checkout/CheckoutSteps";
import AddressSelector from "./checkout/AddressSelector";
import NewAddressForm from "./checkout/NewAddressForm";
import OrderSummary from "./checkout/OrderSummary";

export default function Checkout() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [step] = useState(0);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [newAddress, setNewAddress] = useState("");

  const { data: userProfile, isLoading: isUserLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const { data: cartData, isLoading: isCartLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });

  const orderMut = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cart"] });
      qc.invalidateQueries({ queryKey: ["orders"] });
      localStorage.removeItem("applied_coupon_code");
      toast.success("Order placed successfully!");
      navigate("/profile");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to place order.");
    },
  });

  const addressMut = useMutation({
    mutationFn: addAddress,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["profile"] });
      setNewAddress("");
    },
  });

  if (isUserLoading || isCartLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="label text-[var(--color-text-muted)]">
          Loading Checkout...
        </p>
      </div>
    );
  }

  const addresses = userProfile?.addresses || [];
  const cartItems = cartData?.data || [];

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-5">
        <h2
          className="display-heading text-[var(--color-text)]"
          style={{ fontSize: "2rem" }}
        >
          Your cart is empty!
        </h2>
        <button
          onClick={() => navigate("/productListing")}
          className="btn-primary"
        >
          Shop Now
        </button>
      </div>
    );
  }

  const subtotal = cartItems.reduce(
    (acc, curr) =>
      acc +
      curr.quantity *
        parseFloat(curr.product?.finalPrice || curr.product?.price || 0),
    0,
  );
  const shipping = subtotal >= 999 ? 0 : 79;

  const handlePlaceOrder = () => {
    let finalAddress = selectedAddress;
    if (!finalAddress) {
      if (!newAddress.trim()) {
        toast.error("Please select or enter a shipping address.");
        return;
      }
      finalAddress = newAddress;
    }
    const addressParts =
      typeof finalAddress === "string"
        ? finalAddress.split(",").map((s) => s.trim())
        : [];
    const shippingAddress = {
      street:
        typeof finalAddress === "string"
          ? finalAddress
          : finalAddress.details || finalAddress.street || "",
      city: addressParts.length > 1 ? addressParts[1] : "Tiruppur",
      state: addressParts.length > 2 ? addressParts[2] : "Tamil Nadu",
      postalCode: addressParts.length > 3 ? addressParts[3] : "641662",
      country: "India",
    };
    const couponCode = localStorage.getItem("applied_coupon_code") || undefined;
    orderMut.mutate({ shippingAddress, couponCode });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-[var(--color-border)] bg-white">
        <div className="max-w-[1400px] mx-auto px-3 lg:px-4 py-8">
          <div className="flex items-center gap-4 mb-1">
            <div className="w-8 h-px bg-[var(--color-sage)]" />
            <p className="label" style={{ fontSize: "0.6rem" }}>
              Checkout
            </p>
          </div>
          <h1
            className="display-heading text-[var(--color-text)]"
            style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
          >
            Complete Your Order
          </h1>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-3 lg:px-4 py-10 lg:py-14">
        <CheckoutSteps step={step} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
          <div className="bg-white border border-[var(--color-border)] rounded-[var(--radius-lg)] p-8 shadow-[var(--shadow-sm)]">
            <h2
              className="display-heading text-[var(--color-text)] mb-6"
              style={{ fontSize: "1.6rem" }}
            >
              Delivery Address
            </h2>

            <AddressSelector
              addresses={addresses}
              selectedAddress={selectedAddress}
              onSelect={(details) => {
                setSelectedAddress(details);
                setNewAddress("");
              }}
            />

            <NewAddressForm
              newAddress={newAddress}
              setNewAddress={setNewAddress}
              setSelectedAddress={setSelectedAddress}
              onSave={(addr) => addressMut.mutate(addr)}
              isSaving={addressMut.isPending}
              hasAddresses={addresses.length > 0}
            />
          </div>

          <OrderSummary
            cartItems={cartItems}
            subtotal={subtotal}
            shipping={shipping}
            onPlaceOrder={handlePlaceOrder}
            isPending={orderMut.isPending}
          />
        </div>
      </div>
    </div>
  );
}

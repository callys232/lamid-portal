"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "./Cartcontext";
import Image from "next/image";

const CartDrawer: React.FC = () => {
  const { cart, removeFromCart, clearCart, toggleCart, isOpen } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 20 }}
          className="fixed top-0 right-0 w-80 h-full bg-[#0b0b0b] text-white shadow-lg border-l border-gray-700 z-50 flex flex-col"
        >
          {/* Header */}
          <div className="flex justify-between items-center px-4 py-3 border-b border-gray-700">
            <h2 className="text-lg font-bold text-blue-400">Your Cart</h2>
            <button
              onClick={toggleCart}
              className="text-white hover:text-[#c21219] text-xl"
            >
              ✕
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
            {cart.length === 0 ? (
              <p className="text-gray-400 text-sm">Your cart is empty.</p>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 border-b border-gray-700 pb-2"
                >
                  <div className="relative w-12 h-12 rounded overflow-hidden border border-gray-600">
                    <Image
                      src={item.imagePath}
                      alt={item.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p className="flex-1 text-sm">{item.name}</p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-xs text-[#c21219] hover:text-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-gray-700 flex gap-2">
            <button
              onClick={clearCart}
              className="flex-1 bg-[#c21219] text-white py-2 rounded hover:bg-red-700 transition"
            >
              Clear
            </button>
            <button className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-500 transition">
              Checkout
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;

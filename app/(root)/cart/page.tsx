"use client"; // This component uses client-side interactivity (useState, onClick)

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2 } from "lucide-react"; // Icons from lucide-react
import Image from "next/image";
import { useState } from "react";

interface CartItem {
  id: string;
  name: string;
  brand: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "AirPods Max",
      brand: "Apple",
      price: 299,
      quantity: 1,
      imageUrl: "/website/headphone-1.jpg",
    },
    {
      id: "2",
      name: "AirPods Max",
      brand: "Apple",
      price: 299,
      quantity: 1,
      imageUrl: "/website/headphone-1.jpg",
    },
    {
      id: "3",
      name: "AirPods Max",
      brand: "Apple",
      price: 299,
      quantity: 1,
      imageUrl: "/website/headphone-1.jpg",
    },
  ]);

  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("card");

  // --- Cart Item Actions ---
  const handleQuantityChange = (id: string, newQuantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // --- Calculations ---
  const itemsTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = 0; // Placeholder for discount
  const shipping = 0; // Placeholder for shipping
  const subtotal = itemsTotal - discount;
  const finalTotal = subtotal + shipping;

  return (
    <div className="container mx-auto p-4 md:p-8 lg:p-12 font-sans">
      {" "}
      {/* Added font-sans as default */}
      <h1 className="text-3xl font-bold mb-8">Your Cart.</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Section: Cart Items */}
        <div className="flex-1 space-y-4">
          {cartItems.length === 0 ? (
            <p className="text-gray-600 text-lg">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center p-4 border rounded-lg shadow-sm bg-white"
              >
                {/* Product Image */}
                <div className="relative w-20 h-20 mr-4 flex-shrink-0">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    layout="fill"
                    objectFit="contain"
                    className="rounded-md"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-grow">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-sm text-gray-500">Brand: {item.brand}</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-2 mx-4 flex-shrink-0">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center font-medium">
                    {item.quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {/* Price */}
                <div className="font-semibold text-lg min-w-[70px] text-right flex-shrink-0">
                  ${item.price.toFixed(2)}
                </div>

                {/* Delete Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-4 text-gray-400 hover:text-red-500 flex-shrink-0"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            ))
          )}
          <Button className="mt-4 w-full lg:w-auto" variant="outline">
            Continue Shopping <span className="ml-2">↗</span>
          </Button>
        </div>

        {/* Right Section: Payment & Summary */}
        <div className="lg:w-1/2 flex flex-col space-y-6 bg-gray-50 p-6 rounded-lg shadow-sm">
          {/* Payment Method Selection */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">How you will pay</h2>
            <RadioGroup
              defaultValue={selectedPaymentMethod}
              onValueChange={setSelectedPaymentMethod}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="card" id="r1" />
                <Label
                  htmlFor="r1"
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <span className="flex">
                    <Image
                      src="/website/visa.png"
                      alt="Visa"
                      width={30}
                      height={20}
                      className="mr-1"
                    />
                    <Image
                      src="/website/visa.png"
                      alt="American Express"
                      width={30}
                      height={20}
                      className="mr-1"
                    />
                    <Image
                      src="/website/visa.png"
                      alt="Mastercard"
                      width={30}
                      height={20}
                    />
                  </span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cash" id="r2" />
                <Label htmlFor="r2" className="cursor-pointer">
                  Cash on delivery
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Order Summary */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Order Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Item(s) Total :</span>
                <span>${itemsTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount :</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Subtotal :</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping :</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Item(s) Total :</span>{" "}
                {/* This seems like a duplicate 'final total' in the design */}
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <Button className="mt-4 w-full">
            Proceed to checkout <span className="ml-2">↗</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

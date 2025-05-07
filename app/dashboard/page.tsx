"use client";
import React from "react";
import { useUserStore } from "../store/useUserStore";

const Home = () => {
  const user = useUserStore((state) => state.user);
  console.log(user);
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h1 className="text-center text-4xl font-bold text-gray-800 mb-6">
        ACME-Electronics Admin Panel
      </h1>
      <p className="text-center text-gray-600">
        Welcome to your dashboard. Select an option from the sidebar to get
        started.
      </p>
    </div>
  );
};

export default Home;

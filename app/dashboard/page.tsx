// app/dashboard/page.tsx
import React from "react";

const Home = () => {
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

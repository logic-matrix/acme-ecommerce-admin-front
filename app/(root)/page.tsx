"use client";
import React from "react";
import { useUserStore } from "../store/useUserStore";

const Home = () => {
  const user = useUserStore((state) => state.user);
  console.log(user);
  return (
    <div>
      <h1 className="text-center text-4xl mt-10">
        ACME-Electronics User Panel
      </h1>
    </div>
  );
};

export default Home;

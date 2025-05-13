"use client";
import Navbar from "@/components/website/Navbar";
import { useUserStore } from "../store/useUserStore";

const Home = () => {
  const user = useUserStore((state) => state.user);
  console.log(user);
  return (
    <div>
      <Navbar></Navbar>
    </div>
  );
};

export default Home;

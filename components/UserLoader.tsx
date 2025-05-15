"use client";

import { useEffect } from "react";
import { useUserStore, User } from "@/app/store/useUserStore";
import axios from "axios";

export const UserLoader = () => {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get<User>("/api/proxy/profile", {
          withCredentials: true,
        });
        const user = res.data;
        setUser(user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [setUser]);

  return null;
};

"use client";

import { useUserStore } from "@/app/store/useUserStore";
import { handleLogout } from "@/lib/logout";
import axios from "axios";
import { Bell, ChevronDown, Search, User } from "lucide-react"; // Removed X, DialogClose handles it
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react"; // Added useMemo
import { Toaster, toast } from "sonner";

// Shadcn/ui components
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Define Notification Type
interface Notification {
  id: number;
  userId: number;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

interface NotificationsApiResponse {
  data: Notification[];
}
interface UnreadCountApiResponse {
  count: number;
}

const DashboardTopNav = ({
  sidebarCollapsed,
}: {
  sidebarCollapsed: boolean;
}) => {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const user = useUserStore((state) => state.user);

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoadingNotifications, setIsLoadingNotifications] = useState(true);
  const [notificationsError, setNotificationsError] = useState<string | null>(
    null
  );

  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [isLoadingUnreadCount, setIsLoadingUnreadCount] = useState(true); // Kept for consistency
  const [unreadCountError, setUnreadCountError] = useState<string | null>(null); // Kept for consistency
  console.log(isLoadingUnreadCount);
  console.log(unreadCountError);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);
  console.log("The Selected Notification:", selectedNotification);

  const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const fetchNotifications = useCallback(async () => {
    if (!BACKEND_BASE_URL || !user?.id) {
      setIsLoadingNotifications(false);
      setNotifications([]); // Clear notifications if no user/URL
      return;
    }
    setIsLoadingNotifications(true);
    setNotificationsError(null);
    try {
      const res = await axios.get<NotificationsApiResponse>(
        `${BACKEND_BASE_URL}/api/notifications`,
        {
          withCredentials: true,
        }
      );
      if (res.data && Array.isArray(res.data.data)) {
        setNotifications(res.data.data);
      } else {
        console.warn(
          "Unexpected response structure for notifications:",
          res.data
        );
        setNotifications([]);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setNotificationsError(
        axios.isAxiosError(error)
          ? error.response?.data?.message || error.message
          : "An unexpected error occurred."
      );
      toast.error("Failed to load notifications.");
      setNotifications([]); // Clear notifications on error
    } finally {
      setIsLoadingNotifications(false);
    }
  }, [BACKEND_BASE_URL, user?.id]);

  const fetchUnreadCount = useCallback(async () => {
    if (!BACKEND_BASE_URL || !user?.id) {
      setIsLoadingUnreadCount(false);
      setUnreadCount(0);
      return;
    }
    setIsLoadingUnreadCount(true);
    setUnreadCountError(null);
    try {
      const res = await axios.get<UnreadCountApiResponse>(
        `${BACKEND_BASE_URL}/api/notifications/unread-count`,
        {
          withCredentials: true,
        }
      );
      console.log("Response Data", res.data.data);
      if (res.data && typeof res.data.data.count === "number") {
        setUnreadCount(res.data.data.count);
      } else {
        setUnreadCount(0);
      }
    } catch (error) {
      console.error("Error fetching unread count:", error);
      setUnreadCountError(
        axios.isAxiosError(error)
          ? error.response?.data?.message || error.message
          : "An unexpected error occurred."
      );
      setUnreadCount(0);
    } finally {
      setIsLoadingUnreadCount(false);
    }
  }, [BACKEND_BASE_URL, user?.id]);

  useEffect(() => {
    if (user?.id) {
      fetchNotifications();
      fetchUnreadCount();
    } else {
      setNotifications([]);
      setUnreadCount(0);
      setIsLoadingNotifications(false);
      setIsLoadingUnreadCount(false);
    }
  }, [user?.id, fetchNotifications, fetchUnreadCount]);

  const displayUnreadCount = () => {
    if (unreadCount <= 0) {
      return null;
    }
    if (unreadCount > 9) {
      return "9+";
    }
    return unreadCount.toString();
  };
  console.log("Show notification that are Unread Count", displayUnreadCount());

  const handleMarkAsRead = async (notificationId: number) => {
    if (!BACKEND_BASE_URL) return;
    try {
      await axios.patch(
        `${BACKEND_BASE_URL}/api/notifications/${notificationId}/read`,
        {},
        {
          withCredentials: true,
        }
      );
      await fetchNotifications(); // Re-fetch to get updated isRead status for sorting
      await fetchUnreadCount(); // Update badge
    } catch (error) {
      console.error("Error marking as read:", error);
      toast.error(
        axios.isAxiosError(error)
          ? error.response?.data?.message || "Failed to mark as read."
          : "An unexpected error occurred."
      );
    }
  };

  const handleMarkAllAsRead = async () => {
    if (!BACKEND_BASE_URL || !user?.id || unreadCount === 0) return;
    try {
      await axios.patch(
        `${BACKEND_BASE_URL}/api/notifications/mark-all-read`,
        {},
        {
          withCredentials: true,
        }
      );
      toast.success("All notifications marked as read");
      await fetchNotifications(); // Re-fetch to update list for sorting
      await fetchUnreadCount(); // Update badge
    } catch (error) {
      console.error("Error marking all as read:", error);
      toast.error(
        axios.isAxiosError(error)
          ? error.response?.data?.message || "Failed to mark all as read."
          : "An unexpected error occurred."
      );
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotification(notification);
    setIsModalOpen(true);
    if (!notification.isRead) {
      handleMarkAsRead(notification.id);
    }
  };

  // Sort notifications: unread first, then by newest date for both groups
  const sortedNotifications = useMemo(() => {
    return [...notifications].sort((a, b) => {
      if (a.isRead !== b.isRead) {
        return a.isRead ? 1 : -1; // Unread (false) come before read (true)
      }
      // If both are same status (both unread or both read), sort by date (newest first)
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [notifications]);

  return (
    <>
      <header
        className={`bg-white shadow-sm fixed top-0 h-16 z-20 transition-all duration-300 ${
          sidebarCollapsed ? "left-16 right-0" : "left-64 right-0"
        }`}
      >
        <div className="flex items-center justify-between px-6 h-full">
          <Toaster richColors />
          <div className="flex items-center flex-1 max-w-2xl">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-700" />
              </div>
              <input
                className="block text-slate-600 w-full pl-10 pr-4 py-2.5 border border-gray-400 rounded-lg leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 text-base"
                placeholder="Search..."
                type="search"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4 ml-6">
            <div className="relative">
              <button
                className="relative group p-2 rounded-md bg-white border border-gray-300 hover:shadow-sm transition duration-200"
                onClick={() => {
                  setNotificationsOpen(!notificationsOpen);
                  if (!notificationsOpen && user?.id) {
                    // Fetch on opening if user is present
                    fetchNotifications();
                    fetchUnreadCount();
                  }
                }}
                aria-label="Toggle notifications dropdown"
              >
                <Bell
                  className="text-gray-600 group-hover:text-blue-600"
                  size={20}
                />
                {displayUnreadCount() && (
                  <span className="absolute -top-2 -right-2 flex items-center justify-center h-5 w-5 min-w-[20px] rounded-full bg-red-500 text-white text-xs font-bold ring-2 ring-white px-1">
                    {displayUnreadCount()}
                  </span>
                )}
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-xl z-30 border border-gray-200">
                  <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Notifications
                    </h3>
                    {unreadCount > 0 && ( // Show if there are any unread notifications globally
                      <button
                        onClick={handleMarkAllAsRead}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>
                  <div className="space-y-1 p-2 max-h-96 overflow-y-auto">
                    {isLoadingNotifications ? (
                      <div className="text-center text-gray-500 py-4">
                        Loading...
                      </div>
                    ) : notificationsError ? (
                      <div className="text-center text-red-500 py-4">
                        {notificationsError}
                      </div>
                    ) : sortedNotifications.length === 0 ? (
                      <div className="text-center text-gray-500 py-4 px-2">
                        No notifications yet.
                      </div>
                    ) : (
                      sortedNotifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`flex items-start space-x-3 p-3 rounded-lg transition cursor-pointer ${
                            notif.isRead
                              ? "bg-gray-50 hover:bg-gray-100" // Style for read notifications
                              : "bg-white hover:bg-blue-50" // Style for unread notifications
                          }`}
                          onClick={() => handleNotificationClick(notif)}
                        >
                          {!notif.isRead && ( // Show dot only for unread
                            <div
                              className="w-2 h-2 mt-1.5 rounded-full bg-blue-500 flex-shrink-0"
                              aria-label="Unread"
                            />
                          )}
                          {notif.isRead && ( // Placeholder for read dot or remove if not needed
                            <div
                              className="w-2 h-2 mt-1.5 rounded-full bg-gray-300 flex-shrink-0"
                              aria-label="Read"
                            />
                          )}
                          <div
                            className={`flex-1 ${notif.isRead ? "pl-2.5" : ""}`}
                          >
                            {" "}
                            {/* Adjust padding if dot is conditional */}
                            <p
                              className={`text-sm font-medium ${
                                notif.isRead
                                  ? "text-gray-600"
                                  : "text-gray-900 font-semibold"
                              }`}
                            >
                              {notif.title}
                            </p>
                            <p
                              className={`text-xs line-clamp-2 ${
                                notif.isRead ? "text-gray-500" : "text-gray-700"
                              }`}
                            >
                              {notif.message}
                            </p>
                            <span className="text-xs text-gray-400 mt-1 block">
                              {new Date(notif.createdAt).toLocaleTimeString(
                                [],
                                { hour: "2-digit", minute: "2-digit" }
                              )}
                              {" · "}
                              {new Date(notif.createdAt).toLocaleDateString(
                                [],
                                { day: "numeric", month: "short" }
                              )}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center space-x-3 focus:outline-none hover:bg-gray-100 px-2 py-1 rounded-lg transition"
                aria-label="Toggle user dropdown"
              >
                <div className="h-9 w-9 rounded-md bg-gray-200 flex items-center justify-center shadow-sm">
                  <User size={18} className="text-gray-700" />
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-sm font-semibold text-gray-800">
                    {user?.name ? user.name : "Admin User"}
                  </div>
                  <div className="text-xs text-gray-500">Admin</div>
                </div>
                <ChevronDown
                  size={16}
                  className={`text-gray-500 transition-transform duration-200 ${
                    userDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg py-2 z-20 border border-gray-200">
                  <Link
                    href="/dashboard/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    Settings
                  </Link>
                  <p
                    className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition cursor-pointer"
                    onClick={() => {
                      handleLogout();
                      setUserDropdownOpen(false);
                    }}
                  >
                    Logout
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Notification Detail Modal */}
      {selectedNotification && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-[480px]">
            <DialogHeader>
              <DialogTitle className="text-xl">
                {selectedNotification.title}
              </DialogTitle>
              <DialogDescription className="text-xs text-gray-500 pt-1">
                Received:
                {new Date(selectedNotification.createdAt).toLocaleString()}
              </DialogDescription>
            </DialogHeader>
            <div className="py-2 text-sm text-gray-700 break-words">
              {selectedNotification.message}
            </div>
            <div className="py-2 text-sm text-gray-700 break-words">
              Type:
              {selectedNotification.type}
            </div>
            <div className="py-2 text-sm text-gray-700 break-words">
              User Id:
              {selectedNotification.userId}
            </div>

            <DialogFooter className="sm:justify-end">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default DashboardTopNav;

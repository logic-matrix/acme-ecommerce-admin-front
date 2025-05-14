"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface User {
    id: number;
    name: string | null;
    email: string;
    role: string;
    verified: boolean;
}

interface EditUserDialogProps {
    user: User | undefined;
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export const EditUserDialog = ({ user, isOpen, onClose, onSuccess }: EditUserDialogProps) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "user",
        verified: false,
        password: ""
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                email: user.email,
                role: user.role,
                verified: user.verified,
                password: ""
            });
        }
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setLoading(true);
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${user.id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        ...formData,
                        password: formData.password || undefined
                    })
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to update user');
            }

            toast.success("User updated successfully");
            onSuccess();
            onClose();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to update user");
        } finally {
            setLoading(false);
        }
    };

    // Don't render the dialog if there's no user
    if (!user) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="lg:min-w-[616px]">
                <DialogHeader>
                    <DialogTitle>Edit User</DialogTitle>
                    <DialogDescription>
                        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                    className="w-full px-3 py-2 border rounded-md"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                    className="w-full px-3 py-2 border rounded-md"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Role</label>
                                <select
                                    value={formData.role}
                                    onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                                    className="w-full px-3 py-2 border rounded-md"
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">New Password (optional)</label>
                                <input
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                                    className="w-full px-3 py-2 border rounded-md"
                                    placeholder="Leave blank to keep current password"
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={formData.verified}
                                    onChange={(e) => setFormData(prev => ({ ...prev, verified: e.target.checked }))}
                                    id="verified"
                                />
                                <label htmlFor="verified" className="text-sm font-medium">
                                    Verified User
                                </label>
                            </div>

                            <div className="flex justify-end gap-2 pt-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 rounded bg-gray-100 text-gray-800 hover:bg-gray-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-4 py-2 rounded bg-black text-white hover:bg-gray-800 disabled:bg-gray-400"
                                >
                                    {loading ? "Updating..." : "Update User"}
                                </button>
                            </div>
                        </form>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
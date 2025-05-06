// components/TotalUsersCard.tsx
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

type Props = {
  totalUsers: number;
  growthPercentage: number;
};

export default function TotalUsersCard({
  totalUsers,
  growthPercentage,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="rounded-lg bg-purple-100 p-2">
          <Image src="/user-icon.png" alt="Users" width={28} height={28} />
        </div>
        <div>
          <p className="text-2xl font-semibold text-gray-900">
            {totalUsers.toLocaleString()}
          </p>
          <p className="text-gray-500 text-sm">Total Users</p>
        </div>
      </div>

      <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
        <ArrowUpRight className="h-4 w-4" />
        {growthPercentage}%
      </div>
    </div>
  );
}

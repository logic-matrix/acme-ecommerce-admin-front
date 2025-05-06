// app/dashboard/page.tsx

import ActivityFeed from "@/components/dashboard/ActivityFeed";
import TotalStatCard from "@/components/dashboard/TotalStatCard";

const activities = [
  {
    iconSrc: "/client-image.png",
    activity: "User signed in",
    time: new Date().toISOString(), // just now
  },
  {
    iconSrc: "/client-image.png",
    activity: "User uploaded a file",
    time: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 minutes ago
  },
  {
    iconSrc: "/client-image.png",
    activity: "User updated profile",
    time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
  },
  {
    iconSrc: "/client-image.png",
    activity: "User deleted account",
    time: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
  },
  {
    iconSrc: "/client-image.png",
    activity: "User deleted account",
    time: "2025-05-05T19:11:39.007Z",
  },
];

const Home = () => {
  return (
    <div className="container">
      {/* Dashboard and date time and filter */}
      {/* TotalStat */}
      <div className="flex justify-between gap-2 ">
        <TotalStatCard
          total={123334}
          growthPercentage={1.3}
          icon="/user.svg"
          title="total users"
        />
        <TotalStatCard
          total={123334}
          growthPercentage={1.3}
          icon="/order.svg"
          title="total users"
        />
        <TotalStatCard
          total={123334}
          growthPercentage={1.3}
          icon="/dollar.svg"
          title="total users"
        />
        <TotalStatCard
          total={123334}
          growthPercentage={-1.3}
          icon="/product.svg"
          title="total products"
        />
      </div>
      {/* Graph */}
      {/* Recent Order table  */}
      {/* Activity Feed */}
      <div className="border-1 border-gray-300 p-2 w-fit">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 leading-6 mb-2">
            Activity Feed
          </h1>
          <p className="text-gray-600 text-sm font-normal leading-6 mb-5">
            Recent Activites in your admin panel.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          {activities.slice(0, 3).map((item, index) => (
            <ActivityFeed
              key={index}
              iconSrc={item.iconSrc}
              activity={item.activity}
              time={item.time}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

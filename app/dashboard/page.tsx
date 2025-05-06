// app/dashboard/page.tsx
import TotalStatCard from "@/components/dashboard/TotalStatCard";

const Home = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow flex justify-between gap-2 ">
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
  );
};

export default Home;

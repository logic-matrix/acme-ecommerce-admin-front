import TotalStatCard from "@/components/dashboard/TotalStatCard";
import { Button } from "@/components/ui/button";

const page = () => {
  return (
    <div className="container">
      {/* product */}
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="font-semibold text-3xl">Product</h1>
          <p className="font-medium text-gray-500 text-base">
            Manage your product inventory
          </p>
        </div>
        <Button>Add Product</Button>
      </div>
      {/* TotalStat Card */}

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
      {/* Table  */}
    </div>
  );
};

export default page;

// components/ShippingBenefits.jsx
import { BadgeCheck, Clock, CreditCard, Truck } from "lucide-react";
import React from "react";

// BenefitCard :helper component
interface BenefitCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const BenefitCard = ({ icon: Icon, title, description }: BenefitCardProps) => {
  return (
    <div className="flex  sm:flex-col gap-4 border  p-4 rounded-xl hover:shadow-lg transition-show duration-300 ease-in-out">
      <div className="w-10 h-10 flex items-center justify-center">
        <Icon size={30} />
      </div>
      <div>
        <h3 className="text-xl sm:text-3xl font-semibold text-gray-900 leading-tight">
          {title}
        </h3>
        <p className="mt-3 text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
};

const ShippingBenefits = () => {
  const benefitsData = [
    {
      icon: Truck,
      title: "Fast & Free Shipping",
      description: "Every single order ships for free. No extra credit needed.",
    },
    {
      icon: Clock,
      title: "30 Days Returns",
      description: "Product returns are accepted within 30 days.",
    },
    {
      icon: CreditCard,
      title: "Secure Payment",
      description: "100% secure and reliable payment methods accepted.",
    },
    {
      icon: BadgeCheck,
      title: "Great Quality",
      description: "We always test our products for highest grade quality.",
    },
  ];
  return (
    <div className="w-full  bg-gray-50 py-12 my-11">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefitsData.map((benefit, index) => (
            <BenefitCard
              key={index}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShippingBenefits;

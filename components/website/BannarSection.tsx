import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const BannarSection = ({
  imageurl,
  title,
  bannarImageClass,
}: {
  imageurl: string;
  title: string;
  bannarImageClass?: string;
}) => {
  return (
    <div>
      <div className="relative">
        {/* image  */}
        <div>
          <Image
            src={imageurl}
            alt={title}
            className={cn(
              "w-full lg:h-[376px] object-cover rounded-lg",
              bannarImageClass
            )}
            width={1232}
            height={376}
          />
        </div>
        {/* text  */}
        <div className="absolute top-0 w-full flex justify-center items-center h-full bg-black/20">
          <h2 className="text-7xl md:text-[200px] lg:text-[262.12px] font-[400]  text-center text-white">
            {title}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default BannarSection;

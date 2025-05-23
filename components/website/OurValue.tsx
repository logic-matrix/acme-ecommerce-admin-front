import { Zap } from "lucide-react";
import Image from "next/image";
import React from "react";

const OurValue = () => {
  return (
    <div className="my-5  md:my-20">
      <div>
        <h2 className="font-bold text-3xl md:text-[48px]">Our Value.</h2>
        <h3 className="my-4 text-3xl md:text-[48px] font-semibold">
          Fundamentals guiding our company
        </h3>
      </div>
      <div className="grid grid-cols-1  gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="flex gap-3.5">
            <span>
              <span className="inline-block bg-indigo-100 rounded-full p-2">
                <Zap size={20} />
              </span>
            </span>
            <div>
              <h2 className="mb-2 text-[#292D32] font-[500] text-[24px]">
                Lorem Ipsum
              </h2>
              <p className="text-[#8B8B8C] font-[500] text-[20px]">
                Lorem ipsum dolor sit amet consectetur. Et a a nunc quisque
                elementum habitant. Lorem ipsum dolor sit amet consectetur. Et a
                a nunc quisque elementum habitant. Lorem ipsum dolor sit amet
                consectetur.
              </p>
            </div>
          </div>
          <div className="flex gap-3.5 my-6">
            <span>
              <span className="inline-block bg-indigo-100 rounded-full p-2">
                <Zap size={20} />
              </span>
            </span>
            <div>
              <h2 className="mb-2 text-[#292D32] font-[500] text-[24px]">
                Lorem Ipsum
              </h2>
              <p className="text-[#8B8B8C] font-[500] text-[20px]">
                Lorem ipsum dolor sit amet consectetur. Et a a nunc quisque
                elementum habitant. Lorem ipsum dolor sit amet consectetur. Et a
                a nunc quisque elementum habitant. Lorem ipsum dolor sit amet
                consectetur.
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="lg:col-span-1 rounded-lg">
            <Image
              src="/website/ourvalue.jpg"
              alt="our value"
              width={1000}
              height={1000}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurValue;

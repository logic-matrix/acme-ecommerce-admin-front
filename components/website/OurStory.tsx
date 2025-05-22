import Image from "next/image";
import React from "react";

const OurStory = () => {
  return (
    <div className="my-5  md:my-20">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div>
          <h2 className="font-bold text-3xl md:text-[48px]">Our Story.</h2>
          <h3 className="my-4 text-3xl md:text-[48px] font-semibold">
            Headquartered in <br />
            Southern California
          </h3>
          <p className="my-4 text-[#8B8B8C] text-sm lg:text-[20px] font-[500] text-wrap">
            Lorem ipsum dolor sit amet consectetur. Et a a nunc quisque
            elementum habitant. Lorem ipsum dolor sit amet consectetur. Et a a
            nunc quisque elementum habitant. Lorem ipsum dolor sit amet
            consectetur. Et a a nunc quisque elementum habitant. Lorem ipsum
            dolor sit amet consectetur. Et a a nunc quisque elementum habitant.
          </p>
          <p className="my-4 text-[#8B8B8C] text-sm lg:text-[20px] font-[500] text-wrap">
            Lorem ipsum dolor sit amet consectetur. Et a a nunc quisque
            elementum habitant. Lorem ipsum dolor sit amet consectetur. Et a a
            nunc quisque elementum habitant. Lorem ipsum dolor sit amet
            consectetur. Et a a nunc quisque elementum habitant.{" "}
          </p>
        </div>
        <div className="rounded-xl">
          <Image
            src="/website/storyimage.jpg"
            alt=""
            width={500}
            height={500}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default OurStory;

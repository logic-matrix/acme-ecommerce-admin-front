import Clients from "@/data/Client.data";
import Image from "next/image";
import React from "react";
import Marquee from "react-fast-marquee";

const OurClients = () => {
  const ClientData = Clients;
  return (
    <div className="my-5  md:my-20">
      <div>
        <h2 className="font-bold text-3xl md:text-[48px]">Clients.</h2>
        <h3 className="my-4 text-3xl md:text-[48px] font-semibold">
          Trusted by 100+ Brands
        </h3>
      </div>
      <div className="mt-14">
        <Marquee>
          <div className="flex gap-9 items-center">
            {ClientData.map((client) => (
              <div className="h-[55px]" key={client.id}>
                <Image
                  src={client.imageurl}
                  alt="image"
                  width={114}
                  height={55}
                  className="h-full w-full object-contain"
                />
              </div>
            ))}
          </div>
        </Marquee>
      </div>
    </div>
  );
};

export default OurClients;

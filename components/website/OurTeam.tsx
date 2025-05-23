import Teams from "@/data/Team.data";
import Image from "next/image";
import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

const OurTeam = () => {
  const team = Teams;
  return (
    <div className="my-5  md:my-20">
      <div>
        <h2 className="font-bold text-3xl md:text-[48px]">Our Teams.</h2>
        <h3 className="my-4 text-3xl md:text-[48px] font-semibold">
          Meet our amazing team
        </h3>
      </div>
      <div className="my-8">
        <Carousel>
          <CarouselContent className="-ml-4">
            {Teams.map((people, index) => (
              <CarouselItem
                key={index}
                className="basis-1/1 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5"
              >
                <div className="w-[270px]">
                  <div className="h-[300px] w-[270px] rounded-lg">
                    <Image
                      src={people.image}
                      alt="image"
                      width={500}
                      height={500}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="text-center">
                    <h2 className="text-2xl font-semibold">{people.name}</h2>
                    <p className="text-[#8B8B8C] text-sm">{people.position}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default OurTeam;

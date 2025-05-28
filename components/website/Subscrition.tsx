"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import HeadingTitle from "./common/HeadingTitle";

export default function SubscribeSection() {
  return (
    <section className="container mx-auto py-12 text-center px-4">
      <HeadingTitle
        title={"Get news, offers, cart reminders from \n ACME Electronics."}
      />
      <div className=" flex flex-col justify-center items-center gap-5  ">
        <p className="text-[#8B8B8C] text-sm md:text-base">
          Get 10% discount with notified about the latest news and updates. No
          spam, we promise!
        </p>

        <form className="flex w-full md:w-1/2  items-center justify-center gap-3">
          <div className="relative w-full ">
            <Input
              type="email"
              placeholder="Enter Your Email"
              className="w-full sm:py-6 rounded-4xl "
            />
            <Button
              type="submit"
              className="px-6 rounded-full absolute top-1/2 right-1 transform -translate-y-1/2 "
            >
              Subscribe
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

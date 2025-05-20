"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SubscribeSection() {
  return (
    <section className="w-full py-16 bg-white text-center px-4 md:px-0">
      <div className="max-w-2xl mx-auto space-y-4">
        <h2 className="text-5xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#292D32]">
          Get news, offers, cart reminders from <br />
          <span className="block">ACME Electronics.</span>
        </h2>
        <p className="text-[#8B8B8C] text-sm md:text-base">
          Get 10% discount with notified about the latest news and updates. No
          spam, we promise!
        </p>

        <form className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <div className="relative w-full sm:96">
            <Input
              type="email"
              placeholder="Enter Your Email"
              className="w-full "
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

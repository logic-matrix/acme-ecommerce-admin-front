"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SubscribeSection() {
  return (
    <section className="w-full py-16 bg-white text-center px-4 md:px-0">
      <div className="max-w-2xl mx-auto space-y-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
          Get news, offers, cart reminders from <br />
          <span className="block">ACME Electronics.</span>
        </h2>
        <p className="text-gray-500 text-sm md:text-base">
          Get 10% discount with notified about the latest news and updates. No
          spam, we promise!
        </p>

        <form className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Input
            type="email"
            placeholder="Enter Your Email"
            className="w-full sm:w-96"
          />
          <Button type="submit" className="px-6 rounded-full">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}

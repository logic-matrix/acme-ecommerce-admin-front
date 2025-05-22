import BannarSection from "@/components/website/BannarSection";
import OurStory from "@/components/website/OurStory";
import React from "react";

const AboutUsPage = () => {
  return (
    <div className="min-h-screen md:container px-12 mx-auto">
      <BannarSection
        imageurl="/website/bannerabouttopimg.jpg"
        title="ABOUT US"
        bannarImageClass="md:min-h-[535px]"
      />
      <OurStory />
    </div>
  );
};

export default AboutUsPage;

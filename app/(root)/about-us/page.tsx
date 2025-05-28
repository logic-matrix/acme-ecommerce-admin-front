import BannarSection from "@/components/website/BannarSection";
import OurClients from "@/components/website/OurClients";
import OurStory from "@/components/website/OurStory";
import React from "react";
import OurValue from "@/components/website/OurValue";
import OurTeam from "@/components/website/OurTeam";

const AboutUsPage = () => {
  return (
    <div className="min-h-screen md:container px-12 mx-auto">
      <BannarSection
        imageurl="/website/bannerabouttopimg.jpg"
        title="ABOUT US"
        bannarImageClass="md:min-h-[535px]"
      />
      <OurStory />
      <OurClients />
      <OurValue />
      <OurTeam />
    </div>
  );
};

export default AboutUsPage;

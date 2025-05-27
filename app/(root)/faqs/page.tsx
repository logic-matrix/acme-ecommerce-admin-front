import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SubscribeSection from "@/components/website/Subscrition";
import { Faqs } from "@/data/faq.data";
import React from "react";

const FAQpage = () => {
  return (
    <div className="min-h-screen md:container px-12 py-16 mx-auto">
      <div>
        <h2 className="font-bold text-3xl md:text-[48px]">
          Frequently Asked Questions
        </h2>
      </div>
      <div className="my-20">
        <Accordion type="single" collapsible className="w-full">
          {Faqs.map((faq, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="no-underline hover:no-underline">
                <p className="text-2xl">{faq.question}</p>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-500 md:me-4">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div>
        <SubscribeSection />
      </div>
    </div>
  );
};

export default FAQpage;

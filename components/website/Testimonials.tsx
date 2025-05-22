"use client";

import clsx from "clsx";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { useEffect, useRef, useState } from "react";
import ReviewCard from "./ReviewCard";
// import ReviewCard from "./review-card";

const reviews = [
  {
    name: "Tarikul Abir",
    role: "Tech Enthusiast",
    image: "/website/client-image.png",
    review:
      "Lorem ipsum dolor sit amet consectetur. At tortor et suspendisse sit feugiat sed dictum maecenas. Lorem ipsum dolor sit amet consectetur.",
  },
  {
    name: "Tarikul Abir",
    role: "Tech Enthusiast",
    image: "/website/client-image.png",
    review:
      "Lorem ipsum dolor sit amet consectetur. At tortor et suspendisse sit feugiat sed dictum maecenas. Lorem ipsum dolor sit amet consectetur.",
  },
  {
    name: "Tarikul Abir",
    role: "Tech Enthusiast",
    image: "/website/client-image.png",
    review:
      "Lorem ipsum dolor sit amet consectetur. At tortor et suspendisse sit feugiat sed dictum maecenas. Lorem ipsum dolor sit amet consectetur.",
  },
  {
    name: "Tarikul Abir",
    role: "Tech Enthusiast",
    image: "/website/client-image.png",
    review:
      "Lorem ipsum dolor sit amet consectetur. At tortor et suspendisse sit feugiat sed dictum maecenas. Lorem ipsum dolor sit amet consectetur.",
  },
];

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,

    slides: {
      perView: 3,
      spacing: 20,
    },
    breakpoints: {
      "(max-width: 768px)": {
        slides: {
          perView: 1,
        },
      },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });
  // Autoplay logic
  useEffect(() => {
    const interval = setInterval(() => {
      if (instanceRef.current) {
        instanceRef.current.next();
      }
    }, 3000); // change slide every 3 seconds

    timerRef.current = interval;

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [instanceRef]);
  return (
    <section className=" container mx-auto px-10">
      <h2 className="text-5xl font-semibold leading-tight mb-8">
        What Our Customers <br /> Are Saying.
      </h2>

      <div ref={sliderRef} className="keen-slider mb-6">
        {reviews.map((review, index) => (
          <div className="keen-slider__slide  py-6" key={index}>
            <ReviewCard {...review} />
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2">
        {[...Array(reviews.length)].map((_, i) => (
          <button
            key={i}
            onClick={() => instanceRef.current?.moveToIdx(i)}
            className={clsx(
              "w-3 h-3 rounded-full transition-all duration-300",
              currentSlide === i
                ? "bg-gray-800 w-10"
                : "bg-gray-300 hover:bg-gray-500"
            )}
          />
        ))}
      </div>
    </section>
  );
}

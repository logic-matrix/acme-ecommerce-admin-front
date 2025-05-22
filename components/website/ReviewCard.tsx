import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";

interface ReviewCardProps {
  name: string;
  role: string;
  image: string;
  review: string;
  rating?: number;
}

export default function ReviewCard({
  name,
  role,
  image,
  review,
  rating = 5,
}: ReviewCardProps) {
  return (
    <Card className=" rounded-4xl border shadow-xl border-gray-200  ">
      <CardContent className="px-6">
        <div className="flex items-center gap-3 mb-3">
          <Image
            src={image}
            alt={name}
            width={64}
            height={64}
            className="rounded-full object-cover"
          />
          <div>
            <h4 className="font-semibold text-xl">{name}</h4>
            <p className="text-base text-gray-500">{role}</p>
          </div>
          <div className="ml-auto ">
            <Image
              src="/website/testimonial-quote.svg"
              width={38}
              height={38}
              alt="testimonial quotation icon"
            />
          </div>
        </div>
        <p className="text-[15px] text-gray-700 my-6 line-clamp-4">{review}</p>
        <div className="flex gap-1 justify-center">
          {[...Array(rating)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className="fill-yellow-400 text-yellow-400"
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";
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
    <Card className="w-[300px] rounded-2xl shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <Image
            src={image}
            alt={name}
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          <div>
            <h4 className="font-semibold text-sm">{name}</h4>
            <p className="text-xs text-gray-500">{role}</p>
          </div>
          <div className="ml-auto text-gray-400">
            <span className="text-lg">
              <Quote />
            </span>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-4 line-clamp-4">{review}</p>
        <div className="flex gap-1">
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

import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductDetailCard from "@/components/website/ProductDetailCard";
import ShippingBenefits from "@/components/website/ShippingBenefits";
import SliderRecomanded from "@/components/website/SliderRecomanded";
import Testimonials from "@/components/website/Testimonials";

const page = () => {
  return (
    <div className="container mx-auto">
      <ProductDetailCard />
      {/* Tabs  */}
      <Tabs defaultValue="product-detail" className="">
        <TabsList className="border-2">
          <TabsTrigger
            value="product-detail"
            className="data-[state=active]:bg-gray-900 data-[state=active]:text-white
                 data-[state=inactive]:bg-white data-[state=inactive]:text-black
                 rounded-md px-4 py-4 text-sm font-semibold transition"
          >
            Product Detail
          </TabsTrigger>
          <TabsTrigger
            value="product-reviews"
            className="data-[state=active]:bg-gray-900 data-[state=active]:text-white
                 data-[state=inactive]:bg-white data-[state=inactive]:text-black
                 rounded-md px-4 py-4 text-sm font-semibold transition"
          >
            Reviews
          </TabsTrigger>
        </TabsList>

        <TabsContent value="product-detail">
          <Card>
            <CardHeader>AirPod Max</CardHeader>
            <CardDescription>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
              corporis enim alias culpa rem dignissimos, amet, illum error ad
              provident repellendus atque, cum vel laudantium. Reprehenderit
              temporibus corrupti mollitia laborum.
            </CardDescription>
            <CardHeader>Warrenty</CardHeader>
            <CardDescription>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
              corporis enim alias culpa rem dignissimos, amet, illum error ad
              provident repellendus atque, cum vel laudantium. Reprehenderit
              temporibus corrupti mollitia laborum.
            </CardDescription>
          </Card>
        </TabsContent>

        <TabsContent value="product-reviews">
          <Testimonials />
        </TabsContent>
      </Tabs>
      <ShippingBenefits />
      <SliderRecomanded heading="You may also like" />
    </div>
  );
};

export default page;

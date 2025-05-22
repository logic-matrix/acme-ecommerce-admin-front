import {
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  CircleDollarSign,
  ShoppingBag,
} from "lucide-react";
import { useState } from "react";

type Filters = {
  category: string;
  availability: string;
  priceRange: number;
  sortBy?: string;
};

type FiltersSidebarProps = {
  filters: Filters;
  onChange: (filter: { type: keyof Filters; value: string | number }) => void;
  categories: string[];
};

export default function FiltersSidebar({
  filters,
  onChange,
  categories,
}: FiltersSidebarProps) {
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(true);
  const [showAvailabilityDropdown, setShowAvailabilityDropdown] =
    useState(true);
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const [price, setPrice] = useState<number>(filters.priceRange || 1000);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setPrice(value);
    onChange({ type: "priceRange", value });
  };

  return (
    <aside className="w-64 p-4 text-sm">
      {/* Category Filter */}
      <div
        className={`mb-4 ${
          showCategoryDropdown && "bg-[#F3F1F1] p-2 rounded-lg"
        }`}
      >
        <div
          className="flex justify-between items-center cursor-pointer font-bold mb-2"
          onClick={() => setShowCategoryDropdown((prev) => !prev)}
        >
          <span className="flex items-center gap-2 text-gray-700">
            <ShoppingBag size={15} />
            Shop by Category
          </span>
          <span>{showCategoryDropdown ? <ChevronUp /> : <ChevronDown />}</span>
        </div>
        {showCategoryDropdown && (
          <div className="space-y-1">
            {categories.map((category) => (
              <label key={category} className="block">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={filters.category === category}
                  onChange={(e) =>
                    onChange({ type: "category", value: e.target.value })
                  }
                  className="mr-2"
                />
                {category}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Availability Filter */}
      <div
        className={`mb-4 ${
          showAvailabilityDropdown && "bg-[#F3F1F1] p-2 rounded-lg"
        }`}
      >
        <div
          className="flex justify-between items-center cursor-pointer font-bold mb-2"
          onClick={() => setShowAvailabilityDropdown((prev) => !prev)}
        >
          <span className="flex items-center gap-2 text-gray-700">
            <ShoppingBag size={15} />
            Availability
          </span>
          <span>
            {showAvailabilityDropdown ? <ChevronUp /> : <ChevronDown />}
          </span>
        </div>
        {showAvailabilityDropdown && (
          <div className="space-y-1">
            {["Available", "Unavailable"].map((status) => (
              <label key={status} className="block">
                <input
                  type="radio"
                  name="availability"
                  value={status}
                  checked={filters.availability === status}
                  onChange={(e) =>
                    onChange({ type: "availability", value: e.target.value })
                  }
                  className="mr-2"
                />
                {status}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range Filter */}
      <div
        className={`mb-4 ${showPriceDropdown && "bg-[#F3F1F1] p-2 rounded-lg"}`}
      >
        <div
          className="flex justify-between items-center cursor-pointer font-bold mb-2"
          onClick={() => setShowPriceDropdown((prev) => !prev)}
        >
          <span className="flex items-center gap-2 text-gray-700">
            <CircleDollarSign size={15} />
            Price Range
          </span>
          <span>{showPriceDropdown ? <ChevronUp /> : <ChevronDown />}</span>
        </div>
        {showPriceDropdown && (
          <div>
            <input
              type="range"
              min="0"
              max="1000"
              step="50"
              value={price}
              onChange={handlePriceChange}
              className="w-full"
            />
            <div className="text-sm text-center mt-1">Up to ${price}</div>
          </div>
        )}
      </div>

      {/* Sort By Filter */}
      <div
        className={`mb-4 ${showSortDropdown && "bg-[#F3F1F1] p-2 rounded-lg"}`}
      >
        <div
          className="flex justify-between items-center cursor-pointer font-bold mb-2"
          onClick={() => setShowSortDropdown((prev) => !prev)}
        >
          <span className="flex items-center gap-2 text-gray-700">
            <ArrowUpDown size={15} />
            Sort By
          </span>
          <span>{showSortDropdown ? <ChevronUp /> : <ChevronDown />}</span>
        </div>
        {showSortDropdown && (
          <div>
            <select
              className="w-full border px-2 py-1"
              value={filters.sortBy || ""}
              onChange={(e) =>
                onChange({ type: "sortBy", value: e.target.value })
              }
            >
              <option value="">Select</option>
              <option value="priceLowHigh">Price: Low to High</option>
              <option value="priceHighLow">Price: High to Low</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        )}
      </div>
    </aside>
  );
}

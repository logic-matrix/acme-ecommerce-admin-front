import { Search } from "lucide-react";
import { Button } from "../ui/button";

type SearchBarProps = {
  search: string;
  onSearch: (value: string) => void;
};

export default function SearchBar({ search, onSearch }: SearchBarProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="md:w-[436px] flex items-center">
      <div className="relative flex items-center w-full">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          className="border p-2 w-full ps-8"
        />
        <Search className="absolute ms-1" size={18} />
      </div>
      <Button type="submit">Search</Button>
    </form>
  );
}

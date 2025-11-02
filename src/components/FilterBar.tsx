import { Button } from "@/components/ui/button";

interface FilterBarProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const FilterBar = ({ categories, selectedCategory, onCategoryChange }: FilterBarProps) => {
  return (
    <div className="border-b border-border bg-card">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center gap-2 overflow-x-auto">
          <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">Categorías:</span>
          <div className="flex gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => onCategoryChange(category)}
                className="whitespace-nowrap transition-all"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

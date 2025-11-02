import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface HeroProps {
  onSearch: (query: string) => void;
}

export const Hero = ({ onSearch }: HeroProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("search") as string;
    onSearch(query);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/90 py-20 px-6">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4wNSIvPjwvZz48L3N2Zz4=')] opacity-20"></div>
      
      <div className="container relative mx-auto max-w-5xl text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl lg:text-6xl">
          Portal de Subvenciones
        </h1>
        <p className="mb-8 text-lg text-primary-foreground/90 md:text-xl">
          Encuentra las mejores oportunidades de financiación para tu proyecto
        </p>
        
        <form onSubmit={handleSubmit} className="mx-auto max-w-2xl">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                name="search"
                placeholder="Buscar subvenciones por palabra clave..."
                className="h-12 pl-10 bg-background/95 backdrop-blur border-primary-foreground/20 focus-visible:ring-accent"
              />
            </div>
            <Button type="submit" size="lg" variant="secondary" className="h-12 px-8 font-semibold">
              Buscar
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

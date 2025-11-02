import { useState, useMemo } from "react";
import { Hero } from "@/components/Hero";
import { FilterBar } from "@/components/FilterBar";
import { SubventionGrid } from "@/components/SubventionGrid";
import { mockSubventions } from "@/data/subventions";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");

  const categories = useMemo(() => {
    const cats = ["Todas", ...new Set(mockSubventions.map((s) => s.category))];
    return cats;
  }, []);

  const filteredSubventions = useMemo(() => {
    return mockSubventions.filter((subvention) => {
      const matchesCategory = selectedCategory === "Todas" || subvention.category === selectedCategory;
      const matchesSearch = searchQuery === "" || 
        subvention.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subvention.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-background">
      <Hero onSearch={setSearchQuery} />
      <FilterBar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <SubventionGrid subventions={filteredSubventions} />
      
      <footer className="border-t border-border bg-card py-8 mt-12">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>© 2025 Portal de Subvenciones. Sistema de gestión de ayudas y subvenciones públicas.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

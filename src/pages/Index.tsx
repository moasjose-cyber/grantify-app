import { useState, useMemo } from "react";
import { Hero } from "@/components/Hero";
import { FilterBar } from "@/components/FilterBar";
import { SubventionGrid } from "@/components/SubventionGrid";
import { SubventionListRow } from "@/components/SubventionListRow";
import { AdvancedFilters, AdvancedFilterValues } from "@/components/AdvancedFilters";
import { mockSubventions } from "@/data/subventions";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [advancedFilters, setAdvancedFilters] = useState<AdvancedFilterValues>({
    titulo: "",
    tituloMode: "all",
    codigoBNS: "",
    organoConvocante: "",
    regionImpacto: "",
    tipoBeneficiario: "",
    saNumber: "",
  });

  const categories = useMemo(() => {
    const cats = [
      "Todas",
      "ACCESO A LA VIVIENDA Y FOMENTO DE LA EDIFICACIÓN",
      "AGRICULTURA, PESCA Y ALIMENTACIÓN",
      "COMERCIO, TURISMO Y PYMES",
      "COOPERACIÓN INTERNACIONAL PARA EL DESARROLLO Y CULTURAL",
      "CULTURA",
      "EDUCACIÓN",
      "FOMENTO DEL EMPLEO",
      "INDUSTRIA Y ENERGÍA",
      "INFRAESTRUCTURAS",
      "INVESTIGACIÓN, DESARROLLO E INNOVACIÓN",
      "OTRAS ACTUACIONES DE CARÁCTER ECONÓMICO",
      "OTRAS PRESTACIONES ECONÓMICAS",
      "SANIDAD",
      "SERVICIOS SOCIALES Y PROMOCIÓN SOCIAL",
      "SUBVENCIONES AL TRANSPORTE",
    ];
    return cats;
  }, []);

  const filteredSubventions = useMemo(() => {
    return mockSubventions.filter((subvention) => {
      // Filtro por categoría
      const matchesCategory = selectedCategory === "Todas" || subvention.category === selectedCategory;
      
      // Filtro de búsqueda básica (del Hero)
      const matchesSearch = searchQuery === "" || 
        subvention.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subvention.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Filtros avanzados
      let matchesAdvanced = true;

      // Filtro por título con modo
      if (advancedFilters.titulo) {
        const searchTerms = advancedFilters.titulo.toLowerCase().trim();
        const titleLower = subvention.title.toLowerCase();
        const descLower = subvention.description.toLowerCase();

        if (advancedFilters.tituloMode === "exact") {
          matchesAdvanced = matchesAdvanced && (titleLower.includes(searchTerms) || descLower.includes(searchTerms));
        } else if (advancedFilters.tituloMode === "all") {
          const words = searchTerms.split(/\s+/);
          matchesAdvanced = matchesAdvanced && words.every(word => 
            titleLower.includes(word) || descLower.includes(word)
          );
        } else if (advancedFilters.tituloMode === "any") {
          const words = searchTerms.split(/\s+/);
          matchesAdvanced = matchesAdvanced && words.some(word => 
            titleLower.includes(word) || descLower.includes(word)
          );
        }
      }

      // Filtro por código BNS
      if (advancedFilters.codigoBNS && subvention.codigoBNS) {
        matchesAdvanced = matchesAdvanced && subvention.codigoBNS.includes(advancedFilters.codigoBNS);
      }

      // Filtro por órgano convocante
      if (advancedFilters.organoConvocante && subvention.organoConvocante) {
        matchesAdvanced = matchesAdvanced && 
          subvention.organoConvocante.toLowerCase().includes(advancedFilters.organoConvocante.toLowerCase());
      }

      // Filtro por región
      if (advancedFilters.regionImpacto && advancedFilters.regionImpacto !== "Todas" && subvention.regionImpacto) {
        matchesAdvanced = matchesAdvanced && subvention.regionImpacto === advancedFilters.regionImpacto;
      }

      // Filtro por tipo de beneficiario
      if (advancedFilters.tipoBeneficiario && advancedFilters.tipoBeneficiario !== "Todos" && subvention.tipoBeneficiario) {
        matchesAdvanced = matchesAdvanced && subvention.tipoBeneficiario === advancedFilters.tipoBeneficiario;
      }

      // Filtro por SA Number
      if (advancedFilters.saNumber && subvention.saNumber) {
        matchesAdvanced = matchesAdvanced && subvention.saNumber.includes(advancedFilters.saNumber);
      }
      
      return matchesCategory && matchesSearch && matchesAdvanced;
    });
  }, [searchQuery, selectedCategory, advancedFilters]);

  const handleClearFilters = () => {
    setAdvancedFilters({
      titulo: "",
      tituloMode: "all",
      codigoBNS: "",
      organoConvocante: "",
      regionImpacto: "",
      tipoBeneficiario: "",
      saNumber: "",
    });
  };

  const firstSubventions = filteredSubventions.slice(0, 15);
  const restSubventions = filteredSubventions.slice(15);

  return (
    <div className="min-h-screen bg-background">
      <Hero onSearch={setSearchQuery} />
      <FilterBar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      
      <div className="container mx-auto px-6 py-8">
        <AdvancedFilters onFilterChange={setAdvancedFilters} onClear={handleClearFilters} />
        
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Mostrando <span className="font-semibold text-foreground">{filteredSubventions.length}</span> subvenciones
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open("https://www.pap.hacienda.gob.es/bdnstrans/GE/es/convocatorias", "_blank")}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Ver en Base Nacional de Subvenciones
          </Button>
        </div>
      </div>

      {filteredSubventions.length === 0 ? (
        <div className="container mx-auto px-6 py-12 text-center">
          <p className="text-lg text-muted-foreground">
            No se encontraron subvenciones con los criterios seleccionados.
          </p>
        </div>
      ) : (
        <>
          {/* Primeras 15 en formato tarjeta */}
          {firstSubventions.length > 0 && (
            <div className="container mx-auto px-6 pb-8">
              <h2 className="text-xl font-semibold mb-4 text-foreground">Destacadas</h2>
              <SubventionGrid subventions={firstSubventions} />
            </div>
          )}

          {/* Resto en formato lista */}
          {restSubventions.length > 0 && (
            <div className="container mx-auto px-6 pb-12">
              <h2 className="text-xl font-semibold mb-4 text-foreground">Más subvenciones</h2>
              <div className="space-y-3">
                {restSubventions.map((subvention) => (
                  <SubventionListRow key={subvention.id} subvention={subvention} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
      
      <footer className="border-t border-border bg-card py-8 mt-12">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>© 2025 Portal de Subvenciones. Sistema de gestión de ayudas y subvenciones públicas.</p>
          <p className="mt-2">
            Datos basados en la{" "}
            <a
              href="https://www.pap.hacienda.gob.es/bdnstrans/GE/es/convocatorias"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Base Nacional de Subvenciones
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

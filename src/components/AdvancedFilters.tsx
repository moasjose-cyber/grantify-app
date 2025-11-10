import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface AdvancedFilterValues {
  titulo: string;
  tituloMode: "all" | "any" | "exact";
  codigoBNS: string;
  organoConvocante: string;
  regionImpacto: string;
  tipoBeneficiario: string;
  saNumber: string;
}

interface AdvancedFiltersProps {
  onFilterChange: (filters: AdvancedFilterValues) => void;
  onClear: () => void;
}

export const AdvancedFilters = ({ onFilterChange, onClear }: AdvancedFiltersProps) => {
  const [filters, setFilters] = useState<AdvancedFilterValues>({
    titulo: "",
    tituloMode: "all",
    codigoBNS: "",
    organoConvocante: "",
    regionImpacto: "",
    tipoBeneficiario: "",
    saNumber: "",
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = (key: keyof AdvancedFilterValues, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClear = () => {
    const emptyFilters: AdvancedFilterValues = {
      titulo: "",
      tituloMode: "all",
      codigoBNS: "",
      organoConvocante: "",
      regionImpacto: "",
      tipoBeneficiario: "",
      saNumber: "",
    };
    setFilters(emptyFilters);
    onClear();
  };

  const regiones = [
    "Todas",
    "Andalucía",
    "Aragón",
    "Asturias",
    "Baleares",
    "Canarias",
    "Cantabria",
    "Castilla y León",
    "Castilla-La Mancha",
    "Cataluña",
    "Comunidad Valenciana",
    "Extremadura",
    "Galicia",
    "La Rioja",
    "Madrid",
    "Murcia",
    "Navarra",
    "País Vasco",
    "Nacional",
  ];

  const tiposBeneficiario = [
    "Todos",
    "PYME y personas físicas que desarrollan actividad económica",
    "Gran empresa",
    "Personas jurídicas que no desarrollan actividad económica",
    "Sin información específica",
  ];

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Search className="h-5 w-5" />
            Filtros Avanzados
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4 mr-1" />
              Limpiar
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "Ocultar" : "Mostrar"} filtros
            </Button>
          </div>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Título de la convocatoria */}
            <div className="space-y-2">
              <Label htmlFor="titulo">Título de la convocatoria</Label>
              <Input
                id="titulo"
                placeholder="Buscar por título..."
                value={filters.titulo}
                onChange={(e) => handleFilterChange("titulo", e.target.value)}
              />
              <Select
                value={filters.tituloMode}
                onValueChange={(value) => handleFilterChange("tituloMode", value as any)}
              >
                <SelectTrigger className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background z-50">
                  <SelectItem value="all">Todas las palabras</SelectItem>
                  <SelectItem value="any">Alguna de las palabras</SelectItem>
                  <SelectItem value="exact">Frase exacta</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Código BNS */}
            <div className="space-y-2">
              <Label htmlFor="codigoBNS">Código BNS</Label>
              <Input
                id="codigoBNS"
                placeholder="Ej: 123456"
                value={filters.codigoBNS}
                onChange={(e) => handleFilterChange("codigoBNS", e.target.value)}
              />
            </div>

            {/* Órgano Convocante */}
            <div className="space-y-2">
              <Label htmlFor="organoConvocante">Órgano Convocante</Label>
              <Input
                id="organoConvocante"
                placeholder="Ej: Ministerio..."
                value={filters.organoConvocante}
                onChange={(e) => handleFilterChange("organoConvocante", e.target.value)}
              />
            </div>

            {/* Región de impacto */}
            <div className="space-y-2">
              <Label htmlFor="regionImpacto">Región de impacto</Label>
              <Select
                value={filters.regionImpacto}
                onValueChange={(value) => handleFilterChange("regionImpacto", value)}
              >
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Seleccionar región" />
                </SelectTrigger>
                <SelectContent className="bg-background z-50">
                  {regiones.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Tipo de beneficiario */}
            <div className="space-y-2">
              <Label htmlFor="tipoBeneficiario">Tipo de beneficiario</Label>
              <Select
                value={filters.tipoBeneficiario}
                onValueChange={(value) => handleFilterChange("tipoBeneficiario", value)}
              >
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent className="bg-background z-50">
                  {tiposBeneficiario.map((tipo) => (
                    <SelectItem key={tipo} value={tipo}>
                      {tipo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* SA Number */}
            <div className="space-y-2">
              <Label htmlFor="saNumber">SA Number - Ref. Ayuda de Estado</Label>
              <Input
                id="saNumber"
                placeholder="Ej: SA.12345"
                value={filters.saNumber}
                onChange={(e) => handleFilterChange("saNumber", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};
import { SubventionCard, Subvention } from "./SubventionCard";

interface SubventionGridProps {
  subventions: Subvention[];
}

export const SubventionGrid = ({ subventions }: SubventionGridProps) => {
  if (subventions.length === 0) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <p className="text-lg text-muted-foreground">
          No se encontraron subvenciones con los criterios seleccionados.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {subventions.map((subvention) => (
          <SubventionCard key={subvention.id} subvention={subvention} />
        ))}
      </div>
    </div>
  );
};

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Euro, Building2, ExternalLink } from "lucide-react";
import { Subvention } from "./SubventionCard";

interface SubventionListRowProps {
  subvention: Subvention;
}

export const SubventionListRow = ({ subvention }: SubventionListRowProps) => {
  const statusColors = {
    open: "bg-accent text-accent-foreground",
    "closing-soon": "bg-orange-500 text-white",
    closed: "bg-muted text-muted-foreground",
  };

  const statusLabels = {
    open: "Abierta",
    "closing-soon": "Próximo cierre",
    closed: "Cerrada",
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-4 border border-border rounded-lg bg-card hover:bg-accent/5 transition-colors">
      <div className="md:col-span-4">
        <div className="flex items-start gap-2 mb-2">
          <Badge variant="secondary" className="text-xs">
            {subvention.category}
          </Badge>
          <Badge className={`${statusColors[subvention.status]} text-xs`}>
            {statusLabels[subvention.status]}
          </Badge>
        </div>
        <h3 className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-2">
          {subvention.title}
        </h3>
        {subvention.codigoBNS && (
          <p className="text-xs text-muted-foreground mt-1">Código BNS: {subvention.codigoBNS}</p>
        )}
      </div>
      
      <div className="md:col-span-2 flex items-center gap-2 text-sm">
        <Euro className="h-4 w-4 text-accent" />
        <span className="font-semibold text-foreground">{subvention.amount}</span>
      </div>
      
      <div className="md:col-span-2 flex items-center gap-2 text-sm text-muted-foreground">
        <Calendar className="h-4 w-4" />
        <span>{subvention.deadline}</span>
      </div>
      
      <div className="md:col-span-3 flex items-center gap-2 text-sm text-muted-foreground">
        <Building2 className="h-4 w-4" />
        <span className="line-clamp-1">{subvention.entity}</span>
      </div>
      
      <div className="md:col-span-1 flex justify-end">
        <Button 
          size="sm"
          variant="outline"
          disabled={subvention.status === "closed"}
          onClick={() => subvention.bdnsUrl && window.open(subvention.bdnsUrl, '_blank')}
        >
          <ExternalLink className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
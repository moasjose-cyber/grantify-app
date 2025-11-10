import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Euro, Building2 } from "lucide-react";

export interface Subvention {
  id: number;
  title: string;
  description: string;
  category: string;
  amount: string;
  deadline: string;
  entity: string;
  status: "open" | "closing-soon" | "closed";
  codigoBNS?: string;
  organoConvocante?: string;
  regionImpacto?: string;
  tipoBeneficiario?: string;
  saNumber?: string;
  bdnsUrl?: string;
}

interface SubventionCardProps {
  subvention: Subvention;
}

export const SubventionCard = ({ subvention }: SubventionCardProps) => {
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
    <Card className="group h-full transition-all duration-300 hover:shadow-[var(--shadow-hover)] bg-gradient-to-br from-card to-card/95">
      <CardHeader>
        <div className="flex items-start justify-between gap-2 mb-2">
          <Badge variant="secondary" className="text-xs">
            {subvention.category}
          </Badge>
          <Badge className={`${statusColors[subvention.status]} text-xs`}>
            {statusLabels[subvention.status]}
          </Badge>
        </div>
        <CardTitle className="text-xl group-hover:text-primary transition-colors">
          {subvention.title}
        </CardTitle>
        <CardDescription className="line-clamp-2 text-sm">
          {subvention.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <Euro className="h-4 w-4 text-accent" />
          <span className="font-semibold text-foreground">{subvention.amount}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>Plazo: {subvention.deadline}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Building2 className="h-4 w-4" />
          <span>{subvention.entity}</span>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          className="w-full font-semibold" 
          disabled={subvention.status === "closed"}
          onClick={() => subvention.bdnsUrl && window.open(subvention.bdnsUrl, '_blank')}
        >
          {subvention.status === "closed" ? "Cerrada" : "Ver en BDNS"}
        </Button>
      </CardFooter>
    </Card>
  );
};

import { AspectRatio } from "@/components/ui/aspect-ratio";

// Partner logos - real organization logos
const partners = [
  { 
    name: "ILGA World", 
    type: "Global Advocacy Network",
    logo: "", // Will be set via props
    website: "https://ilga.org"
  },
  { 
    name: "OutRight Action International", 
    type: "Human Rights & UN Advocacy",
    logo: "",
    website: "https://outrightinternational.org"
  },
  { 
    name: "Lambda Legal", 
    type: "Legal Defense & Education",
    logo: "",
    website: "https://lambdalegal.org"
  },
  { 
    name: "Human Rights Watch", 
    type: "Research & Documentation",
    logo: "",
    website: "https://hrw.org"
  },
  { 
    name: "Amnesty International", 
    type: "Emergency Protection",
    logo: "",
    website: "https://amnesty.org"
  },
  { 
    name: "Rainbow Railroad", 
    type: "Emergency Relocation",
    logo: "",
    website: "https://rainbowrailroad.org"
  },
];

interface PartnersSectionProps {
  partnerLogos?: {
    ilgaWorld?: string;
    outright?: string;
    lambdaLegal?: string;
    humanRightsWatch?: string;
    amnestyInternational?: string;
    rainbowRailroad?: string;
  };
}

export function PartnersSection({ partnerLogos }: PartnersSectionProps) {
  const partnersWithLogos = partners.map((partner, index) => {
    let logo = partner.logo;
    if (partnerLogos) {
      if (index === 0 && partnerLogos.ilgaWorld) logo = partnerLogos.ilgaWorld;
      if (index === 1 && partnerLogos.outright) logo = partnerLogos.outright;
      if (index === 2 && partnerLogos.lambdaLegal) logo = partnerLogos.lambdaLegal;
      if (index === 3 && partnerLogos.humanRightsWatch) logo = partnerLogos.humanRightsWatch;
      if (index === 4 && partnerLogos.amnestyInternational) logo = partnerLogos.amnestyInternational;
      if (index === 5 && partnerLogos.rainbowRailroad) logo = partnerLogos.rainbowRailroad;
    }
    return { ...partner, logo };
  });

  return (
    <section id="partners" className="section-padding bg-secondary">
      <div className="container-campaign">
        <div className="text-center mb-12">
          <h2 className="headline-section text-foreground mb-4">Our Partners</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We work alongside trusted organizations worldwide to deliver 
            comprehensive support to those who need it most.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partnersWithLogos.map((partner) => (
            <a
              key={partner.name}
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-background p-6 rounded-lg flex items-center gap-4 hover:shadow-md transition-shadow"
            >
              <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 overflow-hidden">
                {partner.logo ? (
                  <img 
                    src={partner.logo} 
                    alt={`${partner.name} logo`}
                    className="w-full h-full object-contain p-2"
                  />
                ) : (
                  <span className="text-xs font-medium text-muted-foreground text-center px-1">
                    {partner.name.split(' ').slice(0, 2).join(' ')}
                  </span>
                )}
              </div>
              <div>
                <h3 className="font-medium text-foreground">{partner.name}</h3>
                <p className="text-sm text-muted-foreground">{partner.type}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

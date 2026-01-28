import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Leader images - to be replaced with actual headshots
// Upload images to src/assets/leaders/ and update the paths below
const team = [
  {
    name: "Dr. Sarah Chen",
    role: "Executive Director",
    description: "Former UNHCR Senior Protection Advisor with 25+ years in international humanitarian law and refugee resettlement.",
    initials: "SC",
    image: "", // Add path like: import sarahChen from "@/assets/leaders/sarah-chen.jpg"
  },
  {
    name: "Marcus Okonkwo",
    role: "Director of Global Programs",
    description: "Previously led human rights initiatives at Human Rights Watch across 40+ countries in Africa and Asia.",
    initials: "MO",
    image: "",
  },
  {
    name: "Dr. Elena Vásquez",
    role: "Chief Medical Officer",
    description: "Public health specialist from Médecins Sans Frontières with expertise in trauma-informed care.",
    initials: "EV",
    image: "",
  },
  {
    name: "James Hartley, JD",
    role: "Legal Director",
    description: "Former Lambda Legal senior counsel specializing in asylum law and international human rights litigation.",
    initials: "JH",
    image: "",
  },
];

interface LeadershipSectionProps {
  leaderImages?: {
    sarahChen?: string;
    marcusOkonkwo?: string;
    elenaVasquez?: string;
    jamesHartley?: string;
  };
}

export function LeadershipSection({ leaderImages }: LeadershipSectionProps) {
  const teamWithImages = team.map((member, index) => {
    let image = member.image;
    if (leaderImages) {
      if (index === 0 && leaderImages.sarahChen) image = leaderImages.sarahChen;
      if (index === 1 && leaderImages.marcusOkonkwo) image = leaderImages.marcusOkonkwo;
      if (index === 2 && leaderImages.elenaVasquez) image = leaderImages.elenaVasquez;
      if (index === 3 && leaderImages.jamesHartley) image = leaderImages.jamesHartley;
    }
    return { ...member, image };
  });

  return (
    <section className="section-padding">
      <div className="container-campaign">
        <div className="text-center mb-12">
          <h2 className="headline-section text-foreground mb-4">Leadership</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our leadership team brings decades of experience in humanitarian 
            response, public health, human rights law, and international development.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamWithImages.map((member) => (
            <div key={member.name} className="card-elevated p-6 text-center">
              <Avatar className="w-20 h-20 mx-auto mb-4">
                {member.image ? (
                  <AvatarImage src={member.image} alt={member.name} className="object-cover" />
                ) : null}
                <AvatarFallback className="text-lg font-medium bg-primary/10 text-primary">
                  {member.initials}
                </AvatarFallback>
              </Avatar>
              <h3 className="font-semibold text-foreground">{member.name}</h3>
              <p className="text-sm font-medium text-primary mb-2">{member.role}</p>
              <p className="text-sm text-muted-foreground">{member.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const team = [
  { name: "Dr. Sarah Chen", role: "Executive Director", initials: "SC", image: "" },
  { name: "Marcus Okonkwo", role: "Director of Programs", initials: "MO", image: "" },
  { name: "Dr. Elena Vásquez", role: "Chief Medical Officer", initials: "EV", image: "" },
  { name: "James Hartley, JD", role: "Legal Director", initials: "JH", image: "" },
];

interface LeadershipSectionProps {
  leaderImages?: Record<string, string>;
}

export function LeadershipSection({ leaderImages }: LeadershipSectionProps) {
  return (
    <section className="section-padding bg-secondary">
      <div className="container-campaign">
        <h2 className="headline-section text-foreground text-center mb-10">Leadership</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {team.map((member) => (
            <div key={member.name} className="text-center">
              <Avatar className="w-16 h-16 mx-auto mb-3">
                <AvatarFallback className="bg-primary/10 text-primary font-medium">
                  {member.initials}
                </AvatarFallback>
              </Avatar>
              <h3 className="font-medium text-foreground text-sm">{member.name}</h3>
              <p className="text-xs text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

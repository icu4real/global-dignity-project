const partners = [
  { name: "ILGA World", website: "https://ilga.org" },
  { name: "OutRight International", website: "https://outrightinternational.org" },
  { name: "Lambda Legal", website: "https://lambdalegal.org" },
  { name: "Human Rights Watch", website: "https://hrw.org" },
  { name: "Amnesty International", website: "https://amnesty.org" },
  { name: "Rainbow Railroad", website: "https://rainbowrailroad.org" },
];

export function PartnersSection() {
  return (
    <section className="section-padding">
      <div className="container-campaign">
        <h2 className="headline-section text-foreground text-center mb-10">Partners</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {partners.map((partner) => (
            <a
              key={partner.name}
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-secondary rounded-md text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {partner.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

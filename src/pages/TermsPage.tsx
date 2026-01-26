import { Layout } from "@/components/layout/Layout";

export default function TermsPage() {
  return (
    <Layout>
      <section className="section-padding pride-gradient-subtle">
        <div className="container-campaign max-w-3xl">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4">Legal</p>
          <h1 className="headline-hero text-foreground mb-6">Terms of Use</h1>
          <p className="body-large text-muted-foreground">Please review these terms carefully before using our services.</p>
        </div>
      </section>
      
      {/* Pride accent line */}
      <div className="h-[3px] bg-gradient-to-r from-[hsl(210,65%,50%)] via-[hsl(145,55%,42%)] to-[hsl(45,75%,55%)] opacity-40" />
      
      <section className="section-padding">
        <div className="container-campaign max-w-3xl">
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
            <p><strong>Last Updated:</strong> January 2025</p>
            <p>These Terms of Use govern your access to and use of the Pride Campaign website and services.</p>
            
            <h2 className="font-serif text-2xl text-foreground mt-8 mb-4">Acceptance of Terms</h2>
            <p>By accessing or using our website, you agree to be bound by these Terms. If you do not agree, please do not use our services.</p>
            
            <h2 className="font-serif text-2xl text-foreground mt-8 mb-4">Contributions</h2>
            <p>All contributions are voluntary and non-refundable. Contributions are made via USDT on the Solana network. You are responsible for ensuring accuracy of transaction details. Minimum contribution: $100. Maximum contribution: $100,000 per transaction.</p>
            
            <h2 className="font-serif text-2xl text-foreground mt-8 mb-4">Use of Website</h2>
            <p>You agree to use the website only for lawful purposes. You may not use the site in any way that could damage, disable, or impair the site or interfere with any other party's use.</p>
            
            <h2 className="font-serif text-2xl text-foreground mt-8 mb-4">Intellectual Property</h2>
            <p>All content on this website is the property of Pride Campaign and is protected by copyright and other intellectual property laws.</p>
            
            <h2 className="font-serif text-2xl text-foreground mt-8 mb-4">Limitation of Liability</h2>
            <p>Pride Campaign shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of this website.</p>
            
            <h2 className="font-serif text-2xl text-foreground mt-8 mb-4">Changes to Terms</h2>
            <p>We reserve the right to modify these Terms at any time. Continued use of the website after changes constitutes acceptance of the new Terms.</p>
            
            <h2 className="font-serif text-2xl text-foreground mt-8 mb-4">Contact</h2>
            <p>Questions about these Terms should be directed to: legal@pridecampaign.org</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}

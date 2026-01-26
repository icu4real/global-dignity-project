import { Layout } from "@/components/layout/Layout";

export default function PrivacyPage() {
  return (
    <Layout>
      <section className="section-padding pride-gradient-subtle">
        <div className="container-campaign max-w-3xl">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4">Legal</p>
          <h1 className="headline-hero text-foreground mb-6">Privacy Policy</h1>
          <p className="body-large text-muted-foreground">Your privacy is important to us. This policy explains how we protect your information.</p>
        </div>
      </section>
      
      {/* Pride accent line */}
      <div className="h-[3px] bg-gradient-to-r from-[hsl(0,65%,55%)] via-[hsl(145,55%,42%)] to-[hsl(280,55%,50%)] opacity-40" />
      
      <section className="section-padding">
        <div className="container-campaign max-w-3xl">
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
            <p><strong>Last Updated:</strong> January 2025</p>
            <p>Pride Campaign ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information.</p>
            
            <h2 className="font-serif text-2xl text-foreground mt-8 mb-4">Information We Collect</h2>
            <p>We collect information you provide directly, including: name, email address, contribution amounts, and communication preferences. For contributions, we collect transaction identifiers but do not store cryptocurrency wallet addresses beyond the receiving address.</p>
            
            <h2 className="font-serif text-2xl text-foreground mt-8 mb-4">How We Use Your Information</h2>
            <p>We use collected information to: process contributions, send receipts and updates, respond to inquiries, comply with legal obligations, and improve our services.</p>
            
            <h2 className="font-serif text-2xl text-foreground mt-8 mb-4">Information Sharing</h2>
            <p>We do not sell, trade, or rent your personal information. We may share information with service providers who assist our operations, or when required by law.</p>
            
            <h2 className="font-serif text-2xl text-foreground mt-8 mb-4">Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
            
            <h2 className="font-serif text-2xl text-foreground mt-8 mb-4">Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal information. Contact us at privacy@pridecampaign.org to exercise these rights.</p>
            
            <h2 className="font-serif text-2xl text-foreground mt-8 mb-4">Contact Us</h2>
            <p>Questions about this Privacy Policy should be directed to: privacy@pridecampaign.org</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}

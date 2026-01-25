import { Layout } from "@/components/layout/Layout";

export default function PrivacyPage() {
  return (
    <Layout>
      <section className="section-padding">
        <div className="container-campaign max-w-3xl">
          <h1 className="headline-hero text-foreground mb-8">Privacy Policy</h1>
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

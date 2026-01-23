import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Shield, Heart, Home, Briefcase, Check, AlertTriangle, Copy, Globe, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import donationQRCode from "@/assets/donation-qr-code.jpeg";

const donationCategories = [
  {
    id: "safety",
    icon: Shield,
    title: "Safety & Protection",
    description: "Emergency response, legal aid, safe shelters",
    color: "safety-teal",
  },
  {
    id: "health",
    icon: Heart,
    title: "Health & Care",
    description: "Mental health, trauma care, medical access",
    color: "dignity-coral",
  },
  {
    id: "dignity",
    icon: Home,
    title: "Dignity & Opportunity",
    description: "Housing, education, workplace safety",
    color: "hope-gold",
  },
  {
    id: "general",
    icon: Briefcase,
    title: "General Fund",
    description: "Support where it's needed most",
    color: "primary",
  },
];

const impactStatements: Record<number, string> = {
  25: "Provides emergency supplies for one person in crisis",
  50: "Funds legal aid consultation for one individual",
  100: "Supports one week of safe housing",
  250: "Covers mental health counseling for one month",
  500: "Enables emergency relocation for one person",
};

const WALLET_ADDRESS = "3DCpcAACrKMQr2uXc2T5q4KATKzaCp3TGWUrcRgQwTpY";

export default function DonatePage() {
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [copiedWallet, setCopiedWallet] = useState(false);

  const copyWalletAddress = () => {
    navigator.clipboard.writeText(WALLET_ADDRESS);
    setCopiedWallet(true);
    toast.success("Wallet address copied to clipboard!");
    setTimeout(() => setCopiedWallet(false), 3000);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding bg-secondary">
        <div className="container-campaign">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-accent uppercase tracking-wider mb-4">
              Support Protection
            </p>
            <h1 className="headline-hero text-foreground mb-6">
              Your support protects lives
            </h1>
            <p className="body-large text-muted-foreground">
              Every contribution directly funds emergency response, healthcare 
              access, and dignity restoration for LGBTQ+ individuals facing 
              persecution worldwide. 92% of all funds go directly to programs.
            </p>
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="section-padding">
        <div className="container-campaign">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Form */}
            <div className="lg:col-span-2">
              {/* Global Payment Notice */}
              <div className="mb-8 p-6 bg-primary/5 border border-primary/20 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Globe className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-foreground mb-2">
                      Global Donations via USDT (Solana Network)
                    </h3>
                    <p className="text-muted-foreground">
                      As a global protection platform serving individuals across borders, 
                      we accept donations exclusively in <strong>USDT on the Solana network</strong>. 
                      This enables supporters worldwide to contribute instantly without 
                      geographic restrictions, currency conversion barriers, or intermediary 
                      fees—ensuring maximum impact reaches those in need.
                    </p>
                  </div>
                </div>
              </div>

              {/* Category Selection */}
              <div className="mb-8">
                <h2 className="font-serif text-2xl text-foreground mb-4">
                  Direct your support
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {donationCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        selectedCategory === category.id
                          ? "border-accent bg-accent/5"
                          : "border-border hover:border-accent/50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="pillar-icon flex-shrink-0">
                          <category.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{category.title}</p>
                          <p className="text-sm text-muted-foreground">{category.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* USDT Payment Section */}
              <div className="mb-8">
                <h2 className="font-serif text-2xl text-foreground mb-4">
                  Send your donation
                </h2>
                
                <div className="card-elevated p-8 text-center">
                  {/* QR Code */}
                  <div className="mb-6">
                    <div className="inline-block p-4 bg-white rounded-xl shadow-lg">
                      <img 
                        src={donationQRCode} 
                        alt="USDT Solana Wallet QR Code" 
                        className="w-48 h-48 sm:w-64 sm:h-64 object-contain"
                      />
                    </div>
                  </div>

                  {/* Network Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-teal-500/10 border border-purple-500/20 rounded-full mb-4">
                    <Wallet className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium text-foreground">
                      USDT on Solana Network
                    </span>
                  </div>

                  {/* Wallet Address */}
                  <div className="mb-6">
                    <p className="text-sm text-muted-foreground mb-2">Wallet Address</p>
                    <div className="flex items-center justify-center gap-2 flex-wrap">
                      <code className="px-4 py-3 bg-muted rounded-lg text-sm font-mono text-foreground break-all max-w-full">
                        {WALLET_ADDRESS}
                      </code>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={copyWalletAddress}
                        className="flex items-center gap-2"
                      >
                        <Copy className="w-4 h-4" />
                        {copiedWallet ? "Copied!" : "Copy"}
                      </Button>
                    </div>
                  </div>

                  {/* Instructions */}
                  <div className="text-left p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm font-medium text-foreground mb-2">How to donate:</p>
                    <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                      <li>Open your Solana-compatible wallet (Phantom, Solflare, etc.)</li>
                      <li>Scan the QR code or copy the wallet address above</li>
                      <li>Send USDT (SPL token) on the Solana network</li>
                      <li>Transaction completes in seconds with minimal fees</li>
                    </ol>
                  </div>
                </div>

                {/* Donation Limits Notice */}
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Suggested donation: $25 – $500 USDT
                      </p>
                      <p className="text-sm text-muted-foreground">
                        We encourage contributions within this range to ensure broad-based support 
                        and maintain donor credibility. For larger contributions, please contact 
                        us directly to discuss partnership opportunities.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Trust Indicators */}
              <div className="card-elevated p-6 mb-6">
                <h3 className="font-serif text-lg text-foreground mb-4">
                  Why give with confidence
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      92% of funds go directly to programs
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      Registered 501(c)(3) nonprofit
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      A+ rated by independent charity evaluators
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      Transparent annual reporting
                    </span>
                  </li>
                </ul>
              </div>

              {/* Why Crypto */}
              <div className="bg-primary text-primary-foreground p-6 rounded-lg mb-6">
                <h3 className="font-serif text-lg mb-4">
                  Why cryptocurrency?
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-sm">
                      Borderless: Donate from anywhere in the world
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-sm">
                      Low fees: More of your donation reaches programs
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-sm">
                      Fast: Transactions complete in seconds
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-sm">
                      Transparent: All transactions verifiable on-chain
                    </span>
                  </li>
                </ul>
              </div>

              {/* Impact Preview */}
              <div className="card-elevated p-6">
                <h3 className="font-serif text-lg text-foreground mb-4">
                  Your impact at every level
                </h3>
                <ul className="space-y-4">
                  {Object.entries(impactStatements).map(([amt, statement]) => (
                    <li key={amt} className="flex items-start gap-3">
                      <span className="font-medium text-primary w-16">${amt}</span>
                      <span className="text-sm text-muted-foreground">{statement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Payment Method */}
              <div className="mt-6 text-center">
                <p className="text-xs text-muted-foreground mb-2">Accepting donations via</p>
                <div className="flex items-center justify-center gap-2">
                  <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
                    <Wallet className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-medium text-foreground">USDT (Solana)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Ways to Give */}
      <section className="section-padding bg-cream">
        <div className="container-campaign text-center max-w-2xl mx-auto">
          <h2 className="headline-section text-foreground mb-6">
            Other ways to support
          </h2>
          <p className="body-large text-muted-foreground mb-8">
            Beyond financial contributions, you can support our mission through 
            corporate partnerships, advocacy, or by sharing our work with your network.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Corporate Partnerships
            </Button>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Become an Advocate
            </Button>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Share Our Mission
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

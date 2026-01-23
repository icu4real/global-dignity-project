import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Shield, Heart, Home, Briefcase, Check, AlertTriangle, ArrowRight, Lock, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

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

const suggestedAmounts = [25, 50, 100, 250, 500];

const impactStatements: Record<number, string> = {
  25: "Provides emergency supplies for one person in crisis",
  50: "Funds legal aid consultation for one individual",
  100: "Supports one week of safe housing",
  250: "Covers mental health counseling for one month",
  500: "Enables emergency relocation for one person",
};

const MIN_DONATION = 25;
const MAX_DONATION = 500;

export default function DonatePage() {
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [donationType, setDonationType] = useState<"one-time" | "monthly">("monthly");
  const [amount, setAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState("");
  const [showCustom, setShowCustom] = useState(false);

  const currentAmount = showCustom ? Number(customAmount) || 0 : amount;
  const isValidAmount = currentAmount >= MIN_DONATION && currentAmount <= MAX_DONATION;

  const handleCustomAmountChange = (value: string) => {
    const numValue = Number(value);
    setCustomAmount(value);
    
    if (numValue > MAX_DONATION) {
      toast.warning(
        `Maximum donation is $${MAX_DONATION} per transaction to ensure broad-based support and donor credibility.`,
        { duration: 5000 }
      );
    }
  };

  const handleDonate = () => {
    if (!isValidAmount) {
      toast.error(`Please enter an amount between $${MIN_DONATION} and $${MAX_DONATION}`);
      return;
    }
    
    toast.success(
      `Thank you for your ${donationType === "monthly" ? "monthly" : ""} commitment of $${currentAmount}! You'll be redirected to complete your donation.`
    );
  };

  const getImpactStatement = (amt: number) => {
    if (amt >= 500) return impactStatements[500];
    if (amt >= 250) return impactStatements[250];
    if (amt >= 100) return impactStatements[100];
    if (amt >= 50) return impactStatements[50];
    return impactStatements[25];
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
              {/* Donation Type */}
              <div className="mb-8">
                <h2 className="font-serif text-2xl text-foreground mb-4">
                  Choose your giving type
                </h2>
                <div className="flex gap-4">
                  <button
                    onClick={() => setDonationType("monthly")}
                    className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                      donationType === "monthly"
                        ? "border-accent bg-accent/5"
                        : "border-border hover:border-accent/50"
                    }`}
                  >
                    <p className="font-medium text-foreground">Monthly</p>
                    <p className="text-sm text-muted-foreground">Become a Dignity Ally</p>
                  </button>
                  <button
                    onClick={() => setDonationType("one-time")}
                    className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                      donationType === "one-time"
                        ? "border-accent bg-accent/5"
                        : "border-border hover:border-accent/50"
                    }`}
                  >
                    <p className="font-medium text-foreground">One-time</p>
                    <p className="text-sm text-muted-foreground">Single contribution</p>
                  </button>
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

              {/* Amount Selection */}
              <div className="mb-8">
                <h2 className="font-serif text-2xl text-foreground mb-4">
                  Select amount
                </h2>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-4">
                  {suggestedAmounts.map((amt) => (
                    <button
                      key={amt}
                      onClick={() => {
                        setAmount(amt);
                        setShowCustom(false);
                        setCustomAmount("");
                      }}
                      className={`p-4 rounded-lg border-2 text-center transition-all ${
                        !showCustom && amount === amt
                          ? "border-accent bg-accent/5"
                          : "border-border hover:border-accent/50"
                      }`}
                    >
                      <p className="font-medium text-foreground">${amt}</p>
                    </button>
                  ))}
                </div>
                
                {/* Custom Amount */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setShowCustom(true)}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                      showCustom
                        ? "border-accent bg-accent/5"
                        : "border-border hover:border-accent/50"
                    }`}
                  >
                    <p className="text-sm font-medium text-foreground">Custom amount</p>
                  </button>
                  {showCustom && (
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-medium text-foreground">$</span>
                      <Input
                        type="number"
                        value={customAmount}
                        onChange={(e) => handleCustomAmountChange(e.target.value)}
                        placeholder="Enter amount"
                        min={MIN_DONATION}
                        max={MAX_DONATION}
                        className="w-32"
                      />
                    </div>
                  )}
                </div>

                {/* Donation Limits Notice */}
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Donation limits: ${MIN_DONATION} – ${MAX_DONATION}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        We limit individual donations to ensure broad-based support 
                        and maintain donor credibility. For larger contributions, 
                        please contact us directly.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Impact Statement */}
                {isValidAmount && (
                  <div className="mt-4 p-4 bg-accent/10 rounded-lg">
                    <p className="text-sm text-foreground">
                      <strong>Your {currentAmount} {donationType === "monthly" ? "monthly " : ""}gift:</strong>{" "}
                      {getImpactStatement(currentAmount)}
                    </p>
                  </div>
                )}
              </div>

              {/* Submit */}
              <Button
                onClick={handleDonate}
                disabled={!isValidAmount}
                className="btn-accent w-full text-lg py-6"
              >
                {donationType === "monthly" ? "Become a Dignity Ally" : "Complete Donation"} – ${currentAmount}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <p className="text-center text-sm text-muted-foreground mt-4 flex items-center justify-center gap-2">
                <Lock className="w-4 h-4" />
                Secure, encrypted donation processing
              </p>
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

              {/* Monthly Benefits */}
              {donationType === "monthly" && (
                <div className="bg-primary text-primary-foreground p-6 rounded-lg mb-6">
                  <h3 className="font-serif text-lg mb-4">
                    Dignity Ally benefits
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-sm">
                        Quarterly impact reports
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-sm">
                        Stories from the field
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-sm">
                        Cancel anytime
                      </span>
                    </li>
                  </ul>
                </div>
              )}

              {/* Impact Preview */}
              <div className="card-elevated p-6">
                <h3 className="font-serif text-lg text-foreground mb-4">
                  Your impact at every level
                </h3>
                <ul className="space-y-4">
                  {Object.entries(impactStatements).map(([amt, statement]) => (
                    <li key={amt} className="flex items-start gap-3">
                      <span className="font-medium text-primary w-12">${amt}</span>
                      <span className="text-sm text-muted-foreground">{statement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Payment Methods */}
              <div className="mt-6 text-center">
                <p className="text-xs text-muted-foreground mb-2">Secure payments via</p>
                <div className="flex items-center justify-center gap-4">
                  <CreditCard className="w-8 h-8 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Credit Card • PayPal</span>
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
            planned giving, corporate partnerships, or by sharing our work.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Corporate Partnerships
            </Button>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Planned Giving
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


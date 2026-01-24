import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Shield, Heart, Home, Briefcase, Check, AlertTriangle, ArrowRight, Lock, Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import solanaWalletQR from "@/assets/solana-wallet-qr.jpeg";

const SOLANA_WALLET_ADDRESS = "3DCpcAACrKMQr2uXc2T5q4KATKzaCp3TGWUrcRgQwTpY";

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
  const [donorEmail, setDonorEmail] = useState("");
  const [transactionHash, setTransactionHash] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPaymentStep, setShowPaymentStep] = useState(false);

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

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(SOLANA_WALLET_ADDRESS);
      toast.success("Wallet address copied to clipboard!");
    } catch {
      toast.error("Failed to copy address");
    }
  };

  const handleProceedToPayment = () => {
    if (!isValidAmount) {
      toast.error(`Please enter an amount between $${MIN_DONATION} and $${MAX_DONATION}`);
      return;
    }
    setShowPaymentStep(true);
  };

  const handleConfirmDonation = async () => {
    if (!transactionHash.trim()) {
      toast.error("Please enter your transaction hash to confirm your donation");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.from("donations").insert({
        wallet_address: SOLANA_WALLET_ADDRESS,
        amount: currentAmount,
        category: selectedCategory,
        donation_type: donationType,
        donor_email: donorEmail || null,
        transaction_hash: transactionHash.trim(),
        status: "pending",
      });

      if (error) throw error;

      toast.success(
        "Thank you for your donation! We'll verify your transaction and send you a confirmation.",
        { duration: 6000 }
      );
      
      // Reset form
      setTransactionHash("");
      setDonorEmail("");
      setShowPaymentStep(false);
    } catch (error) {
      console.error("Error recording donation:", error);
      toast.error("Failed to record your donation. Please try again or contact support.");
    } finally {
      setIsSubmitting(false);
    }
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
              {!showPaymentStep ? (
                <>
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
                      Select amount (USDT)
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
                            Donation limits: ${MIN_DONATION} – ${MAX_DONATION} USDT
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
                          <strong>Your ${currentAmount} {donationType === "monthly" ? "monthly " : ""}gift:</strong>{" "}
                          {getImpactStatement(currentAmount)}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Submit */}
                  <Button
                    onClick={handleProceedToPayment}
                    disabled={!isValidAmount}
                    className="btn-accent w-full text-lg py-6"
                  >
                    Proceed to Payment – ${currentAmount} USDT
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </>
              ) : (
                /* Payment Step - USDT/Solana */
                <div className="space-y-8">
                  <button
                    onClick={() => setShowPaymentStep(false)}
                    className="text-primary hover:text-accent transition-colors text-sm flex items-center gap-1"
                  >
                    ← Back to selection
                  </button>

                  <div className="text-center">
                    <h2 className="font-serif text-2xl text-foreground mb-2">
                      Send ${currentAmount} USDT on Solana
                    </h2>
                    <p className="text-muted-foreground">
                      Scan the QR code or copy the wallet address below
                    </p>
                  </div>

                  {/* QR Code */}
                  <div className="flex justify-center">
                    <div className="bg-black p-4 rounded-xl shadow-lg">
                      <img
                        src={solanaWalletQR}
                        alt="Solana USDT Wallet QR Code"
                        className="w-52 h-52 object-contain"
                      />
                    </div>
                  </div>

                  {/* Wallet Address */}
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">USDT Wallet Address (Solana Network)</p>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 text-sm text-foreground bg-background p-3 rounded-lg break-all font-mono">
                        {SOLANA_WALLET_ADDRESS}
                      </code>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handleCopyAddress}
                        className="flex-shrink-0"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Important Notice */}
                  <div className="bg-accent/10 border border-accent/20 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground mb-1">
                          Important: Send only USDT on Solana Network
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Sending any other token or using a different network will result in permanent loss of funds.
                          Please ensure you're sending USDT (SPL Token) on the Solana blockchain.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Transaction Confirmation */}
                  <div className="space-y-4">
                    <h3 className="font-serif text-xl text-foreground">
                      Confirm your donation
                    </h3>
                    
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Email (optional - for donation receipt)
                      </label>
                      <Input
                        type="email"
                        value={donorEmail}
                        onChange={(e) => setDonorEmail(e.target.value)}
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Transaction Hash / Signature *
                      </label>
                      <Input
                        type="text"
                        value={transactionHash}
                        onChange={(e) => setTransactionHash(e.target.value)}
                        placeholder="Enter your Solana transaction hash"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        You can find this in your wallet after completing the transaction
                      </p>
                    </div>

                    <Button
                      onClick={handleConfirmDonation}
                      disabled={isSubmitting || !transactionHash.trim()}
                      className="btn-accent w-full text-lg py-6"
                    >
                      {isSubmitting ? "Recording..." : "Confirm Donation"}
                      <Check className="ml-2 h-5 w-5" />
                    </Button>

                    <a
                      href={`https://solscan.io/account/${SOLANA_WALLET_ADDRESS}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:text-accent transition-colors flex items-center justify-center gap-1"
                    >
                      View wallet on Solscan
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )}

              <p className="text-center text-sm text-muted-foreground mt-4 flex items-center justify-center gap-2">
                <Lock className="w-4 h-4" />
                Cryptocurrency donations are transparent and verifiable
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
                      Blockchain-verified transactions
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      Global accessibility via USDT/Solana
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      Transparent on-chain reporting
                    </span>
                  </li>
                </ul>
              </div>

              {/* Payment Method */}
              <div className="bg-gradient-to-br from-[#9945FF] to-[#14F195] text-white p-6 rounded-lg mb-6">
                <h3 className="font-serif text-lg mb-3">
                  We accept USDT on Solana
                </h3>
                <p className="text-sm text-white/90 mb-4">
                  Cryptocurrency enables fast, low-cost donations from anywhere in the world with full transparency.
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold">SOL</span>
                  </div>
                  <span className="text-sm">Solana Network</span>
                </div>
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

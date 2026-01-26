import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Check, AlertTriangle, ArrowRight, Copy, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import solanaWalletQR from "@/assets/solana-wallet-qr.jpeg";

const SOLANA_WALLET_ADDRESS = "3DCpcAACrKMQr2uXc2T5q4KATKzaCp3TGWUrcRgQwTpY";

const contributionCategories = [
  {
    id: "general",
    title: "General Fund",
    description: "Support where it's needed most",
  },
  {
    id: "legal",
    title: "Legal Protection",
    description: "Rights advocacy and legal support",
  },
  {
    id: "education",
    title: "Education & Advocacy",
    description: "Research and public awareness",
  },
  {
    id: "community",
    title: "Community Support",
    description: "Direct community programs",
  },
];

const MIN_CONTRIBUTION = 100;
const MAX_CONTRIBUTION = 100000;
const SUGGESTED_AMOUNTS = [100, 250, 500, 1000, 5000, 10000];

export default function DonatePage() {
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [contributionType, setContributionType] = useState<"one-time" | "recurring">("one-time");
  const [amount, setAmount] = useState(500);
  const [customAmount, setCustomAmount] = useState("");
  const [showCustom, setShowCustom] = useState(false);
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [transactionHash, setTransactionHash] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPaymentStep, setShowPaymentStep] = useState(false);
  const [limits, setLimits] = useState({ min: MIN_CONTRIBUTION, max: MAX_CONTRIBUTION });

  useEffect(() => {
    // Fetch configurable limits from database
    const fetchLimits = async () => {
      const { data } = await supabase
        .from("campaign_settings")
        .select("setting_value")
        .eq("setting_key", "donation_limits")
        .maybeSingle();
      
      if (data?.setting_value) {
        const settings = data.setting_value as { min: number; max: number };
        setLimits({ min: settings.min, max: settings.max });
      }
    };
    fetchLimits();
  }, []);

  const currentAmount = showCustom ? Number(customAmount) || 0 : amount;
  const isValidAmount = currentAmount >= limits.min && currentAmount <= limits.max;
  const isValidDonorInfo = donorName.trim().length >= 2 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donorEmail);

  const handleCustomAmountChange = (value: string) => {
    const numValue = Number(value);
    setCustomAmount(value);
    
    if (numValue > limits.max) {
      toast.info(
        `Maximum contribution is $${limits.max.toLocaleString()} per transaction.`,
        { duration: 4000 }
      );
    }
  };

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(SOLANA_WALLET_ADDRESS);
      toast.success("Wallet address copied");
    } catch {
      toast.error("Failed to copy address");
    }
  };

  const handleProceedToPayment = () => {
    if (!isValidAmount) {
      toast.error(`Please enter an amount between $${limits.min.toLocaleString()} and $${limits.max.toLocaleString()}`);
      return;
    }
    if (!isValidDonorInfo) {
      toast.error("Please enter your name and a valid email address");
      return;
    }
    setShowPaymentStep(true);
  };

  const handleConfirmContribution = async () => {
    if (!transactionHash.trim()) {
      toast.error("Please enter your transaction hash to confirm your contribution");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.from("donations").insert({
        wallet_address: SOLANA_WALLET_ADDRESS,
        amount: currentAmount,
        category: selectedCategory,
        donation_type: contributionType,
        donor_name: donorName.trim(),
        donor_email: donorEmail.trim(),
        transaction_hash: transactionHash.trim(),
        status: "pending",
      });

      if (error) throw error;

      toast.success(
        "Thank you for your contribution. We will verify your transaction and send confirmation.",
        { duration: 6000 }
      );
      
      setTransactionHash("");
      setShowPaymentStep(false);
    } catch (error) {
      console.error("Error recording contribution:", error);
      toast.error("Failed to record contribution. Please contact support.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 pride-gradient-subtle">
        <div className="container-campaign">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4">
              Support Grant
            </p>
            <h1 className="headline-hero text-foreground mb-6">
              Invest in Progress
            </h1>
            <p className="body-large text-muted-foreground">
              Your contribution directly funds programs advancing equality, 
              protecting rights, and building stronger communities worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Contribution Form */}
      <section className="section-padding">
        <div className="container-campaign">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Main Form */}
            <div className="lg:col-span-2">
              {!showPaymentStep ? (
                <>
                  {/* Contribution Type */}
                  <div className="mb-10">
                    <h2 className="font-serif text-xl text-foreground mb-4">
                      Contribution Type
                    </h2>
                    <div className="flex gap-4">
                      <button
                        onClick={() => setContributionType("one-time")}
                        className={`flex-1 p-4 rounded-md border transition-all ${
                          contributionType === "one-time"
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <p className="font-medium text-foreground">One-time</p>
                        <p className="text-sm text-muted-foreground">Single contribution</p>
                      </button>
                      <button
                        onClick={() => setContributionType("recurring")}
                        className={`flex-1 p-4 rounded-md border transition-all ${
                          contributionType === "recurring"
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <p className="font-medium text-foreground">Recurring</p>
                        <p className="text-sm text-muted-foreground">Monthly commitment</p>
                      </button>
                    </div>
                  </div>

                  {/* Category Selection */}
                  <div className="mb-10">
                    <h2 className="font-serif text-xl text-foreground mb-4">
                      Designation
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {contributionCategories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => setSelectedCategory(category.id)}
                          className={`p-4 rounded-md border text-left transition-all ${
                            selectedCategory === category.id
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <p className="font-medium text-foreground">{category.title}</p>
                          <p className="text-sm text-muted-foreground">{category.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Amount Selection */}
                  <div className="mb-10">
                    <h2 className="font-serif text-xl text-foreground mb-4">
                      Amount (USDT)
                    </h2>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
                      {SUGGESTED_AMOUNTS.map((amt) => (
                        <button
                          key={amt}
                          onClick={() => {
                            setAmount(amt);
                            setShowCustom(false);
                            setCustomAmount("");
                          }}
                          className={`p-3 rounded-md border text-center transition-all ${
                            !showCustom && amount === amt
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <p className="font-medium text-foreground text-sm">{formatCurrency(amt)}</p>
                        </button>
                      ))}
                    </div>
                    
                    {/* Custom Amount */}
                    <div className="flex items-center gap-4 mt-4">
                      <button
                        onClick={() => setShowCustom(true)}
                        className={`px-4 py-2 rounded-md border transition-all text-sm ${
                          showCustom
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        Custom amount
                      </button>
                      {showCustom && (
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-medium text-foreground">$</span>
                          <Input
                            type="number"
                            value={customAmount}
                            onChange={(e) => handleCustomAmountChange(e.target.value)}
                            placeholder="Enter amount"
                            min={limits.min}
                            max={limits.max}
                            className="w-40"
                          />
                        </div>
                      )}
                    </div>

                    {/* Limits Notice */}
                    <div className="mt-4 p-4 bg-muted rounded-md">
                      <div className="flex items-start gap-3">
                        <Info className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-muted-foreground">
                          Contributions accepted: {formatCurrency(limits.min)} – {formatCurrency(limits.max)} USDT. 
                          For institutional grants exceeding these limits, please contact us directly.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Donor Information */}
                  <div className="mb-10">
                    <h2 className="font-serif text-xl text-foreground mb-4">
                      Contributor Information
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Full Name *
                        </label>
                        <Input
                          type="text"
                          value={donorName}
                          onChange={(e) => setDonorName(e.target.value)}
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Email Address *
                        </label>
                        <Input
                          type="email"
                          value={donorEmail}
                          onChange={(e) => setDonorEmail(e.target.value)}
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Required for contribution receipt and compliance documentation.
                    </p>
                  </div>

                  {/* Submit */}
                  <Button
                    onClick={handleProceedToPayment}
                    disabled={!isValidAmount || !isValidDonorInfo}
                    className="btn-primary w-full text-base py-6"
                  >
                    Continue – {formatCurrency(currentAmount)} USDT
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </>
              ) : (
                /* Payment Step */
                <div className="space-y-8">
                  <button
                    onClick={() => setShowPaymentStep(false)}
                    className="text-primary hover:underline transition-colors text-sm"
                  >
                    ← Back to details
                  </button>

                  <div>
                    <h2 className="font-serif text-2xl text-foreground mb-2">
                      Complete Your Contribution
                    </h2>
                    <p className="text-muted-foreground">
                      Send {formatCurrency(currentAmount)} USDT on the Solana network
                    </p>
                  </div>

                  {/* QR Code */}
                  <div className="flex justify-center">
                    <div className="bg-primary p-4 rounded-md">
                      <img
                        src={solanaWalletQR}
                        alt="USDT Wallet QR Code"
                        className="w-48 h-48 object-contain"
                      />
                    </div>
                  </div>

                  {/* Wallet Address */}
                  <div className="bg-muted p-4 rounded-md">
                    <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">USDT Wallet Address (Solana)</p>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 text-sm text-foreground bg-background p-3 rounded-md break-all font-mono">
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
                  <div className="bg-secondary border border-border p-4 rounded-md">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground mb-1">
                          Important: USDT on Solana Network Only
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Sending other tokens or using different networks will result in loss of funds.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Transaction Confirmation */}
                  <div className="space-y-4">
                    <h3 className="font-serif text-lg text-foreground">
                      Confirm Transaction
                    </h3>
                    
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Transaction Hash *
                      </label>
                      <Input
                        type="text"
                        value={transactionHash}
                        onChange={(e) => setTransactionHash(e.target.value)}
                        placeholder="Enter your Solana transaction hash"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Found in your wallet after completing the transaction
                      </p>
                    </div>

                    <Button
                      onClick={handleConfirmContribution}
                      disabled={isSubmitting || !transactionHash.trim()}
                      className="btn-primary w-full text-base py-6"
                    >
                      {isSubmitting ? (
                        "Processing..."
                      ) : (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Confirm Contribution
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Summary Card */}
                <div className="bg-card border border-border rounded-md overflow-hidden relative">
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[hsl(0,65%,55%)] via-[hsl(45,75%,55%)] via-[hsl(145,55%,42%)] to-[hsl(280,55%,50%)] opacity-50" />
                  <div className="p-6">
                    <h3 className="font-serif text-lg text-foreground mb-4">
                      Contribution Summary
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Type</span>
                        <span className="text-foreground capitalize">{contributionType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Designation</span>
                        <span className="text-foreground">
                          {contributionCategories.find(c => c.id === selectedCategory)?.title}
                        </span>
                      </div>
                      <div className="flex justify-between pt-3 border-t border-border">
                        <span className="font-medium text-foreground">Total</span>
                        <span className="font-medium text-foreground">{formatCurrency(currentAmount)} USDT</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="bg-secondary rounded-md overflow-hidden relative">
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[hsl(210,65%,50%)] via-[hsl(145,55%,42%)] to-[hsl(45,75%,55%)] opacity-40" />
                  <div className="p-6">
                    <h4 className="font-medium text-foreground mb-4 text-sm uppercase tracking-wider">Our Commitment</h4>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>92% of funds go directly to programs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Annual independent audits</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Tax-deductible contribution</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Contribution receipt provided</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

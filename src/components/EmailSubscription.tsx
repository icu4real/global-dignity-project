import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, Check } from "lucide-react";

interface EmailSubscriptionProps {
  subscriptionType?: "newsletter" | "updates" | "monthly_donor";
  buttonText?: string;
  placeholder?: string;
  className?: string;
}

export function EmailSubscription({
  subscriptionType = "newsletter",
  buttonText = "Subscribe",
  placeholder = "Enter your email",
  className = "",
}: EmailSubscriptionProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("email_subscriptions").insert({
        email: email.trim().toLowerCase(),
        subscription_type: subscriptionType,
      });

      if (error) {
        if (error.code === "23505") {
          toast.info("You're already subscribed! Thank you for your interest.");
        } else {
          throw error;
        }
      } else {
        toast.success("Thank you for subscribing! You'll receive updates soon.");
        setIsSubscribed(true);
      }
      
      setEmail("");
    } catch (error) {
      console.error("Subscription error:", error);
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubscribed) {
    return (
      <div className={`flex items-center gap-2 text-accent ${className}`}>
        <Check className="w-5 h-5" />
        <span className="text-sm font-medium">Subscribed successfully!</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubscribe} className={`flex gap-2 ${className}`}>
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        className="flex-1"
        disabled={isSubmitting}
      />
      <Button type="submit" disabled={isSubmitting} className="btn-accent">
        {isSubmitting ? "..." : buttonText}
        {!isSubmitting && <ArrowRight className="ml-1 h-4 w-4" />}
      </Button>
    </form>
  );
}

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Send, Check } from "lucide-react";

interface ContactFormProps {
  className?: string;
  defaultType?: "general" | "help_request" | "partnership" | "media";
}

export function ContactForm({ className = "", defaultType = "general" }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    submissionType: defaultType,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (formData.name.length > 100) {
      toast.error("Name must be less than 100 characters");
      return;
    }

    if (formData.message.length > 2000) {
      toast.error("Message must be less than 2000 characters");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        subject: formData.subject.trim() || null,
        message: formData.message.trim(),
        submission_type: formData.submissionType,
      });

      if (error) throw error;

      toast.success("Your message has been sent. We'll get back to you soon!");
      setIsSubmitted(true);
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className={`text-center p-8 bg-accent/10 rounded-lg ${className}`}>
        <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-accent" />
        </div>
        <h3 className="font-serif text-xl text-foreground mb-2">Message Sent!</h3>
        <p className="text-muted-foreground">
          Thank you for reaching out. We'll respond to your inquiry as soon as possible.
        </p>
        <Button
          variant="outline"
          onClick={() => {
            setIsSubmitted(false);
            setFormData({
              name: "",
              email: "",
              subject: "",
              message: "",
              submissionType: defaultType,
            });
          }}
          className="mt-4"
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Your name"
            maxLength={100}
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="your@email.com"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="type">Inquiry Type</Label>
        <Select
          value={formData.submissionType}
          onValueChange={(value) =>
            setFormData({
              ...formData,
              submissionType: value as typeof formData.submissionType,
            })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="general">General Inquiry</SelectItem>
            <SelectItem value="help_request">Request for Help</SelectItem>
            <SelectItem value="partnership">Partnership Opportunity</SelectItem>
            <SelectItem value="media">Media Inquiry</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          type="text"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          placeholder="Brief subject line"
          maxLength={200}
        />
      </div>

      <div>
        <Label htmlFor="message">Message *</Label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="How can we help you?"
          rows={5}
          maxLength={2000}
          required
        />
        <p className="text-xs text-muted-foreground mt-1">
          {formData.message.length}/2000 characters
        </p>
      </div>

      <Button type="submit" disabled={isSubmitting} className="btn-primary w-full">
        {isSubmitting ? "Sending..." : "Send Message"}
        <Send className="ml-2 h-4 w-4" />
      </Button>
    </form>
  );
}

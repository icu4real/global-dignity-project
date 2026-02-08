import { Layout } from "@/components/layout/Layout";
import { Lock, Shield, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/ContactForm";

const contacts = [
  { label: "Emergency Hotline", value: "+1-800-XXX-XXXX", urgent: true },
  { label: "Encrypted Chat", value: "Signal: @DignityGlobalHelp", urgent: true },
  { label: "Email Support", value: "help@dignityglobal.org", urgent: false },
];

export default function GetHelpPage() {
  return (
    <Layout>
      <section className="section-padding pride-gradient-subtle">
        <div className="container-campaign">
          <div className="max-w-2xl">
            <h1 className="headline-hero text-foreground mb-6">Get Help</h1>
            <p className="body-large text-muted-foreground">
              Confidential support and resources. You are not alone.
            </p>
          </div>
        </div>
      </section>

      {/* Privacy notice */}
      <section className="py-4 bg-primary text-primary-foreground">
        <div className="container-campaign flex items-center gap-3">
          <Lock className="w-4 h-4 shrink-0" />
          <p className="text-sm">Your privacy is protected. This site does not track your activity.</p>
        </div>
      </section>

      {/* Contacts */}
      <section className="section-padding">
        <div className="container-campaign">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {contacts.map((c) => (
              <div
                key={c.label}
                className={`p-6 rounded-md ${
                  c.urgent ? "bg-primary text-primary-foreground" : "card-elevated"
                }`}
              >
                <h3 className="font-serif text-lg mb-1">{c.label}</h3>
                <p className="font-mono text-sm">{c.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section-padding bg-secondary">
        <div className="container-campaign">
          <div className="max-w-lg mx-auto">
            <h2 className="headline-section text-foreground text-center mb-6">Send a Message</h2>
            <div className="card-elevated p-6">
              <ContactForm defaultType="help_request" />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Exit */}
      <section className="py-8">
        <div className="container-campaign text-center">
          <Button
            onClick={() => (window.location.href = "https://www.google.com")}
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            Quick Exit
          </Button>
          <p className="text-xs text-muted-foreground mt-2">
            Ctrl+W / Cmd+W to close tab
          </p>
        </div>
      </section>
    </Layout>
  );
}

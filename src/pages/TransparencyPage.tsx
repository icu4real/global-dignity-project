import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Download } from "lucide-react";

export default function TransparencyPage() {
  return (
    <Layout>
      <section className="section-padding pride-gradient-subtle">
        <div className="container-campaign">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4">Accountability</p>
            <h1 className="headline-hero text-foreground mb-6">Transparency & Governance</h1>
            <p className="body-large text-muted-foreground">We are committed to the highest standards of transparency, accountability, and ethical conduct in all our operations.</p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-campaign">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-8 bg-card border border-border rounded-md">
              <p className="text-4xl font-semibold text-primary mb-2" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>92%</p>
              <p className="text-sm text-muted-foreground">Direct to Programs</p>
            </div>
            <div className="text-center p-8 bg-card border border-border rounded-md">
              <p className="text-4xl font-semibold text-primary mb-2" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>15</p>
              <p className="text-sm text-muted-foreground">Years of Clean Audits</p>
            </div>
            <div className="text-center p-8 bg-card border border-border rounded-md">
              <p className="text-4xl font-semibold text-primary mb-2" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>A+</p>
              <p className="text-sm text-muted-foreground">Charity Rating</p>
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-2xl text-foreground mb-6">Financial Reports</h2>
            <div className="space-y-4 mb-12">
              {["Annual Report 2024", "Audited Financial Statements 2024", "Form 990 2024"].map((doc) => (
                <div key={doc} className="flex items-center justify-between p-4 bg-card border border-border rounded-md">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-primary" />
                    <span className="text-foreground">{doc}</span>
                  </div>
                  <Button variant="ghost" size="sm"><Download className="w-4 h-4 mr-2" />PDF</Button>
                </div>
              ))}
            </div>

            <h2 className="font-serif text-2xl text-foreground mb-6">Governance</h2>
            <p className="text-muted-foreground mb-8">Pride Campaign is governed by an independent Board of Directors with expertise in human rights, nonprofit management, finance, and law. Our board meets quarterly and conducts annual reviews of organizational strategy and financial performance.</p>
            
            <div className="text-center">
              <Link to="/impact"><Button className="btn-primary">View Impact Report<ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

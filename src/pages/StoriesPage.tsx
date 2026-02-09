import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { PenLine, ArrowRight } from "lucide-react";

interface Story {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  is_featured: boolean;
  created_at: string;
  user_id: string;
}

export default function StoriesPage() {
  const { user } = useAuth();
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      const { data } = await supabase
        .from("community_stories")
        .select("*")
        .eq("is_published", true)
        .order("is_featured", { ascending: false })
        .order("created_at", { ascending: false });
      setStories((data as Story[]) || []);
      setLoading(false);
    };
    fetchStories();
  }, []);

  return (
    <Layout>
      <section className="section-padding pride-gradient-subtle">
        <div className="container-campaign">
          <div className="max-w-2xl">
            <h1 className="headline-hero text-foreground mb-6">Community Stories</h1>
            <p className="body-large text-muted-foreground">
              Real voices, real experiences. Every story strengthens our movement.
            </p>
          </div>
        </div>
      </section>

      {/* Write CTA */}
      <section className="py-8 bg-secondary">
        <div className="container-campaign flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Have a story to share?</p>
          <Link to={user ? "/members?tab=stories" : "/auth"}>
            <Button size="sm" className="btn-primary">
              <PenLine className="h-4 w-4 mr-2" /> Share Yours
            </Button>
          </Link>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-campaign">
          {loading ? (
            <p className="text-center text-muted-foreground">Loading stories...</p>
          ) : stories.length === 0 ? (
            <div className="max-w-md mx-auto text-center py-16">
              <p className="text-muted-foreground mb-6">
                No stories published yet. Be the first to share your experience.
              </p>
              <Link to={user ? "/members?tab=stories" : "/auth"}>
                <Button className="btn-primary">
                  Share Your Story <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {stories.map((story) => (
                <Card key={story.id} className={`card-elevated ${story.is_featured ? 'pride-border' : ''}`}>
                  <CardContent className="p-6">
                    {story.is_featured && (
                      <span className="text-xs uppercase tracking-widest text-accent font-medium mb-2 block">Featured</span>
                    )}
                    <h3 className="font-serif text-xl text-foreground mb-3">{story.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {story.excerpt || story.content.slice(0, 200)}
                      {story.content.length > 200 && "..."}
                    </p>
                    <p className="text-xs text-muted-foreground/60 mt-4">
                      {new Date(story.created_at).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

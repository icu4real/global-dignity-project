import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Check, X, Star, StarOff, Eye } from "lucide-react";
import { format } from "date-fns";

interface Story {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  is_published: boolean;
  is_featured: boolean;
  created_at: string;
  user_id: string;
}

export default function AdminStoriesPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    const { data, error } = await supabase
      .from("community_stories")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error("Failed to load stories");
    else setStories((data as Story[]) || []);
    setLoading(false);
  };

  const updateStory = async (id: string, updates: Partial<Story>) => {
    const { error } = await supabase
      .from("community_stories")
      .update(updates)
      .eq("id", id);
    if (error) toast.error("Failed to update story");
    else {
      setStories((prev) =>
        prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
      );
      toast.success("Story updated");
    }
  };

  const deleteStory = async (id: string) => {
    const { error } = await supabase.from("community_stories").delete().eq("id", id);
    if (error) toast.error("Failed to delete story");
    else {
      setStories((prev) => prev.filter((s) => s.id !== id));
      toast.success("Story deleted");
    }
  };

  const pending = stories.filter((s) => !s.is_published);
  const published = stories.filter((s) => s.is_published);

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Community Stories</h1>
          <p className="text-muted-foreground mt-1">
            Review, approve, feature, or reject member-submitted stories.
          </p>
        </div>

        {/* Pending Review */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Pending Review
              {pending.length > 0 && (
                <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                  {pending.length}
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-muted-foreground text-center py-6">Loading...</p>
            ) : pending.length === 0 ? (
              <p className="text-muted-foreground text-center py-6">No stories pending review.</p>
            ) : (
              <div className="space-y-4">
                {pending.map((story) => (
                  <div key={story.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-foreground">{story.title}</h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          {format(new Date(story.created_at), "MMM d, yyyy")}
                        </p>
                        {expandedId === story.id ? (
                          <p className="text-sm text-muted-foreground mt-3 whitespace-pre-wrap">{story.content}</p>
                        ) : (
                          <p className="text-sm text-muted-foreground mt-2 truncate">
                            {story.excerpt || story.content.slice(0, 150)}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setExpandedId(expandedId === story.id ? null : story.id)}
                          title="Preview"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-green-600 hover:text-green-700 hover:bg-green-50"
                          onClick={() => updateStory(story.id, { is_published: true })}
                          title="Approve"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => deleteStory(story.id)}
                          title="Reject & Delete"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Published */}
        <Card>
          <CardHeader>
            <CardTitle>Published Stories ({published.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {published.length === 0 ? (
              <p className="text-muted-foreground text-center py-6">No published stories yet.</p>
            ) : (
              <div className="space-y-3">
                {published.map((story) => (
                  <div key={story.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-foreground text-sm">{story.title}</h3>
                        {story.is_featured && (
                          <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Featured</span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {format(new Date(story.created_at), "MMM d, yyyy")}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => updateStory(story.id, { is_featured: !story.is_featured })}
                        title={story.is_featured ? "Unfeature" : "Feature"}
                      >
                        {story.is_featured ? (
                          <StarOff className="h-4 w-4 text-amber-500" />
                        ) : (
                          <Star className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => updateStory(story.id, { is_published: false })}
                        title="Unpublish"
                      >
                        <X className="h-4 w-4 text-muted-foreground" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => deleteStory(story.id)}
                        title="Delete"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}

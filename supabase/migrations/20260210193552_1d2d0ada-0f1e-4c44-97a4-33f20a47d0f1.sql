
-- Create campaigns table
CREATE TABLE public.campaigns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  goal_amount NUMERIC DEFAULT 0,
  current_amount NUMERIC DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active',
  category TEXT NOT NULL DEFAULT 'general',
  image_url TEXT,
  start_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  end_date TIMESTAMP WITH TIME ZONE,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;

-- Anyone can view active campaigns
CREATE POLICY "Anyone can view active campaigns"
ON public.campaigns FOR SELECT
USING (status = 'active' OR is_admin(auth.uid()));

-- Only admins can create/update/delete campaigns
CREATE POLICY "Admins can manage campaigns"
ON public.campaigns FOR ALL
USING (is_admin(auth.uid()))
WITH CHECK (is_admin(auth.uid()));

-- Campaign engagements (users joining/supporting campaigns)
CREATE TABLE public.campaign_engagements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id UUID NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  engagement_type TEXT NOT NULL DEFAULT 'joined',
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(campaign_id, user_id)
);

ALTER TABLE public.campaign_engagements ENABLE ROW LEVEL SECURITY;

-- Users can view engagements for active campaigns
CREATE POLICY "Anyone can view engagements"
ON public.campaign_engagements FOR SELECT
USING (true);

-- Authenticated users can join campaigns
CREATE POLICY "Users can join campaigns"
ON public.campaign_engagements FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can remove their own engagement
CREATE POLICY "Users can leave campaigns"
ON public.campaign_engagements FOR DELETE
USING (auth.uid() = user_id);

-- Admins can manage all engagements
CREATE POLICY "Admins can manage engagements"
ON public.campaign_engagements FOR ALL
USING (is_admin(auth.uid()))
WITH CHECK (is_admin(auth.uid()));

-- Trigger for updated_at on campaigns
CREATE TRIGGER update_campaigns_updated_at
BEFORE UPDATE ON public.campaigns
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

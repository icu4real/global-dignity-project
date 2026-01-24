-- Create donations table for USDT/Solana transactions
CREATE TABLE public.donations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  transaction_hash TEXT,
  wallet_address TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('safety', 'health', 'dignity', 'general')),
  donation_type TEXT NOT NULL CHECK (donation_type IN ('one-time', 'monthly')),
  donor_email TEXT,
  donor_name TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  confirmed_at TIMESTAMP WITH TIME ZONE
);

-- Create email subscriptions table
CREATE TABLE public.email_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscription_type TEXT NOT NULL DEFAULT 'newsletter' CHECK (subscription_type IN ('newsletter', 'updates', 'monthly_donor')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE
);

-- Create contact form submissions table
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  submission_type TEXT NOT NULL DEFAULT 'general' CHECK (submission_type IN ('general', 'help_request', 'partnership', 'media')),
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Public insert policies (anyone can submit)
CREATE POLICY "Anyone can create donations" 
ON public.donations 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can subscribe to emails" 
ON public.email_subscriptions 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can submit contact forms" 
ON public.contact_submissions 
FOR INSERT 
WITH CHECK (true);

-- Public can check their own donation by transaction hash
CREATE POLICY "Anyone can view donations by transaction hash" 
ON public.donations 
FOR SELECT 
USING (transaction_hash IS NOT NULL);
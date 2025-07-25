-- Create products table for storing real product data
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  category TEXT NOT NULL,
  condition TEXT NOT NULL,
  rating DECIMAL(2,1) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create policies - products are viewable by everyone
CREATE POLICY "Products are viewable by everyone" 
ON public.products 
FOR SELECT 
USING (true);

-- Admin profiles table for admin users
CREATE TABLE public.admin_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  username TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for admin profiles
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;

-- Admin can view their own profile
CREATE POLICY "Admins can view their own profile" 
ON public.admin_profiles 
FOR SELECT 
USING (auth.uid() = user_id);

-- Only admins can manage products
CREATE POLICY "Admins can manage products" 
ON public.products 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_profiles 
    WHERE user_id = auth.uid()
  )
);

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for automatic timestamp updates
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some initial product data
INSERT INTO public.products (name, description, price, image_url, category, condition, rating) VALUES
('iPhone 14 Pro', 'Smartphone haut de gamme avec caméra professionnelle', 899.99, '/placeholder.svg', 'Smartphones', 'Excellent', 4.8),
('Samsung Galaxy S23', 'Téléphone Android performant avec écran AMOLED', 749.99, '/placeholder.svg', 'Smartphones', 'Très bon', 4.6),
('MacBook Air M2', 'Ordinateur portable ultra-léger et performant', 1299.99, '/placeholder.svg', 'Ordinateurs', 'Comme neuf', 4.9),
('iPad Pro 12.9"', 'Tablette professionnelle avec écran Liquid Retina', 1099.99, '/placeholder.svg', 'Tablettes', 'Excellent', 4.7);
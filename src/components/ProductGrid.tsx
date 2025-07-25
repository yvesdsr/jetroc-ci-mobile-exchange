import { useState, useEffect } from "react";
import { Filter, Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import ProductCard from "./ProductCard";

// Mock data - sera remplacé par l'API Supabase
const mockProducts = [
  {
    id: "1",
    name: "iPhone 15 Pro Max",
    description: "Dernière génération Apple avec puce A17 Pro, appareil photo 48MP, écran Super Retina XDR",
    price: 850000,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=300&fit=crop",
    category: "iPhone",
    condition: "Neuf" as const,
    rating: 4.9,
  },
  {
    id: "2",
    name: "Samsung Galaxy S24 Ultra",
    description: "Smartphone haut de gamme avec S Pen, écran Dynamic AMOLED 2X, appareil photo 200MP",
    price: 750000,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=300&fit=crop",
    category: "Android",
    condition: "Comme neuf" as const,
    rating: 4.8,
  },
  {
    id: "3",
    name: "iPhone 14 Pro",
    description: "iPhone 14 Pro avec Dynamic Island, puce A16 Bionic, excellent état",
    price: 650000,
    image: "https://images.unsplash.com/photo-1663781292884-8de71cc8dd2e?w=400&h=300&fit=crop",
    category: "iPhone",
    condition: "Bon état" as const,
    rating: 4.7,
  },
  {
    id: "4",
    name: "Xiaomi Mi 13 Pro",
    description: "Smartphone performant avec charge rapide 120W, écran AMOLED 120Hz",
    price: 420000,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
    category: "Android",
    condition: "Comme neuf" as const,
    rating: 4.6,
  },
  {
    id: "5",
    name: "MacBook Air M2",
    description: "Ordinateur portable Apple avec puce M2, 8GB RAM, 256GB SSD, excellent pour le travail",
    price: 950000,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
    category: "Ordinateurs",
    condition: "Bon état" as const,
    rating: 4.8,
  },
  {
    id: "6",
    name: "AirPods Pro 2",
    description: "Écouteurs sans fil Apple avec réduction de bruit active, qualité audio exceptionnelle",
    price: 180000,
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=300&fit=crop",
    category: "Autres",
    condition: "Neuf" as const,
    rating: 4.9,
  },
];

const ProductGrid = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = ["all", "Smartphones", "Ordinateurs", "Tablettes", "Accessoires"];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
        // Fallback to mock data if database fetch fails
        setProducts(mockProducts);
      } else {
        // Transform database products to match expected format
        const transformedProducts = data.map(product => ({
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          image: product.image_url,
          category: product.category,
          condition: product.condition,
          rating: product.rating
        }));
        setProducts(transformedProducts);
      }
    } catch (error) {
      console.error('Error:', error);
      setProducts(mockProducts);
    } finally {
      setLoading(false);
    }
  };
  
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      case "newest":
      default:
        return 0;
    }
  });

  return (
    <section id="produits" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-orange-ci to-green-ci bg-clip-text text-transparent">
              Nos Téléphones
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Découvrez notre sélection de téléphones de qualité, tous testés et garantis
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Rechercher un téléphone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "Toutes les catégories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Plus récents</SelectItem>
                <SelectItem value="price-low">Prix croissant</SelectItem>
                <SelectItem value="price-high">Prix décroissant</SelectItem>
                <SelectItem value="rating">Mieux notés</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Active Filters */}
          <div className="flex flex-wrap gap-2">
            {selectedCategory !== "all" && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {selectedCategory}
                <button
                  onClick={() => setSelectedCategory("all")}
                  className="ml-1 hover:text-destructive"
                >
                  ×
                </button>
              </Badge>
            )}
            {searchTerm && (
              <Badge variant="secondary" className="flex items-center gap-1">
                "{searchTerm}"
                <button
                  onClick={() => setSearchTerm("")}
                  className="ml-1 hover:text-destructive"
                >
                  ×
                </button>
              </Badge>
            )}
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-16">
            <div className="text-2xl mb-4">⏳</div>
            <p className="text-muted-foreground">Chargement des produits...</p>
          </div>
        ) : sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📱</div>
            <h3 className="text-xl font-semibold mb-2">Aucun produit trouvé</h3>
            <p className="text-muted-foreground mb-6">
              Essayez de modifier vos critères de recherche
            </p>
            <Button 
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              variant="outline"
            >
              Réinitialiser les filtres
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
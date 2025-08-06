import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import ProductCard from "@/components/ProductCard";
import { Link } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const AndroidPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await supabase
          .from("products")
          .select("*")
          .eq("category", "Android");
        setProducts(data || []);
      } catch (error) {
        console.error("Erreur lors du chargement des produits:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
  });

  const resetFilters = () => {
    setSearchTerm("");
    setSortBy("newest");
  };

  const hasActiveFilters = searchTerm || sortBy !== "newest";

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <Link 
            to="/" 
            className="flex items-center text-orange-ci hover:text-orange-light transition-colors duration-300 font-medium"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Retour à l'accueil
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-ci to-green-ci bg-clip-text text-transparent">
            Android
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Découvrez notre sélection d'appareils Android reconditionnés
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-lg border shadow-sm p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Rechercher un appareil Android..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Plus récents</SelectItem>
                <SelectItem value="price-low">Prix croissant</SelectItem>
                <SelectItem value="price-high">Prix décroissant</SelectItem>
                <SelectItem value="rating">Mieux notés</SelectItem>
              </SelectContent>
            </Select>

            {hasActiveFilters && (
              <Button variant="outline" onClick={resetFilters} className="w-full">
                Réinitialiser les filtres
              </Button>
            )}
          </div>

          {/* Active filters */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2">
              {searchTerm && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Recherche: "{searchTerm}"
                  <button onClick={() => setSearchTerm("")} className="ml-1 hover:text-destructive">
                    ×
                  </button>
                </Badge>
              )}
              {sortBy !== "newest" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Tri: {
                    sortBy === "price-low" ? "Prix croissant" :
                    sortBy === "price-high" ? "Prix décroissant" :
                    "Mieux notés"
                  }
                  <button onClick={() => setSortBy("newest")} className="ml-1 hover:text-destructive">
                    ×
                  </button>
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-ci"></div>
            <p className="mt-4 text-muted-foreground">Chargement des appareils Android...</p>
          </div>
        ) : sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">Aucun appareil Android trouvé</h3>
            <p className="text-muted-foreground mb-4">
              {hasActiveFilters 
                ? "Aucun appareil Android ne correspond à vos critères de recherche."
                : "Aucun appareil Android n'est disponible pour le moment."
              }
            </p>
            {hasActiveFilters && (
              <Button onClick={resetFilters} variant="outline">
                Voir tous les appareils Android
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AndroidPage;
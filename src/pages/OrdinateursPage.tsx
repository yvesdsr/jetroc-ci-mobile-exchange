import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import ProductCard from "@/components/ProductCard";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const OrdinateursPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("category", "Ordinateurs");
      setProducts(data || []);
    };
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="flex items-center text-orange-ci mb-4 hover:underline">
        <ArrowLeft className="mr-2" />
        Retour à l'accueil
      </Link>
      <h1 className="text-3xl font-bold mb-6">Ordinateurs</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};
export default OrdinateursPage;
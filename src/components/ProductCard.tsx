import { useState } from "react";
import { ShoppingCart, Repeat, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import OrderModal from "./modals/OrderModal";
import TradeModal from "./modals/TradeModal";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  condition: "Neuf" | "Comme neuf" | "Bon état" | "Correct";
  rating?: number;
}

const ProductCard = ({ 
  id, 
  name, 
  description, 
  price, 
  image, 
  category, 
  condition,
  rating = 4.5 
}: ProductCardProps) => {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "Neuf": return "bg-green-ci text-white";
      case "Comme neuf": return "bg-green-light text-white";
      case "Bon état": return "bg-orange-light text-white";
      case "Correct": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <>
      <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-border/50 hover:border-orange-ci/50 overflow-hidden">
        <div className="relative overflow-hidden">
          <img 
            src={image} 
            alt={name}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          
          {/* Overlay actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart 
                className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-foreground'}`} 
              />
            </Button>
          </div>

          {/* Category badge supprimé */}
          {/* <Badge 
            className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm text-foreground"
          >
            {category}
          </Badge> */}
        </div>

        <CardContent className="p-4 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-lg leading-tight line-clamp-2 group-hover:text-orange-ci transition-colors">
              {name}
            </h3>
            <Badge className={getConditionColor(condition)}>
              {condition}
            </Badge>
          </div>

          <p className="text-muted-foreground text-sm line-clamp-2">
            {description}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-4 w-4 ${
                    i < Math.floor(rating) 
                      ? 'fill-orange-ci text-orange-ci' 
                      : 'text-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">({rating})</span>
          </div>

          <div className="text-2xl font-bold text-orange-ci">
            {formatPrice(price)}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex gap-2">
          <Button 
            className="flex-1 bg-gradient-to-r from-orange-ci to-orange-light hover:from-orange-light hover:to-orange-ci transition-all duration-300"
            onClick={() => setIsOrderModalOpen(true)}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Commander
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 border-green-ci text-green-ci hover:bg-green-ci hover:text-white transition-all duration-300"
            onClick={() => setIsTradeModalOpen(true)}
          >
            <Repeat className="mr-2 h-4 w-4" />
            Troquer
          </Button>
        </CardFooter>
      </Card>

      <OrderModal 
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        product={{ id, name, price, image }}
      />

      <TradeModal 
        isOpen={isTradeModalOpen}
        onClose={() => setIsTradeModalOpen(false)}
        product={{ id, name, price, image }}
      />
    </>
  );
};
export default ProductCard;
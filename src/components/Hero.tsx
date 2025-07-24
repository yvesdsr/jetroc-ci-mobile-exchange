import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart, Repeat } from "lucide-react";
import heroImage from "@/assets/hero-phone.jpg";

const Hero = () => {
  const scrollToProducts = () => {
    document.getElementById('produits')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="accueil" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-ci/10 via-background to-green-ci/10">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Content */}
        <div className="text-center lg:text-left space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-orange-ci to-green-ci bg-clip-text text-transparent">
                Achetez, Vendez, Troquez
              </span>
              <br />
              <span className="text-foreground">vos téléphones</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0">
              La première plateforme ivoirienne dédiée à l'achat, la vente et le troc de téléphones. 
              Trouvez votre smartphone idéal ou donnez une seconde vie au vôtre.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-orange-ci to-orange-light hover:from-orange-light hover:to-orange-ci transition-all duration-300 shadow-lg hover:shadow-xl"
              onClick={scrollToProducts}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Découvrir nos téléphones
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-green-ci text-green-ci hover:bg-green-ci hover:text-white transition-all duration-300"
              onClick={scrollToProducts}
            >
              <Repeat className="mr-2 h-5 w-5" />
              Faire un troc
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/40">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-ci">500+</div>
              <div className="text-sm text-muted-foreground">Téléphones</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-ci">1000+</div>
              <div className="text-sm text-muted-foreground">Clients satisfaits</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-ci">24h</div>
              <div className="text-sm text-muted-foreground">Service rapide</div>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative">
          <div className="relative z-10">
            <img 
              src={heroImage} 
              alt="Téléphones de qualité chez JeTroc.ci"
              className="w-full h-auto max-w-lg mx-auto rounded-2xl shadow-2xl"
            />
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-orange-ci/20 to-green-ci/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-gradient-to-tr from-green-ci/20 to-orange-ci/20 rounded-full blur-3xl"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
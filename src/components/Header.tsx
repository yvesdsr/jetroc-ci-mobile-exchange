import { useState } from "react";
import { Menu, X, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: "Accueil", href: "#accueil" },
    { name: "iPhones", href: "#iphones" },
    { name: "Android", href: "#android" },
    { name: "Ordinateurs", href: "#ordinateurs" },
    { name: "Autres", href: "#autres" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border/40 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-orange-ci to-green-ci p-2 rounded-lg">
              <Smartphone className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-orange-ci to-green-ci bg-clip-text text-transparent">
              JeTroc.ci
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-orange-ci transition-colors duration-300 font-medium"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border/40 py-4 animate-in slide-in-from-top-2">
            <nav className="flex flex-col space-y-2">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-orange-ci transition-colors duration-300 px-4 py-2 rounded-lg hover:bg-muted"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
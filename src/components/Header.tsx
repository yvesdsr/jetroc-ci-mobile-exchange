import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Smartphone, User, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAdmin, signOut } = useAuth();

  const menuItems = [
    { name: "Accueil", href: "/" },
    { name: "iPhones", href: "/iphones" },
    { name: "Android", href: "/android" },
    { name: "Ordinateurs", href: "/ordinateurs" },
    { name: "Autres", href: "/autres" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border/40 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src="/favicon.ico" alt="Logo JeTroc.ci" className="h-12 w-12 mr-5" />
            <span className="text-xl font-bold text-black">
              JeTroc.ci
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-8">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-foreground hover:text-orange-ci transition-colors duration-300 font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-2">
              {user ? (
                <>
                  {isAdmin && (
                    <Button asChild variant="outline">
                      <Link to="/admin">
                        <Settings className="mr-2 h-4 w-4" />
                        Admin
                      </Link>
                    </Button>
                  )}
                  <Button onClick={signOut} variant="ghost">
                    <LogOut className="mr-2 h-4 w-4" />
                    Déconnexion
                  </Button>
                </>
              ) : (
                <Button asChild>
                  <Link to="/auth">
                    <User className="mr-2 h-4 w-4" />
                    Connexion
                  </Link>
                </Button>
              )}
            </div>
          </div>

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
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-foreground hover:text-orange-ci transition-colors duration-300 px-4 py-2 rounded-lg hover:bg-muted"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
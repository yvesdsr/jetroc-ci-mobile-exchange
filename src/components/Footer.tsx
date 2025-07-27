import { useState } from "react";
import { Smartphone, Facebook, Instagram, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import SellModal from "./modals/SellModal";
import AdminModal from "./modals/AdminModal";

const Footer = () => {
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  return (
    <>
      <footer className="bg-background border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Logo & Description */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold flex items-center space-x-2">
                  <img src="/favicon.ico" alt="Logo JeTroc.ci" className="h-14 w-14 mr-3" />
                  JeTroc.ci
                  </span>
              </div>
              <p className="text-muted-foreground">
                La meilleure plateforme ivoirienne pour l'achat, la vente et le troc de téléphones.
              </p>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Achat de téléphones</li>
                <li>
                  <button 
                    onClick={() => setIsSellModalOpen(true)}
                    className="hover:text-orange-ci transition-colors"
                  >
                    Vente de téléphones
                  </button>
                </li>
                <li>Troc et échange</li>
                <li>Réparation</li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>+225 05 86 90 55 49</li>
                <li>+225 07 13 62 18 98</li>
                <li>snowdenyves@gmail.com</li>
              </ul>
            </div>

            {/* Social & Admin */}
            <div>
              <h3 className="font-semibold mb-4">Suivez-nous</h3>
              <div className="flex space-x-3 mb-4">
                <Button size="icon" variant="outline">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="outline">
                  <Instagram className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="outline">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Admin Access */}
              <button 
                onClick={() => setIsAdminModalOpen(true)}
                className="text-muted-foreground hover:text-orange-ci transition-colors text-sm"
              >
                <Lock className="h-3 w-3 inline mr-1" />
                Admin
              </button>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 JeTroc.ci. Tous droits réservés.</p>
          </div>
        </div>
      </footer>

      <SellModal 
        isOpen={isSellModalOpen}
        onClose={() => setIsSellModalOpen(false)}
      />
      
      <AdminModal 
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />
    </>
  );
};

export default Footer;
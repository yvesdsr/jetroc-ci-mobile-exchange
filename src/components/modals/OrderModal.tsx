import { useState } from "react";
import { X, MessageCircle, Phone, MapPin, User, Palette, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
}

const OrderModal = ({ isOpen, onClose, product }: OrderModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    color: "",
    additionalInfo: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.firstName || !formData.lastName || !formData.address || !formData.phone) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    // Create WhatsApp message
    const message = `🛍️ *NOUVELLE COMMANDE - JeTroc.ci*

📱 *Produit:* ${product.name}
💰 *Prix:* ${formatPrice(product.price)}

👤 *Client:*
• Nom: ${formData.lastName} ${formData.firstName}
• Téléphone: ${formData.phone}
• Adresse: ${formData.address}

🎨 *Couleur souhaitée:* ${formData.color || "Non spécifiée"}

📝 *Informations supplémentaires:*
${formData.additionalInfo || "Aucune"}

---
_Commande passée via JeTroc.ci_`;

    const whatsappUrl = `https://wa.me/2250586905549?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    toast({
      title: "Commande envoyée !",
      description: "Votre commande a été transmise via WhatsApp. Nous vous recontacterons rapidement.",
    });

    onClose();
    setFormData({
      firstName: "",
      lastName: "",
      address: "",
      phone: "",
      color: "",
      additionalInfo: "",
    });
  };

  const openWhatsAppDirect = () => {
    const directMessage = `Bonjour JeTroc.ci, je suis intéressé(e) par le ${product.name} au prix de ${formatPrice(product.price)}. Pouvez-vous me donner plus d'informations ?`;
    const whatsappUrl = `https://wa.me/2250586905549?text=${encodeURIComponent(directMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">
            <span className="bg-gradient-to-r from-orange-ci to-green-ci bg-clip-text text-transparent">
              Passer commande
            </span>
          </DialogTitle>
        </DialogHeader>

        {/* Product Summary */}
        <div className="bg-gradient-to-r from-orange-ci/10 to-green-ci/10 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-4">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div>
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-2xl font-bold text-orange-ci">{formatPrice(product.price)}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="flex items-center gap-2">
                <User className="h-4 w-4 text-orange-ci" />
                Prénom *
              </Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Votre prénom"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="flex items-center gap-2">
                <User className="h-4 w-4 text-orange-ci" />
                Nom *
              </Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Votre nom"
                required
              />
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-orange-ci" />
              Numéro de téléphone *
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+225 XX XX XX XX XX"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-orange-ci" />
              Adresse complète *
            </Label>
            <Textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Votre adresse complète de livraison"
              required
              rows={3}
            />
          </div>

          {/* Product Preferences */}
          <div className="space-y-2">
            <Label htmlFor="color" className="flex items-center gap-2">
              <Palette className="h-4 w-4 text-orange-ci" />
              Couleur souhaitée
            </Label>
            <Input
              id="color"
              name="color"
              value={formData.color}
              onChange={handleInputChange}
              placeholder="Noir, Blanc, Bleu, etc."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalInfo" className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-orange-ci" />
              Informations supplémentaires
            </Label>
            <Textarea
              id="additionalInfo"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleInputChange}
              placeholder="Accessoires souhaités, questions particulières, etc."
              rows={3}
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 pt-4">
            <Button 
              type="submit"
              className="w-full bg-gradient-to-r from-orange-ci to-orange-light hover:from-orange-light hover:to-orange-ci transition-all duration-300"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Envoyer la commande via WhatsApp
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={openWhatsAppDirect}
                className="text-green-ci hover:text-green-light text-sm underline flex items-center justify-center gap-2 mx-auto"
              >
                <MessageCircle className="h-4 w-4" />
                Ou contactez-nous directement sur WhatsApp
              </button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OrderModal;
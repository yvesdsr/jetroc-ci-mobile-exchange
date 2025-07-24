import { useState } from "react";
import { MessageCircle, DollarSign, Smartphone, FileText, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface SellModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SellModal = ({ isOpen, onClose }: SellModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    description: "",
    sellingPrice: "",
    userPhone: "",
    userName: "",
  });

  const phoneBrands = [
    "iPhone",
    "Samsung",
    "Huawei",
    "Xiaomi",
    "Oppo",
    "Vivo",
    "Realme",
    "Tecno",
    "Infinix",
    "Itel",
    "Autre"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const formatPrice = (price: string) => {
    if (!price) return "0 FCFA";
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(parseInt(price));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.brand || !formData.model || !formData.description || !formData.sellingPrice || !formData.userPhone || !formData.userName) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    // Create WhatsApp message
    const message = `💰 *VENTE DE TÉLÉPHONE - JeTroc.ci*

👤 *Vendeur:* ${formData.userName}
📞 *Contact:* ${formData.userPhone}

📱 *Téléphone à vendre:*
• Marque: ${formData.brand}
• Modèle: ${formData.model}
• Prix souhaité: ${formatPrice(formData.sellingPrice)}

📝 *Description:*
${formData.description}

---
_Demande de vente via JeTroc.ci_
📷 *Prochaine étape:* Envoi des photos du téléphone`;

    const whatsappUrl = `https://wa.me/2250586905549?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    toast({
      title: "Demande de vente envoyée !",
      description: "Votre demande a été transmise. Envoyez maintenant les photos de votre téléphone sur WhatsApp.",
    });

    onClose();
    setFormData({
      brand: "",
      model: "",
      description: "",
      sellingPrice: "",
      userPhone: "",
      userName: "",
    });
  };

  const openWhatsAppDirect = () => {
    const directMessage = `Bonjour JeTroc.ci, je souhaite vendre mon téléphone. Pouvez-vous m'expliquer le processus ?`;
    const whatsappUrl = `https://wa.me/2250586905549?text=${encodeURIComponent(directMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">
            <span className="bg-gradient-to-r from-green-ci to-orange-ci bg-clip-text text-transparent">
              Vendre votre téléphone
            </span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Seller Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-green-ci" />
              Vos informations
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="userName">Nom complet *</Label>
                <Input
                  id="userName"
                  name="userName"
                  value={formData.userName}
                  onChange={handleInputChange}
                  placeholder="Votre nom et prénom"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="userPhone">Numéro de téléphone *</Label>
                <Input
                  id="userPhone"
                  name="userPhone"
                  type="tel"
                  value={formData.userPhone}
                  onChange={handleInputChange}
                  placeholder="+225 XX XX XX XX XX"
                  required
                />
              </div>
            </div>
          </div>

          {/* Phone Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-orange-ci" />
              Votre téléphone
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="brand">Marque *</Label>
                <Select 
                  value={formData.brand} 
                  onValueChange={(value) => handleSelectChange("brand", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir la marque" />
                  </SelectTrigger>
                  <SelectContent>
                    {phoneBrands.map((brand) => (
                      <SelectItem key={brand} value={brand}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="model">Modèle *</Label>
                <Input
                  id="model"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  placeholder="ex: iPhone 13 Pro, Galaxy S22"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description détaillée *</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="État du téléphone, défauts éventuels, accessoires inclus, année d'achat, etc."
                required
                rows={4}
              />
            </div>
          </div>

          {/* Price */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-ci" />
              Prix de vente
            </h3>

            <div className="space-y-2">
              <Label htmlFor="sellingPrice">Prix souhaité (FCFA) *</Label>
              <Input
                id="sellingPrice"
                name="sellingPrice"
                type="number"
                value={formData.sellingPrice}
                onChange={handleInputChange}
                placeholder="ex: 250000"
                required
                min="1000"
              />
              {formData.sellingPrice && (
                <p className="text-sm text-muted-foreground">
                  Prix affiché: <span className="font-semibold text-green-ci">{formatPrice(formData.sellingPrice)}</span>
                </p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 pt-4">
            <Button 
              type="submit"
              className="w-full bg-gradient-to-r from-green-ci to-green-light hover:from-green-light hover:to-green-ci transition-all duration-300"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Envoyer la demande de vente
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={openWhatsAppDirect}
                className="text-orange-ci hover:text-orange-light text-sm underline flex items-center justify-center gap-2 mx-auto"
              >
                <MessageCircle className="h-4 w-4" />
                Ou discuter directement sur WhatsApp
              </button>
            </div>
          </div>

          {/* Info Boxes */}
          <div className="space-y-4">
            <div className="bg-orange-ci/10 rounded-lg p-4">
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                <Camera className="h-4 w-4 text-orange-ci" />
                Étape suivante : Photos
              </h4>
              <p className="text-sm text-muted-foreground">
                Après avoir envoyé ce formulaire, vous devrez envoyer des photos claires de votre téléphone via WhatsApp :
              </p>
              <ul className="text-sm text-muted-foreground mt-2 space-y-1 ml-4">
                <li>• Face avant et arrière</li>
                <li>• Écran allumé</li>
                <li>• Défauts éventuels</li>
                <li>• Accessoires inclus</li>
              </ul>
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                <FileText className="h-4 w-4 text-green-ci" />
                Comment ça marche ?
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Nous évaluons votre téléphone gratuitement</li>
                <li>• Vous recevez notre offre par WhatsApp</li>
                <li>• Si vous acceptez, nous achetons votre téléphone</li>
                <li>• Paiement immédiat lors de la transaction</li>
              </ul>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SellModal;
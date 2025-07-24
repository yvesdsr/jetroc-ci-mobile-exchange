import { useState } from "react";
import { MessageCircle, Repeat, Smartphone, Euro, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface TradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
}

const TradeModal = ({ isOpen, onClose, product }: TradeModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    description: "",
    additionalAmount: "",
    userPhone: "",
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
    if (!formData.brand || !formData.model || !formData.description || !formData.userPhone) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    // Create WhatsApp message
    const message = `🔄 *DEMANDE DE TROC - JeTroc.ci*

📱 *Téléphone souhaité:*
• ${product.name}
• Prix: ${formatPrice(product.price)}

📱 *Mon téléphone à troquer:*
• Marque: ${formData.brand}
• Modèle: ${formData.model}
• Description: ${formData.description}

💰 *Montant supplémentaire:* ${formData.additionalAmount ? formatPrice(parseInt(formData.additionalAmount)) : "0 FCFA"}

📞 *Contact:* ${formData.userPhone}

---
_Demande de troc via JeTroc.ci_`;

    const whatsappUrl = `https://wa.me/2250586905549?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    toast({
      title: "Demande de troc envoyée !",
      description: "Votre demande a été transmise via WhatsApp. Nous évaluerons votre téléphone et vous recontacterons.",
    });

    onClose();
    setFormData({
      brand: "",
      model: "",
      description: "",
      additionalAmount: "",
      userPhone: "",
    });
  };

  const openWhatsAppDirect = () => {
    const directMessage = `Bonjour JeTroc.ci, je souhaite troquer mon téléphone contre le ${product.name}. Pouvez-vous m'expliquer le processus ?`;
    const whatsappUrl = `https://wa.me/2250586905549?text=${encodeURIComponent(directMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">
            <span className="bg-gradient-to-r from-green-ci to-orange-ci bg-clip-text text-transparent">
              Faire un troc
            </span>
          </DialogTitle>
        </DialogHeader>

        {/* Product Summary */}
        <div className="bg-gradient-to-r from-green-ci/10 to-orange-ci/10 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-4">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div>
              <h3 className="font-semibold text-lg">Téléphone souhaité</h3>
              <p className="text-lg font-bold text-green-ci">{product.name}</p>
              <p className="text-sm text-muted-foreground">Valeur: {formatPrice(product.price)}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* User's Phone Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-green-ci" />
              Votre téléphone à troquer
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
                placeholder="État du téléphone, défauts éventuels, accessoires inclus, etc."
                required
                rows={4}
              />
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Euro className="h-5 w-5 text-orange-ci" />
              Informations complémentaires
            </h3>

            <div className="space-y-2">
              <Label htmlFor="additionalAmount">Montant que vous souhaitez ajouter (FCFA)</Label>
              <Input
                id="additionalAmount"
                name="additionalAmount"
                type="number"
                value={formData.additionalAmount}
                onChange={handleInputChange}
                placeholder="0"
                min="0"
              />
              <p className="text-sm text-muted-foreground">
                Si votre téléphone a une valeur inférieure, vous pouvez compléter avec de l'argent
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="userPhone">Votre numéro de téléphone *</Label>
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

          {/* Actions */}
          <div className="flex flex-col gap-3 pt-4">
            <Button 
              type="submit"
              className="w-full bg-gradient-to-r from-green-ci to-green-light hover:from-green-light hover:to-green-ci transition-all duration-300"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Envoyer la demande de troc
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

          {/* Info Box */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
              <FileText className="h-4 w-4 text-green-ci" />
              Comment fonctionne le troc ?
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Nous évaluons votre téléphone gratuitement</li>
              <li>• Vous recevez une estimation par WhatsApp</li>
              <li>• Si vous acceptez, nous organisons l'échange</li>
              <li>• Transaction sécurisée en magasin ou à domicile</li>
            </ul>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TradeModal;
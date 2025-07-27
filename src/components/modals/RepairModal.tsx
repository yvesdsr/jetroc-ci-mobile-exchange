import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { MessageCircle, Wrench } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RepairModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RepairModal = ({ isOpen, onClose }: RepairModalProps) => {
  const [formData, setFormData] = useState({
    description: '',
    phoneNumber: ''
  });
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      description: '',
      phoneNumber: ''
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.description.trim() || !formData.phoneNumber.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      return;
    }

    // Create WhatsApp message
    const message = `🔧 *DEMANDE DE RÉPARATION - JeTroc.ci*

📱 *Description du problème:*
${formData.description}

📞 *Numéro WhatsApp du client:* ${formData.phoneNumber}

---
_Service ouvert 7j/7 et 24h/24 - Réparation dans un délai très rapide_
_Demande de réparation via JeTroc.ci_`;

    const whatsappUrl = `https://wa.me/2250586905549?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    toast({
      title: "Demande de réparation envoyée !",
      description: "Votre demande a été transmise via WhatsApp. Nous vous recontacterons rapidement.",
    });

    onClose();
    resetForm();
  };

  const openWhatsAppDirect = () => {
    const directMessage = `Bonjour JeTroc.ci, je souhaite faire réparer mon téléphone. Pouvez-vous m'expliquer le processus ?`;
    const whatsappUrl = `https://wa.me/2250586905549?text=${encodeURIComponent(directMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-full mx-4">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-center">
            <Wrench className="h-5 w-5 text-green-ci" />
            <span className="bg-gradient-to-r from-green-ci to-orange-ci bg-clip-text text-transparent">
              Réparer votre téléphone
            </span>
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="description">Description du problème *</Label>
            <Textarea
              id="description"
              placeholder="Dites nous ce qu'il y a sur votre téléphone nous répondons à vos attentes au plus vite service ouvert 7jrs/7 et 24h/24 réparation dans un délai très rapide."
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="min-h-[150px] w-full resize-none"
              required
            />
          </div>

          <div>
            <Label htmlFor="phoneNumber">Votre numéro WhatsApp *</Label>
            <Input
              id="phoneNumber"
              placeholder="Ex: 0586905549"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              className="w-full"
              required
            />
          </div>

          <div className="flex gap-2">
            <Button 
              type="submit" 
              className="flex-1 bg-gradient-to-r from-green-ci to-orange-ci hover:from-green-light hover:to-orange-light"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Envoyer
            </Button>
            <Button type="button" variant="outline" onClick={() => onClose()}>
              Annuler
            </Button>
          </div>
        </form>

        <div className="border-t pt-4">
          <Button 
            variant="ghost" 
            className="w-full text-sm text-muted-foreground hover:text-foreground"
            onClick={openWhatsAppDirect}
          >
            💬 Ou chattez directement sur WhatsApp pour toute question
          </Button>
        </div>

        {/* Information Section */}
        <div className="bg-muted/50 rounded-lg p-4 space-y-3">
          <h4 className="font-semibold flex items-center gap-2">
            <Wrench className="h-4 w-4 text-green-ci" />
            Notre service de réparation
          </h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Service disponible 7j/7 et 24h/24</li>
            <li>• Réparation dans un délai très rapide</li>
            <li>• Techniciens experts et qualifiés</li>
            <li>• Devis gratuit et transparent</li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RepairModal;
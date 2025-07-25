import { Phone, Mail, MessageCircle, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Contact = () => {
  const openWhatsApp = (number: string) => {
    const message = "Bonjour JeTroc.ci, j'aimerais avoir plus d'informations sur vos services.";
    window.open(`https://wa.me/225${number.replace(/\s/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="contact" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-orange-ci to-green-ci bg-clip-text text-transparent">
              Contactez-nous
            </span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Notre équipe est là pour vous accompagner dans tous vos projets
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="bg-green-ci/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <Phone className="h-6 w-6 text-green-ci" />
              </div>
              <h3 className="font-semibold mb-2">Téléphone 1</h3>
              <p className="text-muted-foreground mb-4">05 86 90 55 49</p>
              <Button 
                size="sm" 
                className="bg-green-ci hover:bg-green-light"
                onClick={() => openWhatsApp("0586905549")}
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                WhatsApp
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="bg-orange-ci/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <Phone className="h-6 w-6 text-orange-ci" />
              </div>
              <h3 className="font-semibold mb-2">Téléphone 2</h3>
              <p className="text-muted-foreground mb-4">07 13 62 18 98</p>
              <Button 
                size="sm" 
                className="bg-orange-ci hover:bg-orange-light"
                onClick={() => openWhatsApp("0713621898")}
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                WhatsApp
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="bg-green-ci/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <Mail className="h-6 w-6 text-green-ci" />
              </div>
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-muted-foreground mb-4">snowdenyves@gmail.com</p>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => window.open('mailto:snowdenyves@gmail.com')}
              >
                Envoyer un email
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="bg-orange-ci/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-orange-ci" />
              </div>
              <h3 className="font-semibold mb-2">Horaires</h3>
              <p className="text-muted-foreground text-sm">
                Lun - Sam: 8h - 20h<br />
                Dimanche: 10h - 18h
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
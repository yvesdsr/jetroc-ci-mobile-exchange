import { Mail, Phone, MapPin, Github, ExternalLink, Code, Users, Award, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const Portfolio = () => {
  const projects = [
    {
      name: "GCAC-Coop",
      description: "Plateforme de gestion coopérative pour le séchage du cacao - Solution digitale pour les coopératives agricoles",
      tech: ["React", "Node.js", "Database"],
      category: "Agriculture",
      year: "2024"
    },
    {
      name: "Canine Pawfect Palace",
      description: "Application de gestion pour salon de toilettage canin avec système de rendez-vous et gestion clients",
      tech: ["React", "TypeScript", "Supabase"],
      category: "Business",
      year: "2024"
    },
    {
      name: "Sidii Ingénieurs Web",
      description: "Site web corporatif pour cabinet d'ingénierie avec présentation des services et portfolio",
      tech: ["HTML", "CSS", "JavaScript"],
      category: "Corporate",
      year: "2023"
    },
    {
      name: "TradingPro",
      description: "Plateforme de trading avec analyse technique et gestion de portefeuille",
      tech: ["React", "Python", "API"],
      category: "Finance",
      year: "2023"
    },
    {
      name: "JeTroc CI Mobile Exchange",
      description: "Application mobile d'échange et de troc de téléphones en Côte d'Ivoire",
      tech: ["React Native", "Firebase", "Payment"],
      category: "E-commerce",
      year: "2024"
    },
    {
      name: "Agri Alliance CI Platform",
      description: "Plateforme collaborative pour les agriculteurs ivoiriens avec marketplace et formation",
      tech: ["React", "Node.js", "MongoDB"],
      category: "Agriculture",
      year: "2023"
    },
    {
      name: "ABKR Store",
      description: "E-commerce moderne avec gestion d'inventaire et système de paiement intégré",
      tech: ["React", "Stripe", "Database"],
      category: "E-commerce",
      year: "2024"
    }
  ];

  const skills = {
    "Frontend": ["HTML", "CSS", "JavaScript", "React", "TypeScript"],
    "Backend": ["Python", "Node.js", "API Development"],
    "Database": ["MongoDB", "PostgreSQL", "Supabase"],
    "Tools": ["Git", "GitHub", "Project Management"],
    "Other": ["Leadership", "Coaching", "Team Management"]
  };

  const experiences = [
    {
      title: "Administrateur de groupe",
      company: "SOCAPBLO COOP CA",
      period: "2024 - Present",
      description: "Responsable de la coordination, du suivi et de l'organisation des activités du groupe de producteurs au sein de la société coopérative. Support administratif et technique, digitalisation des processus internes."
    },
    {
      title: "Enseignant",
      company: "École supérieure des technologies avancées et de management (ESTAM)",
      period: "2022 - 2023",
      description: "Enseignant en architecture des ordinateurs et informatique appliquée. Formation des étudiants aux technologies avancées et de management."
    }
  ];

  const certifications = [
    "GOOGLE: PROJECTS MANAGEMENT",
    "GOOGLE: INTELLIGENCE ARTIFICIELLE",
    "Rainforest Alliance: Management, Traçabilité, Prime, Agriculture, Social, Environnement"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/50 to-primary/5">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              YVES DESIRE GOA BI
            </h1>
            <Button variant="outline" asChild>
              <a href="/" className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                Retour à l'accueil
              </a>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="max-w-4xl mx-auto">
            <img 
              src="/lovable-uploads/6ba84950-3a08-454b-874e-fb933850d839.png" 
              alt="Yves Desire Goa Bi"
              className="w-48 h-48 rounded-full mx-auto mb-8 object-cover border-4 border-primary/20 shadow-xl"
            />
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              YVES DESIRE GOA BI
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-6 font-medium">
              GESTIONNAIRE DE PROJETS • INFORMATICIEN • ADMINISTRATEUR
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              Développeur web et gestionnaire de projets certifié, avec une vision orientée vers la digitalisation des entreprises agricoles et des PME. 
              Mon objectif : créer des solutions technologiques efficaces et accessibles, en conjuguant savoir-faire technique et sens de l'organisation.
            </p>
            
            {/* Contact Info */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+225 07 13 62 18 98</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>snowdenyves@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Cocody, Deux-plateaux, Abidjan, CI</span>
              </div>
            </div>

            <Button size="lg" asChild className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
              <a href="#contact" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Me contacter
              </a>
            </Button>
          </div>
        </section>

        {/* Projects Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center gap-3">
            <Code className="h-8 w-8 text-primary" />
            Mes Projets
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/50">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <Badge variant="secondary" className="mb-2">
                      {project.category}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{project.year}</span>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {project.name}
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="ghost" className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Github className="h-4 w-4 mr-2" />
                    Voir le projet
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center gap-3">
            <Award className="h-8 w-8 text-primary" />
            Compétences
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(skills).map(([category, skillList]) => (
              <Card key={category} className="border-0 bg-gradient-to-br from-card to-card/50">
                <CardHeader>
                  <CardTitle className="text-xl">{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill, index) => (
                      <Badge key={index} variant="default" className="bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center gap-3">
            <Users className="h-8 w-8 text-primary" />
            Expérience
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {experiences.map((exp, index) => (
              <Card key={index} className="border-0 bg-gradient-to-r from-card to-card/50">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{exp.title}</CardTitle>
                      <CardDescription className="text-lg font-medium text-primary">
                        {exp.company}
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {exp.period}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{exp.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Certifications Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center gap-3">
            <Award className="h-8 w-8 text-primary" />
            Certifications
          </h2>
          <div className="max-w-2xl mx-auto">
            <Card className="border-0 bg-gradient-to-br from-card to-card/50">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {certifications.map((cert, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Award className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{cert}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="text-center">
          <h2 className="text-3xl font-bold mb-8 flex items-center justify-center gap-3">
            <Mail className="h-8 w-8 text-primary" />
            Contact
          </h2>
          <Card className="max-w-2xl mx-auto border-0 bg-gradient-to-br from-card to-card/50">
            <CardContent className="pt-6">
              <p className="text-lg text-muted-foreground mb-6">
                Prêt à discuter de votre prochain projet ? Contactez-moi !
              </p>
              <div className="space-y-4">
                <Button size="lg" asChild className="w-full bg-gradient-to-r from-primary to-accent">
                  <a href="mailto:snowdenyves@gmail.com" className="flex items-center justify-center gap-2">
                    <Mail className="h-4 w-4" />
                    snowdenyves@gmail.com
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild className="w-full">
                  <a href="tel:+2250713621898" className="flex items-center justify-center gap-2">
                    <Phone className="h-4 w-4" />
                    +225 07 13 62 18 98
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Portfolio;
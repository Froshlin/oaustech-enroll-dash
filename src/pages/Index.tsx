import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Users, Shield, FileText, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (type: 'student' | 'admin') => {
    setIsLoading(true);
    setTimeout(() => {
      navigate(`/${type}-login`);
      setIsLoading(false);
    }, 500);
  };

  const features = [
    {
      icon: FileText,
      title: "Document Management",
      description: "Upload and manage all 15 required registration documents"
    },
    {
      icon: Shield,
      title: "Secure Authentication",
      description: "Separate secure portals for students and administrators"
    },
    {
      icon: Users,
      title: "User-Friendly Interface",
      description: "Intuitive design for easy navigation and document submission"
    }
  ];

  const documents = [
    "JAMB Admission Letter", "OAUSTECH School Admission Letter", "JAMB/SUPEB Results",
    "O'Level Results (WAEC/NECO)", "Clearance Form", "Candidate Application Form",
    "Acceptance Clearance", "Payment Receipts", "Attestation Letter",
    "Certificate of Birth", "Certificate of Origin", "Medical Form",
    "Medical Certificate of Fitness", "Declaration Against Cultism", "Course Form"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <GraduationCap className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold text-foreground">OAUSTECH</h1>
                <p className="text-sm text-muted-foreground">Student Registration Portal</p>
              </div>
            </div>
            <Badge variant="secondary" className="hidden sm:flex">
              Computerized Registration System
            </Badge>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Student Registration
            </span>
            <br />
            <span className="text-foreground">Made Simple</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Streamlined digital platform for managing all your registration documents 
            and admission requirements at OAUSTECH.
          </p>
        </div>

        {/* Login Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <GraduationCap className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Student Portal</CardTitle>
              <CardDescription>
                Access your registration dashboard, upload documents, and track your admission progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => handleLogin('student')}
                className="w-full text-lg py-6 group-hover:scale-105 transition-transform"
                disabled={isLoading}
              >
                Login as Student
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-accent/20">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                <Shield className="w-8 h-8 text-accent" />
              </div>
              <CardTitle className="text-2xl">Admin Portal</CardTitle>
              <CardDescription>
                Manage student registrations, review documents, and oversee the admission process
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => handleLogin('admin')}
                variant="outline"
                className="w-full text-lg py-6 border-accent text-accent hover:bg-accent hover:text-accent-foreground group-hover:scale-105 transition-transform"
                disabled={isLoading}
              >
                Login as Admin
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">System Features</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Required Documents */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Required Registration Documents</CardTitle>
            <CardDescription className="text-center">
              Complete list of all 15 documents required for registration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {documents.map((doc, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <span className="text-sm font-medium">{doc}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-muted-foreground">
              © 2024 OAUSTECH Student Registration System. Built for academic excellence.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
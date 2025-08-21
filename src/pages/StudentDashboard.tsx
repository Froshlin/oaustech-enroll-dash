import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  GraduationCap, 
  LogOut, 
  Upload, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  FileText,
  User,
  BookOpen,
  DollarSign,
  Heart,
  Scale
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { REQUIRED_DOCUMENTS, getDocumentsByCategory } from "@/types/documents";
import DocumentUploadCard from "@/components/DocumentUploadCard";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [documentStatuses, setDocumentStatuses] = useState<Record<string, string>>({});
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    // Check authentication
    if (!user || user.role !== 'student') {
      navigate('/student-login');
      return;
    }

    // Initialize document statuses (mock data)
    const statuses: Record<string, string> = {};
    REQUIRED_DOCUMENTS.forEach((doc, index) => {
      // Simulate different statuses for demo
      if (index < 3) statuses[doc.id] = 'approved';
      else if (index < 6) statuses[doc.id] = 'uploaded';
      else if (index < 8) statuses[doc.id] = 'reviewing';
      else statuses[doc.id] = 'pending';
    });
    setDocumentStatuses(statuses);

    // Calculate progress
    const completed = Object.values(statuses).filter(status => status === 'approved').length;
    setUploadProgress((completed / REQUIRED_DOCUMENTS.length) * 100);
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out."
    });
    navigate('/');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4 text-success" />;
      case 'uploaded': 
      case 'reviewing': return <Clock className="w-4 h-4 text-warning" />;
      default: return <AlertCircle className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      'approved': 'default',
      'uploaded': 'secondary',
      'reviewing': 'outline',
      'pending': 'destructive'
    };
    return (
      <Badge variant={variants[status as keyof typeof variants] as any}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const categoryIcons = {
    admission: GraduationCap,
    academic: BookOpen,
    financial: DollarSign,
    personal: User,
    medical: Heart,
    legal: Scale
  };

  const categories = [
    { id: 'admission', name: 'Admission Documents', color: 'text-primary' },
    { id: 'academic', name: 'Academic Records', color: 'text-blue-600' },
    { id: 'financial', name: 'Financial Documents', color: 'text-green-600' },
    { id: 'personal', name: 'Personal Documents', color: 'text-purple-600' },
    { id: 'medical', name: 'Medical Documents', color: 'text-red-600' },
    { id: 'legal', name: 'Legal Documents', color: 'text-yellow-600' }
  ];

  if (!user) return null;

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
                <p className="text-sm text-muted-foreground">Student Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.studentId}</p>
              </div>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h2>
          <p className="text-muted-foreground">
            Track your registration progress and manage your documents
          </p>
        </div>

        {/* Progress Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Registration Progress
            </CardTitle>
            <CardDescription>
              {Math.round(uploadProgress)}% of required documents completed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={uploadProgress} className="mb-4" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-success">
                  {Object.values(documentStatuses).filter(s => s === 'approved').length}
                </div>
                <div className="text-sm text-muted-foreground">Approved</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-warning">
                  {Object.values(documentStatuses).filter(s => s === 'reviewing').length}
                </div>
                <div className="text-sm text-muted-foreground">Under Review</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {Object.values(documentStatuses).filter(s => s === 'uploaded').length}
                </div>
                <div className="text-sm text-muted-foreground">Uploaded</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-muted-foreground">
                  {Object.values(documentStatuses).filter(s => s === 'pending').length}
                </div>
                <div className="text-sm text-muted-foreground">Pending</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documents by Category */}
        <Tabs defaultValue="admission" className="space-y-6">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="text-xs">
                {category.name.split(' ')[0]}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => {
            const docs = getDocumentsByCategory(category.id);
            const IconComponent = categoryIcons[category.id as keyof typeof categoryIcons];
            
            return (
              <TabsContent key={category.id} value={category.id}>
                <Card>
                  <CardHeader>
                    <CardTitle className={`flex items-center gap-2 ${category.color}`}>
                      <IconComponent className="w-5 h-5" />
                      {category.name}
                    </CardTitle>
                    <CardDescription>
                      {docs.length} documents required in this category
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {docs.map((doc) => (
                        <DocumentUploadCard
                          key={doc.id}
                          document={doc}
                          status={documentStatuses[doc.id] || 'pending'}
                          onStatusChange={(newStatus) => {
                            setDocumentStatuses(prev => ({
                              ...prev,
                              [doc.id]: newStatus
                            }));
                          }}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </div>
  );
};

export default StudentDashboard;
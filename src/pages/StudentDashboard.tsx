/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  GraduationCap, 
  LogOut, 
  FileText,
  User,
  BookOpen,
  DollarSign,
  Heart,
  Scale,
  RefreshCw
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { REQUIRED_DOCUMENTS, getDocumentsByCategory } from "@/types/documents";
import DocumentUploadCard from "@/components/DocumentUploadCard";
import Logo from '@/assets/oaustech-sch-logo.png';

const TOTAL_REQUIRED_DOCUMENTS = REQUIRED_DOCUMENTS.length;

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { user, logout, isLoading } = useAuth();
  const { toast } = useToast();
  const [documents, setDocuments] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  const fetchData = async () => {
    try {
      setLoadingData(true);
      const response = await axios.get(`${import.meta.env.VITE_PUBLIC_BACKEND_URL}/api/students/${user.id}/documents`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      console.log('Fetched documents:', response.data);
      setDocuments(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (isLoading) return;
    if (!user || user.role !== 'student') {
      navigate('/student-login');
      return;
    }

    fetchData();

    const interval = setInterval(fetchData, 30000); // Poll every 30 seconds
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, navigate, toast, isLoading]);

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out."
    });
    navigate('/');
  };

  const handleRefresh = () => {
    fetchData();
    toast({
      title: "Refreshed",
      description: "Dashboard data updated.",
    });
  };

  const categoryIcons = {
    admission: GraduationCap,
    academic: BookOpen,
    financial: DollarSign,
    personal: User,
    medical: Heart,
    legal: Scale,
  };

  const categories = [
    { id: 'admission', name: 'Admission Documents', color: 'text-primary' },
    { id: 'academic', name: 'Academic Records', color: 'text-blue-600' },
    { id: 'financial', name: 'Financial Documents', color: 'text-green-600' },
    { id: 'personal', name: 'Personal Documents', color: 'text-purple-600' },
    { id: 'medical', name: 'Medical Documents', color: 'text-red-600' },
    { id: 'legal', name: 'Legal Documents', color: 'text-yellow-600' },
  ];

  if (isLoading || loadingData) return <div>Loading...</div>;

  const uploadedCount = documents.length;
  const approvedCount = documents.filter(doc => doc.status === 'approved').length;
  const reviewingCount = documents.filter(doc => ['pending', 'uploaded', 'reviewing'].includes(doc.status) && doc.status !== 'approved').length; // Exclude approved
  const rejectedCount = documents.filter(doc => doc.status === 'rejected').length;
  const uploadProgress = TOTAL_REQUIRED_DOCUMENTS > 0 ? (uploadedCount / TOTAL_REQUIRED_DOCUMENTS) * 100 : 0;
  const approvalProgress = TOTAL_REQUIRED_DOCUMENTS > 0 ? (approvedCount / TOTAL_REQUIRED_DOCUMENTS) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={Logo} alt="OAUSTECH Logo" className="w-10 h-10 object-contain" />
              <div>
                <h1 className="text-xl font-bold text-foreground">OAUSTECH</h1>
                <p className="text-sm text-muted-foreground">Student Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium">{user.name || user.username}</p>
                <p className="text-xs text-muted-foreground">{user.studentId || 'N/A'}</p>
              </div>
              <Button variant="outline" onClick={handleRefresh} className="mr-2">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome back, {user.name || user.username}!</h2>
          <p className="text-muted-foreground">
            Track your registration progress and manage your documents
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Registration Progress
            </CardTitle>
            <CardDescription>
              {Math.round(uploadProgress)}% of required documents uploaded, {Math.round(approvalProgress)}% approved
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={uploadProgress} className="mb-4" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">
                  {approvedCount}
                </div>
                <div className="text-sm text-muted-foreground">Approved</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-500">
                  {reviewingCount}
                </div>
                <div className="text-sm text-muted-foreground">Under Review</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-500">
                  {uploadedCount}
                </div>
                <div className="text-sm text-muted-foreground">Uploaded</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-500">
                  {rejectedCount}
                </div>
                <div className="text-sm text-muted-foreground">Rejected</div>
              </div>
            </div>
          </CardContent>
        </Card>

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
            const categoryDocuments = documents.filter(doc => 
              docs.some(d => d.id === doc.documentType)
            );

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
                      {docs.map((doc) => {
                        const uploadedDoc = documents.find(d => d.documentType === doc.id);
                        const status = uploadedDoc ? uploadedDoc.status : 'pending';
                        return (
                          <DocumentUploadCard
                            key={doc.id}
                            document={doc}
                            status={status}
                            onStatusChange={(newStatus) => {
                              setDocuments(prev =>
                                prev.map(d =>
                                  d.documentType === doc.id ? { ...d, status: newStatus } : d
                                )
                              );
                              fetchData(); // Force full refresh
                            }}
                            showUpload={status !== 'approved'}
                          />
                        );
                      })}
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
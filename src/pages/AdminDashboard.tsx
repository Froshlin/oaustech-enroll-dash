import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  LogOut, 
  Users, 
  FileCheck, 
  Clock, 
  AlertTriangle,
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle,
  XCircle
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface StudentRegistration {
  id: string;
  name: string;
  studentId: string;
  email: string;
  department: string;
  level: string;
  registrationDate: Date;
  documentsSubmitted: number;
  documentsApproved: number;
  totalDocuments: number;
  status: 'incomplete' | 'under-review' | 'approved' | 'rejected';
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [students, setStudents] = useState<StudentRegistration[]>([]);

  useEffect(() => {
    // Check authentication
    if (!user || user.role !== 'admin') {
      navigate('/admin-login');
      return;
    }

    // Mock student data
    const mockStudents: StudentRegistration[] = [
      {
        id: '1',
        name: 'John Doe',
        studentId: 'OAUS/2024/001',
        email: 'john@example.com',
        department: 'Computer Science',
        level: '100',
        registrationDate: new Date('2024-01-15'),
        documentsSubmitted: 12,
        documentsApproved: 8,
        totalDocuments: 15,
        status: 'under-review'
      },
      {
        id: '2',
        name: 'Jane Smith',
        studentId: 'OAUS/2024/002',
        email: 'jane@example.com',
        department: 'Mechanical Engineering',
        level: '100',
        registrationDate: new Date('2024-01-20'),
        documentsSubmitted: 15,
        documentsApproved: 15,
        totalDocuments: 15,
        status: 'approved'
      },
      {
        id: '3',
        name: 'Mike Johnson',
        studentId: 'OAUS/2024/003',
        email: 'mike@example.com',
        department: 'Electrical Engineering',
        level: '100',
        registrationDate: new Date('2024-01-25'),
        documentsSubmitted: 8,
        documentsApproved: 3,
        totalDocuments: 15,
        status: 'incomplete'
      },
      {
        id: '4',
        name: 'Sarah Wilson',
        studentId: 'OAUS/2024/004',
        email: 'sarah@example.com',
        department: 'Civil Engineering',
        level: '100',
        registrationDate: new Date('2024-01-30'),
        documentsSubmitted: 14,
        documentsApproved: 2,
        totalDocuments: 15,
        status: 'rejected'
      }
    ];
    setStudents(mockStudents);
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "Admin session ended successfully."
    });
    navigate('/');
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || student.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4 text-success" />;
      case 'rejected': return <XCircle className="w-4 h-4 text-destructive" />;
      case 'under-review': return <Clock className="w-4 h-4 text-warning" />;
      default: return <AlertTriangle className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      'approved': 'default',
      'under-review': 'secondary',
      'incomplete': 'outline',
      'rejected': 'destructive'
    };
    return (
      <Badge variant={variants[status as keyof typeof variants] as any}>
        {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
      </Badge>
    );
  };

  const stats = {
    total: students.length,
    approved: students.filter(s => s.status === 'approved').length,
    underReview: students.filter(s => s.status === 'under-review').length,
    incomplete: students.filter(s => s.status === 'incomplete').length,
    rejected: students.filter(s => s.status === 'rejected').length
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/5 via-background to-primary/5">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-accent" />
              <div>
                <h1 className="text-xl font-bold text-foreground">OAUSTECH</h1>
                <p className="text-sm text-muted-foreground">Admin Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">Administrator</p>
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
          <h2 className="text-3xl font-bold mb-2">Admin Dashboard</h2>
          <p className="text-muted-foreground">
            Manage student registrations and review documents
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-success">Approved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{stats.approved}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-warning">Under Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{stats.underReview}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Incomplete</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-muted-foreground">{stats.incomplete}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-destructive">Rejected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{stats.rejected}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Student Registrations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, student ID, or department..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-input rounded-md bg-background"
              >
                <option value="all">All Status</option>
                <option value="approved">Approved</option>
                <option value="under-review">Under Review</option>
                <option value="incomplete">Incomplete</option>
                <option value="rejected">Rejected</option>
              </select>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>

            {/* Student List */}
            <div className="space-y-4">
              {filteredStudents.map((student) => (
                <div key={student.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(student.status)}
                      <div>
                        <h3 className="font-semibold">{student.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {student.studentId} • {student.department} • Level {student.level}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(student.status)}
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Email:</span> {student.email}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Registration Date:</span> {student.registrationDate.toLocaleDateString()}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Documents:</span> {student.documentsSubmitted}/{student.totalDocuments} submitted, {student.documentsApproved} approved
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredStudents.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No students found matching your criteria.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
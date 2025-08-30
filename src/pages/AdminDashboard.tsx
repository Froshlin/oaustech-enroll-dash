/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Shield, 
  LogOut, 
  Users, 
  FileCheck, 
  Clock, 
  AlertTriangle,
  Search,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Trash2
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import Logo from '@/assets/oaustech-sch-logo.png';


interface StudentRegistration {
  _id: string;
  name: string;
  username: string;
  email: string;
  department: string;
  level: string;
  createdAt: Date;
  profilePicture?: string;
  documentsSubmitted: number;
  documentsApproved: number;
  totalDocuments: number;
  status: 'incomplete' | 'under-review' | 'approved' | 'rejected';
}

const departments = [
  'CSC', 'NUR', 'MCB', 'CVE', 'ME', 'MTH', 'FST', 'AEE', 'PHY', 'GPY', 'GEO', 'BOT', 'ICH', 'BCH', 'ZOO', 'STA', 'MLS', 'PH', 'ACC'
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [students, setStudents] = useState<StudentRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${import.meta.env.VITE_PUBLIC_BACKEND_URL}/api/admin/students`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const validStudents = Array.isArray(response.data) ? response.data.map((s: any) => ({
        _id: s._id,
        name: s.name || 'Unknown',
        username: s.username || 'N/A',
        email: s.email || '',
        department: s.department || 'N/A',
        level: s.level || 'N/A',
        createdAt: new Date(s.createdAt),
        profilePicture: s.profilePicture,
        documentsSubmitted: s.documentsSubmitted || 0,
        documentsApproved: s.documentsApproved || 0,
        totalDocuments: s.totalDocuments || 0,
        status: s.status || 'incomplete',
      })) : [];
      setStudents(validStudents);
    } catch (error) {
      console.error('Fetch students error:', error);
      setError("Failed to load student data. Try again.");
      toast({
        title: "Error",
        description: "Failed to load student data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/admin-login');
      return;
    }
    fetchStudents();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, navigate, toast]);

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "Admin session ended successfully."
    });
    navigate('/');
  };

  const handleRetry = () => {
    setError(null);
    fetchStudents();
  };

  const filteredStudents = students.filter(student => {
    const name = student.name || '';
    const username = student.username || '';
    const department = student.department || '';
    const status = student.status || 'incomplete';

    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || status === selectedStatus;
    const matchesDepartment = selectedDepartment === 'all' || department === selectedDepartment;
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'rejected': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'under-review': return <Clock className="w-4 h-4 text-yellow-500" />;
      default: return <AlertTriangle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
      'approved': 'default',
      'under-review': 'secondary',
      'incomplete': 'outline',
      'rejected': 'destructive'
    };
    return (
      <Badge variant={variants[status]}>
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

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={Logo} alt="OAUSTECH Logo" className="w-10 h-10 object-contain" />
              <div>
                <h1 className="text-xl font-bold">OAUSTECH</h1>
                <p className="text-sm text-gray-500">Admin Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium">{user.name || user.username}</p>
                <p className="text-xs text-gray-500">Administrator</p>
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
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Admin Dashboard</h2>
          <p className="text-gray-500">
            Manage student registrations and review documents
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-600">Approved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-yellow-600">Under Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.underReview}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Incomplete</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-500">{stats.incomplete}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-red-600">Rejected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Student Registrations
            </CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md flex items-center justify-between">
                <span>{error}</span>
                <Button variant="outline" size="sm" onClick={handleRetry}>
                  Retry
                </Button>
              </div>
            )}
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
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
                className="px-3 py-2 border rounded-md bg-white"
              >
                <option value="all">All Status</option>
                <option value="approved">Approved</option>
                <option value="under-review">Under Review</option>
                <option value="incomplete">Incomplete</option>
                <option value="rejected">Rejected</option>
              </select>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-3 py-2 border rounded-md bg-white"
              >
                <option value="all">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>

            <div className="space-y-4">
              {filteredStudents.map((student) => (
                <div key={student._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <img 
                        src={student.profilePicture || 'https://via.placeholder.com/40?text=Profile'} 
                        alt={student.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      {getStatusIcon(student.status)}
                      <div>
                        <h3 className="font-semibold">{student.name}</h3>
                        <p className="text-sm text-gray-500">
                          {student.username} • {student.department} • Level {student.level}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(student.status)}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => navigate(`/admin/student/${student._id}`)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={async () => {
                          const newStatus = prompt('Enter new status (approved, under-review, incomplete, rejected):');
                          if (newStatus && ['approved', 'under-review', 'incomplete', 'rejected'].includes(newStatus)) {
                            try {
                              await axios.post(
                                `${import.meta.env.VITE_PUBLIC_BACKEND_URL}/api/admin/students/${student._id}/status`,
                                { status: newStatus },
                                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
                              );
                              setStudents(students.map(s => s._id === student._id ? { ...s, status: newStatus as any } : s));
                              toast({
                                title: "Status Updated",
                                description: `${student.name}'s status updated to ${newStatus}.`,
                              });
                            } catch (error) {
                              toast({
                                title: "Error",
                                description: "Failed to update status. Please try again.",
                                variant: "destructive",
                              });
                            }
                          }
                        }}
                      >
                        <FileCheck className="w-4 h-4 mr-1" />
                        Update Status
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={async () => {
                          if (window.confirm(`Are you sure you want to delete ${student.name}? This action cannot be undone.`)) {
                            try {
                              await axios.delete(
                                `${import.meta.env.VITE_PUBLIC_BACKEND_URL}/api/admin/students/${student._id}`,
                                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
                              );
                              setStudents(students.filter(s => s._id !== student._id));
                              toast({
                                title: "Student Deleted",
                                description: `${student.name} has been deleted successfully.`,
                              });
                            } catch (error) {
                              toast({
                                title: "Error",
                                description: "Failed to delete student. Please try again.",
                                variant: "destructive",
                              });
                            }
                          }
                        }}
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Email:</span> {student.email}
                    </div>
                    <div>
                      <span className="text-gray-500">Registration Date:</span> {new Date(student.createdAt).toLocaleDateString()}
                    </div>
                    <div>
                      <span className="text-gray-500">Documents:</span> {student.documentsSubmitted}/{student.totalDocuments} submitted, {student.documentsApproved} approved
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredStudents.length === 0 && !error && (
                <div className="text-center py-8 text-gray-500">
                  No students found.
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
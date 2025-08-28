// src/pages/AdminStudentDetail.tsx (unchanged from previous version)
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
import { CheckCircle, XCircle, Clock, AlertTriangle, ArrowLeft } from "lucide-react";

interface Document {
  _id: string;
  documentType: string;
  fileURL: string;
  status: string;
}

interface Student {
  name: string;
  username: string;
  department: string;
  level: string;
}

const AdminStudentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [student, setStudent] = useState<Student | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [remarks, setRemarks] = useState('');

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/admin-dashboard');
      return;
    }

    const fetchData = async () => {
      try {
        const [studentResponse, docsResponse] = await Promise.all([
          axios.get(`${import.meta.env.VITE_PUBLIC_BACKEND_URL}/api/admin/students/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          }),
          axios.get(`${import.meta.env.VITE_PUBLIC_BACKEND_URL}/api/admin/students/${id}/documents`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          }),
        ]);
        setStudent(studentResponse.data);
        setDocuments(docsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: "Error",
          description: "Failed to load student data.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, user, navigate, toast]);

  const handleReview = async (docId: string, newStatus: string) => {
    if (!remarks.trim() && newStatus === 'rejected') {
      toast({
        title: "Error",
        description: "Please add remarks for rejection.",
        variant: "destructive",
      });
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_PUBLIC_BACKEND_URL}/api/admin/documents/${docId}/review`,
        { status: newStatus, remarks: newStatus === 'rejected' ? remarks : '' },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setDocuments(docs => docs.map(d => d._id === docId ? { ...d, status: newStatus } : d));
      toast({
        title: "Success",
        description: `Document ${newStatus}.`,
      });
      setRemarks('');
    } catch (error) {
      console.error('Error reviewing document:', error);
      toast({
        title: "Error",
        description: "Failed to review document.",
        variant: "destructive",
      });
    }
  };

  if (loading) return <div>Loading...</div>;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'rejected': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'under-review': return <Clock className="w-4 h-4 text-yellow-500" />;
      default: return <AlertTriangle className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white p-4">
        <Button variant="outline" onClick={() => navigate('/admin-dashboard')} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        <h1 className="text-2xl font-bold">Student Details: {student?.name}</h1>
        <p className="text-gray-500">Username: {student?.username} | Department: {student?.department} | Level: {student?.level}</p>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Input
          placeholder="Remarks for rejection (optional)"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          className="mb-4"
        />
        <div className="space-y-4">
          {documents.map((doc) => (
            <Card key={doc._id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(doc.status)}
                    <div>
                      <CardTitle>{doc.documentType.replace('-', ' ').toUpperCase()}</CardTitle>
                      <CardDescription>Status: <Badge variant="outline">{doc.status}</Badge></CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleReview(doc._id, 'approved')}
                      disabled={doc.status === 'approved'}
                    >
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleReview(doc._id, 'rejected')}
                      disabled={doc.status === 'rejected'}
                    >
                      Reject
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(doc.fileURL, '_blank')}
                      disabled={!doc.fileURL}
                    >
                      View
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminStudentDetail;
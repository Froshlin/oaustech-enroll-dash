// src/components/DocumentUploadCard.tsx
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Upload, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  FileText, 
  Trash2,
  Eye,
  Download
} from "lucide-react";
import { DocumentType } from "@/types/documents";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";

interface DocumentUploadCardProps {
  document: DocumentType;
  status: string;
  onStatusChange: (status: string) => void;
  showUpload: boolean;
}

const DocumentUploadCard: React.FC<DocumentUploadCardProps> = ({ document, status, onStatusChange, showUpload }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'uploaded' || status === 'approved' || status === 'reviewing') {
      axios.get(`${import.meta.env.VITE_PUBLIC_BACKEND_URL}/api/students/${user?.id}/documents`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      }).then((response) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const doc = response.data.find((d: any) => d.documentType === document.id);
        if (doc) {
          setFileUrl(doc.fileUrl);
          if (doc.status !== status) {
            onStatusChange(doc.status); // Sync with server status
          }
        }
      }).catch((error) => console.error('Error fetching file URL:', error));
    }
  }, [status, user?.id, document.id, onStatusChange]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid File Type",
        description: "Please upload PDF, JPEG, or PNG files only.",
        variant: "destructive"
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please upload files smaller than 10MB.",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('documentType', document.id);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_PUBLIC_BACKEND_URL}/api/students/${user.id}/documents`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
            setUploadProgress(percentCompleted);
          },
        }
      );
      setUploadedFile(file);
      setFileUrl(response.data.fileUrl);
      onStatusChange('uploaded');
      toast({
        title: "Upload Successful",
        description: `${document.name} has been uploaded successfully.`,
      });
    } catch (error) {
      console.error('Upload error:', error.response?.data || error.message);
      toast({
        title: "Upload Failed",
        description: error.response?.data?.message || "Failed to upload the document. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveFile = () => {
    if (uploadedFile) {
      setUploadedFile(null);
      setFileUrl(null);
      setUploadProgress(0);
      onStatusChange('pending');
      toast({
        title: "File Removed",
        description: `${document.name} has been removed locally. (Backend delete not implemented yet.)`
      });
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'uploaded': 
      case 'reviewing': return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'rejected': return <AlertCircle className="w-5 h-5 text-red-500" />;
      default: return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusBadge = () => {
    const variants: Record<string, "default" | "destructive" | "secondary" | "outline"> = {
      'approved': 'default',
      'uploaded': 'secondary',
      'reviewing': 'outline',
      'rejected': 'destructive',
      'pending': 'outline'
    };
    return (
      <Badge variant={variants[status] ?? 'outline'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const canUpload = status === 'pending' || status === 'rejected';
  const hasFile = !!fileUrl || (uploadedFile && ['uploaded', 'approved', 'reviewing'].includes(status));

  return (
    <Card className={`transition-all duration-200 ${
      status === 'approved' ? 'border-green-500/50 bg-green-500/5' :
      status === 'rejected' ? 'border-red-500/50 bg-red-500/5' :
      'hover:shadow-md'
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            {getStatusIcon()}
            <div className="flex-1">
              <CardTitle className="text-base">{document.name}</CardTitle>
              <CardDescription className="mt-1">
                {document.description}
              </CardDescription>
              {document.copies.colored > 0 && (
                <div className="text-xs text-gray-500 mt-2">
                  Required: {document.copies.colored} colored print
                  {document.copies.photocopies > 0 && `, ${document.copies.photocopies} photocopies`}
                </div>
              )}
            </div>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {status === 'rejected' && (
          <Alert className="mb-4 border-red-500/50 bg-red-500/5">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              This document was rejected. Please upload a corrected version.
            </AlertDescription>
          </Alert>
        )}

        {isUploading && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Uploading...</span>
              <span className="text-sm font-medium">{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} className="h-2" />
          </div>
        )}

        <div className="flex items-center gap-2">
          {showUpload && canUpload && !isUploading && (
            <>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
                className="hidden"
                id={`upload-${document.id}`}
              />
              <label htmlFor={`upload-${document.id}`}>
                <Button asChild className="cursor-pointer">
                  <span>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Document
                  </span>
                </Button>
              </label>
            </>
          )}

          {hasFile && !isUploading && fileUrl && (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => window.open(fileUrl, '_blank')}>
                <Eye className="w-4 h-4 mr-2" />
                View
              </Button>
              <Button variant="outline" size="sm" onClick={() => window.open(fileUrl, '_blank')}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              {canUpload && (
                <Button variant="outline" size="sm" onClick={handleRemoveFile}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Remove
                </Button>
              )}
            </div>
          )}

          {uploadedFile && (
            <div className="text-sm text-gray-500 ml-auto">
              {uploadedFile.name} ({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)
            </div>
          )}
        </div>

        {status === 'approved' && (
          <div className="mt-3 text-sm text-green-500">
            ✓ Document approved and verified
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DocumentUploadCard;
import { useState } from "react";
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

interface DocumentUploadCardProps {
  document: DocumentType;
  status: string;
  onStatusChange: (status: string) => void;
}

const DocumentUploadCard = ({ document, status, onStatusChange }: DocumentUploadCardProps) => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid File Type",
        description: "Please upload PDF, JPEG, or PNG files only.",
        variant: "destructive"
      });
      return;
    }

    // Validate file size (max 10MB)
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

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadedFile(file);
          onStatusChange('uploaded');
          toast({
            title: "Upload Successful",
            description: `${document.name} has been uploaded successfully.`
          });
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setUploadProgress(0);
    onStatusChange('pending');
    toast({
      title: "File Removed",
      description: `${document.name} has been removed.`
    });
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-5 h-5 text-success" />;
      case 'uploaded': 
      case 'reviewing': return <Clock className="w-5 h-5 text-warning" />;
      case 'rejected': return <AlertCircle className="w-5 h-5 text-destructive" />;
      default: return <FileText className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = () => {
    const variants = {
      'approved': 'default',
      'uploaded': 'secondary',
      'reviewing': 'outline',
      'rejected': 'destructive',
      'pending': 'outline'
    };

    const colors = {
      'approved': 'bg-success text-success-foreground',
      'uploaded': 'bg-primary text-primary-foreground',
      'reviewing': 'bg-warning text-warning-foreground',
      'rejected': 'bg-destructive text-destructive-foreground',
      'pending': 'bg-muted text-muted-foreground'
    };

    return (
      <Badge className={colors[status as keyof typeof colors]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const canUpload = status === 'pending' || status === 'rejected';
  const hasFile = uploadedFile || status === 'uploaded' || status === 'approved' || status === 'reviewing';

  return (
    <Card className={`transition-all duration-200 ${
      status === 'approved' ? 'border-success/50 bg-success/5' :
      status === 'rejected' ? 'border-destructive/50 bg-destructive/5' :
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
                <div className="text-xs text-muted-foreground mt-2">
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
          <Alert className="mb-4 border-destructive/50 bg-destructive/5">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              This document was rejected. Please upload a corrected version.
            </AlertDescription>
          </Alert>
        )}

        {isUploading && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Uploading...</span>
              <span className="text-sm font-medium">{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} className="h-2" />
          </div>
        )}

        <div className="flex items-center gap-2">
          {canUpload && !isUploading && (
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

          {hasFile && !isUploading && (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                View
              </Button>
              <Button variant="outline" size="sm">
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
            <div className="text-sm text-muted-foreground ml-auto">
              {uploadedFile.name} ({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)
            </div>
          )}
        </div>

        {status === 'approved' && (
          <div className="mt-3 text-sm text-success">
            ✓ Document approved and verified
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DocumentUploadCard;
export interface DocumentType {
  id: string;
  name: string;
  description: string;
  required: boolean;
  category: 'admission' | 'academic' | 'financial' | 'personal' | 'medical' | 'legal';
  copies: {
    colored: number;
    photocopies: number;
  };
}

export interface DocumentStatus {
  documentId: string;
  status: 'pending' | 'uploaded' | 'reviewing' | 'approved' | 'rejected';
  uploadDate?: Date;
  reviewDate?: Date;
  reviewedBy?: string;
  comments?: string;
  fileUrl?: string;
  fileName?: string;
}

export interface StudentDocument {
  id: string;
  studentId: string;
  documentType: DocumentType;
  status: DocumentStatus;
  versions: Array<{
    id: string;
    fileName: string;
    fileUrl: string;
    uploadDate: Date;
    isActive: boolean;
  }>;
}

// All 15 required documents as specified
export const REQUIRED_DOCUMENTS: DocumentType[] = [
  {
    id: 'jamb-admission',
    name: 'JAMB Admission Letter',
    description: 'For institution use only',
    required: true,
    category: 'admission',
    copies: { colored: 1, photocopies: 4 }
  },
  {
    id: 'oaustech-admission',
    name: 'OAUSTECH School Admission Letter',
    description: 'Official admission letter from OAUSTECH',
    required: true,
    category: 'admission',
    copies: { colored: 1, photocopies: 4 }
  },
  {
    id: 'jamb-supeb-result',
    name: 'JAMB Result/SUPEB Result(DE)',
    description: 'JAMB UTME or SUPEB Direct Entry results',
    required: true,
    category: 'academic',
    copies: { colored: 1, photocopies: 4 }
  },
  {
    id: 'olevel-result',
    name: "O'Level Result WAEC/NECO",
    description: 'West African Examination Council or National Examination Council results',
    required: true,
    category: 'academic',
    copies: { colored: 1, photocopies: 4 }
  },
  {
    id: 'clearance-form',
    name: 'Clearance Form',
    description: 'Duly completed by HOD and Dean',
    required: true,
    category: 'academic',
    copies: { colored: 1, photocopies: 0 }
  },
  {
    id: 'application-form',
    name: 'Candidate Application Form',
    description: 'Completed application form',
    required: true,
    category: 'admission',
    copies: { colored: 1, photocopies: 4 }
  },
  {
    id: 'acceptance-clearance',
    name: 'Acceptance Clearance',
    description: 'Acceptance of admission offer',
    required: true,
    category: 'admission',
    copies: { colored: 1, photocopies: 4 }
  },
  {
    id: 'payment-receipts',
    name: 'Payment Receipts',
    description: 'PUTME, Access/Checkers, Acceptance Fee, Medical Fee, School Fee',
    required: true,
    category: 'financial',
    copies: { colored: 1, photocopies: 4 }
  },
  {
    id: 'attestation-letter',
    name: 'Attestation Letter',
    description: 'Character attestation letter',
    required: true,
    category: 'personal',
    copies: { colored: 1, photocopies: 0 }
  },
  {
    id: 'birth-certificate',
    name: 'Certificate of Birth',
    description: 'Official birth certificate',
    required: true,
    category: 'personal',
    copies: { colored: 1, photocopies: 0 }
  },
  {
    id: 'origin-certificate',
    name: 'Certificate of Origin',
    description: 'Local government certificate of origin',
    required: true,
    category: 'personal',
    copies: { colored: 1, photocopies: 0 }
  },
  {
    id: 'medical-form',
    name: 'Medical Form',
    description: 'Duly filled at the school health center',
    required: true,
    category: 'medical',
    copies: { colored: 1, photocopies: 4 }
  },
  {
    id: 'medical-certificate',
    name: 'Medical Certificate of Fitness',
    description: 'Certificate confirming medical fitness',
    required: true,
    category: 'medical',
    copies: { colored: 1, photocopies: 0 }
  },
  {
    id: 'cultism-declaration',
    name: 'Declaration Against Cultism',
    description: 'Signed declaration against cultism',
    required: true,
    category: 'legal',
    copies: { colored: 1, photocopies: 0 }
  },
  {
    id: 'course-form',
    name: 'Course Form',
    description: 'Selected course registration form',
    required: true,
    category: 'academic',
    copies: { colored: 1, photocopies: 0 }
  }
];

export const getDocumentsByCategory = (category: string) => 
  REQUIRED_DOCUMENTS.filter(doc => doc.category === category);

export const getDocumentById = (id: string) => 
  REQUIRED_DOCUMENTS.find(doc => doc.id === id);
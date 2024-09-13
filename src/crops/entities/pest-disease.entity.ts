export class PestDiseaseIssue  {
    cropId: string;
    adminId: string;
    issueType: 'pest' | 'disease';
    severity: string;
    areaAffected: string;
    notes: string;
  }
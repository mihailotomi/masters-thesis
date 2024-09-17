export interface Announcement {
    id: number;
    title: string;
    content: string;
    validUntil: string; // ISO date string
    priority: AnnouncementPriorityType;
    audience: AnnouncementAudienceType[];
    documents: Document[]; // Adjust based on your Document type definition
  }
  
  export interface Document {
    id: number;
    // Define other properties of Document as per your requirements
  }
  
  // Enum definitions, if not imported from elsewhere
  export enum AnnouncementPriorityType {
    NORMAL = 0,
    HIGH = 1,
    CRITICAL = 2,
  }
  
  export enum AnnouncementAudienceType {
    STUDENTS = 'STUDENTS',
    EMPLOYEES = 'EMPLOYEES',
  }
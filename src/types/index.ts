
// Base User interface matching cq_user table
export interface User {
  id: number;
  created_at?: string;
  email: string;
  first_name?: string;
  last_name?: string;
  is_active?: boolean;
  password: string;
  phone?: string;
  role: 'ADMIN' | 'RECRUITER' | 'STUDENT';
}

// Student interface matching student table
export interface Student {
  id: string; // char(36) - UUID
  education?: string; // text
  experience?: string; // text
  full_name?: string;
  profile_pic?: string;
  skills?: string; // text - will be JSON string or comma-separated
  user_id: number; // foreign key to cq_user
  user?: User; // populated user data
}

// Recruiter interface matching recruiter table
export interface Recruiter {
  id: string; // char(36) - UUID
  designation?: string;
  full_name?: string;
  user_id: number; // foreign key to cq_user
  user?: User; // populated user data
}

// Admin interface matching admin table
export interface Admin {
  id: string; // char(36) - UUID
  full_name?: string;
  user_id: number; // foreign key to cq_user
  user?: User; // populated user data
}

// Company interface matching company table
export interface Company {
  id: number;
  description?: string;
  logo_url?: string;
  name: string;
  website?: string;
  recruiter_id?: string; // foreign key to recruiter
}

// Job interface matching job table
export interface Job {
  id: number;
  deadline?: string; // date
  description: string;
  experience?: string;
  location?: string;
  posted_at?: string; // datetime
  salary_range?: string;
  skills?: string; // text - JSON string or comma-separated
  title: string;
  type: string;
  company_id: number; // foreign key to company
  recruiter_id: string; // foreign key to recruiter
  company?: Company; // populated company data
  recruiter?: Recruiter; // populated recruiter data
}

// Application interface matching application table
export interface Application {
  id: number;
  applied_at?: string; // datetime
  status: 'APPLIED' | 'REJECTED' | 'SELECTED' | 'SHORTLISTED' | 'VIEWED';
  job_id: number; // foreign key to job
  resume_id?: number; // foreign key to resume
  student_id: string; // foreign key to student
  job?: Job; // populated job data
  student?: Student; // populated student data
  resume?: Resume; // populated resume data
}

// Bookmark interface matching bookmark table
export interface Bookmark {
  id: number;
  saved_at?: string; // datetime
  job_id: number; // foreign key to job
  student_id: string; // foreign key to student
  job?: Job; // populated job data
  student?: Student; // populated student data
}

// Resume interface matching resume table
export interface Resume {
  id: number;
  file_url?: string;
  uploaded_at?: string; // datetime
  student_id: string; // foreign key to student
  student?: Student; // populated student data
}

// Legacy interfaces for backward compatibility
export interface JobPosting extends Job {
  recruiterId: string;
  createdAt: string;
  requirements?: string[];
  salary?: string;
  companyName?: string;
}

// Helper types for forms and UI
export interface UserProfile {
  user: User;
  profile: Student | Recruiter | Admin;
}

export interface JobWithDetails extends Job {
  applicationsCount?: number;
  isBookmarked?: boolean;
  hasApplied?: boolean;
}

export interface ApplicationWithDetails extends Application {
  jobTitle?: string;
  companyName?: string;
  studentName?: string;
}

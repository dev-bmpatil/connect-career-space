
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'recruiter' | 'admin';
  avatar?: string;
}

export interface Student extends User {
  role: 'student';
  university?: string;
  degree?: string;
  graduationYear?: number;
  skills?: string[];
  resume?: string;
  about?: string;
}

export interface Recruiter extends User {
  role: 'recruiter';
  company: string;
  position: string;
  about?: string;
}

export interface Admin extends User {
  role: 'admin';
}

export interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'internship' | 'contract';
  description: string;
  requirements: string[];
  salary?: string;
  recruiterId: string;
  createdAt: string;
  deadline: string;
  status: 'active' | 'closed' | 'draft';
}

export interface Application {
  id: string;
  jobId: string;
  studentId: string;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'accepted';
  appliedAt: string;
  resume?: string;
  coverLetter?: string;
}

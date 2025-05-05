
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Recruiter } from "@/types";

// Mock job postings data
const mockJobPostings = [
  {
    id: "job1",
    title: "Frontend Developer Intern",
    applications: 12,
    deadline: "2023-06-15",
    status: "active",
    createdAt: "2023-05-01",
  },
  {
    id: "job2",
    title: "UX Designer",
    applications: 8,
    deadline: "2023-06-10",
    status: "active",
    createdAt: "2023-05-05",
  },
  {
    id: "job3",
    title: "Backend Developer",
    applications: 15,
    deadline: "2023-05-20",
    status: "closed",
    createdAt: "2023-04-20",
  },
];

// Mock applicant data
const mockApplicants = [
  {
    id: "app1",
    name: "John Student",
    jobTitle: "Frontend Developer Intern",
    university: "MIT",
    status: "pending",
    appliedAt: "2023-05-15",
  },
  {
    id: "app2",
    name: "Alice Johnson",
    jobTitle: "UX Designer",
    university: "Stanford",
    status: "shortlisted",
    appliedAt: "2023-05-10",
  },
  {
    id: "app3",
    name: "Robert Smith",
    jobTitle: "Backend Developer",
    university: "Carnegie Mellon",
    status: "rejected",
    appliedAt: "2023-05-01",
  },
];

const RecruiterDashboard = () => {
  const { user } = useAuth();
  const recruiter = user as Recruiter;
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-jobs-new text-white";
      case "closed":
        return "bg-jobs-deadline text-white";
      case "draft":
        return "bg-gray-300 text-gray-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  const getApplicantStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-jobs-pending text-black";
      case "shortlisted":
        return "bg-brand-primary text-white";
      case "rejected":
        return "bg-jobs-deadline text-white";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-full md:col-span-1">
          <CardHeader>
            <CardTitle>Welcome, {recruiter.name}!</CardTitle>
            <CardDescription>Recruiter Dashboard</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Account Overview</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-gray-500">Company:</div>
                <div>{recruiter.company || "Not specified"}</div>
                
                <div className="text-gray-500">Position:</div>
                <div>{recruiter.position || "Not specified"}</div>
                
                <div className="text-gray-500">Active Jobs:</div>
                <div>{mockJobPostings.filter(job => job.status === "active").length}</div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-brand-light p-3 rounded-lg">
                  <div className="text-brand-primary text-2xl font-bold">35</div>
                  <div className="text-sm text-gray-600">Total Applicants</div>
                </div>
                <div className="bg-brand-light p-3 rounded-lg">
                  <div className="text-brand-primary text-2xl font-bold">8</div>
                  <div className="text-sm text-gray-600">Shortlisted</div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <a href="/post-job">Post New Job</a>
            </Button>
          </CardFooter>
        </Card>

        <Card className="col-span-full md:col-span-2">
          <Tabs defaultValue="jobs">
            <CardHeader className="pb-1">
              <div className="flex items-center justify-between">
                <CardTitle>Job Management</CardTitle>
                <TabsList>
                  <TabsTrigger value="jobs">Job Postings</TabsTrigger>
                  <TabsTrigger value="applicants">Recent Applicants</TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>
            <CardContent>
              <TabsContent value="jobs" className="space-y-4">
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 bg-gray-50 p-3 text-xs font-medium text-gray-500">
                    <div className="col-span-5">Job Title</div>
                    <div className="col-span-2">Applicants</div>
                    <div className="col-span-2">Deadline</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-1"></div>
                  </div>
                  {mockJobPostings.map((job) => (
                    <div key={job.id} className="grid grid-cols-12 border-t p-3 text-sm">
                      <div className="col-span-5 font-medium">{job.title}</div>
                      <div className="col-span-2 text-gray-700">{job.applications}</div>
                      <div className="col-span-2 text-gray-500">{job.deadline}</div>
                      <div className="col-span-2">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(job.status)}`}>
                          {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                        </span>
                      </div>
                      <div className="col-span-1 flex justify-end">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="applicants" className="space-y-4">
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 bg-gray-50 p-3 text-xs font-medium text-gray-500">
                    <div className="col-span-3">Applicant</div>
                    <div className="col-span-3">Job Title</div>
                    <div className="col-span-2">University</div>
                    <div className="col-span-2">Date</div>
                    <div className="col-span-2">Status</div>
                  </div>
                  {mockApplicants.map((app) => (
                    <div key={app.id} className="grid grid-cols-12 border-t p-3 text-sm">
                      <div className="col-span-3 font-medium">{app.name}</div>
                      <div className="col-span-3 text-gray-700">{app.jobTitle}</div>
                      <div className="col-span-2 text-gray-700">{app.university}</div>
                      <div className="col-span-2 text-gray-500">{app.appliedAt}</div>
                      <div className="col-span-2">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getApplicantStatusColor(app.status)}`}>
                          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
        
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex">
                <div className="mr-4 flex-shrink-0 self-center">
                  <div className="h-2 w-2 rounded-full bg-brand-secondary"></div>
                </div>
                <div>
                  <p className="text-sm">
                    <span className="font-medium">John Student</span> applied to <span className="font-medium">Frontend Developer Intern</span>
                  </p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="mr-4 flex-shrink-0 self-center">
                  <div className="h-2 w-2 rounded-full bg-brand-secondary"></div>
                </div>
                <div>
                  <p className="text-sm">
                    You posted a new job: <span className="font-medium">UX Designer</span>
                  </p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="mr-4 flex-shrink-0 self-center">
                  <div className="h-2 w-2 rounded-full bg-brand-secondary"></div>
                </div>
                <div>
                  <p className="text-sm">
                    <span className="font-medium">Alice Johnson</span> was shortlisted for <span className="font-medium">UX Designer</span>
                  </p>
                  <p className="text-xs text-gray-500">2 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RecruiterDashboard;


import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Student } from "@/types";

// Mock job applications data
const mockApplications = [
  {
    id: "app1",
    jobId: "job1",
    title: "Frontend Developer Intern",
    company: "Tech Solutions Inc.",
    status: "pending",
    appliedAt: "2023-05-15",
  },
  {
    id: "app2",
    jobId: "job2",
    title: "UX Design Intern",
    company: "Design Studio Pro",
    status: "shortlisted",
    appliedAt: "2023-05-10",
  },
  {
    id: "app3",
    jobId: "job3",
    title: "Data Science Intern",
    company: "Analytics Plus",
    status: "rejected",
    appliedAt: "2023-05-01",
  },
];

// Mock recommended jobs
const mockRecommendedJobs = [
  {
    id: "rec1",
    title: "Software Engineering Intern",
    company: "Mega Tech Corp",
    location: "Remote",
    postedDate: "2023-05-20",
  },
  {
    id: "rec2",
    title: "Web Developer",
    company: "Web Solutions LLC",
    location: "New York, NY",
    postedDate: "2023-05-19",
  },
  {
    id: "rec3",
    title: "Mobile App Developer",
    company: "App Innovators",
    location: "San Francisco, CA",
    postedDate: "2023-05-18",
  },
];

const StudentDashboard = () => {
  const { user } = useAuth();
  const student = user as Student;
  
  const getStatusColor = (status: string) => {
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
            <CardTitle>Welcome, {student.name}!</CardTitle>
            <CardDescription>Student Dashboard</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Profile Completion</h3>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-brand-secondary h-2.5 rounded-full" style={{ width: "65%" }}></div>
              </div>
              <p className="text-sm text-gray-500">65% complete</p>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Profile Overview</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-gray-500">University:</div>
                <div>{student.university || "Not specified"}</div>
                
                <div className="text-gray-500">Degree:</div>
                <div>{student.degree || "Not specified"}</div>
                
                <div className="text-gray-500">Graduation Year:</div>
                <div>{student.graduationYear || "Not specified"}</div>
                
                <div className="text-gray-500">Resume:</div>
                <div>{student.resume ? "Uploaded" : "Not uploaded"}</div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <a href="/profile">Complete Your Profile</a>
            </Button>
          </CardFooter>
        </Card>

        <Card className="col-span-full md:col-span-2">
          <Tabs defaultValue="applications">
            <CardHeader className="pb-1">
              <div className="flex items-center justify-between">
                <CardTitle>Your Activity</CardTitle>
                <TabsList>
                  <TabsTrigger value="applications">Applications</TabsTrigger>
                  <TabsTrigger value="recommended">Recommended</TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>
            <CardContent>
              <TabsContent value="applications" className="space-y-4">
                {mockApplications.length > 0 ? (
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 bg-gray-50 p-3 text-xs font-medium text-gray-500">
                      <div className="col-span-5">Position</div>
                      <div className="col-span-3">Company</div>
                      <div className="col-span-2">Date</div>
                      <div className="col-span-2">Status</div>
                    </div>
                    {mockApplications.map((app) => (
                      <div key={app.id} className="grid grid-cols-12 border-t p-3 text-sm">
                        <div className="col-span-5 font-medium">{app.title}</div>
                        <div className="col-span-3 text-gray-700">{app.company}</div>
                        <div className="col-span-2 text-gray-500">{app.appliedAt}</div>
                        <div className="col-span-2">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(app.status)}`}>
                            {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500">You haven't applied to any jobs yet.</p>
                    <Button className="mt-4" asChild>
                      <a href="/jobs">Browse Jobs</a>
                    </Button>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="recommended" className="space-y-4">
                {mockRecommendedJobs.map((job) => (
                  <Card key={job.id} className="overflow-hidden">
                    <div className="p-4">
                      <h3 className="font-semibold text-lg">{job.title}</h3>
                      <div className="flex items-center text-sm text-gray-500 mt-1 space-x-2">
                        <span>{job.company}</span>
                        <span>•</span>
                        <span>{job.location}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Posted on {job.postedDate}</p>
                      <div className="mt-4 flex justify-end">
                        <Button size="sm" variant="outline" className="mr-2">View Details</Button>
                        <Button size="sm">Apply Now</Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
        
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Skills & Resources</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-medium mb-2">Your Skills</h3>
              <div className="flex flex-wrap gap-2">
                {student.skills && student.skills.length > 0 ? (
                  student.skills.map((skill, index) => (
                    <div key={index} className="bg-brand-light text-brand-primary rounded-full px-3 py-1 text-sm">
                      {skill}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No skills added yet</p>
                )}
              </div>
              <Button variant="outline" size="sm" className="mt-4">
                Add Skills
              </Button>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Learning Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-brand-secondary hover:underline flex items-center">
                    <span className="mr-2">📚</span> Resume Building Workshop
                  </a>
                </li>
                <li>
                  <a href="#" className="text-brand-secondary hover:underline flex items-center">
                    <span className="mr-2">🎯</span> Interview Preparation Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="text-brand-secondary hover:underline flex items-center">
                    <span className="mr-2">💻</span> Technical Skills Development
                  </a>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;

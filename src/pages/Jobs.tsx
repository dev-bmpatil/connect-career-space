
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Briefcase, MapPin, Calendar } from "lucide-react";

// Mock job listings data
const mockJobs = [
  {
    id: "1",
    title: "Frontend Developer Intern",
    company: "Tech Solutions Inc.",
    location: "Remote",
    type: "internship",
    description: "We are looking for a motivated frontend developer intern to join our team.",
    requirements: ["React", "JavaScript", "HTML/CSS"],
    salary: "$20-25/hr",
    recruiterId: "r1",
    createdAt: "2023-05-01",
    deadline: "2023-06-15",
    status: "active"
  },
  {
    id: "2",
    title: "UX Designer",
    company: "Design Studio Pro",
    location: "New York, NY",
    type: "full-time",
    description: "Join our creative team as a UX Designer to create amazing user experiences.",
    requirements: ["Figma", "Adobe XD", "User Research"],
    salary: "$70,000-85,000",
    recruiterId: "r1",
    createdAt: "2023-05-05",
    deadline: "2023-06-10",
    status: "active"
  },
  {
    id: "3",
    title: "Software Engineering Intern",
    company: "Mega Tech Corp",
    location: "San Francisco, CA",
    type: "internship",
    description: "Join our engineering team to work on exciting projects and learn from experienced developers.",
    requirements: ["Java", "Python", "Data Structures"],
    salary: "$25-30/hr",
    recruiterId: "r2",
    createdAt: "2023-05-10",
    deadline: "2023-06-20",
    status: "active"
  },
  {
    id: "4",
    title: "Data Science Intern",
    company: "Analytics Plus",
    location: "Chicago, IL",
    type: "internship",
    description: "Work with our data science team to analyze data and build machine learning models.",
    requirements: ["Python", "SQL", "Machine Learning"],
    salary: "$22-28/hr",
    recruiterId: "r2",
    createdAt: "2023-05-12",
    deadline: "2023-06-18",
    status: "active"
  },
  {
    id: "5",
    title: "Mobile App Developer",
    company: "App Innovators",
    location: "Austin, TX",
    type: "full-time",
    description: "Looking for a talented mobile app developer to join our team.",
    requirements: ["React Native", "iOS", "Android"],
    salary: "$90,000-110,000",
    recruiterId: "r3",
    createdAt: "2023-05-15",
    deadline: "2023-06-25",
    status: "active"
  }
];

const JobsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobType, setJobType] = useState<string>("");
  
  // Filter jobs based on search term and job type
  const filteredJobs = mockJobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = jobType ? job.type === jobType : true;
    
    return matchesSearch && matchesType;
  });
  
  const getJobTypeColor = (type: string) => {
    switch (type) {
      case "full-time":
        return "bg-brand-primary text-white";
      case "part-time":
        return "bg-brand-accent text-white";
      case "internship":
        return "bg-brand-secondary text-white";
      case "contract":
        return "bg-jobs-new text-white";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">Job Listings</h1>
          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-80"
            />
            <div className="w-full sm:w-48">
              <Select value={jobType} onValueChange={setJobType}>
                <SelectTrigger>
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Types</SelectItem>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <Card key={job.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{job.title}</CardTitle>
                      <div className="flex items-center mt-1 text-gray-600">
                        <Briefcase className="h-4 w-4 mr-1" />
                        <span className="mr-4">{job.company}</span>
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{job.location}</span>
                      </div>
                    </div>
                    <Badge className={getJobTypeColor(job.type)}>
                      {job.type.charAt(0).toUpperCase() + job.type.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{job.description}</p>
                  <div className="mb-4">
                    <Label className="text-sm font-medium">Requirements:</Label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {job.requirements.map((req, index) => (
                        <Badge key={index} variant="outline" className="bg-gray-100">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Deadline: {job.deadline}</span>
                    </div>
                    {job.salary && (
                      <span className="font-medium text-brand-primary">{job.salary}</span>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50 border-t">
                  <Button className="w-full sm:w-auto">View Details</Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900">No jobs found</h3>
              <p className="mt-1 text-gray-500">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobsPage;


import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Briefcase, MapPin, Calendar, Star } from "lucide-react";

// Mock job data
const mockJobs = [
  {
    id: "1",
    title: "Frontend Developer Intern",
    company: "Tech Solutions Inc.",
    location: "Remote",
    type: "internship",
    posted: "2 days ago",
    deadline: "2023-06-15",
    description: "We're looking for a motivated Frontend Developer Intern to join our team. You'll work on real projects using React, TypeScript, and modern web technologies.",
    skills: ["React", "JavaScript", "HTML/CSS"],
    salary: "$20-25/hr"
  },
  {
    id: "2",
    title: "UX/UI Design Intern",
    company: "Creative Studio",
    location: "New York, NY",
    type: "internship",
    posted: "1 week ago",
    deadline: "2023-06-20",
    description: "Join our design team to create beautiful and functional user interfaces. You'll work closely with product managers and developers to bring designs to life.",
    skills: ["Figma", "Adobe XD", "UI Design"],
    salary: "$22/hr"
  },
  {
    id: "3",
    title: "Software Engineering Intern",
    company: "Mega Tech Corp",
    location: "San Francisco, CA",
    type: "internship",
    posted: "3 days ago",
    deadline: "2023-06-30",
    description: "As a Software Engineering Intern, you'll help build and maintain our core products. This role involves full-stack development with modern technologies.",
    skills: ["Java", "Python", "Node.js"],
    salary: "$25-30/hr"
  },
  {
    id: "4",
    title: "Data Science Intern",
    company: "DataMetrics",
    location: "Boston, MA",
    type: "internship",
    posted: "5 days ago",
    deadline: "2023-07-05",
    description: "Help us analyze large datasets and build machine learning models. You'll work with our data science team on real-world problems.",
    skills: ["Python", "SQL", "Machine Learning"],
    salary: "$24-28/hr"
  },
  {
    id: "5",
    title: "Marketing Coordinator",
    company: "BrandBuilders",
    location: "Chicago, IL",
    type: "full-time",
    posted: "1 day ago",
    deadline: "2023-06-25",
    description: "Join our marketing team to help coordinate campaigns, analyze market trends, and support our brand growth initiatives.",
    skills: ["Digital Marketing", "Social Media", "Analytics"],
    salary: "$45,000-55,000/yr"
  },
  {
    id: "6",
    title: "Backend Developer",
    company: "ServerSolutions",
    location: "Austin, TX",
    type: "full-time",
    posted: "4 days ago",
    deadline: "2023-07-10",
    description: "Looking for an experienced backend developer to help scale our infrastructure and implement new features.",
    skills: ["Node.js", "MongoDB", "AWS"],
    salary: "$80,000-95,000/yr"
  }
];

const jobTypes = ["All Types", "Full-time", "Part-time", "Internship", "Contract"];
const locations = ["All Locations", "Remote", "New York, NY", "San Francisco, CA", "Boston, MA", "Chicago, IL", "Austin, TX"];

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobType, setJobType] = useState("All Types");
  const [location, setLocation] = useState("All Locations");
  const [savedJobs, setSavedJobs] = useState<string[]>([]);

  const toggleSaveJob = (jobId: string) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId) 
        : [...prev, jobId]
    );
  };

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = jobType === "All Types" || job.type.toLowerCase() === jobType.toLowerCase();
    const matchesLocation = location === "All Locations" || job.location === location;

    return matchesSearch && matchesType && matchesLocation;
  });

  const getJobTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "internship":
        return "bg-jobs-new text-white";
      case "full-time":
        return "bg-brand-primary text-white";
      case "part-time":
        return "bg-brand-secondary text-white";
      case "contract":
        return "bg-jobs-pending text-black";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Perfect Opportunity</h1>
          <p className="text-gray-500">Browse through internships and job opportunities tailored for students.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by title, company, or keywords"
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={jobType} onValueChange={setJobType}>
              <SelectTrigger>
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                {jobTypes.map(type => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map(loc => (
                  <SelectItem key={loc} value={loc}>
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="mt-4 flex justify-end">
            <Button>
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">Showing {filteredJobs.length} results</p>
            <Select defaultValue="newest">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="salary-high">Salary: High to Low</SelectItem>
                <SelectItem value="salary-low">Salary: Low to High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredJobs.length > 0 ? (
            <div className="grid gap-6">
              {filteredJobs.map(job => (
                <Card key={job.id} className="p-6">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold mb-1">{job.title}</h3>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-gray-400 hover:text-yellow-500"
                          onClick={() => toggleSaveJob(job.id)}
                        >
                          <Star 
                            className={`h-5 w-5 ${savedJobs.includes(job.id) ? 'fill-yellow-400 text-yellow-400' : ''}`} 
                          />
                        </Button>
                      </div>
                      <div className="flex items-center text-gray-500 mb-4">
                        <Briefcase className="h-4 w-4 mr-1" />
                        <span className="mr-4">{job.company}</span>
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{job.location}</span>
                      </div>
                      <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.skills.map(skill => (
                          <Badge key={skill} variant="outline" className="bg-gray-50">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                          <Badge className={getJobTypeColor(job.type)}>
                            {job.type.charAt(0).toUpperCase() + job.type.slice(1)}
                          </Badge>
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>Posted {job.posted}</span>
                          </div>
                        </div>
                        <div className="text-brand-secondary font-medium">
                          {job.salary}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t flex justify-end space-x-4">
                    <Button variant="outline">View Details</Button>
                    <Button>Apply Now</Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No jobs found matching your criteria.</p>
              <Button className="mt-4" onClick={() => {
                setSearchTerm("");
                setJobType("All Types");
                setLocation("All Locations");
              }}>
                Reset Filters
              </Button>
            </div>
          )}

          <div className="mt-8 flex justify-center">
            <Button variant="outline" className="mx-2">Previous</Button>
            <Button variant="outline" className="mx-2">1</Button>
            <Button variant="outline" className="mx-2">2</Button>
            <Button variant="outline" className="mx-2">3</Button>
            <Button variant="outline" className="mx-2">Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;

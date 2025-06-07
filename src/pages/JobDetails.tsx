
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Briefcase, MapPin, Calendar, DollarSign, Users, Clock } from "lucide-react";
import { toast } from "sonner";

// Mock job data - in a real app this would come from an API
const mockJobDetails = {
  "1": {
    id: "1",
    title: "Frontend Developer Intern",
    company: "Tech Solutions Inc.",
    location: "Remote",
    type: "internship",
    posted: "2 days ago",
    deadline: "2023-06-15",
    description: "We're looking for a motivated Frontend Developer Intern to join our team. You'll work on real projects using React, TypeScript, and modern web technologies. This is a great opportunity to gain hands-on experience in a fast-paced environment.",
    requirements: [
      "Currently pursuing a degree in Computer Science or related field",
      "Basic knowledge of React and JavaScript",
      "Understanding of HTML/CSS",
      "Good communication skills",
      "Ability to work in a team environment"
    ],
    responsibilities: [
      "Develop and maintain frontend components using React",
      "Collaborate with designers to implement UI/UX designs",
      "Write clean, maintainable code",
      "Participate in code reviews",
      "Learn and apply best practices"
    ],
    skills: ["React", "JavaScript", "HTML/CSS", "TypeScript"],
    salary: "$20-25/hr",
    experience: "Entry Level",
    applicants: 23
  }
};

const JobDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [job, setJob] = useState<any>(null);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    if (id && mockJobDetails[id as keyof typeof mockJobDetails]) {
      setJob(mockJobDetails[id as keyof typeof mockJobDetails]);
    } else {
      navigate("/jobs");
    }
  }, [id, navigate]);

  const handleApply = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    
    if (user.role !== "student") {
      toast.error("Only students can apply for jobs");
      return;
    }

    setHasApplied(true);
    toast.success("Application submitted successfully!");
  };

  if (!job) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading job details...</p>
      </div>
    );
  }

  const getJobTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "internship":
        return "bg-jobs-new text-white";
      case "full-time":
        return "bg-brand-primary text-white";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button variant="outline" onClick={() => navigate("/jobs")} className="mb-6">
          ← Back to Jobs
        </Button>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl mb-2">{job.title}</CardTitle>
                <div className="flex items-center space-x-4 text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-1" />
                    {job.company}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {job.location}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Posted {job.posted}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge className={getJobTypeColor(job.type)}>
                    {job.type.charAt(0).toUpperCase() + job.type.slice(1)}
                  </Badge>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-1" />
                    {job.applicants} applicants
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    Deadline: {job.deadline}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-semibold text-brand-secondary mb-2">
                  {job.salary}
                </div>
                <div className="text-sm text-gray-500">{job.experience}</div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Job Description</h3>
              <p className="text-gray-600 leading-relaxed">{job.description}</p>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-3">Requirements</h3>
              <ul className="space-y-2">
                {job.requirements.map((req: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-brand-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-600">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-3">Responsibilities</h3>
              <ul className="space-y-2">
                {job.responsibilities.map((resp: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-brand-secondary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-600">{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-3">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill: string, index: number) => (
                  <Badge key={index} variant="outline" className="bg-gray-50">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            <div className="flex justify-center pt-4">
              {user?.role === "student" ? (
                <Button 
                  size="lg" 
                  onClick={handleApply}
                  disabled={hasApplied}
                  className="px-8"
                >
                  {hasApplied ? "Application Submitted" : "Apply Now"}
                </Button>
              ) : (
                <Button 
                  size="lg" 
                  onClick={() => navigate("/login")}
                  className="px-8"
                >
                  Login to Apply
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JobDetails;

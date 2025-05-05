
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import StudentDashboard from "./StudentDashboard";
import RecruiterDashboard from "./RecruiterDashboard";

// Mock job data for the home page
const featuredJobs = [
  {
    id: "f1",
    title: "Software Engineering Intern",
    company: "Tech Solutions Inc.",
    location: "Remote",
    type: "internship",
  },
  {
    id: "f2",
    title: "UX/UI Design Intern",
    company: "Creative Studio",
    location: "New York, NY",
    type: "internship",
  },
  {
    id: "f3",
    title: "Data Analyst",
    company: "Analytics Pro",
    location: "San Francisco, CA",
    type: "full-time",
  },
  {
    id: "f4",
    title: "Frontend Developer",
    company: "Web Innovators",
    location: "Boston, MA",
    type: "full-time",
  },
];

const Index = () => {
  const { user } = useAuth();

  if (user) {
    if (user.role === "student") {
      return (
        <div>
          <Navbar />
          <StudentDashboard />
        </div>
      );
    } else if (user.role === "recruiter") {
      return (
        <div>
          <Navbar />
          <RecruiterDashboard />
        </div>
      );
    } else {
      // Admin dashboard
      return (
        <div>
          <Navbar />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="mt-2">Admin functionality coming soon.</p>
          </div>
        </div>
      );
    }
  }

  return (
    <div>
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-brand-primary to-brand-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              <span className="block">Find Your Perfect</span>
              <span className="block">Internship or Job</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-white sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              ZIDIOConnect helps students and recruiters connect for internships and job opportunities.
              Build your profile, showcase your skills, and land your dream role.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Button asChild size="lg" className="w-full">
                  <Link to="/register">Get Started</Link>
                </Button>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <Button asChild variant="outline" size="lg" className="w-full bg-white hover:bg-gray-50">
                  <Link to="/jobs">Browse Jobs</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Jobs Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-center">Featured Opportunities</h2>
        <p className="mt-4 max-w-2xl mx-auto text-center text-gray-500">
          Discover the latest internship and job opportunities from top companies.
        </p>
        <div className="mt-10 grid gap-6 lg:grid-cols-4 md:grid-cols-2">
          {featuredJobs.map((job) => (
            <div key={job.id} className="bg-white shadow-sm border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-medium">{job.title}</h3>
              <p className="mt-2 text-sm text-gray-500">{job.company}</p>
              <div className="flex justify-between items-center mt-4">
                <div className="text-xs text-gray-500">{job.location}</div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-light text-brand-primary">
                  {job.type === 'internship' ? 'Internship' : 'Full-time'}
                </span>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link to={`/jobs/${job.id}`}>View Details</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button asChild variant="outline">
            <Link to="/jobs">View All Jobs</Link>
          </Button>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center">How ZIDIOConnect Works</h2>
          <p className="mt-4 max-w-2xl mx-auto text-center text-gray-500">
            A simplified process to connect students with the right opportunities.
          </p>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-brand-light text-brand-primary text-xl font-bold">
                1
              </div>
              <h3 className="mt-4 text-lg font-medium">Create Your Profile</h3>
              <p className="mt-2 text-sm text-gray-500">
                Sign up and build your comprehensive profile showcasing your education, skills, and experience.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-brand-light text-brand-primary text-xl font-bold">
                2
              </div>
              <h3 className="mt-4 text-lg font-medium">Apply to Opportunities</h3>
              <p className="mt-2 text-sm text-gray-500">
                Browse and apply to internships and jobs that match your skills and career goals.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-brand-light text-brand-primary text-xl font-bold">
                3
              </div>
              <h3 className="mt-4 text-lg font-medium">Get Connected</h3>
              <p className="mt-2 text-sm text-gray-500">
                Connect with potential employers, receive updates, and track your application status.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brand-primary rounded-lg shadow-xl overflow-hidden">
            <div className="px-6 py-12 md:py-16 md:px-12 text-center">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                <span>Ready to start your career journey?</span>
              </h2>
              <p className="mt-4 text-lg text-white">
                Join thousands of students and recruiters on ZIDIOConnect today.
              </p>
              <div className="mt-8">
                <Button asChild size="lg" className="bg-white text-brand-primary hover:bg-gray-100">
                  <Link to="/register">Sign Up Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="text-lg font-bold mb-4">ZIDIOConnect</h3>
              <p className="text-gray-300 text-sm">
                Connecting students with top companies for internships and job opportunities.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">For Students</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">Browse Jobs</a></li>
                <li><a href="#" className="hover:text-white">Create Profile</a></li>
                <li><a href="#" className="hover:text-white">Career Resources</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">For Recruiters</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">Post Jobs</a></li>
                <li><a href="#" className="hover:text-white">Find Candidates</a></li>
                <li><a href="#" className="hover:text-white">Recruiting Solutions</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Support</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} ZIDIOConnect. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

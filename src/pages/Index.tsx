
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      switch (user.role) {
        case "student":
          navigate("/student-dashboard");
          break;
        case "recruiter":
          navigate("/recruiter-dashboard");
          break;
        case "admin":
          navigate("/admin-dashboard");
          break;
        default:
          break;
      }
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <section className="py-16 md:py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Connect Students with Career Opportunities
                </h1>
                <p className="text-lg text-gray-700 mb-8">
                  ZIDIOConnect bridges the gap between students seeking internships and jobs and companies looking for talented candidates.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" asChild>
                    <a href="/register">Get Started</a>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a href="/jobs">
                      Browse Jobs
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                </div>
              </div>
              <div className="flex-1">
                <div className="bg-brand-light rounded-xl p-8">
                  <img 
                    src="/placeholder.svg" 
                    alt="ZIDIOConnect Platform" 
                    className="w-full h-auto rounded-lg shadow-md" 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-brand-light text-brand-primary rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-3">Create Your Profile</h3>
                <p className="text-gray-600">
                  Sign up as a student or recruiter and build your professional profile.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-brand-light text-brand-primary rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-3">Connect and Apply</h3>
                <p className="text-gray-600">
                  Browse opportunities or post job listings depending on your role.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-brand-light text-brand-primary rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-3">Track Progress</h3>
                <p className="text-gray-600">
                  Manage applications or candidates through an intuitive dashboard.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">For Students and Recruiters</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-white p-8 rounded-lg border border-gray-200">
                <h3 className="text-2xl font-semibold mb-4 text-brand-primary">For Students</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-brand-primary mr-2">✓</span>
                    <span>Create a professional profile and upload your resume</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-primary mr-2">✓</span>
                    <span>Discover internship and job opportunities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-primary mr-2">✓</span>
                    <span>Apply with just a few clicks</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-primary mr-2">✓</span>
                    <span>Track application status in real-time</span>
                  </li>
                </ul>
                <Button className="mt-6" asChild>
                  <a href="/register">Sign Up as Student</a>
                </Button>
              </div>
              
              <div className="bg-white p-8 rounded-lg border border-gray-200">
                <h3 className="text-2xl font-semibold mb-4 text-brand-secondary">For Recruiters</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-brand-secondary mr-2">✓</span>
                    <span>Post job and internship opportunities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-secondary mr-2">✓</span>
                    <span>Review applicants and their profiles</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-secondary mr-2">✓</span>
                    <span>Manage the hiring process efficiently</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-secondary mr-2">✓</span>
                    <span>Connect with talented students</span>
                  </li>
                </ul>
                <Button className="mt-6" variant="secondary" asChild>
                  <a href="/register">Sign Up as Recruiter</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;

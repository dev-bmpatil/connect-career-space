import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Users, Briefcase, TrendingUp, Star, CheckCircle, Mail, Phone, MapPin } from "lucide-react";

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

  const features = [
    {
      icon: Users,
      title: "Smart Matching",
      description: "Our AI-powered system matches students with the perfect opportunities based on skills, interests, and career goals."
    },
    {
      icon: Briefcase,
      title: "Verified Companies",
      description: "All companies on our platform are thoroughly vetted to ensure legitimate and quality opportunities for students."
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Track your progress, build your portfolio, and get mentorship to accelerate your career development."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Computer Science Student",
      company: "Stanford University",
      image: "/placeholder.svg",
      quote: "ZIDIOConnect helped me land my dream internship at a top tech company. The platform made the application process so much easier!"
    },
    {
      name: "Michael Chen",
      role: "HR Manager",
      company: "TechCorp Inc.",
      image: "/placeholder.svg",
      quote: "We've found amazing talent through ZIDIOConnect. The quality of candidates is exceptional and the platform is user-friendly."
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Student",
      company: "UCLA",
      image: "/placeholder.svg",
      quote: "The career guidance and mentorship I received through ZIDIOConnect was invaluable in shaping my career path."
    }
  ];

  const stats = [
    { number: "10,000+", label: "Active Students" },
    { number: "500+", label: "Partner Companies" },
    { number: "95%", label: "Success Rate" },
    { number: "50+", label: "Universities" }
  ];

  const faqs = [
    {
      question: "How do I get started as a student?",
      answer: "Simply create your profile, upload your resume, and start browsing opportunities. Our matching algorithm will also suggest relevant positions based on your skills and interests."
    },
    {
      question: "Is ZIDIOConnect free for students?",
      answer: "Yes! ZIDIOConnect is completely free for students. We believe in making career opportunities accessible to everyone."
    },
    {
      question: "How do companies post jobs?",
      answer: "Companies can create a recruiter account and post job listings. We offer various packages to help companies find the best talent."
    },
    {
      question: "What types of opportunities are available?",
      answer: "We offer internships, part-time jobs, full-time entry-level positions, and project-based work across various industries."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 md:py-32 px-4 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
                Connect Your Future with
                <span className="text-blue-600"> Dream Opportunities</span>
              </h1>
              <p className="text-xl text-gray-700 mb-8 max-w-2xl">
                ZIDIOConnect is the premier platform bridging the gap between ambitious students and innovative companies. Start your career journey today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="text-lg px-8 py-4" asChild>
                  <a href="/register">Get Started Free</a>
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-4" asChild>
                  <a href="/jobs">
                    Browse Opportunities
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>
            <div className="flex-1">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Students collaborating" 
                  className="w-full h-auto rounded-2xl shadow-2xl" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose ZIDIOConnect?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We've built the most comprehensive platform to help students and employers connect meaningfully.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* For Students & Recruiters */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Built for Everyone</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="p-8 border-2 border-blue-200 hover:border-blue-400 transition-colors">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-600 mb-4">For Students</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <CheckCircle className="text-blue-600 mr-3 mt-1 flex-shrink-0" size={20} />
                    <span>Create a professional profile and showcase your skills</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-blue-600 mr-3 mt-1 flex-shrink-0" size={20} />
                    <span>Get matched with relevant internships and job opportunities</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-blue-600 mr-3 mt-1 flex-shrink-0" size={20} />
                    <span>Apply with one click and track your application status</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-blue-600 mr-3 mt-1 flex-shrink-0" size={20} />
                    <span>Access career guidance and mentorship resources</span>
                  </li>
                </ul>
                <Button className="w-full" asChild>
                  <a href="/register?role=student">Join as Student</a>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="p-8 border-2 border-green-200 hover:border-green-400 transition-colors">
              <CardHeader>
                <CardTitle className="text-2xl text-green-600 mb-4">For Recruiters</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 mt-1 flex-shrink-0" size={20} />
                    <span>Post unlimited job listings and internship opportunities</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 mt-1 flex-shrink-0" size={20} />
                    <span>Access a pool of pre-screened, qualified candidates</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 mt-1 flex-shrink-0" size={20} />
                    <span>Use advanced filters to find the perfect match</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 mt-1 flex-shrink-0" size={20} />
                    <span>Streamline your hiring process with our tools</span>
                  </li>
                </ul>
                <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
                  <a href="/register?role=recruiter">Join as Recruiter</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600">Don't just take our word for it</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                      <div className="text-sm text-gray-500">{testimonial.company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Got questions? We've got answers.</p>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-3">{faq.question}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students and companies who have already found success through ZIDIOConnect.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4" asChild>
              <a href="/register">Get Started Today</a>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 text-white border-white hover:bg-white hover:text-blue-600" asChild>
              <a href="/jobs">Explore Opportunities</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="text-2xl font-bold text-white mb-4">
                ZIDIO<span className="text-blue-400">Connect</span>
              </div>
              <p className="text-gray-400 mb-6">
                Connecting students with their dream careers and helping companies find exceptional talent.
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-gray-400">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>contact@zidioconnect.com</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">For Students</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/jobs" className="hover:text-white transition-colors">Browse Jobs</a></li>
                <li><a href="/register" className="hover:text-white transition-colors">Create Profile</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Career Resources</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Resume Builder</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">For Employers</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/post-job" className="hover:text-white transition-colors">Post a Job</a></li>
                <li><a href="/register" className="hover:text-white transition-colors">Employer Signup</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Success Stories</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ZIDIOConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CombinedUser, FrontendStudent, FrontendRecruiter } from "@/types";
import { User, Edit, Briefcase, GraduationCap, Building } from "lucide-react";

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    setIsLoading(false);
  }, [user, navigate]);

  if (isLoading || !user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading profile...</p>
      </div>
    );
  }

  const renderStudentProfile = (student: FrontendStudent) => (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <h3 className="font-medium mb-2">Academic Information</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">University:</span>
              <span>{student.university || "Not specified"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Degree:</span>
              <span>{student.degree || "Not specified"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Graduation Year:</span>
              <span>{student.graduationYear || "Not specified"}</span>
            </div>
          </div>
        </div>
        <div>
          <h3 className="font-medium mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {student.skills && student.skills.length > 0 ? (
              student.skills.map((skill, index) => (
                <Badge key={index} variant="outline">{skill}</Badge>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No skills added yet</p>
            )}
          </div>
        </div>
      </div>
      {student.about && (
        <div className="mt-4">
          <h3 className="font-medium mb-2">About</h3>
          <p className="text-gray-600">{student.about}</p>
        </div>
      )}
    </>
  );

  const renderRecruiterProfile = (recruiter: FrontendRecruiter) => (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex justify-between">
          <span className="text-gray-500">Company:</span>
          <span>{recruiter.company || "Not specified"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Position:</span>
          <span>{recruiter.position || "Not specified"}</span>
        </div>
      </div>
      {recruiter.about && (
        <div>
          <h3 className="font-medium mb-2">About</h3>
          <p className="text-gray-600">{recruiter.about}</p>
        </div>
      )}
    </div>
  );

  const renderAdminProfile = () => (
    <div>
      <p className="text-gray-600">Administrator account with full system access.</p>
    </div>
  );

  const getRoleIcon = () => {
    switch (user.role) {
      case "student":
        return <GraduationCap className="h-5 w-5" />;
      case "recruiter":
        return <Building className="h-5 w-5" />;
      case "admin":
        return <User className="h-5 w-5" />;
      default:
        return <User className="h-5 w-5" />;
    }
  };

  const displayName = user.name || `${user.first_name} ${user.last_name}`.trim() || user.email;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 bg-brand-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {displayName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <CardTitle className="text-2xl">{displayName}</CardTitle>
                  <CardDescription className="flex items-center space-x-2">
                    {getRoleIcon()}
                    <span className="capitalize">{user.role}</span>
                  </CardDescription>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
              <Button onClick={() => navigate("/edit-profile")}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {user.role === "student" && renderStudentProfile(user as FrontendStudent)}
            {user.role === "recruiter" && renderRecruiterProfile(user as FrontendRecruiter)}
            {user.role === "admin" && renderAdminProfile()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;


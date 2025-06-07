
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Student, Recruiter } from "@/types";
import { Save, X, Plus } from "lucide-react";
import { toast } from "sonner";

const EditProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<any>({});
  const [newSkill, setNewSkill] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    setFormData({ ...user });
    setIsLoading(false);
  }, [user, navigate]);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addSkill = () => {
    if (newSkill.trim() && user?.role === "student") {
      const currentSkills = formData.skills || [];
      if (!currentSkills.includes(newSkill.trim())) {
        setFormData(prev => ({
          ...prev,
          skills: [...currentSkills, newSkill.trim()]
        }));
        setNewSkill("");
      }
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((skill: string) => skill !== skillToRemove)
    }));
  };

  const handleSave = () => {
    // In a real app, this would update the user in the backend
    toast.success("Profile updated successfully!");
    navigate("/profile");
  };

  if (isLoading || !user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name || ""}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email || ""}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>
            </div>

            {user.role === "student" && (
              <>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="university">University</Label>
                    <Input
                      id="university"
                      value={formData.university || ""}
                      onChange={(e) => handleInputChange("university", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="degree">Degree</Label>
                    <Input
                      id="degree"
                      value={formData.degree || ""}
                      onChange={(e) => handleInputChange("degree", e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="graduationYear">Graduation Year</Label>
                  <Input
                    id="graduationYear"
                    type="number"
                    value={formData.graduationYear || ""}
                    onChange={(e) => handleInputChange("graduationYear", parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Skills</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.skills?.map((skill: string, index: number) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1">
                        {skill}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => removeSkill(skill)}
                        />
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a skill"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addSkill()}
                    />
                    <Button onClick={addSkill} size="icon">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}

            {user.role === "recruiter" && (
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={formData.company || ""}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    value={formData.position || ""}
                    onChange={(e) => handleInputChange("position", e.target.value)}
                  />
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="about">About</Label>
              <Textarea
                id="about"
                value={formData.about || ""}
                onChange={(e) => handleInputChange("about", e.target.value)}
                rows={4}
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={() => navigate("/profile")}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditProfile;

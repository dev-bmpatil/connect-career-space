
import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LayoutDashboard, Users, Briefcase, UserRound } from "lucide-react";

// Mock data for admin dashboard
const mockUsers = [
  { id: "u1", name: "John Student", email: "student@example.com", role: "student", status: "active", joined: "2023-04-01" },
  { id: "u2", name: "Jane Recruiter", email: "recruiter@example.com", role: "recruiter", status: "active", joined: "2023-04-10" },
  { id: "u3", name: "Alice Johnson", email: "alice@example.com", role: "student", status: "active", joined: "2023-04-15" },
  { id: "u4", name: "Bob Smith", email: "bob@example.com", role: "recruiter", status: "pending", joined: "2023-05-01" },
  { id: "u5", name: "Emma Davis", email: "emma@example.com", role: "student", status: "inactive", joined: "2023-03-20" },
];

const mockJobStats = {
  total: 42,
  active: 28,
  closed: 14,
  categories: [
    { name: "Engineering", count: 15 },
    { name: "Design", count: 9 },
    { name: "Marketing", count: 8 },
    { name: "Finance", count: 6 },
    { name: "Other", count: 4 },
  ]
};

const AdminDashboard = () => {
  const { user } = useAuth();

  // Status color mapping
  const getUserStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-jobs-new text-white";
      case "pending":
        return "bg-jobs-pending text-black";
      case "inactive":
        return "bg-jobs-deadline text-white";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-500 mt-1">Manage users, jobs, and system statistics</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <Button>Generate Report</Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-brand-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockUsers.length}</div>
              <p className="text-xs text-muted-foreground">
                +2 from last week
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
              <Briefcase className="h-4 w-4 text-brand-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockJobStats.total}</div>
              <p className="text-xs text-muted-foreground">
                {mockJobStats.active} active, {mockJobStats.closed} closed
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Students</CardTitle>
              <UserRound className="h-4 w-4 text-brand-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockUsers.filter(u => u.role === 'student').length}
              </div>
              <p className="text-xs text-muted-foreground">
                {mockUsers.filter(u => u.role === 'student' && u.status === 'active').length} active users
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recruiters</CardTitle>
              <UserRound className="h-4 w-4 text-jobs-new" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockUsers.filter(u => u.role === 'recruiter').length}
              </div>
              <p className="text-xs text-muted-foreground">
                {mockUsers.filter(u => u.role === 'recruiter' && u.status === 'active').length} active recruiters
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="users" className="space-y-4">
          <TabsList>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  View and manage all users in the system.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 bg-gray-50 p-3 text-xs font-medium text-gray-500">
                    <div className="col-span-3">Name</div>
                    <div className="col-span-3">Email</div>
                    <div className="col-span-2">Role</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-2">Actions</div>
                  </div>
                  {mockUsers.map((user) => (
                    <div key={user.id} className="grid grid-cols-12 border-t p-3 text-sm">
                      <div className="col-span-3 font-medium">{user.name}</div>
                      <div className="col-span-3 text-gray-700">{user.email}</div>
                      <div className="col-span-2 text-gray-700 capitalize">{user.role}</div>
                      <div className="col-span-2">
                        <Badge className={getUserStatusColor(user.status)}>
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="col-span-2 flex gap-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        {user.status === "active" ? (
                          <Button variant="destructive" size="sm">Block</Button>
                        ) : (
                          <Button variant="outline" size="sm">Activate</Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Previous</Button>
                <Button variant="outline">Next</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="jobs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Job Categories Distribution</CardTitle>
                <CardDescription>
                  Overview of job postings by category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockJobStats.categories.map((category) => (
                    <div key={category.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{category.name}</span>
                        <span className="text-sm text-gray-500">{category.count} jobs</span>
                      </div>
                      <Progress value={(category.count / mockJobStats.total) * 100} />
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View All Jobs</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>System Analytics</CardTitle>
                <CardDescription>
                  Platform usage and performance metrics
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-2">User Registration Trends</h3>
                  <div className="h-[200px] bg-gray-100 rounded flex items-center justify-center">
                    <p className="text-gray-500">Chart placeholder - Analytics data visualization</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Job Application Analytics</h3>
                  <div className="h-[200px] bg-gray-100 rounded flex items-center justify-center">
                    <p className="text-gray-500">Chart placeholder - Job application statistics</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>Export Data</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;

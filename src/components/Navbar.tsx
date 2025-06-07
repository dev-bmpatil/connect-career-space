
import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, User, LogOut, Settings, Briefcase, Users, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const getDashboardPath = () => {
    switch (user?.role) {
      case "student":
        return "/student-dashboard";
      case "recruiter":
        return "/recruiter-dashboard";
      case "admin":
        return "/admin-dashboard";
      default:
        return "/";
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="text-2xl font-bold text-brand-primary">
                ZIDIO<span className="text-brand-secondary">Connect</span>
              </div>
            </Link>
            
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className="border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300 px-3 py-2 text-sm font-medium">
                Home
              </Link>
              <Link to="/jobs" className="border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300 px-3 py-2 text-sm font-medium">
                Jobs
              </Link>
              {user && (
                <Link to={getDashboardPath()} className="border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300 px-3 py-2 text-sm font-medium">
                  Dashboard
                </Link>
              )}
              {user?.role === "recruiter" && (
                <Link to="/post-job" className="border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300 px-3 py-2 text-sm font-medium">
                  Post a Job
                </Link>
              )}
            </div>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground capitalize">
                        {user.role}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleNavigation(getDashboardPath())}>
                    <Briefcase className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleNavigation("/profile")}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  {user.role === "recruiter" && (
                    <DropdownMenuItem onClick={() => handleNavigation("/post-job")}>
                      <Plus className="mr-2 h-4 w-4" />
                      <span>Post Job</span>
                    </DropdownMenuItem>
                  )}
                  {user.role === "admin" && (
                    <DropdownMenuItem onClick={() => handleNavigation("/admin-dashboard")}>
                      <Users className="mr-2 h-4 w-4" />
                      <span>Admin Panel</span>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex space-x-2">
                <Button variant="outline" asChild>
                  <Link to="/login">Log in</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">Sign up</Link>
                </Button>
              </div>
            )}
          </div>
          
          <div className="-mr-2 flex items-center sm:hidden">
            <Button variant="ghost" onClick={toggleMobileMenu} size="icon">
              <Menu />
            </Button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link to="/" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50" onClick={toggleMobileMenu}>
              Home
            </Link>
            <Link to="/jobs" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50" onClick={toggleMobileMenu}>
              Jobs
            </Link>
            {user && (
              <Link to={getDashboardPath()} className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50" onClick={toggleMobileMenu}>
                Dashboard
              </Link>
            )}
            {user?.role === "recruiter" && (
              <Link to="/post-job" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50" onClick={toggleMobileMenu}>
                Post a Job
              </Link>
            )}
          </div>
          
          {user ? (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <Avatar>
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{user.name}</div>
                  <div className="text-sm font-medium text-gray-500">{user.email}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <button onClick={() => handleNavigation("/profile")} className="w-full text-left block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50">
                  Your Profile
                </button>
                <button onClick={() => { logout(); toggleMobileMenu(); }} className="w-full text-left block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50">
                  Log out
                </button>
              </div>
            </div>
          ) : (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="px-4 space-y-2">
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/login" onClick={toggleMobileMenu}>Log in</Link>
                </Button>
                <Button className="w-full" asChild>
                  <Link to="/register" onClick={toggleMobileMenu}>Sign up</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

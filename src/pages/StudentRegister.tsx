import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { GraduationCap, ArrowLeft, EyeOff, Eye } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

const departments = [
  'CSC', 'NUR', 'MCB', 'CVE', 'ME', 'MTH', 'FST', 'AEE', 'PHY', 'GPY', 'GEO', 'BOT', 'ICH', 'BCH', 'ZOO', 'STA', 'MLS', 'PH', 'ACC'
];

const StudentRegister = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
    department: "CSC", // Default to first department
    level: "",
    profilePicture: null as File | null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.username || !formData.password || !formData.name || !formData.email || !formData.level || !formData.department) {
      setError("Please fill in all fields");
      return;
    }

    const data = new FormData();
    data.append("username", formData.username);
    data.append("password", formData.password);
    data.append("role", "student");
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("department", formData.department);
    data.append("level", formData.level);
    if (formData.profilePicture) {
      data.append("profilePicture", formData.profilePicture);
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_PUBLIC_BACKEND_URL}/api/auth/register`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      const { token, _id, username, role } = response.data;
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const userData = {
        id: _id,
        username,
        role,
        name: formData.name,
        studentId: username,
        email: formData.email,
        department: formData.department,
        level: formData.level,
      };
      localStorage.setItem("oaustech_user", JSON.stringify(userData));
      await login(username, formData.password, "student");

      toast({
        title: "Registration Successful",
        description: "You are now registered",
      });
      navigate("/student-login");
    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
      setError(
        error.response?.data?.message || "Registration failed. Please try again."
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        profilePicture: e.target.files[0],
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/student-login")}
            className="mb-4 bg-transparent hover:bg-transparent text-muted-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </Button>
          <div className="flex items-center justify-center gap-3 mb-4">
            <GraduationCap className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold">OAUSTECH</h1>
              <p className="text-sm text-muted-foreground">
                Student Registration
              </p>
            </div>
          </div>
        </div>

        <Card className="shadow-xl border-2">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Student Registration</CardTitle>
            <CardDescription>
              Create an account to access your registration dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert className="mb-4 border-destructive/50 text-destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Matric No.</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="e.g., CSC/20/084"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                >
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="level">Level</Label>
                <Input
                  id="level"
                  name="level"
                  type="text"
                  placeholder="e.g., 100, 200"
                  value={formData.level}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="profilePicture">Profile Picture</Label>
                <Input
                  id="profilePicture"
                  name="profilePicture"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full py-6">
                Register
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentRegister;
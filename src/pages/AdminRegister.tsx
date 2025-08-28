import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

const AdminRegister = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Reuse login to set user after registration
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    username: '', // Admin email
    password: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.username || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_PUBLIC_BACKEND_URL}/api/auth/register`, {
        username: formData.username,
        password: formData.password,
        role: 'admin',
      });

      const { token, _id, username, role } = response.data;
      // Store token and user data
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const userData = { id: _id, username, role, name: '' };
      localStorage.setItem('oaustech_user', JSON.stringify(userData));
      await login(username, formData.password, 'admin'); // Log in after registration

      toast({
        title: "Registration Successful",
        description: "You are now registered and logged in!"
      });
      navigate('/admin-login');
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError(''); // Clear error when user starts typing
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/5 via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/admin-login')}
            className="mb-4 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Login
          </Button>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-accent" />
            <div>
              <h1 className="text-xl font-bold">OAUSTECH</h1>
              <p className="text-sm text-muted-foreground">Admin Registration</p>
            </div>
          </div>
        </div>

        <Card className="shadow-xl border-2 border-accent/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Admin Registration</CardTitle>
            <CardDescription>
              Create an admin account to manage student registrations
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
                <Label htmlFor="username">Admin Email</Label>
                <Input
                  id="username"
                  name="username"
                  type="email"
                  placeholder="admin@oaustech.edu.ng"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter admin password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>

              <Button
                type="submit"
                className="w-full py-6 bg-accent hover:bg-accent/90"
              >
                Register
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminRegister;
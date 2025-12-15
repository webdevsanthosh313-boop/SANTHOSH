import React, { useState } from 'react';
import { UserRole } from '../types';
import { Button } from '../components/ui/Button';
import { authService } from '../services/mockService';
import { User } from '../types';

interface AuthProps {
  onLogin: (user: User) => void;
}

export const Login: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.STUDENT);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login based on role for demo purposes
    try {
      let email = '';
      if (selectedRole === UserRole.STUDENT) email = 'alex@student.edu';
      if (selectedRole === UserRole.TEACHER) email = 'sarah@teacher.edu';
      if (selectedRole === UserRole.ADMIN) email = 'admin@edutrack.edu';

      const user = await authService.login(email, selectedRole);
      if (user) {
        onLogin(user);
      } else {
        alert('Login failed. Please try again.');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center text-white text-3xl font-bold shadow-lg">ET</div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-900">
          Sign in to EduTrack
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Choose your role to view the demo dashboard
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleLogin}>
            
            <div>
              <label className="block text-sm font-medium text-slate-700">Select Role</label>
              <div className="mt-2 grid grid-cols-3 gap-3">
                {[UserRole.STUDENT, UserRole.TEACHER, UserRole.ADMIN].map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setSelectedRole(role)}
                    className={`flex items-center justify-center px-3 py-2 border text-sm font-medium rounded-md focus:outline-none ${
                      selectedRole === role
                        ? 'bg-blue-600 text-white border-transparent shadow-sm'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {role.charAt(0) + role.slice(1).toLowerCase()}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  disabled
                  value={
                    selectedRole === UserRole.STUDENT ? 'alex@student.edu' :
                    selectedRole === UserRole.TEACHER ? 'sarah@teacher.edu' :
                    'admin@edutrack.edu'
                  }
                  className="block w-full appearance-none rounded-md border border-slate-300 px-3 py-2 placeholder-slate-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm bg-slate-100 text-slate-500 cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  defaultValue="password"
                  className="block w-full appearance-none rounded-md border border-slate-300 px-3 py-2 placeholder-slate-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <Button type="submit" className="w-full" isLoading={isLoading}>
              Sign In
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-slate-500">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <Button type="button" variant="secondary" className="w-full">
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.53-6.033-5.655  c0-3.124,2.701-5.654,6.033-5.654c1.47,0,2.833,0.489,3.935,1.296l2.844-2.844C17.485,3.652,15.155,2.695,12.545,2.695  C7.265,2.695,2.986,6.726,2.986,11.702c0,4.976,4.279,9.007,9.559,9.007c4.661,0,8.711-3.235,9.52-7.854h-9.52V10.239z" />
                </svg>
                Google
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
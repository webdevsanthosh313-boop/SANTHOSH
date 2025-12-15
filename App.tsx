import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Login } from './pages/Auth';
import { StudentDashboard, StudentNotes, StudentAttendance } from './pages/student/StudentViews';
import { TeacherDashboard, TeacherClasses } from './pages/teacher/TeacherViews';
import { AdminDashboard } from './pages/admin/AdminViews';
import { User, UserRole, NavItem } from './types';
import { Home, BookOpen, Calendar, Users, Settings } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  user: User | null;
}

const ProtectedRoute = ({ children, allowedRoles, user }: ProtectedRouteProps) => {
  if (!user) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/" replace />;
  return <>{children}</>;
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  // Define navigation based on role
  const getNavItems = (role: UserRole): NavItem[] => {
    switch (role) {
      case UserRole.STUDENT:
        return [
          { label: 'Dashboard', icon: <Home />, path: '/student/dashboard' },
          { label: 'Notes', icon: <BookOpen />, path: '/student/notes' },
          { label: 'Attendance', icon: <Calendar />, path: '/student/attendance' },
          { label: 'Profile', icon: <Settings />, path: '/profile' },
        ];
      case UserRole.TEACHER:
        return [
          { label: 'Dashboard', icon: <Home />, path: '/teacher/dashboard' },
          { label: 'Classes', icon: <BookOpen />, path: '/teacher/classes' },
          { label: 'Profile', icon: <Settings />, path: '/profile' },
        ];
      case UserRole.ADMIN:
        return [
          { label: 'Dashboard', icon: <Home />, path: '/admin/dashboard' },
          { label: 'Users', icon: <Users />, path: '/admin/users' },
          { label: 'Settings', icon: <Settings />, path: '/admin/settings' },
        ];
      default:
        return [];
    }
  };

  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={!user ? <Login onLogin={setUser} /> : <Navigate to="/" replace />} />
        
        {/* Root redirect based on role */}
        <Route path="/" element={
           user ? (
             user.role === UserRole.STUDENT ? <Navigate to="/student/dashboard" replace /> :
             user.role === UserRole.TEACHER ? <Navigate to="/teacher/dashboard" replace /> :
             <Navigate to="/admin/dashboard" replace />
           ) : <Navigate to="/login" replace />
        } />

        {/* Student Routes */}
        <Route path="/student/*" element={
          <ProtectedRoute allowedRoles={[UserRole.STUDENT]} user={user}>
            <Layout user={user} onLogout={() => setUser(null)} navItems={getNavItems(UserRole.STUDENT)}>
              <Routes>
                <Route path="dashboard" element={<StudentDashboard />} />
                <Route path="notes" element={<StudentNotes />} />
                <Route path="attendance" element={<StudentAttendance />} />
              </Routes>
            </Layout>
          </ProtectedRoute>
        } />

        {/* Teacher Routes */}
        <Route path="/teacher/*" element={
          <ProtectedRoute allowedRoles={[UserRole.TEACHER]} user={user}>
            <Layout user={user} onLogout={() => setUser(null)} navItems={getNavItems(UserRole.TEACHER)}>
               <Routes>
                <Route path="dashboard" element={<TeacherDashboard />} />
                <Route path="classes" element={<TeacherClasses />} />
              </Routes>
            </Layout>
          </ProtectedRoute>
        } />

        {/* Admin Routes */}
        <Route path="/admin/*" element={
          <ProtectedRoute allowedRoles={[UserRole.ADMIN]} user={user}>
            <Layout user={user} onLogout={() => setUser(null)} navItems={getNavItems(UserRole.ADMIN)}>
               <Routes>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="users" element={<div className="p-4">User Management Placeholder</div>} />
              </Routes>
            </Layout>
          </ProtectedRoute>
        } />

        {/* Universal Profile Route */}
        <Route path="/profile" element={
          user ? (
            <Layout user={user} onLogout={() => setUser(null)} navItems={getNavItems(user.role)}>
               <div className="max-w-xl mx-auto">
                 <div className="bg-white shadow rounded-lg p-6">
                   <h2 className="text-xl font-bold mb-4">Profile Settings</h2>
                   <div className="space-y-4">
                     <div>
                       <label className="block text-sm font-medium text-slate-700">Full Name</label>
                       <input type="text" value={user.name} disabled className="mt-1 block w-full rounded-md border-slate-300 shadow-sm bg-slate-50 px-3 py-2" />
                     </div>
                     <div>
                       <label className="block text-sm font-medium text-slate-700">Email</label>
                       <input type="text" value={user.email} disabled className="mt-1 block w-full rounded-md border-slate-300 shadow-sm bg-slate-50 px-3 py-2" />
                     </div>
                     <div>
                       <label className="block text-sm font-medium text-slate-700">Role</label>
                       <input type="text" value={user.role} disabled className="mt-1 block w-full rounded-md border-slate-300 shadow-sm bg-slate-50 px-3 py-2" />
                     </div>
                   </div>
                 </div>
               </div>
            </Layout>
          ) : <Navigate to="/login" />
        } />

      </Routes>
    </HashRouter>
  );
};

export default App;
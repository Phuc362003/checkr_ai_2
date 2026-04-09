import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Onboarding from '@/pages/Onboarding';
import Profile from '@/pages/Profile';
import SavedJobs from '@/pages/SavedJobs';
import AppliedJobs from '@/pages/AppliedJobs';
import FollowedBusinesses from '@/pages/FollowedBusinesses';
import Contact from '@/pages/Contact';
import JobDetails from '@/pages/JobDetails';
import EKYC from '@/pages/EKYC';

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/onboarding" element={!user ? <Onboarding /> : <Navigate to="/" />} />
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
      
      <Route element={<Layout />}>
        <Route path="/" element={user ? <Home /> : <Navigate to="/onboarding" />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/ekyc" element={user ? <EKYC /> : <Navigate to="/login" />} />
        <Route path="/saved-jobs" element={user ? <SavedJobs /> : <Navigate to="/login" />} />
        <Route path="/applied-jobs" element={user ? <AppliedJobs /> : <Navigate to="/login" />} />
        <Route path="/followed-businesses" element={user ? <FollowedBusinesses /> : <Navigate to="/login" />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-slate-50 font-sans antialiased">
          <AppRoutes />
          <Toaster position="top-center" />
        </div>
      </Router>
    </AuthProvider>
  );
}

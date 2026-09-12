import { Routes, Route } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import AdminLayout from "@/layouts/AdminLayout";

import Home from "@/pages/Home";
import ExploreWebsites from "@/pages/ExploreWebsites";
import WebsiteDetails from "@/pages/WebsiteDetails";
import SellWebsite from "@/pages/SellWebsite";
import HowItWorks from "@/pages/HowItWorks";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

import Dashboard from "@/pages/Dashboard";
import MyWebsites from "@/pages/MyWebsites";
import EditWebsite from "@/pages/EditWebsite";
import Profile from "@/pages/Profile";

import AdminDashboard from "@/pages/AdminDashboard";
import AdminUsers from "@/pages/AdminUsers";
import AdminWebsites from "@/pages/AdminWebsites";

export default function App() {
  return (
    <Routes>
      {/* Public pages */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<ExploreWebsites />} />
        <Route path="/website/:id" element={<WebsiteDetails />} />
        <Route path="/sell" element={<SellWebsite />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Dashboard pages */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/websites" element={<MyWebsites />} />
        <Route path="/dashboard/websites/edit/:id" element={<EditWebsite />} />
        <Route path="/dashboard/profile" element={<Profile />} />
      </Route>

      {/* Admin pages */}
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/websites" element={<AdminWebsites />} />
      </Route>
    </Routes>
  );
}

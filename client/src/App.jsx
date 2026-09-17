import { Routes, Route } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import AdminLayout from "@/layouts/AdminLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminRoute from "@/components/AdminRoute";

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
import PurchaseRequests from "@/pages/PurchaseRequests";
import RequestDetails from "@/pages/RequestDetails";

import AdminDashboard from "@/pages/AdminDashboard";
import AdminUsers from "@/pages/AdminUsers";
import AdminWebsites from "@/pages/AdminWebsites";
import AdminRequests from "@/pages/AdminRequests";
import AdminTransactions from "@/pages/AdminTransactions";

export default function App() {
  return (
    <Routes>
      {/* Public pages */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<ExploreWebsites />} />
        <Route path="/website/:id" element={<WebsiteDetails />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/sell" element={<SellWebsite />} />
        </Route>
      </Route>

      {/* Dashboard pages */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/websites" element={<MyWebsites />} />
          <Route path="/dashboard/websites/edit/:id" element={<EditWebsite />} />
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/dashboard/requests" element={<PurchaseRequests />} />
          <Route path="/dashboard/requests/received" element={<PurchaseRequests received />} />
          <Route path="/dashboard/requests/:id" element={<RequestDetails />} />
        </Route>
      </Route>

      {/* Admin pages */}
      <Route element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/websites" element={<AdminWebsites />} />
          <Route path="/admin/requests" element={<AdminRequests />} />
          <Route path="/admin/transactions" element={<AdminTransactions />} />
        </Route>
      </Route>
    </Routes>
  );
}

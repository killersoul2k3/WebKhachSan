import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RoomTypesPage from './pages/RoomTypesPage';
import RoomDetailsPage from './pages/RoomDetailsPage';
import TransactionPage from './pages/TransactionPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/Admin/DashboardPage';
import RoomManagementPage from './pages/Admin/RoomManagementPage';
import BookingManagementPage from './pages/Admin/BookingManagementPage';
import CustomerManagementPage from './pages/Admin/CustomerManagementPage';
import InvoicePaymentManagementPage from './pages/Admin/InvoicePaymentManagementPage';
import ServiceManagementPage from './pages/Admin/ServiceManagementPage';
import UserRoleManagementPage from './pages/Admin/UserRoleManagementPage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/rooms" element={<RoomTypesPage />} />
        <Route path="/rooms/:id" element={<RoomDetailsPage />} />
        <Route path="/transaction" element={<TransactionPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/admin" element={<AdminDashboardPage />}>
          <Route index element={<DashboardPage />} /> {/* Default route for /admin */}
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="rooms" element={<RoomManagementPage />} />
          <Route path="bookings" element={<BookingManagementPage />} />
          <Route path="customers" element={<CustomerManagementPage />} />
          <Route path="invoices" element={<InvoicePaymentManagementPage />} />
          <Route path="services" element={<ServiceManagementPage />} />
          <Route path="users" element={<UserRoleManagementPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

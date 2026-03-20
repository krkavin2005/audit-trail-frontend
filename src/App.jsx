
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import DashboardLayout from './layout/DashboardLayout';
import Document from './pages/Document';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import AuditPage from './pages/AuditPage';
import Reports from './pages/Reports';
import Users from './pages/Users';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path='/documents' element={
          <ProtectedRoute>
            <DashboardLayout>
              <Document />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path='/audit' element={
          <ProtectedRoute>
            <DashboardLayout>
              <AuditPage />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path='/reports' element={
          <ProtectedRoute>
            <DashboardLayout>
              <Reports />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path='/users' element={
          <ProtectedRoute>
            <DashboardLayout>
              <Users />
            </DashboardLayout>
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App;


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
import { useState } from 'react';
import { getDoc } from './api/docApi';

function App() {
  const [selectedDocument, setSelectedDocument] = useState(null);
  const handleView = async (e, doc) => {
        e.stopPropagation();
        const res = await getDoc(doc.documentId);
        const url = window.URL.createObjectURL(res.data);
        window.open(url, "_blank");
        window.URL.revokeObjectURL(url);
    }
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <DashboardLayout>
              <Dashboard selectedDocument={selectedDocument} setSelectedDocument={setSelectedDocument} handleView={handleView}/>
            </DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path='/documents' element={
          <ProtectedRoute>
            <DashboardLayout>
              <Document selectedDocument={selectedDocument} setSelectedDocument={setSelectedDocument} handleView={handleView}/>
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

import React from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Navigate 
} from 'react-router-dom';
import { AppThemeProvider } from './AppTheme';
import { UserContextProvider } from './context/UserContext';
import MainLayout from './components/MainLayout/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy load components for better performance
const LoginPage = React.lazy(() => import('./components/LoginPage'));
const RegisterPage = React.lazy(() => import('./components/RegisterPage'));
const HomePage = React.lazy(() => import('./components/HomePage'));
const ServiceCatalog = React.lazy(() => import('./components/ServiceCatalog/ServiceCatalog'));
const ServicesTasksManager = React.lazy(() => import('./components/ServicesTasksManager/ServicesTasksManager'));
const WavesAndTracks = React.lazy(() => import('./components/WavesAndTracks/WavesAndTracks'));
const TransitionPlan = React.lazy(() => import('./components/TransitionPlan/TransitionPlan'));

function App() {
  return (
    <AppThemeProvider>
      <UserContextProvider>
        <Router>
          <React.Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {/* Authentication Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              {/* Protected routes with MainLayout */}
              <Route 
                path="/home" 
                element={
                  <ProtectedRoute>
                    <MainLayout>
                      <HomePage />
                    </MainLayout>
                  </ProtectedRoute>
                } 
              />

              <Route 
                path="/service-task" 
                element={
                  <ProtectedRoute>
                    <MainLayout>
                      <ServicesTasksManager />
                    </MainLayout>
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/service-catalog" 
                element={
                  <ProtectedRoute>
                    <MainLayout>
                      <ServiceCatalog />
                    </MainLayout>
                  </ProtectedRoute>
                } 
              />

              <Route 
                path="/waves-tracks" 
                element={
                  <ProtectedRoute>
                    <MainLayout>
                      <WavesAndTracks />
                    </MainLayout>
                  </ProtectedRoute>
                } 
              />

              <Route 
                path="/transition-plan" 
                element={
                  <ProtectedRoute>
                    <MainLayout>
                      <TransitionPlan />
                    </MainLayout>
                  </ProtectedRoute>
                } 
              />
              
              {/* Default Route - Redirect to Login */}
              <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
          </React.Suspense>
        </Router>
      </UserContextProvider>
    </AppThemeProvider>
  );
}

export default App;
import React from 'react'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import { useStore } from './store/useStore'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Home from './pages/Home'
import Progress from './pages/Progress'
import Community from './pages/Community'
import Achievements from './pages/Achievements'
import CheckIn from './pages/CheckIn'
import Profile from './pages/Profile'
import BottomNav from './components/layout/BottomNav'
import PageTransition from './components/layout/PageTransition'

const Layout = () => {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary font-body pb-24">
      <PageTransition>
        <Outlet />
      </PageTransition>
      <BottomNav />
    </div>
  )
}

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useStore()
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />
}

function App() {
  useAuth() // Initialize auth listener

  return (
    <div className="bg-black min-h-screen flex justify-center">
      <div className="w-full max-w-[430px] bg-bg-primary relative overflow-hidden shadow-2xl">
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route path="/" element={<Home />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/community" element={<Community />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/checkin" element={<CheckIn />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App

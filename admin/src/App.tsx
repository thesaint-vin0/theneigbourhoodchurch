import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute, RoleRoute } from './components/ProtectedRoute'
import { Layout } from './components/Layout'
import type { ReactNode } from 'react'
import { type Permission } from './lib/rbac'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Sermons from './pages/Sermons'
import Events from './pages/Events'
import Gallery from './pages/Gallery'
import Media from './pages/Media'
import Forms from './pages/Forms'
import Giving from './pages/Giving'
import Settings from './pages/Settings'
import AdminManagement from './pages/AdminManagement'
import Account from './pages/Account'
import Pastors from './pages/Pastors'
import HomeContent from './pages/HomeContent'

function Page({ permission, children }: { permission: Permission; children: ReactNode }) {
  return <RoleRoute permission={permission}>{children}</RoleRoute>
}

export default function App(){
  return <AuthProvider><BrowserRouter><Routes>
    <Route path="/login" element={<Login/>}/>
    <Route element={<ProtectedRoute><Layout/></ProtectedRoute>}>
      <Route path="/" element={<Page permission="dashboard"><Dashboard/></Page>}/>
      <Route path="/sermons" element={<Page permission="sermons"><Sermons/></Page>}/>
      <Route path="/events" element={<Page permission="events"><Events/></Page>}/>
      <Route path="/gallery" element={<Page permission="gallery"><Gallery/></Page>}/>
      <Route path="/media" element={<Page permission="media"><Media/></Page>}/>
      <Route path="/forms" element={<Page permission="forms"><Forms/></Page>}/>
      <Route path="/giving" element={<Page permission="giving"><Giving/></Page>}/>
      <Route path="/admin-management" element={<Page permission="admin-management"><AdminManagement/></Page>}/>
      <Route path="/settings" element={<Page permission="settings"><Settings/></Page>}/>
      <Route path="/account" element={<Page permission="account"><Account/></Page>}/>
      <Route path="/pastors" element={<Page permission="pastors"><Pastors/></Page>}/>
      <Route path="/home-content" element={<Page permission="home-content"><HomeContent/></Page>}/>
    </Route>
  </Routes></BrowserRouter></AuthProvider>
}

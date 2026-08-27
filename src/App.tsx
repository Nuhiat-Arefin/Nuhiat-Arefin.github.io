import { Navigate, Route, Routes } from 'react-router'
import Home from './pages/Home'
import BlogPost from './pages/BlogPost'
import GsocWorkProduct from './pages/GsocWorkProduct'
import ProjectDetail from './pages/ProjectDetail'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/blog/gsoc-2026-regolith-xdg-portal"
        element={<Navigate to="/blog/gsoc-2026-xdg-desktop-portals" replace />}
      />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="/projects/:slug" element={<ProjectDetail />} />
      <Route path="/gsoc-2026" element={<GsocWorkProduct />} />
    </Routes>
  )
}

//react router dom
import { Routes, Route } from "react-router-dom"

//pages comp
import { Home } from "./pages/Home"
import { MainLayout } from "./components/MainLayout"
import { Dashboard } from "./pages/dashboard/Dashboard"
import { DashLayout } from "./components/DashLayout"


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={
          <MainLayout>
            <Home />
          </MainLayout>
        }></Route>
        <Route path="/dashboard" element={
          <DashLayout>
            <Dashboard />
          </DashLayout>
        }></Route>        
      </Routes>
    </>
  )
}

export default App

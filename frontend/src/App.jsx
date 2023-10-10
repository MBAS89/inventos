//react router dom
import { Routes, Route } from "react-router-dom"

//pages comp
import { Home } from "./pages/Home"
import { MainLayout } from "./components/MainLayout"
import { Dashboard } from "./pages/dashboard/Dashboard"
import { DashLayout } from "./components/DashLayout"
import { Casher } from "./pages/dashboard/Casher"
import { Inventory } from "./pages/dashboard/Inventory"
import { Customers } from "./pages/dashboard/Customers"


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
        <Route path="/dashboard/casher" element={
          <DashLayout>
            <Casher />
          </DashLayout>
        }></Route>  
        <Route path="/dashboard/inventory" element={
          <DashLayout>
            <Inventory />
          </DashLayout>
        }></Route>    
        <Route path="/dashboard/customers" element={
          <DashLayout>
            <Customers />
          </DashLayout>
        }></Route>  
      </Routes>
    </>
  )
}

export default App

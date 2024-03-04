//react router dom
import { Routes, Route } from "react-router-dom"

//pages comp
import { Home } from "./pages/Home"
import { MainLayout } from "./components/MainLayout"
import { Dashboard } from "./pages/dashboard/Dashboard"
import { DashLayout } from "./components/DashLayout"
import { Casher } from "./pages/dashboard/Casher"
import { Customers } from "./pages/dashboard/customers/Customers"
import { Suppliers } from "./pages/dashboard/suppliers/Suppliers"
import { Employees } from "./pages/dashboard/employees/Employees"
import { Expenses } from "./pages/dashboard/Expenses"
import { Invoices } from "./pages/dashboard/Invoices"
import { Categories } from "./components/inventory/Categories"
import { Brands } from "./components/inventory/Brands"
import { Products } from "./components/inventory/Products"
import { SingleCustomers } from "./pages/dashboard/customers/SingleCustomers"
import { SingleSuppliers } from "./pages/dashboard/suppliers/SingleSuppliers"
import { EmployeeInformation } from "./pages/dashboard/employees/EmployeeInformation"
import { Inventory } from "./pages/dashboard/inventory/Inventory"
import { SingleProduct } from "./pages/dashboard/inventory/SingleProduct"
import { SingleCategory } from "./pages/dashboard/inventory/SingleCategory"
import { SingleBrand } from "./pages/dashboard/inventory/SingleBrand"
import { StoreLogin } from "./pages/auth/StoreLogin"
import { StoreRegister } from "./pages/auth/StoreRegister"

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SettingsHome } from "./pages/dashboard/settings/Settings"
import { SettingsLayout } from "./components/settings/SettingsLayout"
import { Permissions } from "./pages/dashboard/settings/Permissions"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={
          <MainLayout>
            <Home />
          </MainLayout>
        }></Route>
        <Route path="/auth/login" element={
          <MainLayout>
            <StoreLogin />
          </MainLayout>
        }></Route>
        <Route path="/auth/register" element={
          <MainLayout>
            <StoreRegister />
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
            <Inventory/>
          </DashLayout>
        }>
          <Route index element={< Products/>}/>
          <Route path="products" element={< Products/>}/>
          <Route path="categories" element={<Categories/>}/>
          <Route path="brands" element={<Brands/>}/>
        </Route> 
        <Route path="/dashboard/inventory/single-product" element={<SingleProduct />}></Route>
        <Route path="/dashboard/inventory/single-category/:categoryId" element={<SingleCategory />}></Route>
        <Route path="/dashboard/inventory/single-brand/:brandId" element={<SingleBrand />}></Route>
        <Route path="/dashboard/customers" element={
          <DashLayout>
            <Customers />
          </DashLayout>
        }></Route>  
        <Route path="/dashboard/customers/single-customer/:customerId" element={<SingleCustomers />}></Route>
        <Route path="/dashboard/suppliers" element={
          <DashLayout>
            <Suppliers />
          </DashLayout>
        }></Route>
        <Route path="/dashboard/suppliers/single-supplier" element={<SingleSuppliers />}></Route>
        <Route path="/dashboard/employees" element={
          <DashLayout>
            <Employees />
          </DashLayout>
        }></Route>
        <Route path="/dashboard/employees/employee-information/:employeeId" element={
          <DashLayout>
            <EmployeeInformation />
          </DashLayout>
        }></Route>
        <Route path="/dashboard/expenses" element={
          <DashLayout>
            <Expenses />
          </DashLayout>
        }></Route>
        <Route path="/dashboard/invoices" element={
          <DashLayout>
            <Invoices/>
          </DashLayout>
        }></Route>
        <Route path="/dashboard/settings/permissions" element={
          <DashLayout>
            <SettingsLayout>
              <Permissions />
            </SettingsLayout>
          </DashLayout>
        }></Route>
        <Route path="/dashboard/settings" element={
          <DashLayout>
            <SettingsLayout>
              <SettingsHome />
            </SettingsLayout>
          </DashLayout>
        }>
        </Route>
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default App

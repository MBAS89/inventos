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
import { Expenses } from "./pages/dashboard/expenses/Expenses"
import { Invoices } from "./pages/dashboard/invoices/Invoices"
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
import { InnerInvoices } from "./components/Invoices/InnerInvoices"
import { OuterInvoices } from "./components/Invoices/OuterInvoices"
import { InvoiceInfoPage } from "./pages/dashboard/invoices/InvoiceInfoPage"
import { CustomersSettings } from "./pages/dashboard/settings/CustomersSettings"
import { SuppliersSettings } from "./pages/dashboard/settings/SuppliersSettings"
import { Coupons } from "./components/inventory/Coupons"
import { ExpensesSettings } from "./pages/dashboard/settings/ExpensesSettings"
import { SingleExpense } from "./pages/dashboard/expenses/SingleExpense"
import { AdminLayout } from "./components/admin/AdminLayout"
import { Admin } from "./pages/admin/Admin"
import { Stores } from "./pages/admin/stores/Stores"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={
          <MainLayout>
            <Home />
          </MainLayout>
        }></Route>
        <Route path="/admin" element={
          <AdminLayout>
            <Admin />
          </AdminLayout>
        }></Route>
        <Route path="/admin/stores" element={
          <AdminLayout>
            <Stores />
          </AdminLayout>
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
          <Route path="coupons" element={<Coupons/>}/>
        </Route> 
        <Route path="/dashboard/inventory/single-product/:productId" element={<SingleProduct />}></Route>
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
        <Route path="/dashboard/suppliers/single-supplier/:supplierId" element={<SingleSuppliers />}></Route>
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
        <Route path="/dashboard/expenses/single-expense/:expenseId" element={<SingleExpense />}></Route>
        <Route path="/dashboard/invoices" element={
          <DashLayout>
            <Invoices/>
          </DashLayout>
        }>
          <Route index element={< InnerInvoices/>}/>
          <Route path="inner-invoices" element={< InnerInvoices/>}/>
          <Route path="outer-invoices" element={<OuterInvoices/>}/>
        </Route> 
        <Route path="/dashboard/invoices/info/:invoiceId" element={
          <DashLayout>
            <InvoiceInfoPage />
          </DashLayout>
        }></Route>
        <Route path="/dashboard/settings/permissions" element={
          <DashLayout>
            <SettingsLayout>
              <Permissions />
            </SettingsLayout>
          </DashLayout>
        }></Route>
        <Route path="/dashboard/settings/customers" element={
          <DashLayout>
            <SettingsLayout>
              <CustomersSettings />
            </SettingsLayout>
          </DashLayout>
        }></Route>
        <Route path="/dashboard/settings/suppliers" element={
          <DashLayout>
            <SettingsLayout>
              <SuppliersSettings />
            </SettingsLayout>
          </DashLayout>
        }></Route>
        <Route path="/dashboard/settings/expenses" element={
          <DashLayout>
            <SettingsLayout>
              <ExpensesSettings />
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

import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import HomePage from "../pages/user/HomePage.jsx";
import AboutPage from "../pages/user/AboutPage.jsx";
import ErrorPage from "../pages/user/ErrorPage.jsx";
import ProductsPage from "../pages/user/ProductsPage.jsx";
import ProductDetails from "../pages/user/ProductDetails.jsx";
import ContactPage from "../pages/user/ContactPage.jsx";
import TermsAndCondition from "../pages/user/TermsAndCondition.jsx";
import LoginPage from "../pages/admin/LoginPage";
import AdminLayout from "../layout/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import CustomerSupportPage from "../pages/user/CustomerSupport.jsx";
import AddProduct from "../pages/admin/AddProduct";
import ProductList from "../pages/admin/ProductsListTable.jsx";
import EditPage from "../pages/admin/EditPage.jsx";
import ProfilePage from "../pages/admin/ProfilePage.jsx";
import CategoryShowPage from "../pages/user/CategoryShowPage.jsx";
import { AdminAuth } from "./protectedRoutes/AdminAuth.jsx";
import StockAdd from "../pages/admin/StockAdd.jsx";
import InvoiceForm from "../pages/admin/InvoiceForm.jsx";
import InvoiceList from "../pages/admin/InvoiceList.jsx";
import InvoiceDetails from "../pages/admin/InvoiceDetails.jsx";
import CategoryPage from "../pages/admin/CategoryPage.jsx";

export const router=createBrowserRouter([
    {
        path: "/",
        element:<RootLayout/>,
        children:[
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/about",
                element: <AboutPage />
            },
            {
                path: "/*",
                element: <ErrorPage/>
            },
            {
                path: "/our-products",
                element:<ProductsPage />
            },
            {
                path: "/product/:id",
                element: <ProductDetails />
            },
            {
path:'/products/:name',
element:<CategoryShowPage/>
            },
            {
                path: "/contact",
                element: <ContactPage />
            },
            {
                path: "/terms&conditions",
                element: <TermsAndCondition />
            },
            {
                path: "/customer-support",
                element: <CustomerSupportPage />
            }
        ]
    },
    {
        path: "/admin/login",
        element:<LoginPage /> ,
    },
    {
        path: "/admin",
        element:<AdminAuth> <AdminLayout /></AdminAuth>,
        children: [
            {
                path: "dashboard",
                element: <AdminDashboard />
            },
            {
                path: "add-product",
                element: <AddProduct />
            },
            {
                path: "products-list",
                element: <ProductList />
            },
            {
                path: "edit-product/:id",
                element: <EditPage />
            },
            {
                path: "my-profile",
                element: <ProfilePage />
            },
            {
                path: "Stock",
                element: <StockAdd />
            },
            {
                path: "invoice",
                element: <InvoiceForm />
            },
            {
                path:"invoice/list",
                element: <InvoiceList />
            },
            {
                path: 'invoice/listid/:id',
                element:<InvoiceDetails/>
            },
            {
                path: 'category',
                element: <CategoryPage />
            }
        ]
    }
])
import DashBoardLayout from "../../Layout/DashBoardLayout";
import Main from "../../Layout/Main";
import Login from "../../Pages/AuthenticationPages/LoginPage/Login";
import Register from "../../Pages/AuthenticationPages/RegisterPage/Register";
import Blog from "../../Pages/BlogPage/Blog/Blog";
import AddProducts from "../../Pages/DashBoardPage/AddProducts/AddProducts";
import Alladmin from "../../Pages/DashBoardPage/Alladmin/Alladmin";
import AllBuyers from "../../Pages/DashBoardPage/AllBuyers/AllBuyers";
import AllSellers from "../../Pages/DashBoardPage/AllSellers/AllSellers";
import DashBoard from "../../Pages/DashBoardPage/DashBoard/DashBoard";
import MyBuyers from "../../Pages/DashBoardPage/MyBuyers/MyBuyers";
import MyOrders from "../../Pages/DashBoardPage/MyOrders/MyOrders";
import MyProducts from "../../Pages/DashBoardPage/MyProducts/MyProducts";
import Payment from "../../Pages/DashBoardPage/Payment/Payment";
import ReportedItems from "../../Pages/DashBoardPage/ReportedItems/ReportedItems";
import Home from "../../Pages/HomePage/Home/Home";
import CategoryProducts from "../../Pages/HomePage/ProductCategories/CategoryProducts/CategoryProducts";
import ErrorPage from "../../Pages/Shared/ErrorPage/ErrorPage";
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";
import SellerRoute from "../SellerRoute/SellerRoute";

const { createBrowserRouter } = require("react-router-dom");

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/category/:id',
                loader: ({ params }) =>
                    fetch(`https://truckbazar-server-side.vercel.app/category/${params.id}`,
                        {
                            headers: {
                                authorization: `bearer ${localStorage.getItem('user-token')}`
                            }
                        }
                    ),
                element: <PrivateRoutes><CategoryProducts></CategoryProducts></PrivateRoutes>
            },
            {
                path: '/blog',
                element: <Blog></Blog>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            }
        ]

    },
    {
        path: '/dashboard',
        errorElement: <ErrorPage></ErrorPage>,
        element: <PrivateRoutes><DashBoardLayout></DashBoardLayout></PrivateRoutes>,
        children: [
            {
                path: '/dashboard',
                element: <DashBoard></DashBoard>
            },
            {
                path: '/dashboard/myorders',
                element: <MyOrders></MyOrders>
            },
            {
                path: '/dashboard/payment/:id',
                loader: ({ params }) => fetch(`https://truckbazar-server-side.vercel.app/booking/${params.id}`),
                element: <Payment></Payment>
            },
            {
                path: '/dashboard/myproducts',
                element: <SellerRoute><MyProducts></MyProducts></SellerRoute>
            },
            {
                path: '/dashboard/add-products',
                element: <SellerRoute><AddProducts></AddProducts></SellerRoute>
            },
            {
                path: '/dashboard/my-buyers',
                element: <SellerRoute><MyBuyers></MyBuyers></SellerRoute>
            },
            {
                path: '/dashboard/all-sellers',
                element: <AdminRoute><AllSellers></AllSellers></AdminRoute>
            },
            {
                path: '/dashboard/all-buyers',
                element: <AdminRoute><AllBuyers></AllBuyers></AdminRoute>
            },
            {
                path: '/dashboard/all-admin',
                element: <AdminRoute><Alladmin></Alladmin></AdminRoute>
            },
            {
                path: '/dashboard/reported-items',
                element: <AdminRoute><ReportedItems></ReportedItems></AdminRoute>
            },
        ]
    }
])
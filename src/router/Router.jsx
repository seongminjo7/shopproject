import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import Main from "../pages/Main"
import NotFound from "../pages/NotFound"
import App from "../App"
import CategoryPage from "../pages/CategoryPage"
import UploadProduct from "../pages/UploadProduct"
import { useAuthContext } from "../context/AuthContext"
import ProductDetailPage from "../pages/ProductDetailPage"
import MyCart from "../pages/MyCart"

export default function Router() {

    const ProtectRouter = ({ checkAdmin, children }) => {

        const { user, init } = useAuthContext();
        if (init) return null

        if (!user || (checkAdmin && !user.isAdmin)) {
            return <Navigate to='/' replace />
        }
        return children;
    }

    const router = createBrowserRouter([
        {
            path: '/',
            element: <App />,
            errorElement: <NotFound />,
            children: [
                { index: true, element: <Main /> },
                { path: '/cart', element: <MyCart /> },
                { path: '/products/:category', element: <CategoryPage /> },
                { path: '/products/detail/:id', element: <ProductDetailPage /> },
                {
                    path: '/products/upload',
                    element:
                        <ProtectRouter checkAdmin>
                            <UploadProduct />
                        </ProtectRouter>
                },
            ]
        }
    ])
    return <RouterProvider router={router} />
}
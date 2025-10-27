import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import './index.css'
import App from './App.jsx'
import AllProducts from './pages/productList.jsx'
import WishList from './pages/userWishList.jsx'
import Cart from './pages/MyCart.jsx'
import ProductDetail from './pages/details.jsx'
import MyProfile from './pages/userProfile.jsx'
import Checkout from './pages/checkout.jsx'
import OrderDetails from './pages/orderDetails.jsx'
import { MyWishlistProvider } from './components/contexts.jsx'
import { MyCartProvider } from './components/contexts.jsx'
import { CartItemQuantityProvider } from './components/contexts.jsx'
import { SaveAddressProvider } from './components/contexts.jsx'
import { ToastContainer, Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const router = createBrowserRouter(
  [
    {
      path: "/products",
      element: <AllProducts/>
    },
    {
      path: "/",
      element: <App/>
    },
    {
      path: "/wishlist",
      element: <WishList/>
    },
    {
      path: "/cart",
      element: <Cart/>
    },
    {
      path: "/products/:id",
      element: <ProductDetail/>
    },
    {
      path: "/products/category/:selectedPet",
      element: <AllProducts/>
    },
    {
      path: "/profile",
      element: <MyProfile/>
    },
    {
      path: "/checkout/:itemId",
      element: <Checkout/>
    },
    {
      path: "/checkout",
      element: <Checkout/>
    },
    {
      path: "/orderDetails",
      element: <OrderDetails/>
    }
  ]
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MyWishlistProvider>
      <MyCartProvider>
      <CartItemQuantityProvider>
      <SaveAddressProvider>
      <RouterProvider router={router}/>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      </SaveAddressProvider>
      </CartItemQuantityProvider>
      </MyCartProvider>
    </MyWishlistProvider>
  </StrictMode>,
)

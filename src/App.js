import Home from "./pages/Home";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SweetTalk from "./pages/SweetTalk";
import Shop from "./pages/Shop";
import Events from "./pages/Events";
import SweetTalkArticle from "./pages/SweetTalkArticle";
import Videos from "./pages/Videos";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import LogIn from "./pages/LogIn";
import ForgotPassword from "./pages/ForgotPassword";
import Product from "./pages/Product";
import Checkout from "./pages/Checkout";
import Admin from "./pages/Admin";
import AccessDenied from "./pages/AccessDenied";
import LogOut from "./pages/LogOut";
import EditProduct from "./pages/EditProduct";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import { AuthProvider } from "./helper/AuthContext";
import { CartProvider } from "./helper/CartContext";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Header />
          <main>
            <Cart />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/sweetTalk" element={<SweetTalk />} />
              <Route path="/sweetTalk/:id" element={<SweetTalkArticle />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              ></Route>
              <Route
                path="/admin"
                element={
                  <PrivateRoute>
                    <Admin />
                  </PrivateRoute>
                }
              ></Route>
              <Route
                path="checkout"
                element={
                  <PrivateRoute>
                    <Checkout />
                  </PrivateRoute>
                }
              ></Route>
              <Route
                path="/admin/edit/:productId"
                element={
                  <PrivateRoute>
                    <EditProduct />
                  </PrivateRoute>
                }
              ></Route>
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/shop/:productId" element={<Product />} />
              <Route path="/events" element={<Events />} />
              <Route path="/access-denied" element={<AccessDenied />} />
              <Route path="/logout" element={<LogOut />} />
              <Route path="*" element={<h1>404</h1>} />
            </Routes>
          </main>
          <Footer />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;

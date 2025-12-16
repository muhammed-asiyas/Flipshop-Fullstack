import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProductDetails from "./components/ProductDetails";
import Order from "./components/Order";
import ProtectedRoute from "./components/ProtectedRoute/protectedRoute";
import AuthRoute from "./components/AuthRoute/AuthRoute";
import "./App.css";

function App() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(
    () => localStorage.getItem("token") != null
  );

  const handleLogin = () => setIsUserAuthenticated(true);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsUserAuthenticated(false);
  };
  return (
    <BrowserRouter>
      <nav className="nav-container">
        <div className="nav-first-section">
          <Link className="nav-item" to="/">
          <img
            className="website-logo"
            alt="website logo"
            src="https://res.cloudinary.com/dlhgbo0ji/image/upload/v1764685351/ChatGPT_Image_Dec_2_2025_07_51_47_PM_qqp5t4.png"
          />
        </Link>
        </div>
        <div>
          <Link className="nav-item" to="/cart">
          Cart
        </Link>
        {isUserAuthenticated ? (
          <button className="nav-item logout-btn" onClick={handleLogout}>Logout</button>
        ) : (
          ""
        )}
        </div>
      </nav>
      <Routes>
        <Route element={<AuthRoute isAuthenticated={isUserAuthenticated} />}>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route
          element={<ProtectedRoute isAuthenticated={isUserAuthenticated} />}
        >
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/order/:id" element={<Order />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
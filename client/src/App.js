import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home2 from "./pages/Home2";
import Login from "./pages/users/Login";
import Register from "./pages/users/Register";
import Navbar from "./components/Navigation/Navbar";
import AddIncome from "./pages/income/AddIncome";
import AddExpense from "./pages/expense/AddExpense";
import Profile from "./components/profile/Profile";
import PR from "./components/Navigation/ProtectRoute";
import Dashboard from "./components/dashboard/Dashboard";
import EditContent from "./components/EditContent";
import Contact from "./pages/Contact";
import PricingTiles from "./pages/Pricing";
import Starter from "./pages/Starter";
import Expenses from "./pages/expense/Expenses";
import Income from "./pages/income/Income";
import NotFoundPage from "./pages/errors/NotFoundPage";
import EditProfile from "./components/profile/EditProfile";
import VerifyPage from "./pages/users/Verify";
import ForgotPass from "./pages/users/ForgotPassword";
import ResetPass from "./pages/users/ResetPassword";
import Payment from "./pages/users/Payment";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index element={<Home2 />} />
        <Route path="contact" element={<Contact />} />

        <Route path="start" element={<Starter />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="reset-password" element={<ResetPass />} />
        <Route path="forgot-password" element={<ForgotPass />} />
        <Route path="verify-email" element={<VerifyPage />} />
        {/*unauth routes*/}
        <Route
          path="buy"
          element={
            <PR>
              <PricingTiles />
            </PR>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PR>
              <Dashboard />
            </PR>
          }
        />
        <Route
          path="/expense"
          element={
            <PR>
              <Expenses />
            </PR>
          }
        />
        <Route
          path="/income"
          element={
            <PR>
              <Income />
            </PR>
          }
        />
        <Route
          path="/edit"
          element={
            <PR>
              <EditContent />
            </PR>
          }
        />
        <Route
          path="add-income"
          element={
            <PR>
              <AddIncome />
            </PR>
          }
        />
        <Route
          path="add-expense"
          element={
            <PR>
              <AddExpense />
            </PR>
          }
        />
        <Route
          path="profile"
          element={
            <PR>
              <Profile />
            </PR>
          }
        />
        <Route
          path="edit-profile"
          element={
            <PR>
              <EditProfile />
            </PR>
          }
        />
        <Route
          path="payment-success"
          element={
            <PR>
              <Payment />
            </PR>
          }
        />
        {/*user routes*/}
        {/*admin routes*/}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <div id="recaptcha-container"></div>
    </BrowserRouter>
  );
}

export default App;

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import ChangePassword from "../pages/auth/ChangePassword";
import { Signup } from "../pages/auth/Signup";
import Login from "../pages/auth/Login";
import EditProfile from "../pages/profile/Profile";
import ProductDetail from "../pages/products/ProjectDetail";
import Products from "../pages/products/Products";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

const AppRoutes: React.FC = () => {
  const { isAuth } = useSelector((state: RootState) => state.auth);

  return (
    <Routes>
      {/* Public Routes - No Header */}
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      {/* Private Routes - With Header */}
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Products />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <EditProfile />
          </PrivateRoute>
        }
      />
      <Route
        path="/change-password"
        element={
          <PrivateRoute>
            <ChangePassword />
          </PrivateRoute>
        }
      />
      <Route
        path="/products/:id"
        element={
          <PrivateRoute>
            <ProductDetail />
          </PrivateRoute>
        }
      />

      {/* Root route - redirect to home if authenticated, otherwise to login */}
      <Route
        path="/"
        element={
          isAuth ? (
            <Navigate to="/home" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Catch undefined routes */}
      <Route
        path="*"
        element={
          isAuth ? (
            <Navigate to="/home" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
};

export default AppRoutes;

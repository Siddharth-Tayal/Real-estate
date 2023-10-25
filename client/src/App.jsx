import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import ListDetail from "./pages/ListDetail";
import SearchingPage from "./pages/SearchingPage";
import NotFound from "./pages/NotFound";
import Footer from "./pages/Footer";
import ProtectedRoute from "./components/Protected";
import { useDispatch } from "react-redux";
import Loader from "./components/Loader";

import CreateListing from "./pages/Admin/Listings/CreateListing";
import EditListing from "./pages/Admin/Listings/EditListing";
import { loadUser } from "./redux/actions/actions";
import Home from "./pages/Home";
export default function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    dispatch(loadUser());
    setLoading(false);
  }, []);

  if (loading) return <Loader />;
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/sign-in" element={<SignIn />} />
        <Route exact path="/sign-up" element={<SignUp />} />
        <Route exact path="/listing/:id" element={<ListDetail />} />
        <Route exact path="/search" element={<SearchingPage />} />
        <Route
          exact
          path="/profile"
          element={<ProtectedRoute component={Profile} />}
        />
        <Route
          exact
          path="/create-listing"
          element={<ProtectedRoute isAdmin={true} component={CreateListing} />}
        />
        <Route
          path="/edit-listing/:id"
          element={<ProtectedRoute isAdmin={true} component={EditListing} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

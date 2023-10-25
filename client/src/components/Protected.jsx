import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, component: Component, ...routeProps }) => {
  const { loading, isAuthenticated, currentUser } = useSelector(
    (state) => state.user
  );

  if (!loading && isAuthenticated === false) {
    return <Navigate to="/sign-in" />;
  }

  if (loading === false && isAdmin === true && currentUser.role !== "admin") {
    return <Navigate to="/sign-in" />;
  }

  return (
    <Fragment>
      {loading === false ? <Component {...routeProps} /> : null}
    </Fragment>
  );
};

export default ProtectedRoute;

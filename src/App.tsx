import { Route, Routes } from "react-router";
import routes from "./routes";
import ProtectedRoute from "./routes/protected";
import { useFetchInitialDataFromLocalStorage } from "./hooks";

function App() {
  useFetchInitialDataFromLocalStorage();
  return (
    <>
      <Routes>
        {routes.map((route) => {
          const Component = route.component;
          const path = route.path;
          return (
            <Route
              key={route.name}
              path={path}
              element={
                route.isProtected ? (
                  <ProtectedRoute>
                    <Component />
                  </ProtectedRoute>
                ) : (
                  <Component />
                )
              }
            />
          );
        })}
      </Routes>
    </>
  );
}

export default App;

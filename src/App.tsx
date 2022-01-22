import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { BreadcrumbContext, Breadcumb } from "./breadcrumbs/breadcrumbContext";
import { IUser, UserContext } from "./breadcrumbs/userContext";
import { About } from "./components/About";
import { Breadcrumb } from "./components/Breadcrumb";
import { Home } from "./components/Home";
import { UserMenu } from "./components/UserMenu";
import { Users } from "./components/Users";
import { Users2 } from "./components/Users2";
import { isDebugMode } from "./diagnostics/withDiagnostics";

function App() {
  const [breadcrumbs, setBreadcrumbs] = React.useState<Breadcumb[]>([]);
  const [user, setUser] = React.useState<IUser>();

  const setBreadcrumbsWithLog = (newBreadcrumbs: Breadcumb[]) => {
    setBreadcrumbs(newBreadcrumbs);
    console.log('🥑', `setBreadcrumbs`, breadcrumbs, '->', newBreadcrumbs);
  }

  const usingMemo = false;
  const routes = [
    { path: "/", component: Home, label: "Home" },
    { path: "/about", component: About, label: "About" },
    { path: "/users", component: Users, label: "Users" },
    { path: "/users/:id", component: Users, label: "User", internal: true },

    // more optimized version
    { path: "/users2", component: Users2, label: "Users (optimized)" },
    { path: "/users2/:id", component: Users2, label: "User (optimized)", internal: true },
  ]

  return (
    <div className="container mx-auto">

      <div className="">
        {isDebugMode && <div className="bg-red-200 mb-2 p-1">
          <div className="text-red-500">
            <span>Debug mode</span>
          </div>
        </div>}
        {!isDebugMode && <div className="bg-green-200 mb-2 p-1">
          <div className="text-green-500">
            <span>Production mode</span>
          </div>
        </div>}
      </div>

      <BreadcrumbContext.Provider value={{ breadcrumbs, setBreadcrumbs: setBreadcrumbsWithLog }}>
        <UserContext.Provider value={{ user, setUser }}>
          <Router>
            <div>
              <nav className="flex gap-2 items-center">
                <ul className="flex gap-2">
                  {routes
                    .filter(route => !route.internal)
                    .map(({ path, label }) => (
                      <li key={path} className="p-1 px-2 bg-teal-200 transition-all rounded-sm
                          hover:shadow-lg hover:shadow-teal-300 hover:bg-teal-700 hover:text-white hover:rounded-md">
                        <Link to={path}>{label}</Link>
                      </li>
                    ))}
                </ul>
                <UserMenu />
              </nav>
              <Breadcrumb />

              <div className="p-3 bg-teal-100/50 border-teal-400/50 border-solid border rounded">
                <Routes>
                  {routes.map(({ path, component }) => {
                    const Component = usingMemo ? React.memo(component) : component;
                    return <Route key={path} path={path} element={<Component />} />
                  })}
                </Routes>
              </div>
            </div>
          </Router>
        </UserContext.Provider>
      </BreadcrumbContext.Provider>
    </div>
  );
}

export default App;

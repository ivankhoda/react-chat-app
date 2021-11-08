import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { Chat, Home } from "./components/index";
import { socket, SocketContext } from "./service/socket";

// Used SocketContext provider to prevent call socket many time instead of one.
function App() {
  const routes = [
    { path: "/", name: "Home", Component: Home },
    { path: "/chat", name: "Chat", Component: Chat },
  ];
  return (
    <SocketContext.Provider value={socket}>
      <Router>
        <h1 className="title display-4 text-center">Welcome to magic chat!</h1>
        <Switch>
          {routes.map(({ path, Component }) => (
            <Route key={path} path={path} exact>
              <Component />
            </Route>
          ))}
        </Switch>
      </Router>
    </SocketContext.Provider>
  );
}

export default App;

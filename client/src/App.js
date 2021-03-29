import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "./pages/LoginPage";
import CanvasPage from "./pages/CanvasPage";
// import PublicPage from "./pages/PublicPage";
import SignUpPage from "./pages/SignUpPage";
import UserProfilePage from "./pages/UserProfilePage";
import { ProvideAuth } from "./util/authContext";
import Gallery from "./pages/Gallery";

function App() {
  return (
    <ProvideAuth>
      <Router>
        <div>
          <Route path={["/canvasPage", "/profile", "/gallery"]}>
            <Navbar />
          </Route>
          <Switch>
            <Route exact path="/">
              <LoginPage />
            </Route>
            <PrivateRoute path="/gallery">
              <Gallery />
            </PrivateRoute>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/signup">
              <SignUpPage />
            </Route>
            <PrivateRoute path="/canvasPage">
              <CanvasPage />
            </PrivateRoute>
            <PrivateRoute path="/profile">
              <UserProfilePage />
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    </ProvideAuth>
  );
}

export default App;

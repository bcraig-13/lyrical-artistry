import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "./pages/LoginPage";
import CanvasPage from "./pages/CanvasPage";
// import PublicPage from "./pages/PublicPage";
import SignUpPage from "./pages/SignUpPage";
import UserProfilePage from "./pages/UserProfilePage";
import PublicGallery from "./pages/PublicGalleryPage";
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
            <PrivateRoute path="/gallery" exact>
              <Gallery />
            </PrivateRoute>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/signup">
              <SignUpPage />
            </Route>
            <PrivateRoute path="/canvasPage" exact>
              <CanvasPage />
            </PrivateRoute>
            <PrivateRoute path="/publicGallery" exact>
              <PublicGallery />
            </PrivateRoute>
            <PrivateRoute path="/profile" exact>
              <UserProfilePage />
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    </ProvideAuth>
  );
}

export default App;

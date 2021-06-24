import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import PublicPage from "./pages/PublicPage";

import PublicGallery from "./pages/PublicGalleryPage";
import { ProvideAuth } from "./util/authContext";
import Gallery from "./pages/Gallery";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import CanvasPage from "./pages/CanvasPage";
import UserProfilePage from "./pages/UserProfilePage";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import UserSearch from "./components/UserSearch";



function App() {


  return (
    <ProvideAuth>
      <Router>
        <div>
          <Route path={["/canvasPage", "/profile", "/gallery"]}>
            <Navbar />
          </Route>

          <UserSearch />

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

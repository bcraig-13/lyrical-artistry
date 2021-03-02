import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "./pages/LoginPage";
import ProtectedPage from "./pages/ProtectedPage";
// import PublicPage from "./pages/PublicPage";
import SignUpPage from "./pages/SignUpPage";
import UserProfilePage from "./pages/UserProfilePage";
import SearchLyricsPage from "./pages/SearchLyricsPage";
import { ProvideAuth } from "./util/authContext";
import Gallery from "./pages/Gallery";

function App() {
  return (
    <ProvideAuth>
      <Router>
        <div>
          <Route path= {["/searchLyrics", "/protected", "/profile", "/gallery"]}>
            <Navbar />
          </Route>
          <Switch>
          <Route exact path="/">
              <LoginPage />
            </Route>
            <Route path="/gallery">
              <Gallery />
            </Route>
            <Route path="/searchLyrics">
              <SearchLyricsPage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/signup">
              <SignUpPage />
            </Route>
            <PrivateRoute path="/protected">
              <ProtectedPage />
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

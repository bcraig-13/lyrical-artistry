import { useAuth } from "../util/authContext";
import API from "../util/API";
import { useEffect, useState } from "react";

// This component provides an example of requesting additional user info that
// isn't available from the auth token. This page should only be rendered from
// within a ProtectedRoute
function UserProfilePage() {
  const auth = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    API.getUser().then((res) => {
      setUser(res.data);
    });
  }, [auth.isLoggedIn, auth.user.id]);

  return (
    <div>
      <h1>User Profile Example Page</h1>
      <p>Id: {user?._id}</p>
      <p>Username: {user?.username}</p>
      <p>Email: {user?.email}</p>
    </div>
  );
}

export default UserProfilePage;

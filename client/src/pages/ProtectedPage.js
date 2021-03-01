import { useAuth } from "../util/authContext";

function ProtectedPage() {
  const auth = useAuth();
  return (
    <div>
      <h1>Edit your Lyrics</h1>
    </div>
  );
}

export default ProtectedPage;

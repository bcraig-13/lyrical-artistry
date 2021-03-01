import { useAuth } from "../util/authContext";

function ProtectedPage() {
  const auth = useAuth();
  return (
    <div>
      <h1>Edit your Lyrics</h1>

      <h1>To Upload Image on mongoDB</h1>
      <hr />
      <div>
        <form action="/protected" method="POST" enctype="multipart/form-data">
          <div>
            <label htmlFor="name">Image Title</label>
            {/* Took 'value=""' out of the inputs. May need later */}
            <input type="text" id="name" placeholder="Name" name="name" required /> 
          </div>
          <div>
            <label htmlFor="image">Upload Image</label>
            <input type="file" id="image" name="image" required />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProtectedPage;

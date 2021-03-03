import API from "../util/API";

function ProtectedPage() {

  const handleFileTemplateSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("image", event.target.image.files[0], event.target.name.value);
    API.postImage(data)
  }
  return (
    <div>
      <h1>Edit your Lyrics</h1>
      {/* The below code is used for uploading and submitting an image. Need to integrate with canvas */}
      <h1>To Upload Image on mongoDB</h1>
      <hr />
      <div>
        <form onSubmit={handleFileTemplateSubmit} encType="multipart/form-data">
          <div>
            <label htmlFor="name">Image Title</label>
            <input type="text" id="name" placeholder="Name" name="name123" required />
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

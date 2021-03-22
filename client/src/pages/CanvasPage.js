import CanvasKonva from "../components/CanvasKonva/CanvasKonva";
import SideBarMediaAPI from "../components/SearchLyrics/SideBarMediaAPI";
function CanvasPage() {
  return (
<<<<<<< HEAD
    <div className="row">
      <div className="col-md-2">
        <SideBarMediaAPI />
      </div>
      <div className="col-md-10">
        <h1>Edit your Lyrics</h1>
        {/* The below code is used for uploading and submitting an image. Need to integrate with canvas */}
        <h1>To Upload Image on mongoDB</h1>
        <hr />
        <CanvasKonva />
      </div>
=======
    <div>
      <h1>Edit Pictures</h1>
      {/* The below code is used for uploading and submitting an image. Need to integrate with canvas */}
      <hr />
      <CanvasKonva/>
>>>>>>> 18840a30b001048cad0e336e0f7890ec35e796a2
    </div>
  );
}

export default CanvasPage;

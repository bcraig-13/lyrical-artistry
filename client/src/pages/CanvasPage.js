import CanvasKonva from "../components/CanvasKonva/CanvasKonva";
import SideBarMediaAPI from "../components/SearchLyrics/SideBarMediaAPI";
function CanvasPage() {
  return (
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
    </div>
  );
}

export default CanvasPage;

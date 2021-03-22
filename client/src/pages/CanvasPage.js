import CanvasKonva from "../components/CanvasKonva/CanvasKonva";
import SideBarMediaAPI from "../components/SearchLyrics/SideBarMediaAPI";
function CanvasPage() {
  return (
    <div className="row">
      <div className="col-md-2">
        <SideBarMediaAPI />
      </div>
      <div className="col-md-10">
        <h1>Edit Picture</h1>
        <hr />
        <CanvasKonva />
      </div>
    </div>
  );
}

export default CanvasPage;

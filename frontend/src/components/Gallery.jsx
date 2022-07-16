import React from "react";

const Image = ({ image }) => {
  return (
    <div id={image.id} className="col-md-3 col-sm-1 py-2">
      <img src={image.url} style={{ width: "100%" }}></img>
    </div>
  );
};

function Gallery({ images }) {
  return (
    <div className="row mx-0">
      {images.map((image) => (
        <Image image={image} />
      ))}
    </div>
  );
}

export default Gallery;

import React, { useReducer, useState, useEffect, useRef } from "react";

const initialState = {
  imageName: "",
  imageDes: "",
  imageFile: undefined,
};

const reducer = (state, action) => {
  console.log("in reduces: ", action.value);
  switch (action.type) {
    case "imageName":
      return { ...state, imageName: action.value };
    case "imageDes":
      return { ...state, imageDes: action.value };
    case "imageFile":
      return { ...state, imageFile: action.value };
    case "reset":
      return initialState;
    default:
      return initialState;
  }
};
function AddImage() {
  const [data, dispatch] = useReducer(reducer, initialState);
  const [imagePreview, setPreview] = useState(undefined);
  const imageRef = useRef();
  useEffect(() => {
    if (!data.imageFile) {
      imageRef.current.value = "";
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(data.imageFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [data.imageFile]);

  const onSelectFile = (e) => {
    let value = undefined;
    if (e.target.files || e.target.files.length > 0) {
      value = e.target.files[0];
    }
    dispatch({ type: "imageFile", value: value });
  };
  return (
    <div className="row mx-0">
      <div className="col-md-6 col-sm-12 px-5">
        <div className="p-4 border border-dark rounded">
          <div className="d-flex flex-column">
            <h5>Enter Image Data</h5>
            <input
              className="my-3"
              type="text"
              placeholder="Enter Image Name"
              value={data.imageName}
              onChange={(e) =>
                dispatch({ type: "imageName", value: e.target.value })
              }
            />
            <input
              className="my-3"
              type="file"
              accept="image/*"
              ref={imageRef}
              onChange={onSelectFile}
            />
            <textarea
              className="my-3"
              placeholder="Image Description"
              rows={5}
              value={data.imageDes}
              onChange={(e) =>
                dispatch({ type: "imageDes", value: e.target.value })
              }
            ></textarea>
            <div className="d-flex flex-row justify-content-around">
              <button className="btn btn-secondary" type="button">
                Submit
              </button>
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => dispatch({ type: "clear" })}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-sm-12 px-5">
        <div className="p-4 border border-dark rounded">
          <div className="d-flex flex-column">
            <h5>Preview</h5>
            <h3 className="py-2">{data.imageName}</h3>
            <center className="py-2">
              <img
                className="text-center"
                src={imagePreview}
                style={{ width: "50%" }}
              ></img>
            </center>
            <p>{data.imageDes}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddImage;

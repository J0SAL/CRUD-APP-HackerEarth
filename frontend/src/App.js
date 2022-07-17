import "./App.css";
import Gallery from "./components/Gallery";
import AddImage from "./components/AddImage";
import Header from "./components/Header";
import Search from "./components/Search";
import UploadImage from "./components/UploadImage";
import Pagination from "./components/Pagination";
import { useState, useEffect } from "react";
function App() {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [pageCount, setPageCount] = useState(1);

  const getImages = (pageno) => {
    setImages([
      {
        id: 1,
        url: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__480.jpg",
      },
      {
        id: 2,
        url: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__480.jpg",
      },
      {
        id: 3,
        url: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__480.jpg",
      },
      {
        id: 4,
        url: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__480.jpg",
      },
      {
        id: 5,
        url: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__480.jpg",
      },
      {
        id: 6,
        url: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__480.jpg",
      },
      {
        id: 7,
        url: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__480.jpg",
      },
      {
        id: 8,
        url: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__480.jpg",
      },
    ]);

    setPageCount(5);
  };
  const paginate = (pageno = 1) => {
    if (pageno === "+1") page !== pageCount && setPage((page) => page + 1);
    else if (pageno === "-1") page !== 1 && setPage((page) => page - 1);
    else setPage(pageno);
    getImages(pageno);
  };

  useEffect(() => {
    paginate();
  }, []);

  return (
    <div className="App">
      <Header />
      {/* <Search /> */}
      {/* <Gallery images={images} /> */}
      {/* <AddImage /> */}
      <UploadImage />
      {/* <Pagination pageCount={pageCount} paginate={paginate} page={page} /> */}
    </div>
  );
}

export default App;

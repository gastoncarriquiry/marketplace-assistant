import { useState, useEffect } from "react";
import "./App.css";
import { transformImageUrl } from "./utils/utils";

function App() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("https://api.mercadolibre.com/sites/MLU/search?q=casa")
      .then((r) => r.json())
      .then((r) => setImages(r.results.map((result) => result.thumbnail)))
      .then((r) => {
        images.forEach((image) => {
          let result = transformImageUrl(image);
          console.log(result);
        });
      });
  }, []);

  return <div></div>;
}

export default App;

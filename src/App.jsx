import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { store } from "./store/store";
import { ToastContainer } from "react-toastify";
import "./App.css";
import UI from "./components/UI/UI";
import SearchResults from "./components/SearchResults/SearchResults";
import ItemDetail from "./components/ItemDetail/ItemDetail";
import FavoriteResults from "./components/FavoriteResults/FavoriteResults";
import IgnoredResults from "./components/IgnoredResults/IgnoredResults";
import Home from "./components/Home/Home";
import Error404 from "./components/Error404/Error404";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<UI />}>
            <Route path="/" element={<Home />} />
            <Route path="resultados" element={<SearchResults />} />
            <Route path="inmueble/:id" element={<ItemDetail />} />
            <Route path="favoritos" element={<FavoriteResults />} />
            <Route path="ignorados" element={<IgnoredResults />} />
          </Route>

          <Route path="/*" element={<Navigate to="/error404" />} />
          <Route path="/error404" element={<Error404 />} />
        </Routes>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </BrowserRouter>
    </Provider>
  );
}

export default App;

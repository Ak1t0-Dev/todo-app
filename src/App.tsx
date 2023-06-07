import "./App.css";
import Header from "./views/components/Header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./views/pages/Login/Login";
import { Register } from "./views/pages/Register/Register";
import { Home } from "./views/pages/Home/Home";
import { PostPage } from "./views/pages/PostPage/PostPage";
import { Layout } from "./views/components/Layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/post/:id" element={<PostPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

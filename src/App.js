import Home from "./pages/Home";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SweetTalk from "./pages/SweetTalk";
import Shop from "./pages/Shop";
import Events from "./pages/Events";
import Cart from "./pages/Cart";
import SweetTalkArticle from "./pages/SweetTalkArticle";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sweetTalk" element={<SweetTalk />} />
            <Route path="/sweetTalk/:title" element={<SweetTalkArticle />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/events" element={<Events />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<h1>404</h1>} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
};

export default App;

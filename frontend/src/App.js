import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import SingleService from "./components/SingleService";
import Checkout from "./components/Checkout";
import OrderDetail from "./pages/OrderDetail";
import Admin from "./adminPages/Admin";
import Provider from "./context/Provider";
import Work from "./pages/Work";
import Service from "./pages/Service";
import Barbers from "./pages/Barbers";
import ScrollToTop from "./components/ScrollToTop";
import Image from "./pages/Image";
import NotFound from "./pages/NotFound";
function App() {
  // async function registerAndSubscribe() {
  //   try {
  //     const serviceWorkerReg = await regSw();
  //     await subscribe(serviceWorkerReg);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // const announc = async () => {
  //   try {
  //     const serviceAnnouncement = await regSw1();
  //     await send(serviceAnnouncement);
  //   } catch (error) {
  //     console.error("Error sending announcement:", error);
  //   }
  // };

  return (
    <>
      <Provider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services/service/:id" element={<SingleService />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders/order-detail" element={<OrderDetail />} />
            <Route path="/work" element={<Work />} />
            <Route path="/services" element={<Service />} />
            <Route path="/barbers" element={<Barbers />} />
            <Route path="/image" element={<Image />} />
            <Route path="/admin" element={<Admin />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;

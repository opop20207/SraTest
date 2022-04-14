import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HeaderTemp from "./components/HeaderTemp";
import Footer from "./components/Footer";
import Main from "./components/Main";
import MyNFT from "./components/MyNFT";
import Create from "./components/Create";
import MarketPlace from "./components/MarketPlace";
import LoginMeta from "./components/LoginMeta";
import Selling from "./components/MyNFT/Selling";
import MyCollection from "./components/MyNFT/MyCollection";
import CustomAvatar from "./components/MyNFT/CustomAvatar";
import ItemDetail from "./components/MyNFT/ItemDetail";
import "antd/dist/antd.css";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Router>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Main />}></Route>
                        <Route path="/MyNFT" element={<MyNFT />}></Route>
                        <Route path="/Create" element={<Create />}></Route>

                        <Route
                            path="/MarketPlace"
                            element={<MarketPlace />}></Route>
                        <Route
                            path="/LoginMeta"
                            element={<LoginMeta />}></Route>

                        <Route path="/SellingNFT" element={<Selling />}></Route>
                        <Route
                            path="/MyCollection"
                            element={<MyCollection />}></Route>
                        <Route
                            path="/MyCollection/:id"
                            element={<ItemDetail />}></Route>
                        <Route
                            path="/CustomAvatar"
                            element={<CustomAvatar />}></Route>
                    </Routes>

                    <Footer />
                </Router>
            </header>
        </div>
    );
}
export default App;

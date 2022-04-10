import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import MyNFT from "./components/MyNFT";
import Create from "./components/Create";
import MarketPlace from "./components/MarketPlace";
import LoginMeta from "./components/LoginMeta";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <BrowserRouter>
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
                    </Routes>
                    <Footer />
                </BrowserRouter>
            </header>
        </div>
    );
}
export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import MyNFT from "./components/MyNFT";
import Create from "./components/Create";
import MarketPlace from "./components/MarketPlace";
import LoginMeta from "./components/LoginMeta";
import Account from "./components/Account";

const styles = {
    content: {
        display: "flex",
        justifyContent: "center",
        fontFamily: "Roboto, sans-serif",
        color: "#041836",
        marginTop: "130px",
        padding: "10px",
    },
    header: {
        position: "fixed",
        zIndex: 1,
        width: "100%",
        background: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontFamily: "Roboto, sans-serif",
        borderBottom: "2px solid rgba(0, 0, 0, 0.06)",
        padding: "0 10px",
        boxShadow: "0 1px 10px rgb(151 164 175 / 10%)",
    },
    headerRight: {
        display: "flex",
        gap: "20px",
        alignItems: "center",
        fontSize: "15px",
        fontWeight: "600",
    },
};

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

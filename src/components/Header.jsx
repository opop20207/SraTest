import "../static/css/Header.css";
import { Link } from "react-router-dom";
import Menu, { SubMenu, Item as MenuItem, Divider } from "rc-menu";
import "rc-menu/assets/index.css";
import Account from "../components/Account";

function Header() {

    return (
        <>
            <nav>
                <div class="UpperNav">
                    <div class="navContainer">
                        <Menu mode="horizontal">
                            <MenuItem key="CLone.ns">
                                <Link to={"/"}>
                                    <a>CLone.ns</a>
                                </Link>
                            </MenuItem>

                            <MenuItem key="MarketPlace">
                                <Link to={"/MarketPlace"}>
                                    <a>MarketPlace</a>
                                </Link>
                            </MenuItem>

                            <SubMenu
                                title={<a>My NFT</a>}
                                key="MyNFT"
                                style={{ color: "black" }}>
                                <MenuItem key="MyNFT-SellingNFT">
                                    <Link to={"/SellingNFT"}>
                                        <span
                                            style={{
                                                color: "black",
                                                textDecoration: "none"
                                            }}>
                                            Selling NFT
                                        </span>
                                    </Link>
                                </MenuItem>

                                <Divider />

                                <MenuItem key="MyNFT-MyCollection">
                                    <Link to={"/MyCollection"}>
                                        <span 
                                            style={{ 
                                                color: "black" }}>
                                            My Collection
                                        </span>
                                    </Link>
                                </MenuItem>

                                <Divider />

                                <MenuItem key="MyNFT-CustomAvatar">
                                    <Link to={"/CustomAvatar"}>
                                        <span 
                                            style={{ 
                                                color: "black" }}>
                                            Custom Avatar
                                        </span>
                                    </Link>
                                </MenuItem>
                            </SubMenu>

                            <MenuItem key="Create">
                                <Link to={"/Create"}>
                                    <a>Create</a>
                                </Link>
                            </MenuItem>
                        </Menu>
                    </div>

                    <div class="loginContainer">
                        <Account />
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Header;

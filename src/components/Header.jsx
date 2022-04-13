import "../static/css/Header.css";
import { Link } from "react-router-dom";
import { ButtonGroup } from "react-bootstrap";
import Menu, { SubMenu, Item as MenuItem, Divider } from "rc-menu";
import "rc-menu/assets/index.css";
import Account from "../components/Account";

function Header() {

    function linkToNavContainer() {
        let urls = ["/", "/MarketPlace", "/MyNFT", "/Create"];
        let names = ["CLone.ns", "MarketPlace", "My NFT", "Create"];

        const result = [];
        for (let i = 0; i < urls.length; i++) {
            result.push(
                <Menu.Item>
                    <Link to={urls[i]}>
                        <a>{names[i]}</a>
                    </Link>
                </Menu.Item>
            );
        }
        return result;
    }

    const handleClick = (info) => {
        console.log(info);
    }

    return (
        <>
            <nav>
                <div class="UpperNav">
                    <div class="navContainer">
                        <Menu mode="horizontal" onClick={handleClick}>
                            <Menu.Item key="CLone.ns">
                                <Link to={"/"}>
                                    <a>CLone.ns</a>
                                </Link>
                            </Menu.Item>

                            <Menu.Item key="MarketPlace">
                                <Link to={"/MarketPlace"}>
                                    <a>MarketPlace</a>
                                </Link>
                            </Menu.Item>

                            <SubMenu title={<a>My NFT</a>} key="MyNFT">
                                <MenuItem key="MyNFT-SellingNFT">
                                    <Link to={"/MyNFT"}>
                                        <a>Selling NFT</a>
                                    </Link>
                                </MenuItem>

                                <Divider />

                                <MenuItem key="MyNFT-MyCollection">
                                    <Link to={"/MyNFT"}>
                                        <a>My Collection</a>
                                    </Link>
                                </MenuItem>

                                <Divider />

                                <MenuItem key="MyNFT-CustomAvatar">
                                    <Link to={"/MyNFT"}>
                                        <a>Custom Avatar</a>
                                    </Link>
                                </MenuItem>
                            </SubMenu>

                            {/* <Menu.Item key="MyNFT">
                                <Link to={"/MyNFT"}>
                                    <a>My NFT</a>
                                </Link>
                            </Menu.Item> */}

                            <Menu.Item key="Create">
                                <Link to={"/Create"}>
                                    <a>Create</a>
                                </Link>
                            </Menu.Item>
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
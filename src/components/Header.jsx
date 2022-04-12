import "../static/css/Header.css";
import { Link } from "react-router-dom";
import { ButtonGroup } from "react-bootstrap";
import Menu, { SubMenu, MenuItem } from "rc-menu";
import "rc-menu/assets/index.css";

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

    return (
        <>
            <nav>
                <div class="UpperNav">
                    <div class="navContainer">
                        <Menu mode="horizontal">{linkToNavContainer()}</Menu>
                    </div>

                    <div class="loginContainer">
                        <Menu mode="horizontal">
                            <Menu.Item>
                                <Link to="/LoginMeta">
                                    <a>Login</a>{" "}
                                </Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link to="/Setting">
                                    <a>Setting</a>{" "}
                                </Link>
                            </Menu.Item>
                        </Menu>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Header;

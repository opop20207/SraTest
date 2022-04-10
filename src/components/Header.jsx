import "../static/css/Header.css";
import { Link } from "react-router-dom";
import { ButtonGroup } from "react-bootstrap";
import Menu, { SubMenu, MenuItem } from "rc-menu";
import 'rc-menu/assets/index.css';

function Header() {
    function linkToNavContainer() {
        let urls = ["/", "/MarketPlace", "/MyNFT", "/Create"];
        let names = ["CLone.ns", "MarketPlace", "My NFT", "Create"];


        const result = [];
        for (let i = 0; i < urls.length; i++) {
            result.push(
                <a>
                    <Link to = {urls[i]}>
                        {names[i]}
                    </Link>
                </a>
            );
        }
        return result;
    }

    return (
        <>
            <nav>
                <div class="UpperNav">
                    <div class="navContainer">
                        { linkToNavContainer() }
                        
                    </div>

                    <div class="loginContainer">
                        <a>
                            {" "}
                            <Link to="/LoginMeta">Login</Link>
                        </a>
                        <a class="registerBox" href="">
                            register
                        </a>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Header;

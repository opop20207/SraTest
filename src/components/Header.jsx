import "../static/css/Header.css";
import { Link } from "react-router-dom";
import Menu, { SubMenu, Item as MenuItem, Divider } from "rc-menu";
import "rc-menu/assets/index.css";
import Account from "../components/Account";
import Withdrawal from "../components/Withdrawal";

function Header() {

    return (
        <>
            <nav>
                <div class="UpperNav">
                    <div class="navContainer">
                        <Menu  mode="horizontal">
                            <MenuItem  style={{padding: "0px" , backgroundColor: "white"}} key="CLone.ns">
                                <Link to={"/"}>
                                    <span><img style={{width : '200px' , height: '100%'}} src= { process.env.PUBLIC_URL+"/imgs/clone.ns.logo.jpg"}/></span>
                                </Link>
                            </MenuItem>

                            <MenuItem style={{ backgroundColor: "white"}} key="MarketPlace">
                                <Link to={"/MarketPlace"}>
                                    <span>MarketPlace</span>
                                </Link>
                            </MenuItem>

                            <SubMenu
                                title={<span>My NFT</span>}
                                key="MyNFT"
                                style={{ color: "black" ,  backgroundColor: "white"}}>
                                <MenuItem  key="MyNFT-SellingNFT">
                                    <Link to={"/SellingNFT"} style={{textDecoration:'none'}}>
                                        <span
                                            style={{
                                                color: "black"
                                            }}>
                                            Selling NFT
                                        </span>
                                    </Link>
                                </MenuItem>

                                <Divider />

                                <MenuItem key="MyNFT-MyCollection">
                                    <Link to={"/MyCollection"} style={{textDecoration:'none'}}>
                                        <span 
                                            style={{ 
                                                color: "black" }}>
                                            My Collection
                                        </span>
                                    </Link>
                                </MenuItem>

                                <Divider />

                                <MenuItem key="MyNFT-CustomAvatar">
                                    <Link to={"/CustomAvatar"} style={{textDecoration:'none'}}>
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
                                    <span>Create</span>
                                </Link>
                            </MenuItem>
                        </Menu>
                    </div>

                    <div className="personal_settings">
                        <div class="withdrawContainer" style={{marginRight: "20px"}}>
                                <Withdrawal />
                        </div>
                       

                        <div class="loginContainer"style={{marginRight: "30px"}}>
                                <Account />
                        </div>
                    </div>

             
                </div>
            </nav>
        </>
    );
}

export default Header;

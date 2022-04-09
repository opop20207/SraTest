
import "../static/css/Header.css"
import { Link } from 'react-router-dom';

function Header(){

    return(
        <>
          <nav>
            <div class="UpperNav">
                <div class = "navContainer">
                    <a > <Link to = "/">CLone.ns</Link></a>
                    <a > <Link to = "/MarketPlace">MarketPlace</Link></a>
                    <a > <Link to = "/MyNFT">My NFT</Link></a>
                    <a > <Link to = "/Create">Create</Link></a>
                </div>
    
                <div class = "loginContainer">
                <a > <Link to = "/LoginMeta">Login</Link></a>
                    <a class="registerBox" href="">register</a>
                   
     
                </div>
            </div>
        </nav>
        
        </>
    );
}

export default Header
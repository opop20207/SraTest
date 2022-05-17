import React from "react";
import { NavLink } from "react-router-dom";
import '../../static/css/itemcard.css'
import SkinView3d from '../../hooks/SkinView3d';

function MarketPlaceItem(props) {

    function Hoverevent(event){
       
        event.target.style.transform="translateY( -5px)"
    }
    function HoverOutevent(event){
      
        event.target.style.transform="translateY( 5px)" 
    }

    const renderItems = () =>
      
        props.products &&
        props.products.map((product) => (
            <div key={product.id} className="Card" >
                <NavLink to={`/MarketPlace/${product.id}`} style={{textDecoration:'none'}}>

                    <div  className="imgcontent">
                    <img src={product.imageURI} />
                    
                    </div>
                    

                    <div className="cardcontent">
                        <p id="title">{product.name}</p>
                        <hr></hr>
                        <div className="aligncontent">
                      
                         <img style={{width : '20px' , height: '20px'}} src= {process.env.PUBLIC_URL+"/imgs/ether.png"} />
                         <p id="price">{product.price} Eth</p>
                        </div>
                
                            
                    </div>
                   
        
                </NavLink>
            </div>
        ));

    return( 
        <div className="card-wrapper" >
            { renderItems()}

        </div>
        
    );
}

export default MarketPlaceItem;

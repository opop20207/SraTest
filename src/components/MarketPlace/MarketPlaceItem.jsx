import React from "react";
import { NavLink } from "react-router-dom";
import '../../static/css/itemcard.css'

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
            <div key={product.id} className="card">
                <NavLink to={`/MarketPlace/${product.id}`}>
                    <img className="imgcontent" src={product.imageURI} />
                </NavLink>
                <div id="content">
                    <p id="title">{product.name}</p>
                    <div id="aligncontent">
                        <p id="description">{product.description}</p>
                    </div>
                    <p id="temp">가격</p>
                    <p id="price">{product.price}</p>
                </div>
            </div>
        ));

    return( 
        <div className="card-wrapper" >
            { renderItems()}
        </div>
        
    );
}

export default MarketPlaceItem;

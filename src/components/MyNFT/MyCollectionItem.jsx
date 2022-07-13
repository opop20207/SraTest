import React from "react";
import { NavLink } from "react-router-dom";
import '../../static/css/itemcard.css'
import SkinView3d from '../../hooks/SkinView3d';


function MyCollectionItem(props) {
    const renderItems = () =>
        props.products &&
        props.products.map((product) => (
            <div key={product.id} className="mycard">
                <NavLink to={`/MyCollection/${product.id}`} style={{textDecoration:'none'}}>

                <div  className="imgcontent">
                {/* <img src={product.imageURI} /> */}
                <SkinView3d imgLink={product.imageURI} />
                </div>
                
                <div id="cardcontent">
                    <p id="title">{product.name}</p>
                        <p id="price">{product.description}</p>
                </div>
                    
                </NavLink>
            </div>
        ));

    return(
        <div className="card-wrapper" >
             { renderItems()}
        </div>
    ) 
}

export default MyCollectionItem;

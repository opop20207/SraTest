import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import './MyNFTcss/itemcard.css'



function MyCollectionItem(props) {


    const renderItems = () =>
      

        props.products &&
        props.products.map((product) => (

            <div key={product.id} className="card">
                <NavLink to={`/MyCollection/${product.id}`}>
                    <img src={product.imageURI} />
                </NavLink>
                <div id="content">
                    <p id="title">{product.name}</p>
                    <div id="aligncontent">
                        <p id="price">{product.description}</p>
                    </div>
                </div>
            </div>
        ));

    return(
        <div className="card-wrapper" >
        { renderItems()}
         </div>
    ) 
}

export default MyCollectionItem;

import React from "react";

function ItemCollection(props) {
    const renderItems = () =>
        props.products &&
        props.products.map((product, index) => (
            <div key={index}>
                <img src={product.imageURI} />
                <div id="content">
                    <p id="title">{product.name}</p>
                    <div id="aligncontent">
                        <p id="price">{product.description}</p>
                    </div>
                </div>
            </div>
        ));

    return console.log(props.products), renderItems();
}

export default ItemCollection;

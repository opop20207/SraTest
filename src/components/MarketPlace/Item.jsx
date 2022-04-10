import React from "react"


function Item(props){

    const renderItems = () => (
        props.products && props.products.map((product, index) => (
            <div key={index}>
                <img src={product.img}/>
                <div id="content">    
                
                <p id="title">{product.title}</p>
                <div id="aligncontent">
                    <p id="price">{product.price}</p>
                    <p id="goods">{product.goods}</p>
                </div>
                </div>
            </div>
        ))
    )

    return(

        renderItems()
    
    )
}

export default Item
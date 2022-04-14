import React from "react";
import { useParams } from "react-router-dom";

function ItemDetail() {
    const { id } = useParams();

    return <p>itemDetailPage item ID : {id}</p>;
}

export default ItemDetail;

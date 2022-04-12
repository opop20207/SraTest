import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";
import Web3 from "web3";
import { useMoralisDapp } from "../../providers/MoralisDappProvider/MoralisDappProvider";
import ItemCollection from "./ItemColletion";
function Selling() {
    const { authenticate, Moralis, isAuthenticated } = useMoralis();
    const [products, setproducts] = useState([]);
    const [Loading, setLoading] = useState(true);
    const { walletAddress } = useMoralisDapp();

    return <p>Selling</p>;
}

export default Selling;

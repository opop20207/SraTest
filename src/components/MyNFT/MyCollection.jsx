import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";
import Web3 from "web3";
import { useMoralisDapp } from "../../providers/MoralisDappProvider/MoralisDappProvider";
import ItemCollection from "./ItemColletion";
function MyCollection() {
    const { authenticate, Moralis, isAuthenticated } = useMoralis();
    const [products, setproducts] = useState([]);
    const [Loading, setLoading] = useState(true);
    const { walletAddress } = useMoralisDapp();

    useEffect(() => {
        getNFTs().then((response) => {
            console.log(response);
            setproducts(response);
            setLoading(false);
        });
    }, []);

    async function getNFTs() {
        console.log(walletAddress);
        const queryNFTs = new Moralis.Query("NFTs");
        queryNFTs.equalTo("ownerOf", Web3.givenProvider.selectedAddress);
        queryNFTs.ascending("updatedAt");
        const datas = await queryNFTs.find();
        let nftArray = [];
        for (let i = 0; i < datas.length; i++) {
            const nft = {
                name: datas[i].get("name"),
                description: datas[i].get("description"),
                imageURI: datas[i].get("imageURI"),
                ownerOf: datas[i].get("ownerOf"),
            };
            nftArray.push(nft);
        }
        return nftArray;
    }

    if (!isAuthenticated) {
        return (
            <div>
                <h1>로그인부터하셈 ㅋㅋ</h1>
                <button onClick={() => authenticate()}>Connect MetaMask</button>
            </div>
        );
    }

    return (
        <div class="temp">
            <p>MyCollecion</p>
            {Loading ? <strong>Loading...</strong> : null}
            <div id="NFTLists" class="container">
                <ItemCollection products={products} />
            </div>
        </div>
    );
}

export default MyCollection;

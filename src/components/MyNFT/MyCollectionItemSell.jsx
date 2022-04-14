import { useMoralis } from "react-moralis";
import { useParams, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import Web3 from "web3";
import { useMoralisDapp } from "../../providers/MoralisDappProvider/MoralisDappProvider";
import MyCollectionItem from "./MyCollectionItem";

function MyCollectionItemSell() {
    const { authenticate, Moralis, isAuthenticated } = useMoralis();
    const [products, setproducts] = useState([]);
    const [Loading, setLoading] = useState(true);
    const { walletAddress } = useMoralisDapp();
    const { id } = useParams();
    const [nft, setNft] = useState();
    const [isTokenAvailable, setIsTokenAvailable] = useState(true);
    const web3 = new Web3(window.ethereum);

    useEffect(() => {
        if (!walletAddress) return;
        getNFTs().then((response) => {
            setNft(response);
        });
    }, [walletAddress]);

    async function getNFTs() {
        const queryNFTs = new Moralis.Query("NFTs");
        queryNFTs.equalTo("objectId", id);
        const data = await queryNFTs.find();
        console.log(data);
        const dataFormed = {
            id: data[0].id,
            name: data[0].get("name"),
            description: data[0].get("description"),
            imageURI: data[0].get("imageURI"),
            ownerOf: data[0].get("ownerOf"),
            tx: data[0].get("tx"),
        };
        const receipt = await web3.eth.getTransactionReceipt(data[0].get("tx"));
        if (!receipt) {
            setIsTokenAvailable(true);
            console.log(receipt.logs[0].topics[3]);
        } else {
            setIsTokenAvailable(false);
            console.log(
                "아직 컨트랙트가 종료되지 않았거나, 해당 토큰 정보가 체인 상에 없습니다. 확인 후 재시도해주세요."
            );
        }
        console.log("!@!@#!@#@");
        return dataFormed;
    }

    //Sell NFT Funtions

    // async function offerNFT() {
    //     const price = document.getElementById("price").value;
    //     const contract = nft.token_address;
    //     const tokenId = nft.token_id;
    //     context.setAttribute("disabled", null);
    //     const approval = await approveMarketPlace(contract, tokenId);
    //     const tx_approval = `<p> Approval transaction ${approval}</p>`;
    //     context.parentElement.innerHTML = tx_approval;
    //     const offering = await placeOffering(contract, tokenId, price);
    //     console.log(offering);
    // }

    // async function placeOffering(_hostContract, _tokenId, _price) {
    //     const params = {
    //         hostContract: _hostContract,
    //         offerer: ethereum.selectedAddress,
    //         tokenId: _tokenId,
    //         price: _price,
    //     };
    //     const signedTransaction = await Moralis.Cloud.run(
    //         "placeOffering",
    //         params
    //     );
    //     fulfillTx = await web3.eth.sendSignedTransaction(
    //         signedTransaction.rawTransaction
    //     );
    //     return fulfillTx;
    // }

    // async function approveMarketPlace(hostContract, tokenId) {
    //     const encodedFunction = web3.eth.abi.encodeFunctionCall(
    //         {
    //             name: "approve",
    //             type: "function",
    //             inputs: [
    //                 { type: "address", name: "to" },
    //                 { type: "uint256", name: "tokenURI" },
    //             ],
    //         },
    //         [nft_market_place_address, tokenId]
    //     );

    //     const transactionParameters = {
    //         to: hostContract,
    //         from: ethereum.selectedAddress,
    //         data: encodedFunction,
    //     };
    //     const txt = await ethereum.request({
    //         method: "eth_sendTransaction",
    //         params: [transactionParameters],
    //     });
    //     return txt;
    // }

    // //Buy NFT Funtions

    // async function buyNFT(context) {
    //     const offeringId = context.parentElement.parentElement.id;
    //     let offering = window.offeringArray.find(
    //         (object) => object.offeringId == offeringId
    //     );
    //     const price = Moralis.Units.ETH(offering.price);
    //     const priceHexString = BigInt(price).toString(16);
    //     closedOffering = await closeOffering(offeringId, priceHexString);
    //     const tx_closeOffering = `<p> Buying transaction ${closedOffering}</p>`;
    //     context.parentElement.innerHTML = tx_closeOffering;
    // }

    // async function closeOffering(offeringId, priceEncoded) {
    //     const encodedFunction = web3.eth.abi.encodeFunctionCall(
    //         {
    //             name: "closeOffering",
    //             type: "function",
    //             inputs: [{ type: "bytes32", name: "_offeringId" }],
    //         },
    //         [offeringId]
    //     );

    //     const transactionParameters = {
    //         to: nft_market_place_address,
    //         from: ethereum.selectedAddress,
    //         value: priceEncoded,
    //         data: encodedFunction,
    //     };
    //     const txt = await ethereum.request({
    //         method: "eth_sendTransaction",
    //         params: [transactionParameters],
    //     });
    //     return txt;
    // }
    if (isTokenAvailable) {
        return (
            <>
                <p>itemDetailPage item ID : {id}</p>
                <img src={nft?.imageURI} />
                <button onclick={`offerNFT()`}></button>
            </>
        );
    } else {
        return (
            <>
                <p>
                    아직 컨트랙트가 종료되지 않았거나, 해당 토큰 정보가 체인
                    상에 없습니다. 확인 후 재시도해주세요.
                </p>
            </>
        );
    }
}

export default MyCollectionItemSell;

/* global BigInt */

import { useMoralis } from "react-moralis";
import { useParams, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import Web3 from "web3";
import { useMoralisDapp } from "../../providers/MoralisDappProvider/MoralisDappProvider";
import MarketPlaceItem from "./MarketPlaceItem";

function MarketPlaceItemBuy() {
    const { authenticate, Moralis, isAuthenticated } = useMoralis();
    const nft_contract_address = "0x3d05364012a5f131e3a32a68deba6c23041fb917";
    const nft_market_place_address = "0xf3c3fce5be43fe2f56a08478455f39dcb8251dd4";
    const { walletAddress } = useMoralisDapp();
    const { id } = useParams();
    const [nftprice, setNftprice] = useState();
    const [nftid, setNftid] = useState("");
    const [nftobjectid, setNftobjectid] = useState("");
    const [nft, setNft] = useState("");
    const [tokenId, setTokenId] = useState(null);
    const [contractAddress, setContractaddress] = useState(null);
    const web3 = new Web3(window.ethereum);

    useEffect(() => {
        if (!walletAddress) return;
        console.log("MarketPlaceItemBuy Executed!! : ", id);
        getNFTs().then((response) => {
            setNft(response);
        });
    }, [walletAddress]);

    async function getNFTs() {
        const queryNFTs = new Moralis.Query("Offerings");
        queryNFTs.equalTo("objectId", id);
        const data = await queryNFTs.find();
        const dataFormed = {
            id: data[0].id,
            name: data[0].get("name"),
            description: data[0].get("description"),
            imageURI: data[0].get("imageURI"),
            offerBy: data[0].get("offerBy"),
            price: data[0].get("price"),
            tx: data[0].get("tx"),
            offeringId: data[0].get("offeringId"),
            objectId: data[0].get("nftobjectId"),
        };
        setNftprice(data[0].get("price"));
        setNftid(data[0].get("offeringId"));
        setNftobjectid(data[0].get("nftobjectId"));
    
        const receipt = await web3.eth.getTransactionReceipt(data[0].get("tx"));
        if (receipt == null) {
            setTokenId(null);
        } else {
            console.log(receipt);
            setTokenId(receipt.logs[0].topics[3]);
            setContractaddress(nft_contract_address);
        }
        return dataFormed;
    }
    //Buy NFT Funtions

    async function buyNFT(context) {
        const offeringId = nftid;
        const price = Moralis.Units.ETH(nftprice);
        const priceHexString = BigInt(price).toString(16);

        await notify("closeOffering 진행 중..");
        const closedOffering = await closeOffering(offeringId, priceHexString);
        const tx_closeOffering = `<p> Buying transaction ${closedOffering}</p>`;
        await notify("closeOffering 진행 완료! DB 수정중...");

        await changeOwner();
        await destroyNFT();

        await notify("Transaction 완료! (반영에 시간이 걸릴 수 있습니다. MetaMask 참조)");
    }

    async function closeOffering(offeringId, priceEncoded) {
        const encodedFunction = web3.eth.abi.encodeFunctionCall(
            {
                name: "closeOffering",
                type: "function",
                inputs: [{ type: "bytes32", name: "_offeringId" }],
            },
            [offeringId]
        );

        const transactionParameters = {
            to: nft_market_place_address,
            from: window.ethereum.selectedAddress,
            value: priceEncoded,
            data: encodedFunction,
        };
        const txt = await window.ethereum.request({
            method: "eth_sendTransaction",
            params: [transactionParameters],
        });
        return txt;
    }

    async function changeOwner(){
        /*
        changeOwner(void)
        해당 NFTs의 소유권을 현재 지갑 주소 주인으로 옮깁니다. 
        */
        const queryNFTs = new Moralis.Query("NFTs");
        queryNFTs.equalTo("objectId", nftobjectid);
        const changeObject = await queryNFTs.first();
        changeObject.set("ownerOf", walletAddress);
        await changeObject.save();
    }

    async function destroyNFT() {
        /*
        destroyNFT()
        : Moralis Offerings DB에서 해당 NFT를 제거합니다. (거래가 완료되었기 때문)
        */
        const queryNFTs = new Moralis.Query("Offerings");
        queryNFTs.equalTo("nftobjectId", nftobjectid);
        const deleteObject = await queryNFTs.first();
        
        if(deleteObject){
            deleteObject.destroy().then(
                (myObject) => {
                  // The object was deleted from the Moralis Cloud.
                  return myObject;
                },
                (error) => {
                  // The delete failed.
                  // error is a Moralis.Error with an error code and message.
                  return error;
                }
            );
        }
    }

    async function notify(_txt) {
        const notifydiv = document.getElementById("resultSpace");
        notifydiv.innerHTML = `<input disabled = "true" id="result" type="text" class="form-control" placeholder="Description" aria-label="URL" aria-describedby="basic-addon1" value="${_txt}">`;
    }

    if (tokenId != null) {
        return (
            <>
                <p># your token ID : {web3.utils.hexToNumber(tokenId)}</p>
                <p>itemDetailPage item ID : {id}</p>
                <img src={nft?.imageURI} />
                <button onClick={buyNFT}>구매하기</button>
                <div id="resultSpace">
                    <input disabled = "true" id="result" type="text" class="form-control" placeholder="Description" aria-label="URL" aria-describedby="basic-addon1" value="Transaction 진행 이전"></input>
                </div>
            </>
        );
    } else {
        return (
            <>
                <p>
                    로딩중입니다. 로딩이 길어질 경우 아래의 경우일 수 있으니
                    확인해주세요
                </p>
                <hr />
                <p>1. 해당 컨트랙트가 종료되지 않았을 경우</p>
                <p>
                    2. DB가 오래된 버전을 사용해 데이터를 포함하지 않고 있을
                    경우
                </p>
                <p>
                    3. 모종의 문제로 DB에는 올라갔으나 체인상에 등재되지 않은
                    경우
                </p>
            </>
        );
    }
}
export default MarketPlaceItemBuy;

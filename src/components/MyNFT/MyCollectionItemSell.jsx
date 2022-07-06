import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Web3 from "web3";
import { useMoralisDapp } from "../../providers/MoralisDappProvider/MoralisDappProvider";
import useMoralisProvider from "../../hooks/useMoralisProvider";
import useNFTInfoProvider from "../../hooks/useNFTInfoProvider";

function MyCollectionItemSell() {
    const { walletAddress } = useMoralisDapp();
    const { id } = useParams();
    const [nft, setNft] = useState();
    const [tokenId, setTokenId] = useState(null);
    const [contractAddress, setContractaddress] = useState(null);

    const web3 = new Web3(window.ethereum);
    const MoralisProvider = useMoralisProvider();
    const { NFTMarketPlaceAddress, NFTContractAddress, OPWalletPrivateKey, NFTMarketPlaceABI } = useNFTInfoProvider();
    
    const marketPlace = new web3.eth.Contract(NFTMarketPlaceABI, NFTMarketPlaceAddress);

    useEffect(() => {
        if (!walletAddress) return;
        getNFTs().then((response) => {
            setNft(response);
        });
    }, [walletAddress]);

    async function getNFTs() {
        const dataFormed = await MoralisProvider.moralisNFTSQueryEqualTo("NFTs", {
            paramKey : "objectId",
            paramValue : id 
            });
        
        const receipt = await web3.eth.getTransactionReceipt(dataFormed.tx);
        if (receipt == null) {
            setTokenId(null);
        } else {
            console.log(receipt);
            setTokenId(receipt.logs[0].topics[3]);
            setContractaddress(NFTContractAddress);
        }
        return dataFormed;
    }

    //Sell NFT Funtion
    async function offerNFT() {
        const price = document.getElementById("price").value;

        await notify("Approval 진행 중..");
        await approveMarketPlace(contractAddress, tokenId);
        await notify("Approval 진행 완료! placeOffering 진행 중..");
        const offering = await placeOffering(contractAddress, tokenId, price);
        await notify("placeOffering 진행 완료! Moralis DB Update 진행 중..");

        const offeringId = offering["logs"][0]["topics"][1];
        const dataParam = {
            name : nft.name,
            description : nft.description,
            offerBy : nft.ownerOf,
            price : price,
            imageURI : nft.imageURI,
            tx : nft.tx,
            offeringId : offeringId,
            nftobjectID : id
        }
        await MoralisProvider.moralisObjectDataSave("Offerings", dataParam);

        await notify("Transaction 완료!");
    }
    
    async function approveMarketPlace(hostContract, tokenId) {
        const encodedFunction = web3.eth.abi.encodeFunctionCall(
            {
                name: "approve",
                type: "function",
                inputs: [
                    { type: "address", name: "to" },
                    { type: "uint256", name: "tokenURI" },
                ],
            },
            [NFTMarketPlaceAddress, tokenId]
        );

        const transactionParameters = {
            to: hostContract,
            from: window.ethereum.selectedAddress,
            data: encodedFunction,
        };
        const txt = await window.ethereum.request({
            method: "eth_sendTransaction",
            params: [transactionParameters],
        });
        return txt;
    }

    async function placeOffering(_hostContract, _tokenId, _price) {
        const params = {
            hostContract: _hostContract,
            offerer: window.ethereum.selectedAddress,
            tokenId: _tokenId,
            price: _price,
        };

        const signedTransaction = await _placeOffering(params);
        const fulfillTx = await web3.eth.sendSignedTransaction(
            signedTransaction.rawTransaction
        );
        return fulfillTx;
    }

    async function _placeOffering(params)
    {
        const hostContract = params.hostContract;
        const offerer = params.offerer;
        const tokenId = params.tokenId;
        const price = params.price;

        const functionCall = marketPlace.methods.placeOffering(offerer,hostContract,tokenId,web3.utils.toWei(price,"ether")).encodeABI();
        const transactionBody = {
              to: NFTMarketPlaceAddress,
              data:functionCall,
              gas:400000,
        }

        const signedTransaction = await web3.eth.accounts.signTransaction(transactionBody, OPWalletPrivateKey);
        return signedTransaction;
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
                <input
                    id="price"
                    type="text"
                    class="form-control"
                    placeholder="price"
                    aria-label="URL"
                    aria-describedby="basic-addon1"
                />
                <button onClick={offerNFT}>판매하기</button>
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

export default MyCollectionItemSell;

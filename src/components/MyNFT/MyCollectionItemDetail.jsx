import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMoralisDapp } from "../../providers/MoralisDappProvider/MoralisDappProvider";
import useMoralisProvider from "../../hooks/useMoralisProvider";
import useNFTInfoProvider from "../../hooks/useNFTInfoProvider";
import Web3 from "web3";
import ModalSell from "./ModalSell";
import SkinView3dMouseWheel from "../../hooks/SkinView3dMouseWheel";

function MyCollectionItemDetail() {
    const { id } = useParams();
    const [nft, setNft] = useState();
    const MoralisProvider = useMoralisProvider();
    const { walletAddress } = useMoralisDapp();
    const [ notify,setnotify] = useState("");
    const [Loading, setLoading] = useState(false);

    // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
        setLoading(false);
        setnotify("");
    };
    const completeModal = (data) => {
       
        console.log("data"+ data);
       
        offerNFT(data);
    };

   
    

    useEffect(() => {
        if (!walletAddress) return;
        getNFTs().then((response) => {
            setNft(response);
        });
    }, [walletAddress]);

  

    const [tokenId, setTokenId] = useState(null);
    const [contractAddress, setContractaddress] = useState(null);
    const web3 = new Web3(window.ethereum);

    const { NFTMarketPlaceAddress, NFTContractAddress, OPWalletPrivateKey, NFTMarketPlaceABI } = useNFTInfoProvider();
    
    const marketPlace = new web3.eth.Contract(NFTMarketPlaceABI, NFTMarketPlaceAddress);


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
    async function offerNFT(fromdata) {
   
       
        let price = fromdata;
        await setLoading(true);

        await setnotify("Approval 진행 중..");
        await approveMarketPlace(contractAddress, tokenId);
        await setnotify("Approval 진행 완료! placeOffering 진행 중..");
        const offering = await placeOffering(contractAddress, tokenId, price);
        await setnotify("placeOffering 진행 완료! Moralis DB Update 진행 중..");

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

        await setnotify("Transaction 완료!");

        await setLoading(false);
        await setModalOpen(false);
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

    

    return (
        <div >
            
            <div className="my-form-group">
                <div className="imgcontent">
                    <div >
                        <label className="wrap_preview" for="file" >
                            <div className="preview_image">
                                {/* <img src={nft?.imageURI} /> */}
                                {/* <SkinView3d imgLink={nft?.imageURI} width={500} height={500} /> */}
                                <SkinView3dMouseWheel imgLink={nft?.imageURI} width={500} height={500} />
                            </div>
                        </label>
                    </div>
                </div>

                <div className="itemContent">
                            <h3>{nft?.name}</h3>
                            <br/>
                            <div className="owner_area">
                                    <p >Owner:&nbsp; </p>
                                    <p>{nft?.ownerOf}</p>
                                </div>


                            <h5>작품설명</h5>
                            <div className="description_area" >
                            
                                <p> {nft?.description}</p>
                            </div>
                          
                                <div className="mydetail_btn_group"> 
                                <button className="btn btn-primary" onClick={openModal}><p>Sell</p></button>
                            
                                </div>
                             


                </div>
                <ModalSell open={modalOpen} close={closeModal} completeModal={completeModal} header={notify} Loading={Loading}>
                 
                </ModalSell>
            </div>

         
        </div>
      
    );
}

export default MyCollectionItemDetail;

import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useMoralisDapp } from "../../providers/MoralisDappProvider/MoralisDappProvider";
import useMoralisProvider from "../../hooks/useMoralisProvider";

function MyCollectionItemDetail() {
    const { id } = useParams();
    const [nft, setNft] = useState();
    const MoralisProvider = useMoralisProvider();
    const { walletAddress } = useMoralisDapp();

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

        return dataFormed;
    }
    return (
        <div >
            <div className="my-form-group">
                <div className="imgcontent">
                    <div >
                        <label className="wrap_preview" for="file" >
                            <div className="preview_image">
                                <img src={nft?.imageURI} />
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
                                <NavLink to={`/myCollection/${id}/sell`} ><button className="btn btn-primary"><p>Sell</p></button></NavLink>
                            
                                </div>
                             

               
                </div>
            </div>

         
        </div>
      
    );
}

export default MyCollectionItemDetail;

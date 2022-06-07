import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useMoralisDapp } from "../../providers/MoralisDappProvider/MoralisDappProvider";
import useMoralisProvider from "../../hooks/useMoralisProvider";
import "../../static/css/Create.css";
import SkinView3d from "../../hooks/SkinView3d";

function MarketPlaceItemDetail() {
    const { id } = useParams();
    const [nft, setNft] = useState();
    const { walletAddress } = useMoralisDapp();
    const MoralisProvider = useMoralisProvider();

    useEffect(() => {
        if (!walletAddress) return;
        getNFTs().then((response) => {
            setNft(response);
        });
    }, [walletAddress]);

    async function getNFTs() {
        const dataFormed = await MoralisProvider.moralisOfferingsQueryEqualTo("Offerings", {
            paramKey : "objectId",
            paramValue : id 
            });

        return dataFormed;
    }

    return (
        <>
        <div className="form-group">
            <div className="imgcontent">
                <div >
                    <label className="wrap_preview" for="file" >
                        <div className="preview_image">
                            {/* <img src={nft?.imageURI} /> */}
                            <SkinView3d imgLink={nft?.imageURI} width={500} height={500} />
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
                     
                        <div className="price_area">
                            <div className="sale_price">
                                <h5>판매가액:&nbsp;</h5>
                                <p>{nft?.price}</p>
                            </div>

                            <div className="charge_price">
                                <h5>예상 수수료:&nbsp;</h5>
                                <p>0.00</p>
                            </div>

                            <div className="total_price">
                                <h5>총 금액: &nbsp;</h5>
                                <p>{nft?.price}</p>
                            </div>
                           
                        </div>
            </div>
        </div>

        <div className="owner_buy_area">
             <div className="buy_btn_group"> 
                <NavLink to={`/MarketPlace/${id}/buy`}><button className="btn btn-primary"><p>Buy</p></button></NavLink>
            </div>
        </div>
        </>
    );
}

export default MarketPlaceItemDetail;

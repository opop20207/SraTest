import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useMoralis } from "react-moralis";
import { useMoralisDapp } from "../../providers/MoralisDappProvider/MoralisDappProvider";
import "../../static/css/Create.css";


function MarketPlaceItemDetail() {
    const { id } = useParams();
    const { Moralis } = useMoralis();
    const [nft, setNft] = useState();
    const { walletAddress } = useMoralisDapp();

    

    useEffect(() => {
        if (!walletAddress) return;
        getNFTs().then((response) => {
            setNft(response);
        });
    }, [walletAddress]);

    async function getNFTs() {
        const queryNFTs = new Moralis.Query("Offerings");
        queryNFTs.equalTo("objectId", id);
        const data = await queryNFTs.find();
        console.log(data);
        const dataFormed = {
            id: data[0].id,
            name: data[0].get("name"),
            description: data[0].get("description"),
            imageURI: data[0].get("imageURI"),
            ownerOf: data[0].get("offerBy"),
            price: data[0].get("price"),
        };
        console.log("!@!@#!@#@");
        console.log(nft);
        return dataFormed;
    }
    return (
        <>
        
       

        <div className="form-group">
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

import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";
import { useMoralisDapp } from "../providers/MoralisDappProvider/MoralisDappProvider";
import MarketPlaceItem from "./MarketPlace/MarketPlaceItem";
import "../static/css/MarketPlace.css";

function MarketPlace(){
    const { Moralis } = useMoralis();
    const [products, setproducts] = useState([]);
    const [Loading, setLoading] = useState(true);
    const { walletAddress } = useMoralisDapp();

    useEffect(() => {
        if (!walletAddress) return;
        getOfferings().then((response) => {
            setproducts(response);
            setLoading(false);
        });
    }, [walletAddress]);

    async function getOfferings() {
        const queryOfferings = new Moralis.Query("Offerings");
        queryOfferings.descending("updatedAt");
        const datas = await queryOfferings.find();
        let dataFormedArray = [];
        for (let i = 0; i < datas.length; i++) {
            const dataFormed = {
                id: datas[i].id,
                name: datas[i].get("name"),
                price: datas[i].get("price"),
                description: datas[i].get("description"),
                imageURI: datas[i].get("imageURI"),
                offerBy: datas[i].get("offerBy"),
            };
            dataFormedArray.push(dataFormed);
        }
        return dataFormedArray;
    }


    const Tags = [ "man","women","warrier"];

   
 
    return (

        <>

            <h2 className="markettitle"> MineCraft Avatar</h2>
            <h5 className="tagtitle">Hot tags</h5>
            <div className="TagSearch">
                <div className="Tags">
                    {
                       Tags.map( (tag) => (
                        <div className="tagitem">
                
                        { tag}
                        </div>
                       ))
                    }

                </div>
                <div className="Search">
                
                    <input
                        id="searchitem"
                        type="text"

                        placeholder="search item"
                    />

                    <button type="button">
                        <img src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png" ></img>
                    </button>
                </div>
            </div>


            <div className="PageContent">

                <div className="filter">
                    <h3>Filter</h3>
                  
                </div>
                
                <div className="vertical-line"/>
             
                <div className="itemlist">
                  
                
                    {Loading ? 
                      <div id="loading">
                          <div class="spinner"></div>
                          <strong>Loading...</strong>
                          </div>
                     :
                    <MarketPlaceItem products={products} />
                    }
                </div>
                
            </div>
            
        
       
        </>
       
    );
}

export default MarketPlace
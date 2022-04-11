import { useMoralis } from "react-moralis";
import { useEffect,useState } from "react";
import Web3 from "web3";
import ItemCollection from "./ItemColletion";
function MyCollection() {
    const { authenticate, Moralis, isAuthenticated, user } = useMoralis();
    const [products, setproducts] = useState([]);
    const [ Loading , setLoading] = useState(true);

     useEffect(() => {
        getNFTs().then( (response) => {
            //console.log(response);
           setproducts(response);
            setLoading(false);
          
        });
     },[]);

    async function getNFTs() {
        const queryNFTs = new Moralis.Query("NFTs");
        const queryHave = new Moralis.Query("Have");

        if(user != null){
            queryHave.equalTo("userID", user.get("accounts").toString());
            const queryHaveByUser = await queryHave.find();
            let nftArray = [];
            for (let i = 0; i < queryHaveByUser.length; i++) {
                const temp = queryHaveByUser[i].get("imageURI");
                const queryExactNFT = queryNFTs.equalTo("imageURI", temp);
                const exactNFT = await queryExactNFT.find();
                const nft = {
                    name: exactNFT[0].get("name"),
                    description: exactNFT[0].get("description"),
                    imageURI: exactNFT[0].get("imageURI"),
                    userID: user.get("accounts").toString,
                    createdAt: exactNFT[0].get("createdAt"),
                };
                nftArray.push(nft);
            }
        

    
        return nftArray;
        }
    }

    async function populateNFTs() {
      
        const localNFTs = await getNFTs().then(function (data) {
            let nftDisplays = getNFTObjects(data);
            //console.log(data);
            displayUserNFTs(nftDisplays);
        });
    }

    function displayUserNFTs(data) {
        let entryPoint = 0;
        let rowId = 0;
        for (let i = 0; i < data.length; i += 5) {
           
           
        }
    }

    function cleanNFTList() {
        
    }

    function generateNFTDisplay(id, uri) {
        const nftDisplay = `<div id="${id}" class="col-lg-4 text-center">
                            ${id}
                            <img src=${uri} class="img-fluid rounded" style="max-width: 30%">
                            <button id="button_${id}" class="btn btn-dark" onclick="selectNFT(this);">Select</button>
                        </div>`;
        return nftDisplay;
    }

    function getNFTObjects(array) {
        let nfts = [];
        for (let i = 0; i < array.length; i++) {
            nfts.push(generateNFTDisplay(array[i].name, array[i].imageURI));
        }
        return nfts;
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
           
           <ItemCollection products={products}/>

          
         
         
            </div>
        </div>
    );
    
  
}

export default MyCollection;

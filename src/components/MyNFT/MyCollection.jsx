import { useMoralis } from "react-moralis";
import Web3 from "web3";
function MyCollection() {
    const { authenticate, Moralis, isAuthenticated, user } = useMoralis();

    async function getNFTs() {
        const queryNFTs = new Moralis.Query("NFTs");
        const queryHave = new Moralis.Query("Have");

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

    async function populateNFTs() {
        cleanNFTList();
        const localNFTs = await getNFTs().then(function (data) {
            let nftDisplays = getNFTObjects(data);
            console.log(data);
            displayUserNFTs(nftDisplays);
        });
    }

    function displayUserNFTs(data) {
        let entryPoint = 0;
        let rowId = 0;
        for (let i = 0; i < data.length; i += 5) {
            let row = `<div id="row_${rowId}" class="row"></div>`;
            document.getElementById("NFTLists").innerHTML += row;
            for (let j = entryPoint; j <= entryPoint + 2; j++) {
                if (j < data.length) {
                    document.getElementById("row_" + rowId).innerHTML +=
                        data[j];
                }
            }
        }
    }

    function cleanNFTList() {
        document.getElementById("NFTLists").innerHTML = "";
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

    populateNFTs();
    return (
        <div class="temp">
            <p>MyCollecion</p>
            <p>kkk</p>
            <div id="NFTLists" class="container"></div>
        </div>
    );
}

export default MyCollection;

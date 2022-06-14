import { useState } from "react";
import { useMoralis } from "react-moralis";
import Web3 from "web3";
import { useMoralisDapp } from "../../providers/MoralisDappProvider/MoralisDappProvider";
import "../../static/css/Create.css";
import useMoralisProvider from "../../hooks/useMoralisProvider";
import useNFTInfoProvider from "../../hooks/useNFTInfoProvider";
import SkinView3dMouseWheel from "../../hooks/SkinView3dMouseWheel";

function CreateNft() {
    const { authenticate, isAuthenticated, Moralis } = useMoralis();
    const web3 = new Web3(Web3.givenProvider);
    const MoralisProvider = useMoralisProvider();
    const { NFTContractAddress } = useNFTInfoProvider();

    const { walletAddress } = useMoralisDapp();
    const [ preImage , setpreImage] = useState("");
    const [hoverImg , sethoverImg] = useState("visible");

    async function upload() {
        const fileInput = document.getElementById("file");
        const data = fileInput.files[0];
        const imageFile = new Moralis.File(data.name, data);
        document.getElementById("upload").setAttribute("disabled", null);
        document.getElementById("file").setAttribute("disabled", null);
        document.getElementById("name").setAttribute("disabled", null);
        document.getElementById("description").setAttribute("disabled", null);
        await imageFile.saveIPFS();

        const imageURI = imageFile.ipfs();
        const metadata = {
            name: document.getElementById("name").value,
            description: document.getElementById("description").value,
            image: imageURI,
        };

        const metadataFile = new Moralis.File("metadata.json", {
            base64: btoa(JSON.stringify(metadata)),
        });
        await metadataFile.saveIPFS();

        const metadataURI = metadataFile.ipfs();
        const tx = await mintToken(metadataURI);

        const name = document.getElementById("name").value;
        const description = document.getElementById("description").value;
        const dataParam = {
            name : name,
            description : description,
            imageURI : imageURI,
            ownerOf : walletAddress,
            createdBy : walletAddress,
            tx : tx
        }
        await MoralisProvider.moralisObjectDataSave("NFTs", dataParam);
    }

    async function mintToken(_uri) {
        const encodedFunction = web3.eth.abi.encodeFunctionCall(
            {
                name: "mintToken",
                type: "function",
                inputs: [
                    {
                        type: "string",
                        name: "tokenURI",
                    },
                ],
            },
            [_uri]
        );

        const transactionParameters = {
            to: NFTContractAddress,
            from: walletAddress,
            data: encodedFunction,
        };
        const txt = await window.ethereum.request({
            method: "eth_sendTransaction",
            params: [transactionParameters],
        });
        console.log(txt);
        return txt;
    }

    async function notify(_txt) {
        document.getElementById(
            "resultSpace"
        ).innerHTML = `<input disabled = "true" id="result" type="text" class="form-control" placeholder="Description" aria-label="URL" aria-describedby="basic-addon1" value="Your NFT was minted in transaction ${_txt}">`;
    }

    function readImage(e) {
        const reader = new FileReader();
        //const previewImage = document.getElementById("preview-image");
       
        // 이미지가 로드가 된 경우
        if(e.target.files && e.target.files[0]){
        
            reader.onload = (e) => {
          
               // previewImage.src = e.target.result;
                setpreImage(e.target.result);
                sethoverImg("hidden")
            };
            // reader가 이미지 읽도록 하기
            reader.readAsDataURL(e.target.files[0]);
        }
        else{
            //previewImage.src = "";
        }
    }
    // input file에 change 이벤트 부여

    if (!isAuthenticated) {
        return (
            <div>
                <h1>로그인부터하셈 ㅋㅋ</h1>
                <button onClick={() => authenticate()}>Connect MetaMask</button>
            </div>
        );
    }

    function hoverInenvet () {
       if( preImage !=""){ sethoverImg("visible")}
    }
    function hoverOutenvet () {
       if(preImage != "") { sethoverImg("hidden") }
    }

    return (
        <>
            <div class="mb-3">
                <h2 className="pageName">스킨 NFT Create</h2>
                <div class="form-group">
                   <div className="imgcontent">
                        <div >
                            <input
                                type="file"
                                name="file"
                                id="file"
                                class="inputfile"
                                onChange={readImage}
                            /> 
                            <label className="wrap_preview" for="file"  onMouseOver={ () => hoverInenvet()} onMouseOut = { () => hoverOutenvet()}>
                                <div className="preview_image">
                                {/* { preImage != "" ?  <img  id="preview-image" src = { preImage} /> :  "" } */}
                                { preImage != "" ?  <SkinView3dMouseWheel  imgLink = { preImage} width={500} height={500} /> :  "" }
                                </div>
                         
                                <div className="default_image">

                                <img style ={{visibility: hoverImg }} src = {process.env.PUBLIC_URL + '/imgs/picture_icon.png'}/>
                                </div>
                            </label>
                        </div>
                   </div>
                   
                    <div className="inputContent">
                        <div>
                            <input
                                id="name"
                                type="text"
                                class="form-control form-control-lg"
                                placeholder="NFT Name"
                                aria-label="URL"
                                aria-describedby="basic-addon1"
                              
                            />
                        </div>
                        <div >
                    
                            <textarea
                             id="description"
                             type="text"
                             class="form-control"
                             placeholder="Description"
                             rows={10}/>

                        </div>

                        <div>
                        <select class="form-select" aria-label="Default select example">
                            <option selected>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                            </select>
                        </div>

                        <div>
                    
                        <button
                            class="btn btn-primary"
                            id="upload"
                            onClick={upload}>
                            Upload and Mint
                         </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateNft;

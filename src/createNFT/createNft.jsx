

function CreateNft(){

    return(
        <div class="container">
           
                <h1>Mint NFT</h1>
               
                <div class="mb-3">
                    <div>  
                    <button class="btn btn-primary" id="submit" onclick="login();">Connect MetaMask</button>
                    </div>
                </div>
               
                <div class="mb-3">      
                <div class="form-group">
                    <div class="input-group mb-3">
                    <input id="name" type="text" class="form-control" placeholder="NFT Name" aria-label="URL" aria-describedby="basic-addon1"/>
                    </div>
                    <div class="input-group mb-3">
                    <input id="description" type="text" class="form-control" placeholder="Description" aria-label="URL" aria-describedby="basic-addon1"/>
                    </div>
                    <div class="input-group mb-3">
                    <input type="file" id="file"/>
                    </div>
                </div>
                <div>  
                    <button class="btn btn-primary" id="upload" onclick="upload();">Upload and Mint</button>
                </div>
                
                    <div class="input-group mb-3" id="resultSpace">
                    </div>
                </div> 
               
         
        </div>
    );
}

export default CreateNft
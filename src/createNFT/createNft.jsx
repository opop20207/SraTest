import { useMoralis,saveFile } from "react-moralis";
import { Button } from "react-bootstrap";
 
import "../static/css/Create.css"

function CreateNft(){
    
    const { authenticate, isAuthenticated, user } = useMoralis();


    function upload() {
        console.log('업로드 함수')

        //사진 올리기 함수 
        
     }

     function readImage(e) {

        console.log("ghcnfdhlsk")
        // 인풋 태그에 파일이 있는 경우  

            console.log( e.target)
            // 이미지 파일인지 검사 (생략)
            // FileReader 인스턴스 생성
            const reader = new FileReader()
            // 이미지가 로드가 된 경우
            reader.onload = e => {
                const previewImage = document.getElementById("preview-image")
                previewImage.src = e.target.result
            }
            // reader가 이미지 읽도록 하기
            reader.readAsDataURL( e.target.files[0])
        
    }
    // input file에 change 이벤트 부여

  if (!isAuthenticated) {
    return (
      <div >
       <h1>로그인부터하셈 ㅋㅋ</h1>
       <button onClick={() => authenticate()}>Connect MetaMask</button>
      </div>
    );
  }

    return(
        <div class="container">
           
                <h1>Mint NFT</h1>
               
                
               
                <div class="mb-3">      
                <div class="form-group">
                    <div class="input-group mb-3">
                    <input id="name" type="text" class="form-control" placeholder="NFT Name" aria-label="URL" aria-describedby="basic-addon1"/>
                    </div>
                    <div class="input-group mb-3">
                    <input id="description" type="text" class="form-control" placeholder="Description" aria-label="URL" aria-describedby="basic-addon1"/>
                    </div>
                    <div class="input-group mb-3">
                       
                         <input type="file" name="file" id="file" class="inputfile" onChange={readImage} />
                         <label for="file">Choose a file</label>
                         <img  id="preview-image"/>
                       
                    </div>
                </div>
                <div>  
                  
                    <button class="btn btn-primary" id="upload" onClick={upload}>Upload and Mint</button>
                </div>
                
                    <div class="input-group mb-3" id="resultSpace">
                    </div>
                </div> 
               
         
        </div>
    );
}


export default CreateNft
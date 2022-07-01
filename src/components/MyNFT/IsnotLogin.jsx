import '../../static/css/MyCollection.css';

function IsnotLogin(props){

   
    const { authenticateclick } = props;
    return(
       
        <div className='loginBody'>

            <div className='loginContent'>

                <h1>Sign in to your wallet.</h1>
                <br/>
                <br/>
                <img src= { process.env.PUBLIC_URL+"/imgs/metamask_img.png"}/>
                <button  class="btn btn-primary" id="upload" onClick={ authenticateclick}>Connect MetaMask</button>
           
                <br/>
                <p>클로넨스는 메타마스크를 통한 계정 연동을 지향합니다</p>
            </div>
               
             
        </div>
    );
}

export default  IsnotLogin

import { useMoralis } from "react-moralis";


function LoginMeta(){

  const { authenticate, isAuthenticated } = useMoralis();
  

  if (!isAuthenticated) {
    return (
      <div>
        <button onClick={() => authenticate()}>Connect MetaMask</button>
      </div>
    );
  }
 
  return(
        <>
        <div>  

              

       <p>로그인 성공</p>
      </div>
        </>
        
    );
}
export default LoginMeta



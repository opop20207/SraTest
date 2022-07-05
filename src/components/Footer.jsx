import "../static/css/Footer.css";

function Footer(){

    return(
        <div className="footerContent">
        
            <div className="usContent">
                <p>회사 소개</p>
                <ul>
                    <li><a >서비스 소개</a></li>
                    <li><a >직원 소개</a></li>
                    <li>연락처</li>
                    <li>위치</li>
                </ul>      
            </div>

            <div className="questContent">
            <p>문의사항</p>
             
                <ul>
                    <li> <a>FAQ</a></li>
        
                    <li>문의하기 </li>
                </ul>
            </div>

            <div className="lawContent">
            <p>이용약관</p>
              
                <ul>
                    <li> <a>개인정보처리방침</a></li>
                    <li> <a>홈페이지 이용약관</a></li>
                </ul>
            </div>

            <div className="relativeContent">
            <p>관련 사이트</p>
                
                <ul>
                    <li> <a>metamask</a></li>
            
                </ul>
            </div>
        
        </div>
    );
}

export default Footer
import React, { PureComponent, useState } from 'react';
import '../../static/css/ModalSell.css';
import "../../static/css/MarketPlace.css";

function ModalSell(props){


    const [price, setprice] = useState(0);
   
    const { open, close, header, Loading} = props;
      
   

    const handleChange = (e) => {
        console.log("핸들러 작동"+price)
        setprice(e.target.value);
       
    };

    const handleSubmit = (e) => {
        e.preventDefault(); //새로고침 방지
        console.log("전달함수 작동"+price)
        props.completeModal(price);
      };


  
        // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
        return (
      
             // 모달이 열릴때 openModal 클래스가 생성된다.
             <div className={open ? 'openModal modal' : 'modal'}>
             {open ? (
                 <section>
                 <header>
                 <p>판매하기</p>
                     <button className="close" onClick={close}>
                     &times;
                     </button>
                 </header>
                 <main>
            

                    {header}

                    {Loading ? 
                     <div id="loading">
                        <div class="spinner"></div>
                        </div>
                        : <></>}
                 </main>
                 <footer>
                     

                     <input
                     id="price"
                     type="text"
                     onChange={handleChange}
                     class="form-control"
                     placeholder="price"
                     aria-label="URL"
                     aria-describedby="basic-addon1"
                 />
                 <button  onClick={ handleSubmit }>판매하기</button>
                 </footer>
                 </section>
             ) : null}
             </div>
           
          
        );
      

}
export default ModalSell;




import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "../static/css/Main.css";

function Main(){
    // const imgSliders=[
    //     {src: "/imgs/mainback1.jpg"},
    //     {src: "/imgs/mainback2.png"},
    // ]

    // const renderSlider = () => 
    //     imgSliders.map( (imgslider, index) =>(
    //         <div key={index}>
    //             <img src = { process.env.PUBLIC_URL+imgslider.src}  style={styles.imgsliderCss}/>
    //         </div>
    //     ));
        
    return(
        <div className='mainPage'>
            {/* <StlyedSlider {...settings}>
            {renderSlider()}
            </StlyedSlider> */}
            <div className='mFCback'>
                <div className='mainFirstContent'>
                                <div className='mFCtitle'>
                                    <h1>당신의 스킨을 NFT로  </h1><h1>만들어 보세요!</h1>
                                    <p>수 많은 유저들의 스킨을 둘러보고 구매하세요</p>
                                    <button className='intoCreateBtn' id='intoCreateBtn'>Create NFT</button>
                                </div>

                                <div className='mFCimgContent'>

                                </div>

                                
                            </div>
            </div>
           
        </div>
  );
}

// const settings={
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplaySpeed: 3000,
//     autoplay : true,
//     centerMode: true,
//     centerPadding: '0px',
// };

// const StlyedSlider = styled(Slider)`
//     .slick-list {
//         width: 1000px;
//         height: 600px;
//         margin: 50px auto;
//     }
// `
// const styles ={
//     imgsliderCss:{
//         height: "100%",
//         width: "400px",
//         objectFit: "contain",
//     }
// }

export default Main
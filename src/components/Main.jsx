import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


function Main(){
    const imgSliders=[
        {src: "/imgs/mainback1.jpg"},
        {src: "/imgs/mainback2.png"},
    ]

    const renderSlider = () => 
        imgSliders.map( (imgslider, index) =>(
            <div key={index}>
                <img src = { process.env.PUBLIC_URL+imgslider.src}  style={styles.imgsliderCss}/>
            </div>
        ));
        
    return(
        <div>
            <StlyedSlider {...settings}>
            {renderSlider()}
            </StlyedSlider>
        </div>
  );
}

const settings={
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
    autoplay : true,
    centerMode: true,
    centerPadding: '0px',
};

const StlyedSlider = styled(Slider)`
    .slick-list {
        width: 1600px;
        height: 800px;
        margin: 0 auto;
    }
`
const styles ={
    imgsliderCss:{
        height: "100%",
        width: "100%",
        objectFit: "contain",
    }
}

export default Main
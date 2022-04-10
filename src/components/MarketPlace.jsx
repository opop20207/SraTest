import Item from './MarketPlace/Item'


function Loaditems() {

    var items=[
        {
        img: "http://placeimg.com/340/280/people/sepia",
        title: "더미 타이틀",
        price: "더미 가격",
        goods: "더미 좋아요"
        },
        {
            img: "http://placeimg.com/340/280/people/sepia",
            title: "더미 타이틀",
            price: "더미 가격",
            goods: "더미 좋아요"
        },
        {
            img: "http://placeimg.com/340/280/people/sepia",
            title: "더미 타이틀",
            price: "더미 가격",
            goods: "더미 좋아요"
        },
        {
            img: "http://placeimg.com/340/280/people/sepia",
            title: "더미 타이틀",
            price: "더미 가격",
            goods: "더미 좋아요"
        }

    ]

   

    return items
}

function MarketPlace(){
   

    var products=Loaditems();

    return(
        <>  
 
        <p>마켓입니다dsadas</p>
        <Item products={products}/>
        </>
      
    );
}

export default MarketPlace
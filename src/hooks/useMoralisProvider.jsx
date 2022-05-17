import { useMoralis } from "react-moralis";

/*

 [ useMoralisProvider ]
   + moralisNFTSQueryEqualTo(query, equalToParams) 
     : Moralis DB에 table에서 쿼리를 날려 equalToParams와 같은 객체를 가져옵니다
   + moralisOfferingsQueryEqualTo(query, equalToParams)
     : 위와 동일. 다만 반환형이 달라 우선 분리해놨으나 추후 가능시 통합 예정
   + moralisObjectDataSave(table, Params)
     : Mralis DB에 table에 Params 내용 추가
    
*/

function useMoralisProvider() {
    const { Moralis } = useMoralis();
  
    async function _moralisNFTSQueryEqualTo(table, equalToParams)
    {
        const queryNFTs = new Moralis.Query(table);
        queryNFTs.equalTo(equalToParams.paramKey, equalToParams.paramValue);
        const data = await queryNFTs.find();

        const dataFormed = {
            id: data[0].id,
            name: data[0].get("name"),
            description: data[0].get("description"),
            imageURI: data[0].get("imageURI"),
            ownerOf: data[0].get("ownerOf"),
            tx: data[0].get("tx"),
        };

        return dataFormed;
    }

    async function _moralisOfferingsQueryEqualTo(table, equalToParams)
    {
        const queryNFTs = new Moralis.Query(table);
        queryNFTs.equalTo(equalToParams.paramKey, equalToParams.paramValue);
        const data = await queryNFTs.find();
        const dataFormed = {
            id: data[0].id,
            name: data[0].get("name"),
            description: data[0].get("description"),
            imageURI: data[0].get("imageURI"),
            offerBy: data[0].get("offerBy"),
            price: data[0].get("price"),
            tx: data[0].get("tx"),
            offeringId: data[0].get("offeringId"),
            objectId: data[0].get("nftobjectId"),
        };

        return dataFormed;
    }

    async function _moralisObjectDataSave(table, Params)
    {
      /*
          + moralisObjectDataSave
              : Moralis Server에 받은 Params를 바탕으로 table 테이블에 데이터 추가
      */
      const paramEntries = Object.entries(Params);
      const savedData = new Moralis.Object(table);

      Object.entries(paramEntries).forEach(element => {
          savedData.set(element[1][0], element[1][1]);
      });

      await savedData.save();
    }

    return {
      moralisNFTSQueryEqualTo : _moralisNFTSQueryEqualTo,
      moralisOfferingsQueryEqualTo : _moralisOfferingsQueryEqualTo,
      moralisObjectDataSave : _moralisObjectDataSave
    };
}

export default useMoralisProvider;

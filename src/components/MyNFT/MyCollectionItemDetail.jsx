import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useMoralisDapp } from "../../providers/MoralisDappProvider/MoralisDappProvider";
import useMoralisProvider from "../../hooks/useMoralisProvider";

function MyCollectionItemDetail() {
    const { id } = useParams();
    const [nft, setNft] = useState();
    const MoralisProvider = useMoralisProvider();
    const { walletAddress } = useMoralisDapp();

    useEffect(() => {
        if (!walletAddress) return;
        getNFTs().then((response) => {
            setNft(response);
        });
    }, [walletAddress]);

    async function getNFTs() {
        const dataFormed = await MoralisProvider.moralisNFTSQueryEqualTo("NFTs", {
            paramKey : "objectId",
            paramValue : id 
            });

        return dataFormed;
    }
    return (
        <>
            <p>itemDetailPage item ID : {id}</p>
            <img src={nft?.imageURI} />
            <NavLink to={`/myCollection/${id}/sell`}>sell</NavLink>
        </>
    );
}

export default MyCollectionItemDetail;

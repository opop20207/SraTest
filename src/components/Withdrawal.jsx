import { useMoralis } from "react-moralis";
import Web3 from "web3";
import { useState } from "react";
import { Button, Modal } from "antd";
import useNFTInfoProvider from "../hooks/useNFTInfoProvider";

const styles = {
    account: {
        height: "50px",
        width: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "12px", 
        cursor: "pointer",
    },
    text: {
        color: "#21BF96",
    },
};

function Withdrawal() {
    const { authenticate, isAuthenticated } = useMoralis();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const web3 = new Web3(window.ethereum);
    const { NFTMarketPlaceAddress, NFTMarketPlaceABI } = useNFTInfoProvider();
    const marketPlace = new web3.eth.Contract(NFTMarketPlaceABI, NFTMarketPlaceAddress);
    
    async function getBalance()
    {
        const functionCall = await marketPlace.methods.viewBalances(window.ethereum.selectedAddress).call();
        const ethvalue = functionCall / 1e18;

        alert(ethvalue);
        return functionCall;
    }

    async function withdrawBalance()
    {
        const encodedFunction = web3.eth.abi.encodeFunctionCall(
            {
                name: "withdrawBalance",
                type: "function",
                inputs: [],
            },[]
        );

        const transactionParameters = {
            to: NFTMarketPlaceAddress,
            from: window.ethereum.selectedAddress,
            data: encodedFunction,
        };
        const txt = await window.ethereum.request({
            method: "eth_sendTransaction",
            params: [transactionParameters],
        });
        return txt;
    }

    if (!isAuthenticated) {
        return (
            <div
                style={styles.account}
                onClick={() =>
                    authenticate({ signingMessage: "Hello World!" })
                }>
                 <img style={{width : '30px' , height: '30px'}} src= { process.env.PUBLIC_URL+"/imgs/wallet_icon.png"}/>
            </div>
        );
    }

    return (
        <>
            <div style={styles.account} onClick={() => setIsModalVisible(true)}>
                <div style={{ marginRight: "0px", ...styles.text }}>
                <img style={{width : '30px' , height: '30px'}} src= { process.env.PUBLIC_URL+"/imgs/wallet_icon.png"}/>
                </div>
            </div>
            <Modal
                visible={isModalVisible}
                footer={null}
                onCancel={() => setIsModalVisible(false)}
                bodyStyle={{
                    padding: "15px",
                    fontSize: "17px",
                    fontWeight: "500",
                }}
                style={{ fontSize: "16px", fontWeight: "500" }}
                width="400px">
                Current Balance Checker
                <Button
                    size="large"
                    type="primary"
                    style={{
                        width: "100%",
                        marginTop: "10px",
                        borderRadius: "0.5rem",
                        fontSize: "16px",
                        fontWeight: "500",
                    }}
                    onClick={() => {
                        getBalance();
                    }}>
                    Balance Check(잔고 확인하기)
                </Button>

                <Button
                    size="large"
                    type="primary"
                    style={{
                        width: "100%",
                        marginTop: "10px",
                        borderRadius: "0.5rem",
                        fontSize: "16px",
                        fontWeight: "500",
                    }}
                    onClick={() => {
                        withdrawBalance();
                        
                    }}>
                    Withdrawal Balance(인출하기)
                </Button>
            </Modal>
        </>
    );
}

export default Withdrawal;
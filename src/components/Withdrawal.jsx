import { useMoralisDapp } from "../providers/MoralisDappProvider/MoralisDappProvider";
import { useMoralis } from "react-moralis";
import Web3 from "web3";
import { useEffect, useState } from "react";
import { Button, Card, Modal } from "antd";

const styles = {
    account: {
        height: "42px",
        padding: "0 15px",
        justifyContent: "center",
        alignItems: "center",
        width: "fit-content",
        borderRadius: "12px",
        backgroundColor: "rgb(244, 244, 244)",
        cursor: "pointer",
    },
    text: {
        color: "#21BF96",
    },
};

function Withdrawal() {
    const { authenticate, isAuthenticated, logout } = useMoralis();
    const { walletAddress, chainId } = useMoralisDapp();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [balance, setBalance] = useState();

    const web3 = new Web3(window.ethereum);
    const nft_market_place_address = "0xf3c3fce5be43fe2f56a08478455f39dcb8251dd4";
    const nft_market_place_abi = [{"inputs": [{"internalType": "address", "name": "_operator", "type": "address"}], "stateMutability": "nonpayable", "type": "constructor", "name": "constructor"}, {"anonymous": false, "inputs": [{"indexed": true, "internalType": "address", "name": "beneficiary", "type": "address"}, {"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"}], "name": "BalanceWithdrawn", "type": "event"}, {"anonymous": false, "inputs": [{"indexed": true, "internalType": "bytes32", "name": "offeringId", "type": "bytes32"}, {"indexed": true, "internalType": "address", "name": "buyer", "type": "address"}], "name": "OfferingClosed", "type": "event"}, {"anonymous": false, "inputs": [{"indexed": true, "internalType": "bytes32", "name": "offeringId", "type": "bytes32"}, {"indexed": true, "internalType": "address", "name": "hostContract", "type": "address"}, {"indexed": true, "internalType": "address", "name": "offerer", "type": "address"}, {"indexed": false, "internalType": "uint256", "name": "tokenId", "type": "uint256"}, {"indexed": false, "internalType": "uint256", "name": "price", "type": "uint256"}, {"indexed": false, "internalType": "string", "name": "uri", "type": "string"}], "name": "OfferingPlaced", "type": "event"}, {"anonymous": false, "inputs": [{"indexed": false, "internalType": "address", "name": "previousOperator", "type": "address"}, {"indexed": false, "internalType": "address", "name": "newOperator", "type": "address"}], "name": "OperatorChanged", "type": "event"}, {"inputs": [{"internalType": "address", "name": "_newOperator", "type": "address"}], "name": "changeOperator", "outputs": [], "stateMutability": "nonpayable", "type": "function"}, {"inputs": [{"internalType": "bytes32", "name": "_offeringId", "type": "bytes32"}], "name": "closeOffering", "outputs": [], "stateMutability": "payable", "type": "function"}, {"inputs": [{"internalType": "address", "name": "_offerer", "type": "address"}, {"internalType": "address", "name": "_hostContract", "type": "address"}, {"internalType": "uint256", "name": "_tokenId", "type": "uint256"}, {"internalType": "uint256", "name": "_price", "type": "uint256"}], "name": "placeOffering", "outputs": [], "stateMutability": "nonpayable", "type": "function"}, {"inputs": [{"internalType": "address", "name": "_address", "type": "address"}], "name": "viewBalances", "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}], "stateMutability": "view", "type": "function"}, {"inputs": [{"internalType": "bytes32", "name": "_offeringId", "type": "bytes32"}], "name": "viewOfferingNFT", "outputs": [{"internalType": "address", "name": "", "type": "address"}, {"internalType": "uint256", "name": "", "type": "uint256"}, {"internalType": "uint256", "name": "", "type": "uint256"}, {"internalType": "bool", "name": "", "type": "bool"}], "stateMutability": "view", "type": "function"}, {"inputs": [], "name": "withdrawBalance", "outputs": [], "stateMutability": "nonpayable", "type": "function"}];
    const marketPlace = new web3.eth.Contract(nft_market_place_abi,nft_market_place_address);
    
    
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
            to: nft_market_place_address,
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
                <p style={styles.text}>Authenticate</p>
            </div>
        );
    }

    return (
        <>
            <div style={styles.account} onClick={() => setIsModalVisible(true)}>
                <div style={{ marginRight: "0px", ...styles.text }}>
                    {"잔고 확인하기"}
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
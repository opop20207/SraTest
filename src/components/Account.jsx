import { useMoralisDapp } from "../providers/MoralisDappProvider/MoralisDappProvider";
import { useMoralis } from "react-moralis";
import Blockie from "./Blockie";
import { useState } from "react";
import { Button, Card, Modal } from "antd";
import { getExplorer, networkConfigs } from "../helpers/networks";
import Address from "./Address/Address";
import { getEllipsisTxt } from "../helpers/formatters";

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

function Account() {
    const { authenticate, isAuthenticated, logout } = useMoralis();
    const { walletAddress, chainId } = useMoralisDapp();
    const [isModalVisible, setIsModalVisible] = useState(false);

    if (!isAuthenticated) {
        return (
            <div
                style={styles.account}
                onClick={() =>
                    authenticate({ signingMessage: "Hello World!" })
                }>
              <img style={{width : '30px' , height: '30px'}} src= { process.env.PUBLIC_URL+"/imgs/islogin_icon.png"}/>
            </div>
        );
    }

    return (
        <>
            <div style={styles.account} onClick={() => setIsModalVisible(true)}>
                <Blockie currentWallet scale={3} />
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
                Account
                <Card
                    style={{
                        marginTop: "10px",
                        borderRadius: "1rem",
                    }}
                    bodyStyle={{ padding: "15px" }}>
                    <Address
                        avatar="left"
                        size={6}
                        copyable
                        style={{ fontSize: "20px" }}
                    />
                    <div style={{ marginTop: "10px", padding: "0 10px" }}>
                        <a
                            href={`${getExplorer(
                                chainId
                            )}/address/${walletAddress}`}
                            target="_blank"
                            rel="noreferrer">
                            View on Explorer
                        </a>
                    </div>
                    <div style={{ marginTop: "10px", padding: "0 10px" }}>
                        {console.log(chainId)}
                        {networkConfigs[chainId]?.chainName}
                    </div>
                </Card>
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
                        logout();
                        setIsModalVisible(false);
                    }}>
                    Disconnect Wallet
                </Button>
            </Modal>
        </>
    );
}

export default Account;

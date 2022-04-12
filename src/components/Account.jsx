import { useMoralisDapp } from "../providers/MoralisDappProvider/MoralisDappProvider";
import { useMoralis } from "react-moralis";
import Blockie from "./Blockie";
import { useState } from "react";
import { Button, Card, Modal } from "antd";
import { getExplorer } from "../helpers/networks";
import Address from "./Address/Address";
import { getEllipsisTxt } from "../helpers/formatters";

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
                <p style={styles.text}>Authenticate</p>
            </div>
        );
    }

    return (
        <>
            <div style={styles.account}>
                <p style={{ marginRight: "5px", ...styles.text }}>
                    {getEllipsisTxt(walletAddress, 6)}
                </p>
            </div>
        </>
    );
}

export default Account;

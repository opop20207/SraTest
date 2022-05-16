/*

 [ useNFTInfoProvider ]
   + getNFTMarketPlaceAddress()
   + getNFTContractAddress()
   + getOPWalletPrivateKey()
   + getNFTMarketPlaceABI()
   - Object { NFTMarketPlaceAddress, NFTContractAddress, OPWalletPrivateKey, NFTMarketPlaceABI }
   
*/

function useNFTInfoProvider() {
    const _NFTMarketPlaceAddress = "0xf3c3fce5be43fe2f56a08478455f39dcb8251dd4";
    const _NFTContractAddress = "0x3d05364012a5f131e3a32a68deba6c23041fb917";
    const _OPWalletPrivateKey = "0x1783aa931119a96ef90e60d1b8cacdb2294a8d83a3b610459d980e8166c63cf1";
    const _NFTMarketPlaceABI = [{"inputs": [{"internalType": "address", "name": "_operator", "type": "address"}], "stateMutability": "nonpayable", "type": "constructor", "name": "constructor"}, {"anonymous": false, "inputs": [{"indexed": true, "internalType": "address", "name": "beneficiary", "type": "address"}, {"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"}], "name": "BalanceWithdrawn", "type": "event"}, {"anonymous": false, "inputs": [{"indexed": true, "internalType": "bytes32", "name": "offeringId", "type": "bytes32"}, {"indexed": true, "internalType": "address", "name": "buyer", "type": "address"}], "name": "OfferingClosed", "type": "event"}, {"anonymous": false, "inputs": [{"indexed": true, "internalType": "bytes32", "name": "offeringId", "type": "bytes32"}, {"indexed": true, "internalType": "address", "name": "hostContract", "type": "address"}, {"indexed": true, "internalType": "address", "name": "offerer", "type": "address"}, {"indexed": false, "internalType": "uint256", "name": "tokenId", "type": "uint256"}, {"indexed": false, "internalType": "uint256", "name": "price", "type": "uint256"}, {"indexed": false, "internalType": "string", "name": "uri", "type": "string"}], "name": "OfferingPlaced", "type": "event"}, {"anonymous": false, "inputs": [{"indexed": false, "internalType": "address", "name": "previousOperator", "type": "address"}, {"indexed": false, "internalType": "address", "name": "newOperator", "type": "address"}], "name": "OperatorChanged", "type": "event"}, {"inputs": [{"internalType": "address", "name": "_newOperator", "type": "address"}], "name": "changeOperator", "outputs": [], "stateMutability": "nonpayable", "type": "function"}, {"inputs": [{"internalType": "bytes32", "name": "_offeringId", "type": "bytes32"}], "name": "closeOffering", "outputs": [], "stateMutability": "payable", "type": "function"}, {"inputs": [{"internalType": "address", "name": "_offerer", "type": "address"}, {"internalType": "address", "name": "_hostContract", "type": "address"}, {"internalType": "uint256", "name": "_tokenId", "type": "uint256"}, {"internalType": "uint256", "name": "_price", "type": "uint256"}], "name": "placeOffering", "outputs": [], "stateMutability": "nonpayable", "type": "function"}, {"inputs": [{"internalType": "address", "name": "_address", "type": "address"}], "name": "viewBalances", "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}], "stateMutability": "view", "type": "function"}, {"inputs": [{"internalType": "bytes32", "name": "_offeringId", "type": "bytes32"}], "name": "viewOfferingNFT", "outputs": [{"internalType": "address", "name": "", "type": "address"}, {"internalType": "uint256", "name": "", "type": "uint256"}, {"internalType": "uint256", "name": "", "type": "uint256"}, {"internalType": "bool", "name": "", "type": "bool"}], "stateMutability": "view", "type": "function"}, {"inputs": [], "name": "withdrawBalance", "outputs": [], "stateMutability": "nonpayable", "type": "function"}];

    // const getNFTMarketPlaceAddress = () => {
    //     return NFTMarketPlaceAddress;
    // }

    // const getNFTContractAddress = () => {
    //     return NFTContractAddress;
    // }

    // const getOPWalletPrivateKey = () => {
    //     return OPWalletPrivateKey;
    // }

    // const getNFTMarketPlaceABI = () => {
    //     return NFTMarketPlaceABI;
    // }

    return {
      NFTMarketPlaceAddress : _NFTMarketPlaceAddress,
      NFTContractAddress : _NFTContractAddress,
      OPWalletPrivateKey : _OPWalletPrivateKey,
      NFTMarketPlaceABI : _NFTMarketPlaceABI
    };
    
}

export default useNFTInfoProvider;

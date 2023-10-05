// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

// local imports
import { IERC1155Marketplace } from "./interfaces/IERC1155Marketplace.sol";

// openzeppelin imports
import { IERC1155 } from "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import { ERC1155Holder, ERC1155Receiver } from "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { ReentrancyGuard } from "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract ERC1155Marketplace is IERC1155Marketplace, ERC1155Holder, ReentrancyGuard, Ownable {

    /************************************

        Constants & Variables

     ***********************************/

    // constants
    uint8 public constant maxNFTsPerSale = 40; // maximum nfts that can be sold in a sale

    // variables
    uint256 public collectionsLength;

    /************************************

        Mappings & Objects

     ***********************************/

    // mappings
    mapping(address => bool) allowedCollections;
    mapping(uint256 => address) collectionIDToAddress;
    mapping(address => uint256) public salesLength; // salesLength[collectionAddress]
    mapping(address => mapping(uint256 => Sale)) sales;

    /************************************

        Constructor

     ***********************************/

    constructor() {}

    /************************************

        Modifiers

     ***********************************/

    modifier onlyCollectionAllowed(address _collectionAddress) {

        // check
        if(!allowedCollections[_collectionAddress]) {
            revert CollectionNotAllowed(_collectionAddress);
        }

        // pass
        _;

    }

    /************************************

        Internal Functions

     ***********************************/

    /**
     * @dev see {interface-_createSale (internal)}
     */
    function _createSale(
        address _collectionAddress,
        uint256 _nftID,
        uint256 _qty,
        uint256 _price
    ) internal override {

        // get length
        uint256 salesLength_ = salesLength[_collectionAddress];

        // create sale
        sales[_collectionAddress][salesLength_] = Sale(
            msg.sender,
            _nftID,
            _qty,
            _price 
        );

        // update length
        salesLength[_collectionAddress]++;

    }

    /**
     * @dev see {interface-_cancelSale (internal)}
     */
    function _cancelSale(address _collectionAddress, uint256 _saleID) internal override {

        // replace sale with last and pop it, if not the only one
        if(salesLength[_collectionAddress] > 1) { // sale is not the last one

            // get last sale
            Sale memory lastSale_ = sales[_collectionAddress][salesLength[_collectionAddress]-1];

            // move sale by its place
            sales[_collectionAddress][_saleID] = lastSale_;

        }

        // remove last sale as it's now the deleted one
        delete sales[_collectionAddress][salesLength[_collectionAddress]];

        // update length
        salesLength[_collectionAddress]--;

    }

    /**
     * @dev see {interface-_buy (internal)}
     */
    function _buy(address _collectionAddress, uint256 _saleID) internal override {

        Sale memory sale_ = sales[_collectionAddress][_saleID];

        _safeTransfer(_collectionAddress, sale_.nftID, sale_.qty, true);

        _cancelSale(_collectionAddress, _saleID);
    }

    /**
     * @notice Handle transfer of NFTs to(deposit) or from(withdrawal) this contract
     * @param _collectionAddress address of the collection
     * @param _nftID id of the nft
     * @param _qty quantity of nfts to transfer
     * @param _isWithdrawal indicates whether the transaction is a deposit(false) or a withdrawal(true)
     */
    function _safeTransfer(address _collectionAddress, uint256 _nftID, uint256 _qty, bool _isWithdrawal) internal {

        // safe transfer
        IERC1155(_collectionAddress).safeTransferFrom(
            !_isWithdrawal ? msg.sender : address(this),
            _isWithdrawal ? msg.sender : address(this),
            _nftID,
            _qty,
            ""
        );

    }

    /************************************

        External Functions (owner)

     ***********************************/

    /**
     * @notice Add a collection
     * @param _collectionAddress address of the collection
     */
    function addCollection(address _collectionAddress) external onlyOwner {
        allowedCollections[_collectionAddress] = true;

        collectionIDToAddress[collectionsLength] = _collectionAddress;

        collectionsLength++;
    }

    /************************************

        External Functions

     ***********************************/
    
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC1155Receiver)
        returns (bool)
    {
        return 
            interfaceId == type(IERC1155Marketplace).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    function getSale(address _collectionAddress, uint256 _saleID) external view returns (Sale memory) {
        return sales[_collectionAddress][_saleID];
    }

    function getCollectionById(uint256 _collectionId) external view returns (address) {
        return collectionIDToAddress[_collectionId];
    }

    /**
     * @notice Create a sale
     */
    function createSale(
        address _collectionAddress,
            uint256 _nftID,
            uint256 _qty,
            uint256 _price
    ) external nonReentrant {

        // perform deposit
        _safeTransfer(_collectionAddress, _nftID, _qty, false);

        // create sale
        _createSale(_collectionAddress, _nftID, _qty, _price);

        // emit
        emit SaleCreated(salesLength[_collectionAddress], _collectionAddress, _nftID, _qty, _price);

    }

    /**
     * @notice Cancel a sale
     * @dev see {this->_cancelSale} for description
     */
    function cancelSale(address _collectionAddress, uint256 _saleID) external nonReentrant {

        if(sales[_collectionAddress][_saleID].owner != msg.sender) {
            revert NotSaleOwner(_saleID, msg.sender, sales[_collectionAddress][_saleID].owner);
        }
        else if (sales[_collectionAddress][_saleID].owner == address(0)) {
            revert InvalidSale(_saleID);
        }

        _cancelSale(_collectionAddress, _saleID);

    }

    /**
     * @notice Buy NFTs by sale ID "_saleID"
     * @dev see {this->_buy} for description
     */
    function buy(address _collectionAddress, uint256 _saleID) external payable nonReentrant {
        Sale memory sale_ = sales[_collectionAddress][_saleID];

        if(msg.value < sale_.price) {
            revert NotEnoughFunds(sale_.price, (msg.sender).balance);
        }

        if (sales[_collectionAddress][_saleID].owner == address(0)) {
            revert InvalidSale(_saleID);
        }

        (bool sent_,) = address(sale_.owner).call{value: msg.value}("");

        require(sent_, "Failed to send ether");

        _buy(_collectionAddress, _saleID);

    }

}

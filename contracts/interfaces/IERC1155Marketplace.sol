// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

abstract contract IERC1155Marketplace {

    /************************************

        Structs

     ***********************************/
    
    struct Sale {
        address owner;
        uint256 nftID;
        uint256 qty;
        uint256 price;
    }

    /************************************

        Events

     ***********************************/

    event SaleCreated(uint256 saleID, address collectionAddress, uint256 nftID, uint256 qty, uint256 price);
    event NFTBought(address collectionAddress, uint256 qty, uint256 nftID);

    /************************************

        Errors

     ************************************/

    error NotEnoughFunds(uint256 salePrice, uint256 funds);
    error BadFormattedData(bytes data);
    error NFTNotInSale(address collectionAddress, uint256 nftID);
    error InvalidSale(uint256 saleID);
    error NotSaleOwner(uint256 saleID, address user, address owner);
    error TooManyNFTsToSell(uint256 qty, uint256 maxQty);
    error CollectionNotAllowed(address collectionAddress);

    /************************************

        Internal Functions

     ************************************/

    /**
     * @notice Create a sale
     * @param _collectionAddress collection address of the nft
     * @param _nftID ERC1155 nft ID
     * @param _qty ERC1155 quantity of this nft
     * @param _price asking price for the sale
     */
    function _createSale(
        address _collectionAddress,
        uint256 _nftID,
        uint256 _qty,
        uint256 _price
    ) internal virtual;

    /**
     * @notice Delete or Cancel a sale
     * @param _collectionAddress address of the collection
     * @param _saleID id of the sale
     */
    function _cancelSale(address _collectionAddress, uint256 _saleID) internal virtual;

    /**
     * @notice Buy NFTs by sale id
     * @param _collectionAddress address of the collection
     * @param _saleID id of the sale
     */
    function _buy(address _collectionAddress, uint256 _saleID) internal virtual;

}

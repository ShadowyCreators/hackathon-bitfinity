// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

// imports
import { ERC1155 } from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

/**************************************

    ERC1155 Token mock

 **************************************/

contract MockERC1155 is ERC1155 {

    /**************************************
    
        Constructor

     **************************************/

    constructor() ERC1155("ipfs://mock.uri") {}

    /**************************************
    
        Mint

        * @param _to receiver
        * @param _id sub collection id
        * @param _amount amount of tokens

     **************************************/

    function mint(address _to, uint256 _id, uint256 _amount) external {
        _mint(_to, _id, _amount, "");
    }

}

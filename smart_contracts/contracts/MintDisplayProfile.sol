// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";

// OpenZeppeling Imports
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


// Contract : DisplayProfileNFTs
contract DisplayProfileNFTs is ERC721, Ownable {
    using Counters for Counters.Counter;
    using Strings for uint256;

    Counters.Counter _tokenIds;
    mapping(uint256=>string) _tokenURIs;

    struct RenderToken {
        uint256 id;
        string uri;
        string space;
    }

    constructor() ERC721("DisplayProfileNFTs", "DPN") {}

    function _setTokenURI(uint256 _tokenID, string memory _tokenURI) internal {
        _tokenURIs[_tokenID] = _tokenURI;
    }

    function tokenURI(uint256 _tokenID) public view virtual override returns(string memory) {
        require(_exists(_tokenID), "URI not found for this given Token ID!");
        string memory _uri = _tokenURIs[_tokenID];

        return _uri;
    }

    function getAllTokens() public view returns(RenderToken[] memory) {
        uint256 current_tokenID = _tokenIds.current();
        RenderToken[] memory all_tokens = new RenderToken[](current_tokenID);

        for (uint256 i = 0; i < current_tokenID; i++) {
            if (_exists(i)) {
                string memory _uri = tokenURI(i);
                all_tokens[i] = RenderToken(i, _uri, " ");
            }
        }

        return all_tokens;
    }

    function mint(address recepient, string memory _uri) public returns(uint256) {
        uint256 new_tokenID = _tokenIds.current();

        _mint(recepient, new_tokenID);
        _setTokenURI(new_tokenID, _uri);

        _tokenIds.increment();

        return new_tokenID;
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MemeDapp {
    struct Meme {
        string url;
        string description;
        address submitter;
    }

    Meme[] public memes;
    event MemeUploaded(uint256 indexed id, string url, string description, address submitter);

    function uploadMeme(string memory _url, string memory _description) public {
        require(bytes(_url).length > 0, "URL cannot be empty");
        require(bytes(_description).length > 0, "Description cannot be empty");

        uint256 newMemeId = memes.length;
        memes.push(Meme(_url, _description, msg.sender));
        emit MemeUploaded(newMemeId, _url, _description, msg.sender);
    }

    function getMemeCount() public view returns (uint256) {
        return memes.length;
    }

    function getMeme(uint256 _id) public view returns (string memory, string memory, address) {
        require(_id < memes.length, "Meme does not exist");
        Meme memory meme = memes[_id];
        return (meme.url, meme.description, meme.submitter);
    }
}
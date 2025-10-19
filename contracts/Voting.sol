// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Voting {
    struct Proposal {
        string name;
        uint voteCount;
    }
    Proposal[] public proposals;
    mapping(address => bool) public hasVoted;
    address public owner;

    constructor(string[] memory proposalNames) {
        owner = msg.sender;
        for (uint i=0; i<proposalNames.length; i++) {
            proposals.push(Proposal({name: proposalNames[i], voteCount: 0}));
        }
    }

    function vote(uint proposalIndex) external {
        require(!hasVoted[msg.sender], "Already voted");
        require(proposalIndex < proposals.length, "Invalid proposal");
        proposals[proposalIndex].voteCount += 1;
        hasVoted[msg.sender] = true;
    }

    function getProposal(uint index) external view returns (string memory name, uint voteCount) {
        Proposal storage p = proposals[index];
        return (p.name, p.voteCount);
    }
}

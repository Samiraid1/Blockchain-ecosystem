import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./App.css";

function App() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [message, setMessage] = useState("");

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // your deployed address

  const abi = [
    {
      inputs: [{ internalType: "string[]", name: "proposalNames", type: "string[]" }],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
      name: "getProposal",
      outputs: [
        { internalType: "string", name: "name", type: "string" },
        { internalType: "uint256", name: "voteCount", type: "uint256" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "proposalIndex", type: "uint256" }],
      name: "vote",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "hasVoted",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      name: "proposals",
      outputs: [
        { internalType: "string", name: "name", type: "string" },
        { internalType: "uint256", name: "voteCount", type: "uint256" },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];

  // Connect wallet and contract
  async function connectWallet() {
    if (!window.ethereum) {
      return setMessage("Please install MetaMask first.");
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const contractInstance = new ethers.Contract(contractAddress, abi, signer);

    setAccount(accounts[0]);
    setContract(contractInstance);
    setMessage("Wallet connected!");
  }

  // Fetch proposals
  async function loadProposals() {
    if (!contract) return;
    try {
      const proposalsList = [];
      let i = 0;
      while (true) {
        try {
          const [name, votes] = await contract.getProposal(i);
          proposalsList.push({ name, votes: votes.toString() });
          i++;
        } catch {
          break;
        }
      }
      setProposals(proposalsList);
    } catch (err) {
      console.error("Error loading proposals:", err);
    }
  }

  // Cast a vote
  async function castVote(index) {
    try {
      const tx = await contract.vote(index);
      await tx.wait();
      alert(`✅ You voted for proposal "${proposals[index].name}"`);
      loadProposals();
    } catch (err) {
      console.error(err);
      alert("⚠️ Vote failed or already voted.");
    }
  }

  useEffect(() => {
    if (contract) loadProposals();
  }, [contract]);

  return (
    <div className="app-container">
      <div className="card">
        <h1 className="title">🗳️ Decentralized Voting DApp</h1>

        {!account ? (
          <button className="connect-btn" onClick={connectWallet}>
            Connect MetaMask
          </button>
        ) : (
          <div className="account-info">
            <p><strong>Connected as:</strong></p>
            <p className="address">{account}</p>
          </div>
        )}

        {message && <p className="message">{message}</p>}

        {proposals.length > 0 ? (
          <div className="proposal-section">
            <h2>Available Proposals</h2>
            <div className="proposal-list">
              {proposals.map((p, i) => (
                <div key={i} className="proposal-card">
                  <h3>{p.name}</h3>
                  <p>Votes: <strong>{p.votes}</strong></p>
                  <button className="vote-btn" onClick={() => castVote(i)}>
                    Vote
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          contract && <p className="loading">Loading proposals...</p>
        )}
      </div>
    </div>
  );
}

export default App;

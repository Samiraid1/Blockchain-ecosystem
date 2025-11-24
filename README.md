# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js

```

---

```markdown
# 🗳️ Decentralized Voting DApp

A decentralized voting application built on the Ethereum blockchain using **Solidity**, **Hardhat**, **React**, and **Ethers.js**.  
It allows users to connect their MetaMask wallet, view proposals, and cast votes securely — ensuring transparency, fairness, and immutability.

---

## 📋 Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [Project Architecture](#project-architecture)
4. [Tech Stack](#tech-stack)
5. [Setup and Installation](#setup-and-installation)
6. [Running the Project](#running-the-project)
7. [Deployment Guide](#deployment-guide)
8. [Screenshots](#screenshots)
9. [Team Roles](#team-roles)
10. [Key Learnings](#key-learnings)
11. [License](#license)
12. [Authors](#authors)

---

## 🧭 Overview

This project demonstrates a simple **Voting DApp** where participants can vote for proposals on the Ethereum blockchain.  
Each vote is recorded immutably and only one vote per wallet is allowed.  
The smart contract governs all rules — no central authority can alter or delete votes.

### 🎯 Goal
To create a **trustless and transparent voting mechanism** using blockchain technology, where results are verifiable and resistant to manipulation.

---

## ✨ Features

- 🦊 **MetaMask Integration** — users connect their Ethereum wallet securely.
- 📊 **Real-time Vote Counts** — dynamic updates after blockchain transactions.
- 🔐 **One Vote per Wallet** — enforced by smart contract logic.
- 💬 **User Feedback** — transaction alerts and success/failure messages.
- 🖥️ **Modern Frontend UI** — clean, minimal, and presentation-ready.
- ⚙️ **Local or Testnet Deployment** — easily migrate from local Hardhat to public testnets.

---

## 🧱 Project Architecture

```

Frontend (React + Ethers.js)
↓
MetaMask (User Wallet)
↓
Local Blockchain (Hardhat Node)
↓
Smart Contract (Voting.sol)

````

### 🔍 Workflow

1. **User connects MetaMask** — app fetches wallet address.  
2. **Frontend uses Ethers.js** to communicate with the contract.  
3. **Smart Contract executes logic** — adds votes, enforces rules, stores data.  
4. **Blockchain updates persistently** — votes can’t be changed or deleted.  
5. **Frontend reloads** and shows updated results in real time.

---

## 🧰 Tech Stack

| Layer | Technology | Description |
|-------|-------------|-------------|
| **Smart Contract** | Solidity (v0.8.x) | Defines voting logic and rules |
| **Blockchain** | Hardhat Local Node | Ethereum simulator for development |
| **Frontend** | React.js + Ethers.js | Web interface for interaction |
| **Wallet** | MetaMask | User authentication & transaction signing |
| **Testing** | Mocha + Chai | Automated contract testing |
| **Styling** | CSS (Glassmorphism design) | Modern user-friendly UI |

---

## ⚙️ Setup and Installation

### 1️⃣ Clone this repository
```bash
git clone https://github.com/<your-username>/decentralized-voting-dapp.git
cd decentralized-voting-dapp
````

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Install Hardhat and required libraries

```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox ethers
```

---

## ▶️ Running the Project

### Step 1 — Start a local blockchain

```bash
npx hardhat node
```

This starts a local Ethereum network at **[http://127.0.0.1:8545](http://127.0.0.1:8545)**
You’ll see 20 pre-funded accounts with private keys (used for testing).

Keep this terminal **running** while you test your app.

---

### Step 2 — Deploy the smart contract

Open a new terminal and run:

```bash
npx hardhat run --network localhost scripts/deploy-voting.js
```

You’ll get an output like:

```
Contract deployed to: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
```

✅ Copy this contract address and paste it inside:
`frontend/src/App.js` → `const contractAddress = "0x..."`

---

### Step 3 — Run the frontend

```bash
cd frontend
npm install
npm start
```

Visit **[http://localhost:3000](http://localhost:3000)**
The app will open in your browser.

---

### Step 4 — Connect MetaMask

1. Install the **MetaMask browser extension** ([https://metamask.io/](https://metamask.io/)).
2. Create or import a wallet.
3. Add a new **network**:

   ```
   Network name: Hardhat Localhost
   RPC URL: http://127.0.0.1:8545
   Chain ID: 31337
   Currency Symbol: ETH
   ```
4. Import one private key from the Hardhat node output.
5. Click **"Connect MetaMask"** in your app.
6. Cast your vote — MetaMask will ask you to confirm the transaction.

---

### Step 5 — Verify votes on the blockchain

You can open the Hardhat console to check votes directly:

```bash
npx hardhat console --network localhost
```

Then run:

```js
const voting = await ethers.getContractAt("Voting", "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512");
(await voting.getProposal(0)).voteCount.toString();
(await voting.getProposal(1)).voteCount.toString();
```

---

## 🚀 Deployment Guide (for testnets)

To deploy on **Sepolia** or another Ethereum testnet:

1. Get free ETH from a [faucet](https://sepoliafaucet.com/).
2. Create an account on [Alchemy](https://alchemy.com) or [Infura](https://infura.io/).
3. Update `hardhat.config.js`:

   ```js
   networks: {
     sepolia: {
       url: "https://eth-sepolia.g.alchemy.com/v2/<YOUR_API_KEY>",
       accounts: ["0xYOUR_PRIVATE_KEY"]
     }
   }
   ```
4. Deploy with:

   ```bash
   npx hardhat run --network sepolia scripts/deploy.js
   ```
5. Copy the new address into your `App.js`.

---

## 🖼️ Screenshots

### 🔹 Homepage

![App Interface](./screenshots/app-home.png)

### 🔹 MetaMask Connected

![Wallet Connected](./screenshots/metamask-connected.png)

### 🔹 Voting Interaction

![Voting Process](./screenshots/voting-ui.png)

*(Create a `screenshots` folder in your project root and add these images.)*

---

## 👥 Team Roles

| Member         | Role                     | Responsibilities                          |
| -------------- | ------------------------ | ----------------------------------------- |
| 👨‍💻 Member 1 | Smart Contract Developer | Solidity coding, deployment scripts       |
| 👩‍💻 Member 2 | Frontend Developer       | React UI, MetaMask integration            |
| 👨‍🏫 Member 3 | Research & Presenter     | Documentation, architecture, presentation |

---

## 🧠 Key Learnings

* Learned how to **write and deploy smart contracts** using Hardhat.
* Understood the **Ethereum transaction workflow** (sign → broadcast → mine).
* Integrated **Ethers.js** with React for real blockchain interaction.
* Built a **Web3 UI** that interacts with MetaMask wallets.
* Practiced **testing, deployment, and debugging** on a local blockchain.

---

## 📄 License

This project is licensed under the **MIT License**.
You are free to use, modify, and distribute this project for educational purposes.

---

## 🧑‍💻 Authors

* **Sami Abdel-Fattah**
* **Xu Luyao**
* **Sanan Muzaffarov**

GitHub: [https://github.com/your-username](https://github.com/Samiraid1)

---

## ⭐ Acknowledgments

* [Hardhat Documentation](https://hardhat.org/docs)
* [Ethers.js](https://docs.ethers.io/)
* [Solidity Docs](https://docs.soliditylang.org/)
* [MetaMask Developer Guide](https://docs.metamask.io/)
* Inspiration from Ethereum developer tutorials and Web3 community resources.

---

### 🎓 Final Note

This DApp represents a **complete Web3 workflow**:

> Smart Contract ➜ Blockchain ➜ MetaMask ➜ Frontend

It can be expanded to real-world use cases such as:

* DAO Governance Systems
* Online Elections
* Polling & Survey Apps
* Token-based Decision Making

---

**🟢 Project Status:** ✅ Completed and Functional
**Version:** 1.0.0
**Last Updated:** November 2025

```

---

✅ **What to do next:**
1. Save this as `README.md` in your project’s root folder.  
2. Add screenshots later (you can capture your app and place them under `/screenshots/`).  
3. When you push to GitHub, it’ll automatically display beautifully formatted.  

---

Would you like me to generate a **visual architecture image (pipeline diagram)** that you can include under the “Project Architecture” section (it’ll look great on GitHub)?
```

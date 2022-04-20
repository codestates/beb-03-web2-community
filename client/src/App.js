import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import SimpleStorageContract from './contracts/SimpleStorage.json';
import getWeb3 from './getWeb3';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomeView from './views/Home';
import SignUpView from './views/SignUp';

import './App.css';

// function App() {
//   const [state, setState] = useState({
//     storageValue: 0,
//     web3: null,
//     accounts: null,
//     contract: null,
//   });
//   // const [storageValue, setStorageValue] = useState(0);
//   // const [web3, setWeb3] = useState();
//   // const [account, setAccount] = useState();
//   // const [contract, setContract] = useState();

//   // useEffect(() => {
//   //   connectWeb3();
//   // }, [runExample]);

//   // const connectWeb3 = async () => {
//   //   try {
//   //     const web = await getWeb3();
//   //     const accounts = await web.eth.getAccounts();
//   //     const networkId = await web.eth.net.getId();
//   //     const deployedNetwork = SimpleStorageContract.networks[networkId];
//   //     const instance = new web.eth.Contract(
//   //       SimpleStorageContract.abi,
//   //       deployedNetwork && deployedNetwork.address
//   //     );

//   //     setWeb3(web);
//   //     setAccount(accounts);
//   //     setContract(instance);
//   //   } catch (err) {
//   //     alert(
//   //       `Failed to load web3, accounts, or contract. Check console for details.`
//   //     );
//   //     console.error(err);
//   //   }
//   // };
//   // const runExample = async () => {
//   //   try {
//   //     // Stores a given value, 5 by default.
//   //     await contract.methods.set(5).send({ from: account[0] });

//   //     // Get the value from the contract to prove it worked.
//   //     const response = await contract.methods.get().call();

//   //     // Update state with the result.
//   //     setStorageValue(response);
//   //   } catch (err) {
//   //     console.error(err);
//   //   }
//   // };

//   useEffect(() => {
//     async function init() {
//       try {
//         const web3 = await getWeb3();
//         const accounts = await web3.eth.getAccounts();
//         const networkId = await web3.eth.net.getId();
//         const deployedNetwork = SimpleStorageContract.networks[networkId];
//         const instance = new web3.eth.Contract(
//           SimpleStorageContract.abi,
//           deployedNetwork && deployedNetwork.address
//         );

//         setState((value) => ({ ...value, web3, accounts, contract: instance }));
//       } catch (error) {
//         alert(
//           'Failed to load web3, accounts, or contract. Check console for details.'
//         );
//         console.error(error);
//       }
//     }
//     init();
//   }, []);

//   useEffect(() => {
//     async function runExample(accounts, contract) {
//       await contract.methods.set(25).send({ from: accounts[0] });
//       const response = await contract.methods.get().call();

//       setState((value) => ({ ...value, storageValue: response }));
//     }
//     if (state.accounts != null && state.contract != null) {
//       runExample(state.accounts, state.contract);
//     }
//   }, [state.accounts, state.contract]);

//   return (
//     <div className="App">
//       <Header />
//       <main></main>
//       <h1>Good to Go!</h1>
//       <p>Your Truffle Box is installed and ready.</p>
//       <h2>Smart Contract Example</h2>
//       <p>
//         If your contracts compiled and migrated successfully, below will show a
//         stored value of 5 (by default).
//       </p>
//       <p>
//         Try changing the value stored on <strong>line 42</strong> of App.js.
//       </p>
//       <div>The stored value is: {state.storageValue}</div>
//       <Footer />
//     </div>
//   );
// }

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error('err', error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ storageValue: response });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/signup" element={<SignUpView />} />
          </Routes>
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;

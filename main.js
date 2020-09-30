f (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);

  } else {
    web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io"));
  }

function attemptConnect() {
      try {
          ethereum.request({
              method: 'eth_requestAccounts'
          }).then(function(res) {
              updateBalance(res[0]);
              update();
          });
          web3 = new Web3(web3.currentProvider);

      } catch (error) {
          document.getElementById("status").innerHTML = "Connection fail, try again";
      }
  }

  if (window.ethereum === undefined) {
      document.getElementById("con").hidden=true;
      document.getElementById("status").innerHTML = "Please install Metamask to continue";
  } else {
      if (window.ethereum.networkVersion==="4"){
      setInterval(function() {
      update();
      }, 3000);
      ethereum.on('accountsChanged', function(accounts) {
          console.log(accounts[0])
          if (accounts[0] === undefined) {
              document.getElementById("con").hidden=false;
              document.getElementById("reset").hidden = true;
              document.getElementById("claim").hidden = true;
              document.getElementById("status").innerHTML = "Wallet disconnected";
          } else {
              updateBalance(accounts[0]);
          }
      });
      }
      else{
          document.getElementById("con").hidden=true;

          document.getElementById("status").innerHTML = "Wrong network! Please set network to Rinkeby in Metamask";


      }
  }
  }

var moonAddress = "0xdf82c9014f127243ce1305dfe54151647d74b27a"
var bidAddress = "0x2d28f511bac4d8692dfaafd517a4c916c946828b"

ercabi = JSON.parse(`[
        {
            "constant": true,
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_spender",
                    "type": "address"
                },
                {
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "totalSupply",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_from",
                    "type": "address"
                },
                {
                    "name": "_to",
                    "type": "address"
                },
                {
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "transferFrom",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "decimals",
            "outputs": [
                {
                    "name": "",
                    "type": "uint8"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_owner",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "name": "balance",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "symbol",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_to",
                    "type": "address"
                },
                {
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "transfer",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_owner",
                    "type": "address"
                },
                {
                    "name": "_spender",
                    "type": "address"
                }
            ],
            "name": "allowance",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "payable": true,
            "stateMutability": "payable",
            "type": "fallback"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "spender",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Approval",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        }
    ]`)

boardabi = JSON.parse(`[{"constant":false,"inputs":[{"name":"newMessage","type":"string"},{"name":"newPrice","type":"uint256"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"price","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"summoner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"message","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"collect","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_summoner","type":"address"},{"name":"_token","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]`)

var moonContract = new web3.eth.Contract(ercabi, moonAddress, {from:add, gasPrice:1000000000})
var boardContract = new web3.eth.Contract(boardabi, bidAddress, {from:add, gasPrice:1000000000})

console.log(boardContract.methods.price().call())






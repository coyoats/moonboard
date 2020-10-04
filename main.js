document.getElementById("con").addEventListener("click", function() {
    attemptConnect();
  });

document.getElementById("go").addEventListener("click", function() {
    newMessage = document.getElementById("newMessage").value;
    newPrice = new web3.utils.BN(web3.utils.toWei(document.getElementById("newPrice").value,'ether'));
    intmoonbalance = new web3.utils.BN(moonbalance);
    intprice = new web3.utils.BN(price);
    if (newPrice.lte(intmoonbalance) && newPrice.gte(intprice)) {
        web3.eth.getAccounts().then(function(acc){
        
            accounts = acc;
            MOONcontract.methods.allowance(accounts[0], moonboardContract.options.address).call().then(function(res){

                if (res < document.getElementById("newPrice").value*1000000000000000000) {
                    MOONcontract.methods.approve(moonboardContract.options.address, "999999999999999999999999").send();
                }

                moonboardContract.methods.set(document.getElementById("newMessage").value, newPrice).send();
                
            });

            
        })
    }
    else{

        alert("Error! Please ensure that your moon balance is greater than the price you'd like to set and that the price you'd like to set is greater than the current price.");

    }

    
});

if (typeof web3 !== 'undefined') {
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


      if (window.ethereum === undefined) {
        document.getElementById("con").hidden=true;
        document.getElementById("connected").hidden=true;
        document.getElementById("status").innerHTML = "Please install Metamask to continue";
    } 
    else {
        if (window.ethereum.networkVersion==="4"){
          document.getElementById("status").innerHTML = "Connected to Rinkeby! Good to go!";
          document.getElementById("con").hidden=true;
          document.getElementById("connected").hidden=false;   
        setInterval(function() {
        update();
        }, 3000);
        ethereum.on('accountsChanged', function(accounts) {
            if (web3.eth.accounts[0] === undefined) {
                document.getElementById("con").hidden=false;
                document.getElementById("connected").hidden=true;
                document.getElementById("status").innerHTML = "Wallet disconnected";
            } else {
                updateBalance(web3.eth.accounts[0]);
            }
        });
        }
        else{
            document.getElementById("con").hidden=true;
            document.getElementById("connected").hidden=true;
            document.getElementById("status").innerHTML = "Wrong network! Please set network to Rinkeby in Metamask";
        }
    }
  }

function updateBalance(add){
   
    address = add
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

    moonboardabi = JSON.parse(`[{"constant":false,"inputs":[{"name":"newMessage","type":"string"},{"name":"newPrice","type":"uint256"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"price","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"summoner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"message","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"collect","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_summoner","type":"address"},{"name":"_token","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]`)
    
     MOONaddress = "0xDF82c9014F127243CE1305DFE54151647d74B27A"
     moonboardAddress = "0x2D28F511bAC4d8692DfaAfD517a4c916C946828b"
     MOONcontract=new web3.eth.Contract(ercabi, MOONaddress, {from:add, gasPrice:1000000000})
     moonboardContract = new web3.eth.Contract(moonboardabi, moonboardAddress, {from:add, gasPrice:1000000000})
     MOONcontract.methods.balanceOf(add).call().then(function(res){moonbalance = res;document.getElementById("moonbalance").innerHTML = "Your MOON balance: "+(res/1000000000000000000);})
     moonboardContract.methods.message().call().then(function(res){message = res;document.getElementById("message").innerHTML = "<b>Current message: </b>" + res})
     moonboardContract.methods.price().call().then(function(res){price = res;document.getElementById("price").innerHTML = "<b>Current price: </b>" + (res/1000000000000000000) + " MOONs"})
}

function update(){
    if (typeof(address) !== "undefined"){
    updateBalance(address);
}
}

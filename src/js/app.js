App = {
  web3Provider: null,
  contracts: {},
  account: "0x0",
  hasVoted: false,
  netId: 5777,

  init: function() {
    return App.initWeb3();
  },

  initWeb3: async function() {
    // TODO: refactor conditional
    if (window.ethereum) {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = window.ethereum;
      try {
        await window.ethereum.enable();

        //If accounts change
        window.ethereum.on("accountsChanged", accounts => {
          App.render();
        });
      } catch (error) {
        console.error("You must approve this dApp to interact with it");
      }
    } else {
      // Specify default instance if no web3 instance provided
      if (App.netId === 5777)
        App.web3Provider = new Web3.providers.HttpProvider(
          "http://localhost:7545"
        );
      else
        App.web3Provider = new Web3.providers.HttpProvider(
          `https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`
        );
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("Election.json", function(election) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Election = TruffleContract(election);
      // Connect provider to interact with contract
      App.contracts.Election.setProvider(App.web3Provider);

      App.listenForEvents();

      return App.render();
    });
  },

  // Listen for events emitted from the contract
  listenForEvents: function() {
    App.contracts.Election.deployed().then(function(instance) {
      // Restart Chrome if you are unable to receive this event
      // This is a known issue with Metamask
      // https://github.com/MetaMask/metamask-extension/issues/2393
      instance.votedEvent({}, {}).watch(function(error, event) {
        console.log("event triggered", event);
        // Reload when a new vote is recorded
        App.render();
      });
    });
  },

  render: function() {
    var electionInstance;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;

        $("#accountAddress").html("Your Account: " + account);
      }
    });

    // Load contract data
    App.contracts.Election.deployed()
      .then(function(instance) {
        electionInstance = instance;
        return electionInstance.candidatesCount();
      })
      .then(async function(candidatesCount) {
        var candidatesResults = $("#candidatesResults");
        candidatesResults.empty();

        var candidatesSelect = $("#candidatesSelect");
        candidatesSelect.empty();

        for (var i = 1; i <= candidatesCount; i++) {
          const candidate = await electionInstance.candidates(i);
          var id = candidate[0];
          var name = candidate[1];
          var voteCount = candidate[2];

          // Render candidate Result
          var candidateTemplate =
            "<tr><th>" +
            id +
            "</th><td>" +
            name +
            "</td><td>" +
            voteCount +
            "</td></tr>";
          candidatesResults.append(candidateTemplate);

          // Render candidate ballot option
          var candidateOption =
            "<option value='" + id + "' >" + name + "</ option>";
          candidatesSelect.append(candidateOption);
        }
        return electionInstance.voters(App.account);
      })
      .then(function(hasVoted) {
        // Do not allow a user to vote
        if (hasVoted) {
          $("form").hide();
        } else $("form").show();
        loader.hide();
        content.show();
      })
      .catch(function(error) {
        console.warn(error);
      });
  },

  castVote: function() {
    var candidateId = $("#candidatesSelect").val();
    App.contracts.Election.deployed()
      .then(function(instance) {
        return instance.vote(candidateId, { from: App.account });
      })
      .then(function(result) {
        // Wait for votes to update
        $("#content").hide();
        $("#loader").show();
      })
      .catch(function(err) {
        console.error(err);
      });
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});

// Favor V2 Contract
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// import "../node_modules/@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
// import "../node_modules/@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
// import "../node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol";
// Receive Test Link from https://faucets.chain.link/

contract FavorsContractV2 is VRFConsumerBaseV2 {
    uint256 private constant ROLL_IN_PROGRESS = 42;

    VRFCoordinatorV2Interface COORDINATOR;

    // Your subscription ID.
    uint64 s_subscriptionId;
    // Goerli coordinator. For other networks,
    // see https://docs.chain.link/docs/vrf-contracts/#configurations
    address vrfCoordinator = 0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D;
    // The gas lane to use, which specifies the maximum gas price to bump to.
    // For a list of available gas lanes on each network, see https://docs.chain.link/docs/vrf-contracts/#configurations
    bytes32 s_keyHash =
        0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15;
    // Depends on the number of requested values that you want sent to the fulfillRandomWords() function.
    // Storing each word costs about 20,000 gas,
    // Test and adjust this limit based on the network that you select, the size of the request, etc
    uint32 callbackGasLimit = 40000;
    // The default is 3, but you can set this higher.
    uint16 requestConfirmations = 3;
    // For this example, retrieve 1 random value in one request.
    // Cannot exceed VRFCoordinatorV2.MAX_NUM_WORDS.
    uint32 numWords = 1;
    address s_owner;

    IERC20 private _token;

    event AddFavor(address recipient, uint256 favorId);
    event AceeptFavor(uint256 favorId, address acceptedBy);

    event DiceRolled(uint256 indexed requestId, address indexed roller);
    event DiceLanded(uint256 indexed requestId, uint256 indexed result);
    event CompleteFavor(uint256 favorId, bool isCompleted);

    struct Favor {
        uint256 id;
        string favorText;
        bool isCompleted;
        address createdBy;
        address acceptedBy;
    }

    Favor[] private favors;
    mapping(uint256 => address) favorToOwner;
    // map rollers to requestIds
    mapping(uint256 => address) s_rollers;
    // map vrf results to rollers
    mapping(address => uint256) private s_results;
    address acceptedBy;
    
    constructor(uint64 subscriptionId, address token)
        VRFConsumerBaseV2(vrfCoordinator)
    {
        COORDINATOR = VRFCoordinatorV2Interface(vrfCoordinator);
        s_owner = msg.sender;
        s_subscriptionId = subscriptionId;
        _token = IERC20(token);
    }

    function addFavor(string memory favorText, bool isCompleted)
        external
        payable
    {
        uint256 favorId = favors.length;
        favors.push(
            Favor(favorId, favorText, isCompleted, msg.sender, acceptedBy)
        );
        favorToOwner[favorId] = msg.sender;
        emit AddFavor(msg.sender, favorId);

        // When you post your first favor, you should get your bonus
        // Need to check only run once on first favor
        // probably need to map address to bool for checking if already 'rolled' 
        firstFavor(msg.sender);
    }

    function firstFavor(address roller) internal returns (uint256 requestId) {
        require(s_results[roller] == 0, "Already rolled");
        // Will revert if subscription is not set and funded.
        requestId = COORDINATOR.requestRandomWords(
            s_keyHash,
            s_subscriptionId,
            requestConfirmations,
            callbackGasLimit,
            numWords
        );
        s_rollers[requestId] = roller;
        s_results[roller] = ROLL_IN_PROGRESS;
        emit DiceRolled(requestId, roller);
    }

    function fulfillRandomWords(uint256 requestId, uint256[] memory randomWords)
        internal
        override
    {
        uint256 d20Value = (randomWords[0] % 20) + 1;
        s_results[s_rollers[requestId]] = d20Value;
        emit DiceLanded(requestId, d20Value);
    }

    function collectBonus () public returns (bool bonusCollected)  {
        bool alreadyCollected = false;
        if(!alreadyCollected) {
            require(s_results[msg.sender] != 0, "Dice not rolled");
            require(s_results[msg.sender] != ROLL_IN_PROGRESS, "Roll in progress");
            _token.approve(msg.sender, s_results[msg.sender]);
            return alreadyCollected = true;
        }
    }

    function getMyFavors() external view returns (Favor[] memory) {
        Favor[] memory temporary = new Favor[](favors.length);
        uint256 counter = 0;

        for (uint256 i = 0; i < favors.length; i++) {
            if (
                favorToOwner[i] == msg.sender && favors[i].isCompleted == false
            ) {
                temporary[counter] = favors[i];
                counter++;
            }
        }
        Favor[] memory result = new Favor[](counter);
        for (uint256 i = 0; i < counter; i++) {
            result[i] = temporary[i];
        }
        return result;
    }

    function getAllIncompleteFavors() external view returns (Favor[] memory) {
        Favor[] memory temporary = new Favor[](favors.length);
        uint256 counter = 0;

        for (uint256 i = 0; i < favors.length; i++) {
            if (favors[i].isCompleted == false) {
                temporary[counter] = favors[i];
                counter++;
            }
        }
        Favor[] memory result = new Favor[](counter);
        for (uint256 i = 0; i < counter; i++) {
            result[i] = temporary[i];
        }
        return result;
    }

    function acceptFavor(uint256 favorId) external {
        if (favors[favorId].createdBy != msg.sender) {
            favors[favorId].acceptedBy = msg.sender;
            emit AceeptFavor(favorId, acceptedBy);
        }
    }

    function completeFavor(uint256 favorId, bool isCompleted) external {
        if (favorToOwner[favorId] == msg.sender) {
            favors[favorId].isCompleted = isCompleted;
            // Pay the acceptedBy user
            _token.approve(favors[favorId].acceptedBy, 10);
            emit CompleteFavor(favorId, isCompleted);
        }
    }
}
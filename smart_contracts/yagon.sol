// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Yagon {

    //////////////
    // Objects
    //////////////

    // Structure to represent a product
    struct Product {
        bytes32 id;
        string name;
        string manufacturingLocation;
        uint256 manufacturingDate;
        string description;
        address createdBy;
        uint256 createdAt;

        // Mapping for movement history
        mapping(bytes32 => Movement) movements;
        uint256 numberOfMovements;
    }

    // Structure to represent a movement
    struct Movement {
        bytes32 id;
        string name;
        uint256 date;
        string location;
        string description;
        address createdBy;
        uint256 createdAt;
    }

    // Mapping to store information for each product by its ID
    mapping(bytes32 => Product) private products;

    //////////////
    // Events
    //////////////

    // Event triggered when a product is created
    event ProductCreated(bytes32 id, string name, string manufacturingLocation, uint256 manufacturingDate, string description, address createdBy, uint256 createdAt);

    // Event triggered when a movement is created
    event MovementCreated(bytes32 productId, bytes32 movementId, string name, uint256 date, string location, string description, address createdBy, uint256 createdAt);

    //////////////
    // Functions
    //////////////

    // Function to create a new product
    function createProduct(string memory _name, string memory _manufacturingLocation, uint256 _manufacturingDate, string memory _description) public returns (bytes32){
        // Create a unique identifier for the prpoduct
        bytes32 productId = keccak256(abi.encodePacked(_name, _manufacturingLocation, _manufacturingDate, _description));

        // Verify that the product does not exist
        require(products[productId].id == 0, "This product already exist.");

        // Create a new instance of the product
        Product storage newProduct = products[productId];
        newProduct.id = productId;
        newProduct.name = _name;
        newProduct.manufacturingLocation = _manufacturingLocation;
        newProduct.manufacturingDate = _manufacturingDate;
        newProduct.description = _description;
        newProduct.createdBy = msg.sender;
        newProduct.createdAt = block.timestamp;


        // Initialize mappings
        newProduct.numberOfMovements = 0;

        // Trigger the event
        emit ProductCreated(productId, _name, _manufacturingLocation, _manufacturingDate, _description, msg.sender, block.timestamp);

        return productId;
    }

    // Function to create a movement of the product
    function createMovement(bytes32 _product_id, string memory _name, uint256 _date, string memory _location, string memory _description) public returns (bytes32){
        // Verify that the product exists
        require(products[_product_id].id != 0, "This product does not exist.");

        // Create a unique identifier for the movement
        bytes32 movementId = keccak256(abi.encodePacked(_product_id, _name, _date, _location, _description));

        // Create the movement in the product's history
        Product storage product = products[_product_id];
        product.movements[movementId] = Movement(movementId, _name, _date, _location, _description, msg.sender, block.timestamp);
        product.numberOfMovements++;

        // Trigger the event
        emit MovementCreated(_product_id, movementId, _name, _date, _location, _description, msg.sender, block.timestamp);

        return movementId;
    }


    // Getter function to get product information
    function getProduct(bytes32 _id) public view returns (
        bytes32 id,
        string memory name,
        string memory manufacturingLocation,
        uint256 manufacturingDate,
        string memory description,
        uint256 numberOfMovements,
        address createdBy,
        uint256 createdAt
    ) {
        Product storage product = products[_id];
        return (
            product.id,
            product.name,
            product.manufacturingLocation,
            product.manufacturingDate,
            product.description,
            product.numberOfMovements,
            product.createdBy,
            product.createdAt
        );
    }

    // Getter function to get information about all movements of a product
    function getMovements(bytes32 _productId) public view returns (Movement[] memory) {
        Product storage product = products[_productId];

        // Create a dynamic array to store movements
        Movement[] memory movements = new Movement[](product.numberOfMovements);

        // Fill the array with information about each movement
        for (uint256 i = 0; i < product.numberOfMovements; i++) {
            bytes32 movementId = keccak256(abi.encodePacked(_productId, i));
            Movement storage movement = product.movements[movementId];
            movements[i] = movement;
        }

        return movements;
    }
}


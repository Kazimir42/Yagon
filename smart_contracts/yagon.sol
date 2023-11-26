// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SupplyChainTracking {

    //////////////
    // Objects
    //////////////

    // Structure to represent a product
    struct Product {
        uint256 id;
        string name;
        string manufacturingLocation;
        uint256 manufacturingDate;
        string description;

        // Mapping for movement history
        mapping(uint256 => Movement) movements;
        uint256 numberOfMovements;
    }

    // Structure to represent a movement
    struct Movement {
        uint256 date;
        string location;
        string description;
    }

    // Mapping to store information for each product by its ID
    mapping(uint256 => Product) public products;

    //////////////
    // Events
    //////////////

    // Event triggered when a product is created
    event ProductCreated(uint256 id, string name, string manufacturingLocation, uint256 manufacturingDate, string description);

    // Event triggered when a movement is created
    event MovementCreated(uint256 productId, uint256 date, string location);

    //////////////
    // Functions
    //////////////

    // Function to create a new product
    function createProduct(uint256 _id, string memory _name, string memory _manufacturingLocation, uint256 _manufacturingDate, string memory _description) public {
        // Verify that the product does not exist
        require(products[_id].id == 0, "This product already exist.");

        // Create a new instance of the product
        Product storage newProduct = products[_id];
        newProduct.id = _id;
        newProduct.name = _name;
        newProduct.manufacturingLocation = _manufacturingLocation;
        newProduct.manufacturingDate = _manufacturingDate;
        newProduct.description = _description;

        // Initialize mappings
        newProduct.numberOfMovements = 0;

        // Trigger the event
        emit ProductCreated(_id, _name, _manufacturingLocation, _manufacturingDate, _description);
    }

    // Function to create a movement of the product
    function createMovement(uint256 _product_id, uint256 _date, string memory _location, string memory _description) public {
        // Verify that the product exists
        require(products[_product_id].id != 0, "This product does not exist.");

        // Create the movement in the product's history
        Product storage product = products[_product_id];
        uint256 movementIndex = product.numberOfMovements;
        product.movements[movementIndex] = Movement(_date, _location, _description);
        product.numberOfMovements++;

        // Trigger the event
        emit MovementCreated(_product_id, _date, _location);
    }

    // Getter function to get product information
    function getProduct(uint256 _id) public view returns (
        uint256 id,
        string memory name,
        string memory manufacturingLocation,
        uint256 manufacturingDate,
        string memory description,
        uint256 numberOfMovements
    ) {
        Product storage product = products[_id];
        return (
            product.id,
            product.name,
            product.manufacturingLocation,
            product.manufacturingDate,
            product.description,
            product.numberOfMovements
        );
    }
}

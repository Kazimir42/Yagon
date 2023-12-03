export const useProduct = (contract: any, account: any) => {

    // Product id for tests = 0x67623ba03618b99a90621767d57e073b2f00d69ce0d4f59b3f54ac222ad0432a
    const getProduct = async (productId: string | string[]) => {
        try {
            let product = await contract.methods.getProduct(productId).call();
            if (product.id == '0x0000000000000000000000000000000000000000000000000000000000000000') {
                throw new Error('Product not found')
            }

            return parseProduct(product);
        } catch (error) {
            console.error('Error fetching product', error);
        }
    };

    const createMovement = async (productId: number, title: string, date: string, location: string, description: string) => {
        const timestamp = Date.parse(date)

        try {
            return await contract.methods.createMovement(productId, timestamp, location, description).send({from: account});
        } catch (error) {
            console.error('Error when createing movement', error);
        }
    };

    return { getProduct, createMovement};
};

const parseProduct = (product: any) => {
    const parsedProduct: any = {};
    for (const key in product) {
        if (product.hasOwnProperty(key)) {
            parsedProduct[key] = parseValue(product[key]);

            // Timestamp to date string
            if (key == 'manufacturingDate') {
                parsedProduct[key] = new Date(parsedProduct[key]).toLocaleString("en-US")
            }
        }
    }
    return parsedProduct;
};

const parseValue = (value: any) => {
    const isBigInt = value.constructor.name === 'BigInt'
    if (isBigInt) {
        return Number(value);
    }

    return value;
};

export const useProduct = (contract: any, account: any) => {

    // Product id for tests = 0xfcbe76a50803a2ecd9d18f7af3ad75b34c3f70e8fd27c37d4721bff39d147161
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

    const getMovements = async (productId: string | string[]) => {
        try {
            let movements = await contract.methods.getMovements(productId).call();
            console.log(movements)
            return movements;
        } catch (error) {
            console.error('Error fetching product', error);
        }
    };

    const createMovement = async (productId: number, name: string, date: string, location: string, description: string) => {
        try {
            return await contract.methods.createMovement(productId, name, Date.parse(date), location, description).send({from: account});
        } catch (error) {
            console.error('Error when createing movement', error);
        }
    };

    return { getProduct, createMovement, getMovements};
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

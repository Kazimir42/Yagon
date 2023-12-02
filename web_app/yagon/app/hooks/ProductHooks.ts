export const useProduct = (contract: any, account: any) => {

    const getProduct = async (productId: string | string[]) => {
        try {
            let product = await contract.methods.getProduct(productId).call();
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

interface ProductState {
    data: any | null;
    loading: boolean;
    error: string | null;
}


const parseProduct = (product: any) => {
    const parsedProduct: any = {};
    for (const key in product) {
        if (product.hasOwnProperty(key)) {
            parsedProduct[key] = parseValue(product[key]);
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

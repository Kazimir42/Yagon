export const useProduct = (contract: any) => {
    // @ts-ignore

    const getProduct = async (productId: number) => {
        try {
            let product = await contract.methods.getProduct(productId).call();
            return parseProduct(product);
        } catch (error) {
            console.error('Error fetching product', error);
        }
    };

    return { getProduct };
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

export const getProduct = async (web3, contract, productId) => {
    const result = await contract.methods.getProduct(productId).call();

    console.log(result);
}

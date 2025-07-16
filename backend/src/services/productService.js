import {
    createProduct,
    findProductById,
    findProductsByArtisan,
    updateProduct,
    deleteProduct,
} from "../repositories/productRepository.js";


export const addNewProduct = async (artisanId, productData) => {
    return await createProduct({ ...productData, artisan: artisanId });
};

export const getArtisanProducts = async (artisanId) => {
    return await findProductsByArtisan(artisanId);
};

export const editProduct = async (id, artisanId, updatedData) => {
    const product = await findProductById(id);
    if (!product || product.artisan.toString() !== artisanId.toString()) {
        throw new Error("Not authorized or product not found");
    }
    return await updateProduct(id, updatedData);
};


export const removeProduct = async (id, artisanId) => {
    const product = await findProductById(id);
    if (!product || product.artisan.toString() !== artisanId.toString()) {
        throw new Error("Not authorized or product not found");
    }
    return await deleteProduct(id);
};

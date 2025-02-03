var products = [
    {
        id: 1,
        name: "product1",
        price: 100,
        stock: 23,
    },
    {
        id: 1,
        name: "product1",
        price: 10,
        stock: 142,
    },
    {
        id: 2,
        name: "product2",
        price: 200,
        stock: 20,
    },
    {
        id: 2,
        name: "product2",
        price: 250,
        stock: 10,
    },
    {
        id: 3,
        name: "product3",
        price: 300,
        stock: 30,
    },
    {
        id: 4,
        name: "product4",
        price: 400,
        stock: 40,
    },
    {
        id: 5,
        name: "product5",
        price: 500,
        stock: 50,
    },
    {
        id: 6,
        name: "product6",
        price: 600,
        stock: 60,
    },
];
var filterProductsByName = function (products, filter) {
    return products.filter(
    // met en majuscule le nom du produit et compare avec le filtre en majuscule pour éviter la casses
    function (product) { return product.name.toUpperCase().includes(filter.toUpperCase()); });
};
var filterProductsByPrice = function (products, filterRange) {
    return products.filter(function (product) {
        return product.price >= filterRange[0] && product.price <= filterRange[1];
    });
};
console.log("🚀 ~ filtres par nom de produits:", filterProductsByName(products, "product1"));
console.log("🚀 ~ filtres par prix de produits:", filterProductsByPrice(products, [100, 300]));

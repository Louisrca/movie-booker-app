type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
};

const products = [
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

const filterProducts = (products: Product[], filter: string) => {
  return products.filter((product) => product.name.includes(filter));
};

// console.log(filterProducts(products, "product1"));

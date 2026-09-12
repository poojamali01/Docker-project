db = db.getSiblingDB("crochet_corner");

db.products.insertMany([
  {
    name: "Crochet Flower",
    price: 199,
    description: "Beautiful handmade crochet flower."
  },
  {
    name: "Crochet Bag",
    price: 599,
    description: "Handmade and stylish crochet bag."
  },
  {
    name: "Crochet Bear",
    price: 799,
    description: "Soft handmade crochet teddy bear."
  }
]);

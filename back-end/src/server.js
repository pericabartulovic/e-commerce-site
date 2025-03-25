import express from 'express';
import { MongoClient } from 'mongodb';
import { cartItems as cartItemsRaw, products as productsRaw } from '../temp-data';

let cartItems = cartItemsRaw;
let products = productsRaw;
//Map approach for better performance:
let productMap = new Map(products.map(product => [product.id, product]));


const url = `mongodb+srv://pericab35:ymcrXxm2bQClohL6@cluster0.qgpdx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const client = new MongoClient({
  
});

const app = express();
app.use(express.json());

app.get('/hello', (req, res) => {
  res.send('Hello!');
});

app.get('/products', (req, res) => {
  res.json(products);
});

// app.get('/cart', (req, res) => {
//   const populatedCart = cartItems.map(id => products.find(product => product.id === id))
//   res.json(populatedCart);
// });

function populateCartIds(ids) {
  return ids.map(id => productMap.get(id));
}

app.get('/cart', (req, res) => {  //better performance and itteration
  const populatedCart = populateCartIds(cartItems);
  res.json(populatedCart);
});

app.get('/products/:productId', (req, res) => {
  const productId = req.params.productId;
  const product = products.find(product => product.id === productId);
  res.json(product);
});

app.post('/cart', (req, res) => {
  const productId = req.body.id;
  cartItems.push(productId);
  const populatedCart = populateCartIds(cartItems)
  res.json(populatedCart);
});

app.delete('/cart/:productId', (req, res) => {
  const productId = req.params.productId;
  cartItems = cartItems.filter(id => id !== productId);
  const populatedCart = populateCartIds(cartItems);
  res.json(populatedCart);
})

app.listen(8000, () => {
  console.log('Server is listening on port 8000')
});
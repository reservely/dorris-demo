const path = require('path');
const express = require('express');

const app = express();
app.use(express.static(path.join(__dirname, '/../public')));


const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer();
const serverOne = 'http://localhost:3001',
    ServerTwo = 'http://localhost:3002',
    ServerThree = 'http://localhost:3003',
    ServerFour = 'http://localhost:3004';
 
app.get("/:restaurant_id/images", function(req, res) {
    console.log('redirecting to photo gallery server');
    apiProxy.web(req, res, {target: serverOne});
});

app.all("/:restaurant_id/reservations", function(req, res) {
  console.log('redirecting to reservations');
  apiProxy.web(req, res, {target: ServerTwo});
});

app.all("/:restaurant_id/reservations/*", function(req, res) {
    console.log('redirecting to reservations');
    apiProxy.web(req, res, {target: ServerTwo});
});

app.get("/:restaurant_id/menus", function(req, res) {
    console.log('redirecting to menus');
    apiProxy.web(req, res, {target: ServerThree});
});

app.all("/:restaurantID/reviews", function(req, res) {
  console.log('redirecting to reviews');
  apiProxy.web(req, res, {target: ServerFour});
});

app.listen(3000);

module.exports = app;
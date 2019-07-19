const path = require('path');
const express = require('express');

const app = express();
app.use(express.static(path.join(__dirname, '/../public/')));
app.use('/:restaurant_id', express.static(path.join(__dirname, '/../public/')));

const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer();
const gallery = 'http://13.57.252.210',
    reservations = 'http://54.200.32.135',
    menus = 'http://18.219.221.244',
    reviews = 'http://18.223.115.5';

app.get("/:restaurant_id/images", function(req, res) {
    console.log('redirecting to photo gallery server');
    apiProxy.web(req, res, {target: gallery});
});

app.all("/:restaurant_id/reservations", function(req, res) {
  console.log('redirecting to reservations');
  apiProxy.web(req, res, {target: reservations});
});

app.all("/:restaurant_id/reservations/*", function(req, res) {
    console.log('redirecting to reservations');
    apiProxy.web(req, res, {target: reservations});
});

app.get("/:restaurant_id/menus", function(req, res) {
    console.log('redirecting to menus');
    apiProxy.web(req, res, {target: menus});
});

app.all("/:restaurantID/reviews", function(req, res) {
  console.log('redirecting to reviews');
  apiProxy.web(req, res, {target: reviews});
});

//app.listen('54.183.190.233');
app.listen(3000);

module.exports = app;
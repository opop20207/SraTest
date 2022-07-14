const { createProxyMiddleware } = require('http-proxy-middleware');
c
module.exports = function(app) {
    app.use(
        createProxyMiddleware('/ipfs' , {
            target: 'http://clonens.com:3000',
            //target: 'https://ipfs.moralis.io:2053',
            //target: 'http://localhost:3000',
            changeOrigin : true
        })
    );
};
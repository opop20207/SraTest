const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        createProxyMiddleware('/api' , {
            target: 'http://clonens.com:3000',
            //target: 'https://ipfs.moralis.io:2053',
            //target: 'http://localhost:3000',
            changeOrigin : true
        })
    );
};
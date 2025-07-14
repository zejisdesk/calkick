// Development server configuration for CalKick
module.exports = {
    port: 3000,
    host: 'localhost',
    open: true,
    file: 'index.html',
    wait: 1000,
    mount: [
        ['/dist', './dist']
    ],
    logLevel: 2,
    middleware: [
        function(req, res, next) {
            // Add CORS headers for development
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            
            // Add security headers
            res.setHeader('X-Content-Type-Options', 'nosniff');
            res.setHeader('X-Frame-Options', 'DENY');
            res.setHeader('X-XSS-Protection', '1; mode=block');
            
            next();
        }
    ]
};
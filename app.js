const express = require('express');
const app = express();
const { swaggerUi, swaggerSpec } = require('./config/swagger');
const dotenv = require('dotenv');
dotenv.config();
const proxyRouter = require('./routes/proxy');
const adminRouter = require('./routes/admin');
const PORT = process.env.PORT || 3000;

// Port checking function
const net = require('net');
function checkPort(port) {
    return new Promise((resolve) => {
        const server = net.createServer();
        server.listen(port, () => {
            server.once('close', () => resolve(true));
            server.close();
        });
        server.on('error', () => resolve(false));
    });
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.use('/api', proxyRouter);
app.use('/admin', adminRouter);

app.get('/', (req, res) => {
    res.send('Caching Proxy Server is running!');
});

// Start server with port checking
async function startServer(port = PORT) {
    const isPortFree = await checkPort(port);
    if (!isPortFree) {
        console.log(`Port ${port} is already in use. Trying port ${port + 1}...`);
        return startServer(port + 1);
    }
    
    const server = app.listen(port, () => {
        console.log(`🚀 Server running at http://localhost:${port}`);
        console.log(`📚 API Docs available at http://localhost:${port}/api-docs`);
    });

    // Error handling
    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.log(`Port ${port} is busy, trying ${port + 1}...`);
            return startServer(port + 1);
        } else {
            console.error('Server error:', err);
        }
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
        console.log('SIGTERM received, shutting down gracefully');
        server.close(() => {
            console.log('Process terminated');
        });
    });

    process.on('SIGINT', () => {
        console.log('SIGINT received, shutting down gracefully');
        server.close(() => {
            console.log('Process terminated');
            process.exit(0);
        });
    });

    return server;
}

startServer().catch(console.error);
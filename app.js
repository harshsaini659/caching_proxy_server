const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const proxyRouter = require('./routes/proxy');
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', proxyRouter);

app.get('/', (req, res) => {
    res.send('Caching Proxy Server is running!');
});



app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
})
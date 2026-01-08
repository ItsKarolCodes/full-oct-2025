require('dotenv').config();
const express = require ('express')
const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended : false }) )

app.get('/', (req , res , next ) => {
    
    res.json(' Haciendo GET en / ')
})

app.listen( PORT, () => console.log(`Iniciando API en el puerto ${PORT}`))
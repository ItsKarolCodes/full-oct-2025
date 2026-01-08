console.clear()
const express = require('express')
const PORT = process.env.PORT || 3000

const app=express()

app.use ( express.json() )
app.use( express.urlencoded({extended : false}))

app.get('/' , ( req, res , next) =>{
    try {
        res.status(200).json(' Haciendo GET en /')
    }catch (error) {
        next(error)
    }
})

app.use(( err, req, next) =>{
    res.status(500).json('Error en la API')
})

app.listen( PORT, ()=> console.log('Iniciando API'))
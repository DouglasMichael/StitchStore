const express = require("express")
const jwt = require('jsonwebtoken')
const app = express()
require('dotenv').config()

const db = require("./connection")



app.use(express.json(),(req, res, next)=> {
    res.header('Access-Control-Allow-Origin', 'http://localhost:19006'); // Isso permite qualquer origem (não seguro em produção).
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();  
})
// app.post('/')


app.get('/api/v1/teste', AutenticateToken, (req, res) =>{
    db.query(`SELECT * FROM usuario WHERE nome = '${req.user.name}' AND senha = '${req.user.password}'`, (result, err) => {
        if (err) {
            res.send(err)
        }
        res.send(result)
    }).then((response) => { 
        res.json(response)
    })
    // res.json(jsonTeste.filter(teste => teste.username === req.user.name))
})

app.get('/api/v1/produtos', (req,res) => {
    db.query('SELECT * FROM produto', (error, result) => {
        if(error){
            console.log(error)
        }
    }).then(response =>{
        res.json(response[0])
    })
})
app.get('/api/v1/produtos/:id', (req,res) => {
    db.query(`SELECT * FROM produto WHERE CodigoProduto = ${req.params.id}`, (error, result) => {
        if(error){
            console.log(error)
        }
    }).then(response =>{
        res.json(response[0])
    })
})

app.post('/api/v1/pedidos', AutenticateToken, (req,res) => {
    const date = new Date()
    const total = req.body.total

    db.query(`INSERT INTO pedido(usuario, dataPedido, TotalPedido, statusPedido) VALUES(${req.user.ID_Usuario}, '${date.toLocaleDateString().split('/').reverse().join('-')}', ${total}, 'Confirmado')`, (err, result) => {
        if(err){
            console.log(err)
        }
    }).then((response) => {
        res.json(response[0])
    })
})
app.get('/api/v1/pedidos', AutenticateToken, (req,res) => {
    db.query(`SELECT * FROM pedido WHERE usuario = ${req.user.ID_Usuario} `, (err, result) => {
        if(err){
            console.log(err)
        }
    }).then((response) => {
        res.send(response[0])
    })
})

app.post('/api/v1/itens', (req,res) => {
    const CodigoProduto = req.body.CodigoProduto
    const CodigoPedido = req.body.CodigoPedido
    const TotalXQuantidade = req.body.TotalXQuantidade
    const Quantidade= req.body.Quantidade



    db.query(`INSERT INTO produtospedidos(CodigoProduto, CodigoPedido, TotalXQuantidadeProdutosPedidos, QuantidadeProdutosPedidos) VALUES(${CodigoProduto}, ${CodigoPedido}, ${TotalXQuantidade}, ${Quantidade})`, (err,result) => {
        if(err){
            console.log(err)
        }
    })

})


function AutenticateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) =>{
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
}
app.listen(3000, `${process.env.IP}`)
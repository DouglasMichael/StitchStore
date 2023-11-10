const express = require("express")
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')
const app = express()
require('dotenv').config()

const db = require("./connection")
const { error } = require("console")


app.use(express.json(),(req, res, next)=> {
    res.header('Access-Control-Allow-Origin', 'http://localhost:19006'); // Isso permite qualquer origem (não seguro em produção).
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
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

app.post('/api/v1/add/produtos', (req, res) =>{

    const diretorio = req.body.diretorio;
    
    fs.readdir(diretorio, (err, arquivos) => {
        if (err) {
            console.error('Erro ao ler o diretório:', err);
            return;
        }
        
        // Itera sobre os arquivos no diretório
        arquivos.forEach((arquivo) => {
            const caminhoArquivo = path.join(diretorio, arquivo);
            
            // Verifica se é um arquivo (não um subdiretório)
            if (fs.statSync(caminhoArquivo).isFile()) {
                const conteudo = fs.readFileSync(caminhoArquivo)
                const sql = "INSERT INTO produto(nomeProduto, precoProduto, imagem) VALUES ('caneca personalizada', 39.90, ?)"
                db.query({query: sql, values:[conteudo]},(error, result) => {
                    if (error) {
                        console.error('Erro ao inserir a imagem:', error);
                    }
                    res.send('Imagem inserida com sucesso no banco de dados.').status(201);
                })
            }
        });
    });
})

app.get('/api/v1/produtos', (req,res) => {
    db.query('SELECT * FROM produto', (error, result) => {
        if(error){
            console.log(error)
        }

        res.json(result)
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
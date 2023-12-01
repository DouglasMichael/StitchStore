const express = require("express")
const jwt = require('jsonwebtoken')
const app = express()
require('dotenv').config()

const db = require("./connection")

app.use(express.json(),(req, res, next)=> {
    res.header('Access-Control-Allow-Origin', 'http://localhost:19006'); // Isso permite qualquer origem (não seguro em produção).
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();  
})


let refreshTokens = []

app.post('/api/v1/login', (req, res) =>{
    //passado os campos requeridos para fazer a autenticação
    const email = req.body.Email
    const senha = req.body.senha

    //verificando no banco de dados se as informações passadas estão no banco
    db.query(`SELECT * FROM usuario WHERE Email = '${email}' AND senha = '${senha}'`, (result, err) => {
        // erro e acerto na query
        if (err) {
            res.send(err)
        }
        res.send(result)

    }).then((response) => { //acerto ou erro no retorno da query

        //condição e retorno das iformações passadas estão erradas
        if(response[0][0] == undefined) return res.sendStatus(404)

        //criação do usuario para o TOKEN DE ACESSO
        const user = { email: email, senha: senha, ID_Usuario:response[0][0].ID_Usuario }

        //ciração do TOKEN DE ACESSO com as informações passadas
        const accessToken = generateAcessToken(user)

        //criação do TOKEN DE ATUALIZAÇÃO com as informações passadas
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN, { expiresIn: '24h'})

        // salvando em uma lista o token de atualização para comprovar que ele realmente existe
        refreshTokens.push(refreshToken)
        
        // Resposta do back-end com os tokens criados (geralmente esses tokens são guardados no localstorage do front-end)
        res.json({ accessToken: accessToken, refreshToken: refreshToken })
    })
})


//função utilizada para atualizar o token de acesso quando ele expira
app.post('/api/v1/token', (req, res) => {
    //passado o campo requerido para um novo token de acesso (quando o mesmo expirou)
    const refreshToken = req.body.token

    //condição e retorno se passou alguma informação
    if (refreshToken == null) return res.sendStatus(401)

    //condição e retorno para saber se token de atualização existe
    if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403)

    //função para verificar se o token de atualização é valido
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
        //condição e retorno que o token não é valido
        if(err) return res.sendStatus(403)

        //gerando o token de acesso com as informações passada anteriormente
        const accessToken = generateAcessToken({ name: user.name, senha: user.senha })
        res.json({ accessToken: accessToken })
    })

})

app.post('/api/v1/cadastro', (req, res) =>{
    const nome = req.body.Nome
    const Email = req.body.Email
    const senha = req.body.senha
    const DataNasc = req.body.DataNasc
    const Logradouro = req.body.Logradouro
    const Numero = req.body.Numero
    const Complemento = req.body.Complemento
    const Bairro = req.body.Bairro
    const Cidade = req.body.Cidade
    const CEP = req.body.CEP
    const UF = req.body.UF
    db.query(`INSERT INTO usuario (Nome, Email, senha, DataNasc, Logradouro, Numero, Complemento, Bairro, Cidade, CEP, UF) VALUES ('${nome}', '${Email}', '${senha}', '${DataNasc}', '${Logradouro}', ${Numero}, '${Complemento}', '${Bairro}', '${Cidade}', ${CEP}, '${UF}')`, (result, err) => {
        if (err) {
            res.send(err)
        }
        res.send(result)
    })

    const resposta = { Nome: nome,Email, senha: senha, DataNasc: DataNasc, Logradouro: Logradouro, Numero: Numero, Complemento: Complemento, Bairro: Bairro, Cidade: Cidade, CEP: CEP, UF: UF }

    res.status(201).json(resposta)
})
 
//função usada para criar tokens de acesso com prazo de validade
function generateAcessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: '15m' })
}

app.listen(4000, `${process.env.IP}`)
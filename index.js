const customExpress = require('./config/customExpress')
const conexao = require('./infraestrutura/conexao')
const Tabelas = require('./infraestrutura/tabelas')

conexao.connect(erro => {
    if(erro){
        console.log(erro)
    }else{
        console.log('conect sucess')

        Tabelas.init(conexao)
        
        const app = customExpress()
        app.listen(3000, () => console.log('serv rodando na port 3000'))


    }

})



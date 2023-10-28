class Tabelas {
    init(conexao) {
        console.log('tabelas foram cria')
        this.conexao = conexao
        this.criarTurma()
    }

    criarTurma(){
        const sql = 'CREATE TABLE IF NOT EXISTS Turma (id int NOT NULL AUTO_INCREMENT, organizacao varchar(20) NOT NULL, localizacao varchar(50) NOT NULL, esporte varchar(20) NOT NULL, data_de_fechamento varchar(20) NOT NULL, horarios varchar(15) NOT NULL, descricao text, PRIMARY KEY(id))'

        this.conexao.query(sql, erro => {
            if(erro) {
                console.log(erro)
            }else{
                console.log('Tabela Turma criada com sucess')
            }
        })

    }
}

module.exports = new Tabelas
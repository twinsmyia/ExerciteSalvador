const conexao = require('../infraestrutura/conexao')

class Atendimento {
    adicionaTurma(atendimento, res){

        const organizacaoNaoNulo = atendimento.organizacao.length >0
        const localizacaoNaoNulo = atendimento.localizacao.length >0
        const esporteNaoNulo = atendimento.esporte.length >0
        const data_de_fechamentoNaoNulo = atendimento.data_de_fechamento.length >0
        const horariosNaoNulo = atendimento.horarios.length >0

        const validacao = [
            {
                nome: 'organizacao',
                valido: organizacaoNaoNulo,
                mensagem: 'O campo ORGANIZAÇÃO precisa ser preenchido.'
            },
            {
                nome: 'localizacao',
                valido: localizacaoNaoNulo,
                mensagem: 'O campo LOCALIZAÇÃO precisa ser preenchido.'
            },
            {
                nome: 'esporte',
                valido: esporteNaoNulo,
                mensagem: 'O campo ESPORTE precisa ser preenchido.'
            },
            {
                nome: 'data_de_fechamento',
                valido: data_de_fechamentoNaoNulo,
                mensagem: 'O campo DATA precisa ser preenchido.'
            },
            {
                nome: 'horarios',
                valido: horariosNaoNulo,
                mensagem: 'O campo HORARIO precisa ser preenchido.'
            },
        ]
        const erros = validacao.filter(campo => !campo.valido)
        const existemErros = erros.length

        if(existemErros){
            res.status(400).json(erros)
        }else{
            const sql = 'INSERT INTO Turma SET ?'

            conexao.query(sql, atendimento, (erro, resultados) => {
                if(erro){
                    res.status(400).json(erro)
                }else{
                    res.status(201).json(atendimento)
                }
            })

        }

    }

    exibirTurmas(res){
        const sql = 'SELECT * FROM Turma'
        conexao.query(sql, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json(resultados)
            }

        })
    }

    buscaPorIdDeTurma(id, res) {
        const sql = `SELECT * FROM Turma WHERE id=${id}`

        conexao.query(sql, (erro, resultados) => {
            const atendimento = resultados[0]
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json(atendimento)
            }
        })
    }

    alterarTurma(id, valores, res){
        const sql = 'UPDATE Turma SET ? WHERE id=?'
        conexao.query(sql, [valores, id], (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json({...valores, id})
            }
        })

    }

    excluirTurma(id, res) {
        const sql = 'DELETE FROM Turma WHERE id=?'
        conexao.query(sql, id, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json({id})
            }
        })
    }

}


module.exports = new Atendimento
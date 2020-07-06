const { Grupo } = require('../models/index');
const moment = require('moment');

module.exports = {
    chat: (socket) =>{
    
        // função que mostra as mensagens antigas
        // socket.emit('msgAntigas', mensagens);
    
        // função que recebe a msg que acabou de ser enviada
        socket.on("enviaMsg", async (data)=>{

            let id = data.idGrupo; 
            let objComArray = await Grupo.findByPk(id,{
                attributes:["chat"]
            })
            let lista = JSON.parse(objComArray.chat);
            // lista.push(data)
            let listaDeObj = [];
            for(item of lista){
                listaDeObj.push({
                    "autor":`${item.autor}`,
                    "mensagem":`${item.mensagem}`
                })
            }
            
            let horaMsg = moment().format('LT');
            data.idGrupo = undefined;
            data.horaMsg = horaMsg;

            listaDeObj.push(data)
            await Grupo.update({
                chat: JSON.stringify(listaDeObj)
            },{
                where:{
                    id:id
                }
            })
            // mensagens.push(data);

            // função que manda a mensagem para outos membros online
            socket.broadcast.emit('outrasMsg', data);
      })
    }  
}
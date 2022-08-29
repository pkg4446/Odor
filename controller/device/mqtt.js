const mqtt      = require("mqtt");

const devices   = require("./devices");

const options   = {
    host:       process.env.host,
    port:       1883,
    protocol:   "mqtt",
    username:   process.env.mqttuser,
    password:   process.env.mqttpass,
};
const client = mqtt.connect(options);
client.subscribe("server");
client.on("error", (error) => {console.log("Can't connect" + error);});
client.on("connect", () => {console.log("connected: "+ client.connected);});

client.on("message", async(topic, message) => {	
    console.log(`토픽:${topic.toString()}, 메세지:${message.toString()}, ID:${client.getLastMessageId()}`);
    const device = message.toString().split('=');
    
    try {
        if(device[0] == "ID"){
            sendTIME(device[1]); 
            const plasma = await devices.plasma_read(device[1]);            
            if(!plasma){
                await devices.plasma_create(device[1]);
                await devices.plasma_junction(device[1]);
            }else{
                await devices.plasma_update(device[1],"STATUS_R",true);
                await devices.plasma_update(device[1],"STATUS_F",false);
                await devices.plasma_update(device[1],"STATUS_H",false);
            }
        }else{
            const plasma = await devices.plasma_read(device[0]);
            if(plasma){
                if(device[2]){
                    switch (device[1]) {     
                        case "AT+RUN":                        
                            await devices.plasma_update(device[0],"STATUS_R",device[2]);
                            break;
                        case "AT+FAN":                        
                            await devices.plasma_update(device[0],"STATUS_F",device[2]);
                            break;  
                        case "AT+HEAT":                        
                            await devices.plasma_update(device[0],"STATUS_H",device[2]);
                            break;            
                        case "AT+sTshD":                        
                            await devices.plasma_update(device[0],"A_S_H",device[2]);
                            break;
                        case "AT+sTsmD":
                            await devices.plasma_update(device[0],"A_S_M",device[2]);                    
                            break;
                        case "AT+sTehD":
                            await devices.plasma_update(device[0],"A_E_H",device[2]);
                            break;
                        case "AT+sTemD":
                            await devices.plasma_update(device[0],"A_E_M",device[2]);
                            break;
                        case "AT+sTshN":                        
                            await devices.plasma_update(device[0],"P_S_H",device[2]);
                            break;
                        case "AT+sTsmN":
                            await devices.plasma_update(device[0],"P_S_M",device[2]);                    
                            break;
                        case "AT+sTehN":
                            await devices.plasma_update(device[0],"P_E_H",device[2]);
                            break;
                        case "AT+sTemN":
                            await devices.plasma_update(device[0],"P_E_M",device[2]);
                            break;                
                        case "AT+sTon":                        
                            await devices.plasma_update(device[0],"T_ON",device[2]);
                            break;
                        case "AT+sToff":
                            await devices.plasma_update(device[0],"T_OFF",device[2]);                    
                            break;
                        case "AT+sTPD":
                            await devices.plasma_update(device[0],"P_D",device[2]);
                            break;
                        case "AT+sTPR":
                            await devices.plasma_update(device[0],"P_T",device[2]);
                            break;
                        case "AT+CO2":                        
                            await devices.plasma_update(device[0],"S_CO2",device[2]);
                            break;
                        case "AT+NH3":
                            await devices.plasma_update(device[0],"S_NH3",device[2]);                    
                            break;
                        case "AT+H2S":
                            await devices.plasma_update(device[0],"S_H2S",device[2]);
                            break;
                        case "AT+Heat":
                            await devices.plasma_update(device[0],"H_T",device[2]);
                            break;
                        default:
                            break;
                    }
                }
            }            
        }
    } catch (error) {
        console.error(error);
    }    
});
//client.end();

timeRefresh = setInterval(async function() {
    sendTIME("serverTime"); 
}, 1000*60*60);


module.exports = {
    send : async function(data){
        const res = {
            pass: true,
            data: null
        }
        try {
            console.log(data)
            sendMQTT(data.TARGET, data.COMMEND);
        } catch (error) {
            res.pass = false;
        }        
        return res;
    },
}

function sendMQTT(target,contents){
    console.log("send: ",target, "message: ",contents);
    client.publish(target,contents,{qos:2});  
}

function sendTIME(target){
    const now = new Date();
    sendMQTT(target, `AT+ClockY=${now.getFullYear()}`);
    sendMQTT(target, `AT+ClockN=${now.getMonth()+1}`);
    sendMQTT(target, `AT+ClockD=${now.getDate()}`);
    sendMQTT(target, `AT+ClockH=${now.getHours()}`);
    sendMQTT(target, `AT+ClockM=${now.getMinutes()}`);
    sendMQTT(target, `AT+ClockS=${now.getSeconds()}`);
}
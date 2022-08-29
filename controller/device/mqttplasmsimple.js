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
client.subscribe("PlasmaS");
client.on("error", (error) => {console.log("Can't connect" + error);});
client.on("connect", () => {console.log("connected: "+ client.connected);});

client.on("message", async(topic, message) => {	
    console.log(`토픽:${topic.toString()}, 메세지:${message.toString()}, ID:${client.getLastMessageId()}`);
    const device = message.toString().split('=');
    
    try {
        if(device[0] == "ID"){
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
                        case "AT+ON":                        
                            await devices.plasma_update(device[0],"STATUS_R",true);
                            break;
                        case "AT+OFF":                        
                            await devices.plasma_update(device[0],"STATUS_R",false);
                            break;
                        case "AT+FAN":                        
                            await devices.plasma_update(device[0],"STATUS_F",device[2]);
                            break;                                        
                        case "AT+TC":                        
                            await devices.plasma_update(device[0],"T_ON",device[2]);
                            break;
                        case "AT+TO":
                            await devices.plasma_update(device[0],"T_OFF",device[2]);                    
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
const mqtt      = require("mqtt");

const plasma    = require("../../models/device/plasma");

const options   = {
    host:       "smarthive.kr",
    port:       1883,
    protocol:   "mqtt",
    username:   "hive",
    password:   "hive",
};

const client = mqtt.connect(options);
client.subscribe("server");
client.on("error", (error) => {console.log("Can't connect" + error);});
client.on("connect", () => {console.log("connected: "+ client.connected);});

client.on("message", (topic, message) => {	
    console.log(`토픽:${topic.toString()}, 메세지:${message.toString()}`);
    const device = message.toString().split('=');
    console.log(device);

    try {
        if(device == "ID"){
            const regist = await plasma.findByPk(device[1],{raw: true});
            await plasma.create({
                PLSM_ID: device[1]
            });  
        }      
    } catch (error) {
        
    }
    console.log(device);
});

//client.end();

module.exports = {
    send : async function(device, message){
        try {
            //message = "AT+ON"
            const deviceID = "ID=" + device;
            sendMQTT(deviceID, message);
        } catch (error) {
            
        }
        
    },
}

function sendMQTT(target,contents){
    console.log("send: ",target, "message: ",contents);
    client.publish(target,contents,{qos:2});  
}
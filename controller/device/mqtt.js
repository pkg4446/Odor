const mqtt      = require("mqtt");

const modules    = require("./modules");

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
    console.log(`토픽:${topic.toString()}, 메세지:${message.toString()}`);
    const device = message.toString().split('=');
    try {
        if(device[0] == "ID"){
            const plasma = await modules.plasma_read(device[1]);            
            if(!plasma){
                await modules.plasma_create(device[1]);
                await modules.plasma_junction(device[1]);
            }
        }
    } catch (error) {
        console.error(error);
    }
    console.log(device);
});

//client.end();

module.exports = {
    extra : async function(data){
        const res = {
            pass: true,
            data: 0
        }
        try {
            console.log(data)
            sendMQTT(data.TARGET, data.COMMEND);
        } catch (error) {
            res.pass = false;
        }        
        return res;
    },

    send : async function(device, message){
        const res = {
            pass: true,
            data: 0
        }
        try {
            //message = "AT+ON"
            const deviceID = "ID=" + device;
            sendMQTT(deviceID, message);
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
const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: process.env.PORT || 8000 });
// const wss = new WebSocket.Server({ server: "8000" });

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

wss.on(`connection`, async (ws) => {
    ws.on(`message`, async (message) => {
        console.log(`${message}`);
    })
    // while (true) {
    data = {
        "number": Math.random() * 10
    }
    //     await sleep(1000);
    ws.send(JSON.stringify(data));
    // }
})

module.exports = wss;
// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extention.
dgram = require("dgram");

var socket = dgram.createSocket("udp4")
var s = dgram.createSocket('udp4');

window.net = require('net');

window.udpSocket = {
    initSimulatorSocket: (ipAddress) => {
        s.on('message', function (msg, rinfo) {
            console.log('I got this message: ' + msg.toString());
        });
        s.bind(9051);
        socket.send(Buffer.from("reset"), 9050, ipAddress, function (error) {
            console.log("send reset message")
        });
    },
    sendDataToSimulator: (ipAddress, message) => {
        console.log("sending " + message)
        socket.send(Buffer.from(message), 9050, ipAddress);
    },
    close: () => {
        s.close();
        socket.close();
    }
}
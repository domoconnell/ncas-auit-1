var Gpio = require('onoff').Gpio;

var domesType = require('./app/services/domes.service');
var socket = require('socket.io-client')('http://192.168.20.2:5656', {
    'reconnection': true,
    'reconnectionDelay': 5000,
    'reconnectionDelayMax' : 5000,
    'reconnectionAttempts': 100000
})

socket.on('connect', function(){
	
	var obj = {
			name: 'Audit 1',
			type: 'node',
			ref: 'audit1' 
		}
	socket.emit('Register', obj)
	
});

socket.on('WelcomeNode', function(obj){
		sendStats()
	})
	
	socket.on('DomesOn', function(){
		domes.switch(1);
	})
	socket.on('DomesOff', function(){
		domes.switch(0);
	})
	socket.on('EmoOn', function(){
		emo.powerOn()
	})
	socket.on('EmoOff', function(){
		emo.powerOff()
	})
	socket.on('sendStatus', function(){
		sendStats()
	})
	
	socket.on('EmoSwitch', function(){
		emo.reverse();
	})
	
	socket.on('DomesSwitch', function(){
		domes.reverse();
	})
	


	

	
var emo = require('./app/services/emo.service')(Gpio, socket)
var domes = new domesType(Gpio, socket)



sendStats = function(){
	domes.getStatus().then(function(value){
		socket.emit('UpdateState', {
			node: 'domes',
			value: value
		})		
	})
	emo.getStatus().then(function(value){
		socket.emit('UpdateState', {
			node: 'emo',
			value: value
		})	
	})
	
}

var Gpio = require('onoff').Gpio;

var domesType = require('./app/services/domes.service');
var socket = require('socket.io-client')('http://192.168.20.2:5656');
var emo = require('./app/services/emo.service')(Gpio, socket)
var domes = new domesType(Gpio, socket)


readyToConnect = function(){
	socket.on('connect', function(){
		var obj = {
			name: 'Audit 1',
			type: 'node',
			ref: 'audit1' 
		}
		socket.emit('Register', obj)
		
	});
	socket.on('Welcome', function(obj){
		sendStats()
	})
	socket.on('DomesOn', function(){
		console.log('DomesOn');
	})
	socket.on('DomesOn', function(){
		console.log('DomesOn');	
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


}
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

readyToConnect();


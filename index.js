var Gpio = require('onoff').Gpio;
var emoType = require('./app/services/emo.service');
var emo = new emoType(Gpio)

var domesType = require('./app/services/domes.service');
var domes = new domesType(Gpio)







setTimeout(function(){
	domes.switch(0);
//	emo.typeCode(1654);
}, 1000);

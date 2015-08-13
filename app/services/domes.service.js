var q = require('q');
var async = require('async');


function domes(Gpio, socket) {
	domes.control = new Gpio(8, 'high')
	domes.status = new Gpio(11, 'in', 'both')
	domes.lastUpdate = null
	domes.status.watch(function (err, value) {
		var test = new Date().getTime();
		domes.lastUpdate = test
		setTimeout(function(){
			if(test==domes.lastUpdate){
				//domes changes
				socket.emit('UpdateState', {
					node: 'domes',
					value: value
				})
			}
		}, 500);
	})
}







domes.prototype.relaySwitch = function(val) {

	var def = q.defer();

	domes.control.write(val, function(){
		def.resolve(true);
	})
	return def.promise;
};

domes.prototype.getStatus = function(log){
	var def = q.defer();
	
	domes.status.read(function(err, value){
		if(log){
			console.log('domes: ' + value);
		}
		def.resolve(value);
	})
	return def.promise;
}


domes.prototype.switch = function(direction){
	domes.prototype.getStatus(false).then(function(val){
		if(val!=direction){
			//switch to whatever it isnt now
			if(val==1){
				switchTo = 0;
			}else{
				switchTo = 1;
			}
			domes.prototype.relaySwitch(switchTo);
		}
	})

	
}





module.exports = domes;
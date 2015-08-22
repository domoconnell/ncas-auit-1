var q = require('q');
var async = require('async');


function domes(Gpio, socket) {
	domes.socket = socket;
	domes.control = new Gpio(8, 'high')
	domes.status = new Gpio(11, 'in', 'both')
	domes.lastUpdate = null;
	domes.relayTracker = 1;
	domes.status.watch(function (err, value) {
		var test = new Date().getTime();
		domes.lastUpdate = test
		setTimeout(function(){
			if(test==domes.lastUpdate){
				//domes changes
				domes.socket.emit('UpdateState', {
					node: 'domes',
					value: value
				})
			}
		}, 500);
	})
	
	
	
}







domes.prototype.relaySwitch = function() {
	var val = null;
	var def = q.defer();
	
	if(domes.relayTracker==1){
		val = 0
	}else if(domes.relayTracker==0){
		val = 1
	}
	domes.control.write(val, function(){
		def.resolve(true);
		domes.relayTracker = val;
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
			
			domes.socket.emit('UpdateState', {
				node: 'domes',
				value: direction
			})
		}
	})	
}

domes.prototype.reverse = function(){
	domes.prototype.relaySwitch();
}





module.exports = domes;
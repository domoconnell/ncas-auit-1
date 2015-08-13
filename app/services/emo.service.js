var q = require('q');
var async = require('async');


function emo(Gpio, socket) {
	emo[1] = new Gpio(4, 'high')
	emo[2] = new Gpio(17, 'high')
	emo[3] = new Gpio(18, 'high')
	emo[4] = new Gpio(24, 'high')
	emo[5] = new Gpio(22, 'high')
	emo[6] = new Gpio(23, 'high')
	emo.on = new Gpio(9, 'in', 'both');
	emo.status = null;
	emo.lastUpdate = null;
	emo.socket = socket
	

	emo.lastUpdate = null
	emo.on.watch(function (err, value) {
		var test = new Date().getTime();
		emo.lastUpdate = test
		setTimeout(function(){
			if(test==emo.lastUpdate){
				//domes changes
				emo.socket.emit('UpdateState', {
					node: 'emo',
					value: value
				})
			}
		}, 500);
	})
	
	emo.prototype.getStatus().then(function(value){
		emo.status = value;
	})
	
	
}

emo.prototype.pushButton = function(button) {
	var def = q.defer();

	emo[button].write(0, function(){
		setTimeout(function(){
			emo[button].write(1, function(){
				setTimeout(function(){
					def.resolve(true)
				}, 150);
			}, 150);
		}, 150);
	})
	return def.promise;
	
};

emo.prototype.powerOn = function(){
	if(emo.status==0){
		emo.prototype.typeCode(1654);
	}
}


emo.prototype.powerOff = function(){
	if(emo.status==1){
		emo.prototype.typeCode(1654);
	}
}

emo.prototype.typeCode = function(code){
	var def = q.defer();
	code = parseInt(code).toString().split('');
	async.eachSeries(code, function iterator(item, callback) {
		emo.prototype.pushButton(item).then(function(){
			callback()
		})
	}, function done() {
		def.resolve(true);
	});
	return def.promise;
}


emo.prototype.getStatus = function(){
	var def = q.defer();
	emo.on.read(function(err, value){
		def.resolve(value);
	})
	return def.promise;
}


module.exports = function(Gpio, socket){
	return new emo(Gpio, socket)
}
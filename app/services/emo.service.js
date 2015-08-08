var q = require('q');
var async = require('async');


function emo(Gpio) {
	emo[1] = new Gpio(4, 'high')
	emo[2] = new Gpio(17, 'high')
	emo[3] = new Gpio(18, 'high')
	emo[4] = new Gpio(24, 'high')
	emo[5] = new Gpio(22, 'high')
	emo[6] = new Gpio(23, 'high')
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

module.exports = emo;
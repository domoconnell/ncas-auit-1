var Gpio = require('onoff').Gpio;

	
	/*
		GPIO	4	>	emo 1
		GPIO	17	>	emo 2
		GPIO	18	>	emo 3
		GPIO	24	>	emo 4
		GPIO	22	>	emo 5
		GPIO	23	>	emo 6
		GPIO	8	> 	left domes
		GPIO	7	>	right domes
		GPIO	10	>	emo on in
		GPIO	9	>	emo off in
		GPIO	11
		GPIO	8
		GPIO	7
	*/
	
var	emo1 = new Gpio(4, 'HIGH'),
	emo2 = new Gpio(17, 'HIGH'),
	emo3 = new Gpio(18, 'HIGH'),
	emo4 = new Gpio(24, 'HIGH'),
	emo5 = new Gpio(22, 'HIGH'),
	emo6 = new Gpio(23, 'HIGH'),
	ldomes = new Gpio(8, 'HIGH'),
	rdomes = new Gpio(7, 'HIGH'),
	emoonstat = new Gpio(25, 'in'),
	emoofstat = new Gpio(9, 'in');	

	
	
	
	
	
	doEmo = function(){
		emo1.write(0, function(){
			setTimeout(function(){
				emo1.writeSync(1);
				setTimeout(function(){
					emo6.write(0, function(){
						setTimeout(function(){
							emo6.writeSync(1);
							setTimeout(function(){
								emo5.write(0, function(){
									setTimeout(function(){
										emo5.writeSync(1);
										setTimeout(function(){
											emo4.write(0, function(){
												setTimeout(function(){
													emo4.writeSync(1);
												}, 100);
											})
										}, 100);	
										
										
									}, 100);
								})
							}, 100);
		
		
						}, 100);
					})
				}, 100);
		
		
			}, 100);
		})
		
		
		
		
		
				
		
	}
	

	
	
	readEmo = function(){
		emoofstat.read(function(err, val){
			console.log('offstat', val);
		})
		emoonstat.read(function(err, val){
			console.log('onstat', val);
		})
	}
	
	
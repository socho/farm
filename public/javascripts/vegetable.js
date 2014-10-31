var Vegetable = function(vegetable) {	//assume created only for unharvested veggies.
	var cycle = parseInt(vegetable.cycle);
	var creationTime = parseInt(vegetable.time);
	return {
		getStatus: function(currentTime) {
			var timeDiff = currentTime - creationTime;
			switch (Math.floor(timeDiff/(cycle*60*1000))) {
				case 0: //seed
					return "seed";
					break;
				case 1: //sprout
					return "sprout";
					break;
				case 2: //full_grown
					return "full_grown";
					break;
				case 3: //ready_to_harvest
					return "ready_to_harvest";
					break;
				default: //past ready_to_harvest
					return "dead";
					break;
			}
		}
	};
}
var PinsSimulators = require('PinsSimulators');

exports.configure = function(configuration) {
	this.pinsSimulator = shell.delegate("addSimulatorPart", {
			header : { 
				label : "Analog", 
				name : "Analog Input", 
				iconVariant : PinsSimulators.SENSOR_SLIDER 
			},
			axes : [
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Heart Beat/Minute",
						valueID : "heartBeat",
						minValue: 0,
						maxValue: 120,
						value: 60,
						defaultControl: PinsSimulators.SLIDER
					}
				),
			]
		});
}

exports.close = function() {
	shell.delegate("removeSimulatorPart", this.pinsSimulator);
}

exports.read = function() {
	var axes = this.pinsSimulator.delegate("getValue");
	return {heartBeat: axes.heartBeat};
}

exports.pins = {
			analog: { type: "A2D" }
		};
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
						minValue: 40,
						maxValue: 150,
						value: 80,
						defaultControl: PinsSimulators.SLIDER
					}
				),
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Systolic Pressure",
						valueID : "systolicVal",
						minValue: 90,
						maxValue: 140,
						value: 130,
						defaultControl: PinsSimulators.SLIDER
					}
				),
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Diastolic Pressure",
						valueID : "diastolicVal",
						minValue: 60,
						maxValue: 90,
						value: 85,
						defaultControl: PinsSimulators.SLIDER
					}
				),
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "LDL",
						valueID : "ldlVal",
						minValue: 50,
						maxValue: 240,
						value: 150,
						defaultControl: PinsSimulators.SLIDER
					}
				),
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "HDL",
						valueID : "hdlVal",
						minValue: 40,
						maxValue: 60,
						value: 45,
						defaultControl: PinsSimulators.SLIDER
					}
				),
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "BMI",
						valueID : "bmiVal",
						minValue: 20,
						maxValue: 30,
						value: 30,
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
	return {heartBeat: axes.heartBeat, systolicVal: axes.systolicVal, diastolicVal: axes.diastolicVal, ldlVal: axes.ldlVal, hdlVal: axes.hdlVal, bmiVal: axes.bmiVal};
}

exports.pins = {
			analog: { type: "A2D" }
		};
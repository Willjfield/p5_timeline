"use strict"

var radius
var animation

function setup(){
	createCanvas(windowWidth,windowHeight)
	radius = 100
	animation = new Timeline('radius')
	animation.playSpeed = 2

	animation.addKey(200, 2,'ease')
	animation.addKey(100,2,'ease')
	animation.addKey(200,2,'linear')
	animation.addKey(100,2,'linear')
	//animation.stretchKeys(5)
	animation.startKey(5)
	for(var k in animation.keys){
		console.log(animation.keys[k].time)
	}
	fill(255)
	textAlign(CENTER)
	textSize(32)

}
function draw(){
	background(0)
	ellipse(windowWidth/2,windowHeight/2,radius,radius)	
	fill(255,radius,0);
	rectMode(CENTER)
	push();
	translate(windowWidth/3,windowWidth/3);
	rotate(radius/20);
	rect(0,0,radius,radius*2);
	pop();
	push();
	translate(windowWidth*.66,windowWidth*.33);
	rotate(radius/20);
	rect(0,0,radius,radius*2);
	pop();		
		
		
	text("Click once to play the animation",windowWidth/2,windowHeight-100)
}

function mousePressed(){
	animation.play()
}


///////////////////////////////////////////////
/*BELOW IS FIRST PASS AT CODE FOR P5_Timeline*/
///////////////////////////////////////////////


var Timeline = function(_variable){
	this.variable = {
		name: _variable,
		value: window[_variable]
	}
	this.keys = []
	this.isPlaying = false
	this.startTime = 0
	this.playSpeed = 1
}

Timeline.prototype.stretchKeys = function(amount){
	this.keys.forEach(function(entry) {
		entry.time*=amount
	});
}

Timeline.prototype.startKey = function(amount){
	var key = {
		targetValue: this.variable.value,
		time: amount,
		interpolation: 'linear'
	}
	this.keys.unshift(key)
}

Timeline.prototype.addKey = function(targetValue,time,interpolation){
	var key = {
		targetValue: targetValue,
		time: time,
		interpolation: interpolation
	}	
	this.keys.push(key)
}

Timeline.set = function (_variable, value){
	window[_variable] = value
}

Timeline.prototype.play = function(){
	var startValue = window[this.variable.name]
	var curValue = startValue
	var isPlaying = this.isPlaying
	var keys = this.keys
	var variable = this.variable
	var playSpeed = this.playSpeed
	var startTime = this.startTime
	var keyNum = 0

	if(!isPlaying){
		startTime = millis()
	}
	
	isPlaying = true

	var animate = function(){
		var elapsedTime = millis()-startTime;
		console.log('start value:' + startValue)
		console.log('target value:' + keys[keyNum].targetValue)
		if(elapsedTime<keys[keyNum].time*1000/playSpeed){
			setTimeout(animate,1000/getFrameRate())	
			var curTime=(elapsedTime/(keys[keyNum].time*1000))*playSpeed			
			if(keys[keyNum].interpolation=='linear'){	
				curValue=startValue+(keys[keyNum].targetValue-startValue)*curTime
				//lerp actually works too with the below expression:
				//curValue = lerp(startValue,keys[keyNum].targetValue,elapsedTime/(keys[keyNum].time*1000))
			}else if(keys[keyNum].interpolation == 'ease'){
				//Put in code for easing here
				//var curTime=(elapsedTime/(keys[keyNum].time*1000))
				//make this less confusing
				curTime = (3*curTime*curTime)-(2*curTime*curTime*curTime)
				curValue=startValue+(keys[keyNum].targetValue-startValue)*curTime
			}
				console.log('setting value to: '+curValue)
			Timeline.set(variable.name,curValue)
		}else if(keyNum<keys.length-1){
			startValue = window[variable.name]
			startTime = millis()
			keyNum++
			setTimeout(animate,1000/getFrameRate())
		}	
		isPlaying = false
	//	console.log(someVar)
	}
		
	animate()
	
}


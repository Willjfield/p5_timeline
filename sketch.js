"use strict"

var radius
var animation

function setup(){
	createCanvas(windowWidth,windowHeight)
	radius = 3.67
	animation = new Timeline('radius')
	animation.addKey(200, .25,'linear')
	animation.addKey(150,.5,'linear')
	animation.addKey(250,1,'linear')
	animation.addKey(300,1.5,'linear')
	
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
	var startTime = 0
	var keyNum = 0

	if(!isPlaying){
		startTime = millis()
	}
	
	isPlaying = true

	var animate = function(){
		var elapsedTime = millis()-startTime;
		console.log('start value:' + startValue)
		console.log('target value:' + keys[keyNum].targetValue)
		if(elapsedTime<keys[keyNum].time*1000){
			setTimeout(animate,1000/getFrameRate())					
			if(keys[keyNum].interpolation=='linear'){
				curValue=startValue+(keys[keyNum].targetValue-startValue)*(elapsedTime/(keys[keyNum].time*1000))
				//lerp actually works too with the below expression:
				//curValue = lerp(startValue,keys[keyNum].targetValue,elapsedTime/(keys[keyNum].time*1000))
			}else if(keys[keyNum].interpolation == 'ease'){
				//Put in code for easing here
				curValue=startValue+(keys[keyNum].targetValue-startValue)*(elapsedTime/(keys[keyNum].time*1000))
			}
				console.log('setting value to: ')
			Timeline.set(variable.name,curValue)
		}else if(keyNum<keys.length-1){
			startValue = window[variable.name]
			startTime = millis()//keys[keyNum].time
			keyNum++
			setTimeout(animate,1000/getFrameRate())
		}	
		isPlaying = false
		console.log(someVar)
	}
		
	animate()
	
}


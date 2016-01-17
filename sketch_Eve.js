"use strict"

var radius
var animation

function setup() {
    createCanvas(windowWidth, windowHeight)
    radius = 100
    animation = new Timeline('radius')
    animation.addKey(200, .5, 'ease')
    animation.addKey(100, 1, 'ease')
    animation.addKey(200, 1.5, 'linear')
    animation.addKey(100, 2, 'linear')
        // animation.playSpeed(2);

    fill(255)
    textAlign(CENTER)
    textSize(32)

}

function draw() {
    background(0)
    ellipse(windowWidth / 2, windowHeight / 2, radius, radius)
    fill(255, radius, 0);
    rectMode(CENTER)
    push();
    translate(windowWidth / 3, windowWidth / 3);
    rotate(radius / 20);
    rect(0, 0, radius, radius * 2);
    pop();
    push();
    translate(windowWidth * .66, windowWidth * .33);
    rotate(radius / 20);
    rect(0, 0, radius, radius * 2);
    pop();


    text("Click once to play the animation", windowWidth / 2, windowHeight - 100)
}

function mousePressed() {
    animation.play()
}


///////////////////////////////////////////////
/*BELOW IS FIRST PASS AT CODE FOR P5_Timeline*/
///////////////////////////////////////////////

//a constructor
var Timeline = function(_variable) {
    this.variable = {
        name: _variable,
        value: window[_variable]

    }
    this.keys = []
    this.isPlaying = false
}

// Timeline.prototype.playSpeed(){

// }

//add a function to the prototype
Timeline.prototype.addKey = function(targetValue, time, interpolation) {
    var key = {
        targetValue: targetValue,
        time: time,
        interpolation: interpolation
    }
    this.keys.push(key)
}

//a method?
Timeline.set = function(_variable, value) {
    window[_variable] = value
        //reseting it
        // window[] gets value from a string
        //evaluating the code in the bracket.
        //Timelines needs to be tied to a variable but can't just pass the name, 
        //tell it to look for strings and use that value
}

Timeline.prototype.play = function() {
    var startValue = window[this.variable.name]
    var curValue = startValue
    var isPlaying = this.isPlaying
    var keys = this.keys
    var variable = this.variable
    var startTime = 0
    var keyNum = 0

    if (!isPlaying) {
        startTime = millis()
    }

    isPlaying = true

    var animate = function() {

        //multiply current time to playspeed number
        //try adding .5 in here to change the playspeed
        // curTime =curTime*.5;
        // var curTime = (elapsedTime / (keys[keyNum].time * 1000))
        var elapsedTime = millis() - startTime;
        console.log('start value:' + startValue)
        console.log('target value:' + keys[keyNum].targetValue)
        if (elapsedTime < keys[keyNum].time * 1000) {
            //set timeout. if counter hasn't reached next keyframe
            //run through yourself as long as the statement above is true
            setTimeout(animate, 1000 / getFrameRate())
            if (keys[keyNum].interpolation == 'linear') {
            	curTime = (elapsedTime / (keys[keyNum].time * 1000))
                curValue = startValue + (keys[keyNum].targetValue - startValue) * curTime
                    //lerp actually works too with the below expression:
                    //curValue = lerp(startValue,keys[keyNum].targetValue,elapsedTime/(keys[keyNum].time*1000))
            } else if (keys[keyNum].interpolation == 'ease') {
                //Put in code for easing here
                // var curTime = (elapsedTime / (keys[keyNum].time * 1000))
                curTime = (3 * curTime * curTime) - (2 * curTime * curTime * curTime)
                curValue = startValue + (keys[keyNum].targetValue - startValue) * curTime
            }
            console.log('setting value to: ' + curValue)
                //? Timeline.set doesn't need to be attached to an object
                //Timeline is a blueprint with objects in it, some are neccessary 
                //
            Timeline.set(variable.name, curValue) //reset the curValue

        } else if (keyNum < keys.length - 1) {
            startValue = window[variable.name]
            startTime = millis() //keys[keyNum].time
            keyNum++
            setTimeout(animate, 1000 / getFrameRate())
        }
        isPlaying = false
            //	console.log(someVar)
    }

    animate()

}

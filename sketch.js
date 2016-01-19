"use strict"

var radius, anim2, anim3
var animation
var timeline2

function setup() {
    createCanvas(windowWidth, windowHeight)
    radius = 10
    anim2 = 10

    animation = new Timeline('radius')
    animation.playSpeed = 3

    animation.addKey(200, 2, 'ease') //target value, keyPosition, interpolation
    animation.addKey(66, 7, 'ease')
    animation.addKey(506, 20, 'ease')
    animation.addKey(200, 3, 'linear')
    animation.addKey(200, 4, 'linear')


    fill(255)
    textAlign(CENTER)
    textSize(32)


}

function draw() {
    background(0)
    // if (animation.play.elapsedTime > 0) {
    //     text((millis() - animation.startTime).toFixed(2), 50, 50)
    // }
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


var Timeline = function(_variable) {
    this.variable = {
        name: _variable,
        value: window[_variable]
    }
    this.keys = []
    this.isPlaying = false
    this.startTime = 0
    this.playSpeed = 1
    this.shiftAmount = 0;
    this.addKey(this.variable.value, 0, 'linear')
}

Timeline.prototype.stretchKeys = function(amount) {
    this.keys.forEach(function(entry) {
        entry.time *= amount
    });
}

Timeline.prototype.setKeyDurations = function() {
    //duration is distance from this key tothe one before it
    //get the duration of a key by subtracting its time from the previous one
    for (var i in this.keys) {
        if (i > 0) {
            this.keys[i].duration = this.keys[i].keyPosition - this.keys[i - 1].keyPosition

        } else {
            this.keys[i].duration = this.keyPosition
        }
    }
}

Timeline.prototype.setKeyPositions = function() {
    //new var for current position, run through all keys, start at zero
    var curPos = 0
        // k is a place holder for whatever item in the keys array its on
    this.keys.forEach(function(k) {
        curPos += k.time
        k.keyPosition = curPos
    })
}
Timeline.prototype.shiftKeyPositions = function(amount) {
    var curPos = amount
        //for each key in this.keys, add the argument 'amount' to it's time parameter
    this.keys.forEach(function(k) {
        curPos += k.time
        k.keyPosition = curPos
    })
}
Timeline.prototype.addKey = function(targetValue, keyPosition, interpolation) {
    //create key object with 3 parameters, push it to the array 'this.keys' for this timeline, and call function 'this.setKeyPositions()'
    var key = {
        targetValue: targetValue,
        keyPosition: keyPosition,
        interpolation: interpolation
    }
    this.keys.push(key)
    this.keys.sort(sortKeyPositions)
        //should this be called after all art sorted?
    this.setKeyDurations();
    // this.setKeyPositions();

}

function sortKeyPositions(a, b) {
    if (a.keyPosition < b.keyPosition)
        return -1;
    else if (a.keyPosition > b.keyPosition)
        return 1;
    else
        return 0;
}

Timeline.set = function(_variable, value) {
    window[_variable] = value
}

Timeline.prototype.play = function() {
    var startValue = window[this.variable.name]
    var curValue = startValue
    var isPlaying = this.isPlaying
    // var isPaused = this.isPaused
    var keys = this.keys
    var variable = this.variable
    var playSpeed = this.playSpeed
    var startTime = this.startTime
    var keyNum = 1

    if (!isPlaying) {
        startTime = millis()
    }

    isPlaying = true

    var animate = function() {
        var elapsedTime = millis() - startTime;
        if (elapsedTime < (keys[keyNum].duration * 1000 / playSpeed)) {
            setTimeout(animate, 1000 / getFrameRate())
            var curTime = (elapsedTime / (keys[keyNum].duration * 1000)) * playSpeed
            if (keys[keyNum].interpolation == 'linear') {
                curValue = startValue + (keys[keyNum].targetValue - startValue) * curTime
            } else if (keys[keyNum].interpolation == 'ease') {
                curTime = (3 * curTime * curTime) - (2 * curTime * curTime * curTime)
                curValue = startValue + (keys[keyNum].targetValue - startValue) * curTime
            }
            //console.log('setting value to: '+curValue)
            Timeline.set(variable.name, curValue)
        } else if (keyNum < keys.length - 1) {
            startValue = window[variable.name]
            startTime = millis()
            keyNum++
            setTimeout(animate, 1000 / getFrameRate())
        }
        isPlaying = false
    }

    animate();

}

//can we just incorporate pause into play() ?
// Timeline.prototype.pause = function() {
//     var startValue = window[this.variable.name]
//     var curValue = startValue
//     var isPlaying = this.isPlaying
//     var isPaused = this.isPaused
//     var keys = this.keys
//     var variable = this.variable
//     var playSpeed = this.playSpeed
//     var startTime = this.startTime
//     var keyNum = 1

//     isPaused = true;
//     isPlaying = false;


// }

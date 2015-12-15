//Example ideal usage of p5Keyframes

//create some number (int or float)
var someVar = 3.67

//create a new timeline for the variable someVar
var animation = new Timeline(someVar)

//value is already set to 3.67 in the code. Whatever the value of the variable is before the timeline plays is the value at time=0 in the timeline. The first key here will interpolate from that value to 100 in 2 seconds with an ease
addKey([value], [timestamp],[interpolation])
animation.addKey(100,2,"Ease")

//add a key to bring someVar to 50 at 4 seconds into the animation. Interpolate to give integers only.
animation.addKey(50,4,"Integer")

//change the first keyframe's interpolation to linear
animation.key(0).interpolate = "Linear"

//set 20 keyframes controlling someVar with a sin function
for(var i=0;i<20;i++){
	animation.addKey(sin(i)*200,i,"Ease")
}

//clamp the values of the keys in animation to less than 200
for(var k in animation){
	if(k.value>200){
		k.value = 200
	}
}

//remove key number 2
animation.remove(2)

//remove all keys between number 10 to 15
animation.remove(10,15)

//check to see where your keyframes are now that you've removed some. It returns an array. ex first value: [0,200, 2.2,linear] number of key, value, second mark,and interpolation
animation.getKeys();

//shift the entire timeline back 2 seconds.
animation.shift(-2)

//change the play speed to .5 (half speed)
animation.playSpeed(.5)

//play the animation all the way through when some condition is met
if(condition){
	animation.play()
}

//play just from seconds 1-3
animation.play(1,3)

//play (in reverse) seconds 3-1
animation.play(3,1)

//pause the animation
animation.pause()

//stop the animation
animation.stop()

//loop the portion of the animation from 1 sec to 5.4 seconds
animation.loop(1,5.4)

//make a new variable
var newVar = 10

//assign animation newVar so that it the "animation" timeline will control both variables together
animation.addVariable(newVar)

//or make a copy of the first timeline as it exists when the new Timeline object is constructed
var secondAnimation = new Timeline(newVar)
secondAnimation.copy(animation)

//create a boolean and animate it off and on every second for 20 seconds
var someBool = true
var boolAnimation = new Timeline(someBool)
for(var k =0;k<20;k++){
	if(k%2==1){
		boolAnimation.addKey(false,k)
	}else{
		boolAnimation.addKey(true,k)
	}
}

# Super-Max
<!-- 
[Click here to see deployed game](http://github.com) -->

## Description
You are a racing driver called Super Max. You need to score more points than Hamilton to win the championship. You do this by collecting points. But don't run over the oil or crash into other cars or you will lose points. 

## MVP
Start screen.
A car for the player
the car can jump
Oil patched will appear on the road from the right side.
Hitting oil patches will lose you points. 
Other cars will appear from the right side of the screen.
Hitting other cars will lose you points, car disappears after hit.
Points will appear from the right side of the road.  
Points you can collect. They disappear after you collide with them and the amount of points you hit will be added to you score.
A counter to show your points. 
Hamilton's points. 
Difficulty will increase the longer you play.
Game ends when you hit a certain amount of points or crash three times.
End screen with your score and a restart button.
Background.


## Backlog
Shooting mechanic: The car can shoot others cars and destroy them so you don't crash into them. 
Platform where you can jump on.
Bulletproof cars that can't be destroyed by shooting.
Music, begin and during game and end. Maybe different music for win or loss. 
Spinning animation when the oil is hit.


## Data structure
_List of classes and methods_
addEventListener for space-bar

funtion jumpHandler(){} adds to code and logic for making a jump.

function collisionDetection(){} adds the code and logic for if you make a collision. Different code for different collisions.



function Draw(){}: for drawing background image, car images, the score keeping, forground images, the points you can collect.

setInterval(draw) 




## States y States Transitions
_List of states (views) of your game_
First State, begin screen. 
Second State, playing the game.
Third State, Victory Screen.
Fourth State, Defeat Screen


## Task
_List of tasks in order of priority_

Build Start screen;
draw the road;
draw the car
build the jump mechanic.
draw the collectable points
make to collectable points move towards you
write code so when you hit pointsimages, you score increases and the pointimages disappear.
build End screen


draw other cars
make the cars move towards you
write code so when you hit a car you lose points.

draw oil patches

write code so when you hit the oils patches you lose points.





## Links

<!-- - [Trello Link](https://trello.com)
- [Slides Link](http://slides.com)
- [Github repository Link](http://github.com)
- [Deployment Link](http://github.com) -->
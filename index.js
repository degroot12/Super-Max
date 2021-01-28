let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d')
canvas.style.border = '2px solid black'
let intervalID = 0;
let score = 0;
let penaltyPoints = 0;
let hamiltonScore = 250;
let lives = 10
let zombieCarsKilled = 0

// AUDIO

let superMaxSound = new Audio()
superMaxSound.src = 'sounds/superMaxLowSound.mp3'
superMaxSound.volume = 0
let lewisWinSound = new Audio()
lewisWinSound.src = 'sounds/losingSound.mp3'
lewisWinSound.volume = 0
let victoryMusic = new Audio()
victoryMusic.src = 'sounds/victoryMusic.mp3'
victoryMusic.volume = 0
const startSong = document.getElementById('startSong')
startSong.volume = 0
let volumeOff = true




// BEGIN AND ENDSCREENS

const startGameBtn = document.querySelector('.startGameBtn')
const splash = document.querySelector('.splash')
const playAgainBtn = document.querySelector('.playAgainBtn')
const playAgainBtnWin = document.querySelector('.playAgainBtnWin')
const lewisWins = document.querySelector('.losing-screen')
const maxWins = document.querySelector('.victory-screen')
const easyBtn = document.querySelector('.easyBtn')
const mediumBtn = document.querySelector('.mediumBtn')
const hardBtn = document.querySelector('.hardBtn')
const muteBtn = document.querySelector('.muteBtn')

// IMAGES USED IN GAME

const bgImg = document.createElement('img');
bgImg.src = 'images/backgroundColorGrass.png'
const curbs = document.createElement('img')
curbs.src = 'images/curbs.png'
const maxImg = document.createElement('img');
maxImg.src = 'images/MaxCarScaled.png'
const carImg = document.createElement('img')
carImg.src = 'images/CharlesCar.png'
const pointsImg = document.createElement('img')
pointsImg.src = 'images/platformPack_item002.png'
const boostImg = document.createElement('img')
boostImg.src = 'images/platformPack_item014.png'
const bulletImg = document.createElement('img')
bulletImg.src = 'images/bullet.png'
const zombieImg = document.createElement('img')
zombieImg.src = 'images/ZombieCar.png'
const longBlock = document.createElement('img')
longBlock.src = 'images/betterLong.png'
const planeImg = document.createElement('img')
planeImg.src = 'images/TeamInstinctPlane.png'

// OBJECTS FOR ITEMS

let cars = [{x: canvas.width + 10, y:650}]
let points = [{x: canvas.width + 50, y: 670}]
let oilPatch = [{x: canvas.width + 100, y: 720}]
let boosts = [{x: canvas.width + 300, y: 670}]
let longBlocks = [{x: canvas.width + 50, y: 450}]
let topPoints = [{x: canvas.width + 200, y: 400}]
let zombieCars = [{x: canvas.width + 200, y: 690}]

let bulletX = 190
let bullets = [{x: 190, y: 750}]
let planes = [{x: canvas.width + 300, y: 50}]
let blockY = 480
let jumping = false
let normalGame = true

const maxX = 100;
let maxY = 650;
let maxIncrement = 0

//ADD EVENTLISTENERS

easyBtn.addEventListener('click', () => {
    hamiltonScore = 100
    lives = 25
})

mediumBtn.addEventListener('click', () => {
    hamiltonScore = 250
})

hardBtn.addEventListener('click', () => {
    hamiltonScore = 400
    lives = 3
})

muteBtn.addEventListener('click', () => {
    if(volumeOff){
        superMaxSound.volume = 0.3
        lewisWinSound.volume = 0.3
        victoryMusic.volume = 0.3
        startSong.volume = 0.3
        volumeOff = false
        muteBtn.innerText = 'Turn the music off'
    }
    else {
        superMaxSound.volume = 0
        lewisWinSound.volume = 0
        victoryMusic.volume = 0
        startSong.volume = 0
        volumeOff = true
        muteBtn.innerText = 'Turn the music on!'
    }

})

startGameBtn.addEventListener('click', () => {
    splash.style.display = 'none'
    lewisWins.style.display = 'none'
    maxWins.style.display = 'none'
    splash.remove();
    intervalID = setInterval(() => {
        requestAnimationFrame(draw)
    }, 1)
})

playAgainBtn.addEventListener('click', () => {
    location.reload();
})

playAgainBtnWin.addEventListener('click', () => {
    location.reload();
})

// JUMP LOGIC

document.addEventListener('keydown', (event) => {
    if(event.keyCode == 32 && jumping === false &&(normalGame)){
        maxIncrement = -5
        jumping = true
    }
})

document.addEventListener('keyup', () => {
    if(normalGame){
        maxIncrement = 2
    }
    

})

// DRAW

function draw(){
    //BACKGROUND
    ctx.drawImage(bgImg, 0, 0)

    //SUPERMAX SONG
    superMaxSound.play()

    //ROAD AND CURBS
    ctx.beginPath()
    ctx.fillStyle = "gray"
    ctx.fillRect(0, 720, canvas.width, 11);
    ctx.stroke()
    ctx.closePath()

    ctx.drawImage(curbs, 0, 685)

//SPAWNING OPPOSING CARS + LOGIC

    for(let i = 0; i <cars.length; i++){
        ctx.drawImage(carImg, cars[i].x, cars[i].y)
        cars[i].x = cars[i].x -2

        if(cars[i].x == 194 &&(normalGame)){
            cars.push({
                x:canvas.width + 10,
                y: 650
            })
        }

        if(maxX+maxImg.width >= cars[i].x +30 && maxX  <= cars[i].x + carImg.width && maxY >= cars[i].y && (normalGame)){
            score = score -12
            penaltyPoints++
            cars.splice(i, 1)
     
            if(penaltyPoints >= lives){
                superMaxSound.src = ""
                lewisWinSound.play()
                clearInterval(intervalID)
                lewisWins.style.display = 'flex'
            }
        }

    }

//SPAWING OIL PATHES + LOGIC

    for(let i = 0; i <oilPatch.length; i++){
        ctx.beginPath()
        ctx.fillStyle = "black"
        ctx.fillRect(oilPatch[i].x, 720, 50, 5);
        ctx.stroke()
        ctx.closePath()
        oilPatch[i].x = oilPatch[i].x -2

        if(oilPatch[i].x == 500 && (normalGame)){
            oilPatch.push({
                x:canvas.width + 60,
                y: 720
            })
        }
        if(maxX+maxImg.width== oilPatch[i].x +30 && (maxY >= oilPatch[i].y - 71 && (normalGame))){
            score = score -12
            penaltyPoints++
            maxImg.src = 'images/MaxCarReverse.png'

            function reverseBack() {
                maxImg.src = 'images/MaxCarScaled.png'
              }
              
              setTimeout(reverseBack, 300);

            if(penaltyPoints >= lives){
                superMaxSound.src = ""
                lewisWinSound.play()
                clearInterval(intervalID)
                
                lewisWins.style.display = 'flex'
            }
        }

    }
    
    // SPAWNING POINTS

    for(let i = 0; i <points.length; i++){
        ctx.drawImage(pointsImg, points[i].x, points[i].y)
        points[i].x--

        if(points[i].x == 40 &&(normalGame)){
            points.push({
                x:canvas.width + 60,
                y: 670
            })
        }
        if(maxX+maxImg.width >= points[i].x +30 && maxX  <= points[i].x + pointsImg.width  && maxY >= points[i].y -90 + pointsImg.height && (normalGame)){
            score = score +25
            points.splice(i, 1)
            points.push({
                x:canvas.width + 60,
                y: 670
            })
            if(score >= hamiltonScore){
                superMaxSound.src = ""
                hamiltonScore.src = ""
                victoryMusic.play()
                clearInterval(intervalID);
                maxWins.style.display = 'flex'
            }
        }
    }
    
    for(let i = 0; i <topPoints.length; i++){
        ctx.drawImage(pointsImg, topPoints[i].x, topPoints[i].y)
        topPoints[i].x--

        if(topPoints[i].x == 10 &&(normalGame)){
            topPoints.push({
                x:canvas.width + 60,
                y: 400
            })
        }
        if(maxX+maxImg.width >= topPoints[i].x +30 && maxX  <= topPoints[i].x + pointsImg.width  && maxY <= topPoints[i].y  + pointsImg.height &&(normalGame)){
            score = score +25
            topPoints.splice(i, 1)
            topPoints.push({
                x:canvas.width + 60,
                y: 400
            })
            if(score >= hamiltonScore){
                superMaxSound.src = ""
                hamiltonScore.src = ""
                victoryMusic.play()
                clearInterval(intervalID);
                maxWins.style.display = 'flex'     
            }
        }
    }

    // BONUS GAME

    for(let i = 0; i <boosts.length; i++){
        ctx.drawImage(boostImg, boosts[i].x, boosts[i].y)
        boosts[i].x--

        if(boosts[i].x == 40 && (normalGame)){
            boosts.push({
                x:canvas.width + 500,
                y: 670
            })
        }
        if(maxX+maxImg.width >= boosts[i].x +30 && maxX  <= boosts[i].x + boostImg.width  && maxY >= boosts[i].y -90 + boostImg.height && (normalGame)){
            boosts.splice(i, 1)
            boosts.push({
                x:canvas.width + 60,
                y: 670
            })
            maxImg.src = 'images/MaxCarUpsideDown.png'
            maxY = 690
            normalGame = false
            bgImg.src = 'images/backgroundDarkWhite.png'
        }
    }
    if(!normalGame){
        for(let i = 0; i <zombieCars.length; i++){
            ctx.drawImage(zombieImg, zombieCars[i].x, zombieCars[i].y)
            zombieCars[i].x = zombieCars[i].x -2
    
            if(zombieCars[i].x == 194 ){
                zombieCars.push({
                    x:canvas.width + 10,
                    y: 690
                })
            }

            ctx.beginPath()
            ctx.font ='20px Verdana'
            ctx.fillStyle = 'yellow'
            ctx.fillText('UNDERGROUNDS CARS KILLED: ' + zombieCarsKilled + `/10`, 300, 50)
            ctx.closePath()

            ctx.beginPath()
            ctx.font ='20px Verdana'
            ctx.fillStyle = 'yellow'
            ctx.fillText('PRESS SPACEBAR TO SHOOT', 300, 120)
            ctx.closePath()

        for(let j = 0; j <bullets.length; j++){
            ctx.drawImage(bulletImg, bullets[j].x, bullets[j].y)
            bullets[j].x++

            if(bullets[j].x >= zombieCars[i].x +30){
                zombieCars.splice(i, 1)
                zombieCars.push({
                    x:canvas.width + 60,
                    y: 690
                })
                bullets.splice(j, 1)
                
                zombieCarsKilled++
                if(zombieCarsKilled === 10){
                    maxImg.src = 'images/MaxCarScaled.png'
                    maxY = 650
                    normalGame = true
                    bgImg.src = 'images/backgroundColorGrass.png'
                    cars.push({
                        x:canvas.width + 10,
                        y: 650
                    })
                    oilPatch.push({
                        x:canvas.width + 60,
                        y: 720
                    })
                    points.push({
                        x:canvas.width + 60,
                        y: 670
                    })
                    topPoints.push({
                        x:canvas.width + 60,
                        y: 400
                    })
                }
            }
        }

            document.addEventListener('keydown', (event) => {
                if(event.keyCode == 32 &&(!normalGame) && bullets.length <= 1){
                    bullets.push({
                        x: 190,
                        y: 750
                    })
                }   
            })
          
            if(maxX+maxImg.width >= zombieCars[i].x +30 && maxX  <= zombieCars[i].x + zombieImg.width && maxY >= zombieCars[i].y){
                score = score -12
                penaltyPoints++
                zombieCars.splice(i, 1)
         
                if(penaltyPoints >= lives){
                    superMaxSound.src = ""
                    lewisWinSound.play()
                    clearInterval(intervalID)
                    lewisWins.style.display = 'flex'
                }
            }
        }
    }

// PLANE WITH BANNER

    for(let i = 0; i <planes.length; i++){
        ctx.drawImage(planeImg, planes[i].x, planes[i].y)
        planes[i].x--
    }

    // SPAWNING BLOCKS

    for(let i = 0; i <longBlocks.length; i++){
        ctx.drawImage(longBlock, longBlocks[i].x, longBlocks[i].y)
        longBlocks[i].x--

        if(longBlocks[i].x == 40){
            longBlocks.push({
                x:canvas.width + 200,
                y: 450
            })
        }

        if((maxX+maxImg.width > longBlocks[i].x && maxX+(maxImg.width/2) < longBlocks[i].x +longBlock.width)&& (maxY+maxImg.height == blockY + 20)){
            maxIncrement = 0 
            jumping = false  
        }
        if((maxX+maxImg.width > longBlocks[i].x && maxX+(maxImg.width/2) > longBlocks[i].x +longBlock.width)&& (maxY+maxImg.height <= blockY + 20)){
            maxIncrement = 2
        }
    }

//DRAWING MAX CAR

    ctx.drawImage(maxImg, maxX, maxY)

//SCORE 

    ctx.font ='20px Verdana'
    ctx.fillText('Score: ' + score, 10, 30)

    ctx.font = '20px Verdana'
    ctx.fillText('Penalty points: ' + penaltyPoints + `/${lives}`, 10, 80 )

    ctx.font = '20px Verdana'
    ctx.fillText('Hamilton: ' + hamiltonScore, canvas.width-150, 30)

    maxY += maxIncrement

    if(maxY >=650){
        maxIncrement = 0
        jumping = false
    }
    if(maxY <= 200){
        maxIncrement = 2
    }
} 
let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d')
canvas.style.border = '2px solid black'
let intervalID = 0;
let score = 0;
let penaltyPoints = 0;
let hamiltonScore = 250;

// AUDIO


let superMaxSound = new Audio()
superMaxSound.src = 'sounds/superMaxLowSound.mp3'
superMaxSound.volume = 0.5

let lewisWinSound = new Audio()
lewisWinSound.src = 'sounds/losingSound.mp3'
lewisWinSound.volume = 0.5

let victoryMusic = new Audio()
victoryMusic.src = 'sounds/victoryMusic.mp3'
victoryMusic.volume = 0.5


// BEGIN AND ENDSCREENS

let startGameBtn = document.querySelector('.startGameBtn')
let splash = document.querySelector('.splash')

let playAgainBtn = document.querySelector('.playAgainBtn')

let playAgainBtnWin = document.querySelector('.playAgainBtnWin')

let lewisWins = document.querySelector('.losing-screen')

let maxWins = document.querySelector('.victory-screen')


// IMAGES USED IN GAME

let bgImg = document.createElement('img');
bgImg.src = 'images/backgroundColorGrass.png'

let curbs = document.createElement('img')
curbs.src = 'images/curbs.png'

let maxImg = document.createElement('img');
maxImg.src = 'images/MaxCarScaled.png'

let carImg = document.createElement('img')
carImg.src = 'images/CharlesCar.png'

let pointsImg = document.createElement('img')
pointsImg.src = 'images/platformPack_item002.png'

let blockImg = document.createElement('img')
blockImg.src = 'images/block-to-jump.png'

let longBlock = document.createElement('img')
longBlock.src = 'images/betterLong.png'


// OBJECTS FOR ITEMS

let cars = [{x: canvas.width + 10, y:650}]

let points = [{x: canvas.width + 50, y: 670}]

let oilPatch = [{x: canvas.width + 100, y: 720}]

let blocks = [{x: canvas.width + 50, y: 580}]


let longBlocks = [{x: canvas.width + 50, y: 450}]

let topPoints = [{x: canvas.width + 200, y: 400}]

let blockY = 480

let jumping = false


const maxX = 100;
let maxY = 650;
maxIncrement = 0

// const playerCar = {
//     height: maxImg.height,
//     jumping: true,
//     width: maxImg.width,
//     x: maxX,
//     y:maxY,
//     yVelocity: 0
// }

// const controllers = {
//     up: false,
//     keyListener: function (event){
//         let key_state = (event.type == 'keydown') ? true : false;
//         controllers.up = key_state
//     }
// }


//ADD EVENTLISTENERS

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

document.addEventListener('keydown', (event) => {
    if(event.keyCode == 32 && jumping === false){
        maxIncrement = -5
        jumping = true
    }
    
})

document.addEventListener('keyup', () => {
    maxIncrement = 2

})


// DRAW

function draw(){
    ctx.drawImage(bgImg, 0, 0)

    
    //superMaxSound.play()
    
    ctx.beginPath()
    ctx.fillStyle = "gray"
    ctx.fillRect(0, 720, canvas.width, 11);
    ctx.stroke()
    ctx.closePath()

    ctx.drawImage(curbs, 0, 685)

       
    for(let i = 0; i <cars.length; i++){
        ctx.drawImage(carImg, cars[i].x, cars[i].y)
        cars[i].x = cars[i].x -2

        if(cars[i].x == 194 ){
            cars.push({
                x:canvas.width + 10,
                y: 650
            })
        }

        if(maxX+maxImg.width >= cars[i].x +30 && maxX  <= cars[i].x + carImg.width && maxY >= cars[i].y ){
            score = score -12
            penaltyPoints++
            cars.splice(i, 1)
            // cars.push({
            //     x:canvas.width + 60,
            //     y: 650
            // })
            if(penaltyPoints >= 10){
                superMaxSound.src = ""
                //lewisWinSound.play()
                clearInterval(intervalID)
                lewisWins.style.display = 'flex'
            }
        }

    }




    for(let i = 0; i <oilPatch.length; i++){
        ctx.beginPath()
        ctx.fillStyle = "black"
        ctx.fillRect(oilPatch[i].x, 720, 50, 5);
        ctx.stroke()
        ctx.closePath()
        oilPatch[i].x = oilPatch[i].x -2

        if(oilPatch[i].x == 500){
            oilPatch.push({
                x:canvas.width + 60,
                y: 720
            })
        }
        if(maxX+maxImg.width== oilPatch[i].x +30 && maxY >= oilPatch[i].y - 71){
            score = score -12
            penaltyPoints++
            if(penaltyPoints >= 10){
                superMaxSound.src = ""
                //lewisWinSound.play()
                clearInterval(intervalID)
                
                lewisWins.style.display = 'flex'
            }
        }

    }
    
    for(let i = 0; i <points.length; i++){
        ctx.drawImage(pointsImg, points[i].x, points[i].y)
        points[i].x--

        if(points[i].x == 40){
            points.push({
                x:canvas.width + 60,
                y: 670
            })
        }
        if(maxX+maxImg.width >= points[i].x +30 && maxX  <= points[i].x + pointsImg.width  && maxY >= points[i].y -90 + pointsImg.height){
            score = score +25
            points.splice(i, 1)
            points.push({
                x:canvas.width + 60,
                y: 670
            })
            if(score >= hamiltonScore){
                superMaxSound.src = ""
                hamiltonScore.src = ""
                //victoryMusic.play()
                clearInterval(intervalID);
                maxWins.style.display = 'flex'
                
    
            }
        }
     
    }


    // for(let i = 0; i <blocks.length; i++){
    //     ctx.drawImage(blockImg, blocks[i].x, blocks[i].y)
    //     blocks[i].x--

    //     if(blocks[i].x == 80){
    //         blocks.push({
    //             x:canvas.width + 60,
    //             y: 580
    //         })
    //     }

    //     if((maxX+(maxImg.width/2) > blocks[i].x && maxX+(maxImg.width/2) < blocks[i].x +blockImg.width)&& maxY+maxImg.height == blockY+blockImg.height){
    //         maxIncrement = 0
    //     }
    // }


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


    for(let i = 0; i <topPoints.length; i++){
        ctx.drawImage(pointsImg, topPoints[i].x, topPoints[i].y)
        topPoints[i].x--

        if(topPoints[i].x == 10){
            topPoints.push({
                x:canvas.width + 60,
                y: 400
            })
        }
        if(maxX+maxImg.width >= topPoints[i].x +30 && maxX  <= topPoints[i].x + pointsImg.width  && maxY <= topPoints[i].y  + pointsImg.height){
            score = score +25
            topPoints.splice(i, 1)
            topPoints.push({
                x:canvas.width + 60,
                y: 400
            })
            if(score >= hamiltonScore){
                superMaxSound.src = ""
                hamiltonScore.src = ""
                //victoryMusic.play()
                clearInterval(intervalID);
                maxWins.style.display = 'flex'
                
    
            }
        }
     
    }



    

    ctx.drawImage(maxImg, maxX, maxY)

    ctx.font ='20px Verdana'
    ctx.fillText('Score: ' + score, 10, 30)

    ctx.font = '20px Verdana'
    ctx.fillText('Penalty points: ' + penaltyPoints, 10, 80)

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
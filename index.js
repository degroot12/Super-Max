let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d')
canvas.style.border = '2px solid black'
let intervalID = 0;
let score = 0;
let penaltyPoints = 0;
let hamiltonScore = 120;

let superMaxSound = new Audio()
superMaxSound.src = 'sounds/superMaxLowSound.mp3'

let lewisWinSound = new Audio()
lewisWinSound.src = 'sounds/losingSound.mp3'

let startGameBtn = document.querySelector('.startGameBtn')
let splash = document.querySelector('.splash')

let bgImg = document.createElement('img');
bgImg.src = 'images/backgroundColorGrass.png'
bgImg.width = canvas.width
bgImg.height =canvas.height

let maxImg = document.createElement('img');
maxImg.src = 'images/MaxCarScaled.png'

let carImg = document.createElement('img')
carImg.src = 'images/CharlesCar.png'

let pointsImg = document.createElement('img')
pointsImg.src = 'images/platformPack_item002.png'

let cars = [{x: canvas.width + 10, y:650}]

let points = [{x: canvas.width + 50, y: 670}]

let oilPatch = [{x: canvas.width + 100, y: 720}]


const maxX = 100;
let maxY = 650;
console.log(maxImg.height)
maxIncrement = 0

startGameBtn.addEventListener('click', () => {
    splash.style.display = 'none'
    intervalID = setInterval(() => {
        requestAnimationFrame(draw)
    }, 1)
})

document.addEventListener('keydown', (event) => {
    if(event.key == 32){
       return
    }
   maxIncrement = -5
   if(maxY <=500){
    maxIncrement = 1
   }
})

document.addEventListener('keyup', () => {
    maxIncrement = 1
})


function draw(){
    ctx.drawImage(bgImg, 0, 0)

    //superMaxSound.play()
    
       
    for(let i = 0; i <cars.length; i++){
        ctx.drawImage(carImg, cars[i].x, cars[i].y)
        cars[i].x--

        if(cars[i].x == 200){
            cars.push({
                x:canvas.width + 60,
                y: 650
            })
        }

    }

        for(let i = 0; i <oilPatch.length; i++){
        ctx.beginPath()
        ctx.fillStyle = "black"
        ctx.fillRect(oilPatch[i].x, 720, 50, 5);
        ctx.stroke()
        ctx.closePath()
        oilPatch[i].x--

        if(oilPatch[i].x == 500){
            oilPatch.push({
                x:canvas.width + 60,
                y: 720
            })
        }
        if(maxX+maxImg.width== oilPatch[i].x && maxY >= oilPatch[i].y - 71){
            score = score -12
            penaltyPoints++
            if(penaltyPoints >= 3){
                clearInterval()
                //lewisWinSound.play()
                splash.style.display = 'flex'
            }
        }

    }
    
    for(let i = 0; i <points.length; i++){
        ctx.drawImage(pointsImg, points[i].x, points[i].y)
        points[i].x--

        if(points[i].x == 20){
            points.push({
                x:canvas.width + 60,
                y: 670
            })
        }
        if(maxX+maxImg.width == points[i].x && maxX  <= points[i].x + pointsImg.width -5 && maxY >= points[i].y -90 + pointsImg.height){
            score = score +25
            points.splice(i, 1)
            points.push({
                x:canvas.width + 60,
                y: 670
            })
            if(score >= hamiltonScore){
                clearInterval();
                splash.style.display = 'flex'
    
            }
        }
        if(maxX+maxImg.width == cars[i].x && maxY >= points[i].y -70){
            score = score -12
            penaltyPoints++
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
    }
}



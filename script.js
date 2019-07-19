// Matter Aliases
const Engine = Matter.Engine,
    Events = Matter.Events,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Constraint = Matter.Constraint,
    Detector = Matter.Detector,
    Runner = Matter.Runner;


// document styling
document.body.style.fontFamily = "'Squada One', cursive"

//
// Scoreboard
//

// Middle Section 
let board = document.createElement('SECTION')
document.body.appendChild(board)
board.style.position = 'absolute'
board.style.background = 'rgba(0,0,0,0.8)'
board.style.color = '#fff'
board.style.width = '200px'
board.style.height = '80px'
board.style.zIndex = '5'
board.style.textAlign = 'center'
board.style.left = '860px'
board.style.paddingTop = '30px'
board.style.fontSize = '50px'

// Blue Section
let scoreBoard = document.createElement('DIV')
document.body.appendChild(scoreBoard)
scoreBoard.innerText = '0'
scoreBoard.style.position = 'absolute'
scoreBoard.style.background = 'rgba(0,0,255,0.8)'
scoreBoard.style.color = '#fff'
scoreBoard.style.width = '80px'
scoreBoard.style.height = '80px'
scoreBoard.style.zIndex = '5'
scoreBoard.style.textAlign = 'center'
scoreBoard.style.left = '780px'
scoreBoard.style.paddingTop = '30px'
scoreBoard.style.fontSize = '50px'

// Red Section
let scoreBoard2 = document.createElement('DIV')
document.body.appendChild(scoreBoard2)
scoreBoard2.innerText = '0'
scoreBoard2.style.position = 'absolute'
scoreBoard2.style.background = 'rgba(255,150,0,0.8)'
scoreBoard2.style.color = '#fff'
scoreBoard2.style.width = '80px'
scoreBoard2.style.height = '80px'
scoreBoard2.style.zIndex = '5'
scoreBoard2.style.textAlign = 'center'
scoreBoard2.style.left = '1060px'
scoreBoard2.style.paddingTop = '30px'
scoreBoard2.style.fontSize = '50px'

//
// Initialize
//

// Initgame scores
let scoreOrange = 0
let scoreBlue = 0

//
// Variables
//

//Game
let timeLimit = 300
let time = timeLimit
let timeResume = false //stops time when serving the ball
// Car
let acceleration = Math.PI / 20
let maxRPM = 0.5
let boostForce = 0.0003
let jumpHeight = 0.012
let firstJumpCD = 1000
let secondJumpWait = 250
let flipTorque = 0.2
let boostBase = { x: -30, y: 0 } // x and y
// Car controls
let carLeft = 'a'
let carRight = 'd'
let carUp = 'w'
let carBoost = 'e'
// Car2 controls
let car2Left = 'j'
let car2Right = 'l'
let car2Up = 'i'
let car2Boost = 'u'

board.innerText = time //Sets the board to display the inital value of time
setInterval(() => {
    if (timeResume) {
        time--
        board.innerText = time
        if (time < 1) {
            allowControls = false
            timeResume = false
            keysDown = {}
            countDown.style.display = 'block'
            //check who won
            if (scoreBlue > scoreOrange) {
                countDown.innerText = 'Blue Wins!'
            }
            else if (scoreBlue > scoreOrange) {
                countDown.innerText = 'Orange Wins!'
            }
            else {
                countDown.innerText = "It's a tie!"
            }
        }
    }
}, 1000)


let engine = Engine.create();
document.body.style.margin = '0'
let render = Render.create({
    element: document.body,
    engine: engine,
    render: { fillStyle: 'red' },
    options: {
        width: 1920,
        height: 850,
        wireframes: false
    }
})
//Stadium
let bottomWall = Bodies.rectangle(
    render.options.width / 2,
    render.options.height,
    render.options.width,
    99,
    {
        isStatic: true,
        friction: 0.2,
        render: {
            fillStyle: '#6a3',
            sprite: {
                texture: "grass.png",
                xScale: 0.3,
                yScale: 0.3
            }
        }
    }
)
let topWall = Bodies.rectangle(
    render.options.width / 2,
    0,
    render.options.width - 412,
    50,
    {
        isStatic: true,
        render: {
            fillStyle: '#999',
            strokeStyle: '#999',
            lineWidth: 2
        }
    }
)
var leftGoalBackWall = Bodies.rectangle(
    26,
    render.options.height - 101,
    50,
    100,
    {
        isStatic: true,
        render: {
            fillStyle: 'blue',
            strokeStyle: 'blue',
            lineWidth: 2
        }
    }
)
var leftGoalTopWall = Bodies.rectangle(
    100,
    render.options.height - 200,
    50,
    250,
    {
        isStatic: true,
        render: {
            fillStyle: 'blue',
            strokeStyle: 'blue',
            lineWidth: 2
        }
    }
)
Body.setAngle(leftGoalTopWall, 1)
var leftWall = Bodies.rectangle(
    206,
    render.options.height - 550,
    25,
    600,
    {
        isStatic: true,
        render: {
            fillStyle: '#999',
            strokeStyle: '#999',
            lineWidth: 2
        }
    }
)
var rightGoalBackWall = Bodies.rectangle(
    render.options.width - 26,
    render.options.height - 101,
    50,
    100,
    {
        isStatic: true,
        render: {
            fillStyle: 'orange',
            strokeStyle: 'orange',
            lineWidth: 2
        }
    }
)
var rightGoalTopWall = Bodies.rectangle(
    render.options.width - 100,
    render.options.height - 200,
    50,
    250,
    {
        isStatic: true,
        render: {
            fillStyle: 'orange',
            strokeStyle: 'orange',
            lineWidth: 2
        }
    }
)

Body.setAngle(rightGoalTopWall, -1)
var rightWall = Bodies.rectangle(
    render.options.width - 206,
    render.options.height - 550,
    25,
    600,
    {
        isStatic: true,
        render: {
            fillStyle: '#999',
            strokeStyle: '#999',
            lineWidth: 2
        }
    }
)
// Ball
var ball = Bodies.circle(
    render.options.width / 2,
    render.options.height - 300,
    40,
    {
        render: {
            fillStyle: '#999',
            sprite: {
                texture: "ball.png",
                xScale: 0.25,
                yScale: 0.25
            }
        },
        friction: 0.1,
        frictionAir: 0.01,
        restitution: 0.99,
        mass: 0.25
    }
);
// Car 1
var car = {}
var car2 = {}
car.body = Bodies.trapezoid(
    400,
    render.options.height - 100,
    60,
    10,
    0.2,
    {
        render: {
            fillStyle: 'blue',
            sprite: {
                texture: "car.png",
                xScale: 0.15,
                yScale: 0.15
            }
        }
    }
)
car.frontWheel = Bodies.circle(
    370,
    render.options.height - 100,
    7,
    {
        render: {
            fillStyle: '#000'
        }
    }
)
car.backWheel = Bodies.circle(
    430,
    render.options.height - 100,
    7,
    {
        render: {
            fillStyle: '#000'
        }
    }
)
car.frontAxis = Constraint.create(
    {
        bodyA: car.body,
        bodyB: car.frontWheel,
        pointA: { x: -20, y: 5 },
        length: 7,
        render: {
            strokeStyle: '#999',
            lineWidth: 0,
        }
    }
)
car.backAxis = Constraint.create(
    {
        bodyA: car.body,
        bodyB: car.backWheel,
        pointA: { x: 20, y: 5 },
        length: 7,
        render: {
            strokeStyle: '#999',
            lineWidth: 0,
        },
        angleB: 0
    }
)

//car2 2
car2.body = Bodies.trapezoid(
    render.options.width - 400,
    render.options.height - 100,
    60,
    10,
    0.2,
    {
        render: {
            fillStyle: 'blue',
            sprite: {
                texture: "car2.png",
                xScale: 0.15,
                yScale: 0.15
            }
        }
    }
)
car2.frontWheel = Bodies.circle(
    render.options.width - 370,
    render.options.height - 100,
    7,
    {
        render: {
            fillStyle: '#000'
        }
    }
)
car2.backWheel = Bodies.circle(
    render.options.width - 430,
    render.options.height - 100,
    7,
    {
        render: {
            fillStyle: '#000'
        }
    }
)
car2.frontAxis = Constraint.create(
    {
        bodyA: car2.body,
        bodyB: car2.frontWheel,
        pointA: { x: -20, y: 5 },
        length: 7,
        render: {
            strokeStyle: '#999',
            lineWidth: 0,
        }
    }
)
car2.backAxis = Constraint.create(
    {
        bodyA: car2.body,
        bodyB: car2.backWheel,
        pointA: { x: 20, y: 5 },
        length: 7,
        render: {
            strokeStyle: '#999',
            lineWidth: 0,
        },
        angleB: 0
    }
)



World.add(engine.world, [
    bottomWall,
    topWall,
    leftGoalBackWall,
    leftWall,
    leftGoalTopWall,
    rightGoalBackWall,
    rightWall,
    rightGoalTopWall,
    ball,
    car.frontWheel,
    car.backWheel,
    car.frontAxis,
    car.backAxis,
    car.body,
    car2.frontWheel,
    car2.backWheel,
    car2.frontAxis,
    car2.backAxis,
    car2.body,
]);

Engine.run(engine);
Render.run(render);
// Controls
// Using an array to handle multiple keys being pressed
let keysDown = {
}

let allowControls = false
let countDownTime = 3
let countDown = document.createElement('DIV')
document.body.appendChild(countDown)
countDown.innerText = countDownTime
countDown.style.position = 'absolute'
countDown.style.background = 'rgba(255,150,0,0)'
countDown.style.color = '#fff'
countDown.style.width = '200px'
countDown.style.height = '200px'
countDown.style.zIndex = '5'
countDown.style.textAlign = 'center'
countDown.style.left = '860px'
countDown.style.top = '350px'
countDown.style.paddingTop = '30px'
countDown.style.fontSize = '100px'


resetPositions = () => {
    //reset ball
    allowControls = false
    keysDown = {}
    Body.setPosition(ball, { x: render.options.width / 2, y: render.options.height - 100 })
    Body.setAngularVelocity(ball, 0)
    Body.setVelocity(ball, { x: 0, y: 0 })
    Body.setPosition(car.body, { x: 400, y: render.options.height - 100 })
    Body.setPosition(car.frontWheel, { x: 400, y: render.options.height - 100 })
    Body.setPosition(car.backWheel, { x: 400, y: render.options.height - 100 })
    Body.setPosition(car2.body, { x: render.options.width - 400, y: render.options.height - 100 })
    Body.setPosition(car2.frontWheel, { x: render.options.width - 400, y: render.options.height - 100 })
    Body.setPosition(car2.backWheel, { x: render.options.width - 400, y: render.options.height - 100 })
    Body.setVelocity(car.body, { x: 0, y: 0 })
    Body.setVelocity(car2.body, { x: 0, y: 0 })
    Body.setAngle(car.body, 25)
    Body.setAngle(car2.body, 44)
    Body.setAngularVelocity(car.body, 0)
    Body.setAngularVelocity(car2.body, 0)
    scoreBoard.innerText = scoreBlue
    scoreBoard2.innerText = scoreOrange
    allowControls = false
    countDownTime = 5
    countDown.style.display = 'block'
    let = countDownInterval = setInterval(() => {
        countDownTime--
        if (countDownTime > 0) {
            if (countDownTime < 4) {

                countDown.innerText = countDownTime
            }
        }
        else {
            countDown.style.display = 'none'
            timeResume = true
            allowControls = true
            clearInterval(countDownInterval)
        }
    }, 1000)
}

resetPositions()

document.body.onkeydown = function (e) {
    e.preventDefault() // cancels default actions
    if (allowControls) {
        if (!keysDown[e.key.toLowerCase()]) {
            keysDown[e.key.toLowerCase()] = true
        }
    }
    console.log(keysDown)
    return false

}
document.body.addEventListener('keyup', (e) => {
    e.preventDefault() // cancels default actions
    keysDown[e.key.toLocaleLowerCase()] = false
})

setInterval(() => {
    if (timeResume) { move() }
}, 10)

car.frontWheel.friction = 1
car.backWheel.friction = 1
car.canJump1 = true
car.canJump2 = false
car2.frontWheel.friction = 1
car2.backWheel.friction = 1
car2.canJump1 = true
car2.canJump2 = false

move = () => {
    if (keysDown[carRight]) {
        if (car.frontWheel.angularVelocity < maxRPM) {
            Body.setAngularVelocity(car.frontWheel, car.frontWheel.angularVelocity + acceleration)
            Body.setAngularVelocity(car.backWheel, car.frontWheel.angularVelocity + acceleration)
        }
    }
    if (keysDown[carLeft]) {
        if (car.frontWheel.angularVelocity > -maxRPM) {
            Body.setAngularVelocity(car.frontWheel, car.frontWheel.angularVelocity - acceleration)
            Body.setAngularVelocity(car.backWheel, car.frontWheel.angularVelocity - acceleration)
        }
    }
    if (keysDown[carBoost]) {
        Body.applyForce(
            car.body,
            { x: car.body.position.x - boostBase.x, y: car.body.position.y + boostBase.y },
            { x: boostForce * (Math.cos(car.body.angle)), y: -boostForce * (Math.sin(car.body.angle)) }
        )
    }
    if (keysDown[carUp]) {
        if (car.canJump1) {
            Body.applyForce(
                car.body,
                { x: car.body.position.x, y: car.body.position.y },
                { x: 0, y: -jumpHeight }
            )
            car.canJump1 = false
            setTimeout(() => { car.canJump2 = true }, secondJumpWait)
            setTimeout(() => { car.canJump1 = true, car.canJump2 = false }, firstJumpCD)
        }
        else if (car.canJump2) {
            if (keysDown[carRight]) {
                if (keysDown[carBoost]) {
                    Body.applyForce(
                        car.body,
                        { x: car.body.position.x, y: car.body.position.y },
                        { x: 1.5 * jumpHeight, y: 0 }
                    )
                    Body.setAngularVelocity(
                        car.body, flipTorque
                    )
                }
                Body.applyForce(
                    car.body,
                    { x: car.body.position.x, y: car.body.position.y },
                    { x: 1.5 * jumpHeight, y: 0 }
                )
                Body.setAngularVelocity(
                    car.body, flipTorque
                )
            }
            else if (keysDown[carUp]) {
                if (keysDown[carBoost]) {
                    Body.applyForce(
                        car.body,
                        { x: car.body.position.x, y: car.body.position.y },
                        { x: -jumpHeight, y: -jumpHeight }
                    )
                    Body.setAngularVelocity(
                        car.body, -flipTorque
                    )
                }
                Body.applyForce(
                    car.body,
                    { x: car.body.position.x, y: car.body.position.y },
                    { x: -jumpHeight, y: -1.5 * jumpHeight }
                )
                Body.setAngularVelocity(
                    car.body, -flipTorque
                )
            }
            else {

                if (keysDown[carRight]) {
                    Body.applyForce(
                        car.body,
                        { x: car.body.position.x, y: car.body.position.y },
                        { x: 0, y: -jumpHeight }
                    )
                    Body.setAngularVelocity(
                        car.body, -0.5 * flipTorque
                    )
                }
                Body.applyForce(
                    car.body,
                    { x: car.body.position.x, y: car.body.position.y },
                    { x: 0, y: -jumpHeight }
                )
            }
            car.canJump2 = false
        }
    }
    //car 2
    if (keysDown[car2Right]) {
        if (car2.frontWheel.angularVelocity < maxRPM) {
            Body.setAngularVelocity(car2.frontWheel, car2.frontWheel.angularVelocity + acceleration)
            Body.setAngularVelocity(car2.backWheel, car2.frontWheel.angularVelocity + acceleration)
        }
    }
    if (keysDown[car2Left]) {
        if (car2.frontWheel.angularVelocity > -maxRPM) {
            Body.setAngularVelocity(car2.frontWheel, car2.frontWheel.angularVelocity - acceleration)
            Body.setAngularVelocity(car2.backWheel, car2.frontWheel.angularVelocity - acceleration)
        }
    }
    if (keysDown[car2Boost]) {
        Body.applyForce(
            car2.body,
            { x: car2.body.position.x + boostBase.x, y: car2.body.position.y + boostBase.y },
            { x: -boostForce * (Math.cos(car2.body.angle)), y: -boostForce * (Math.sin(car2.body.angle)) }
        )
    }
    if (keysDown[car2Up]) {
        if (car2.canJump1) {
            Body.applyForce(
                car2.body,
                { x: car2.body.position.x, y: car2.body.position.y },
                { x: 0, y: -jumpHeight }
            )
            car2.canJump1 = false
            setTimeout(() => { car2.canJump2 = true }, secondJumpWait)
            setTimeout(() => { car2.canJump1 = true, car2.canJump2 = false }, firstJumpCD)
        }
        else if (car2.canJump2) {
            if (keysDown[car2Left]) {
                if (keysDown[car2Boost]) {
                    Body.applyForce(
                        car2.body,
                        { x: car2.body.position.x, y: car2.body.position.y },
                        { x: -1.5 * jumpHeight, y: 0 }
                    )
                    Body.setAngularVelocity(
                        car2.body, -flipTorque
                    )
                }
                Body.applyForce(
                    car2.body,
                    { x: car2.body.position.x, y: car2.body.position.y },
                    { x: -1.5 * jumpHeight, y: 0 }
                )
                Body.setAngularVelocity(
                    car2.body, -flipTorque
                )
            }
            else if (keysDown[car2Right]) {
                if (keysDown[car2Boost]) {
                    Body.applyForce(
                        car2.body,
                        { x: car2.body.position.x, y: car2.body.position.y },
                        { x: jumpHeight, y: -jumpHeight }
                    )
                    Body.setAngularVelocity(
                        car2.body, flipTorque
                    )
                }
                Body.applyForce(
                    car2.body,
                    { x: car2.body.position.x, y: car2.body.position.y },
                    { x: jumpHeight, y: -1.5 * jumpHeight }
                )
                Body.setAngularVelocity(
                    car2.body, flipTorque
                )
            }
            else {

                if (keysDown[car2Boost]) {
                    Body.applyForce(
                        car2.body,
                        { x: car2.body.position.x, y: car2.body.position.y },
                        { x: 0, y: -jumpHeight }
                    )
                    Body.setAngularVelocity(
                        car.body, 0.5 * flipTorque
                    )
                }
                Body.applyForce(
                    car2.body,
                    { x: car2.body.position.x, y: car2.body.position.y },
                    { x: 0, y: -jumpHeight }
                )
            }
            car2.canJump2 = false
        }
    }
}
// Change background image to very awesome rocket league bg
render.canvas.style.background = 'URL(background.jpg)'

Matter.Events.on(engine, 'collisionStart', function (event) {
    event.pairs.forEach(pair => {
        let a = pair.bodyA
        let b = pair.bodyB
        if (a === (leftGoalBackWall) && b === ball) {
            countDown.innerText = 'Orange scored!'
            countDown.style.display = 'block'
            scoreOrange++
            resetPositions()
        }
        else if (a === (rightGoalBackWall || rightGoalTopWall) && b === ball) {
            countDown.innerText = 'Blue scored!'
            countDown.style.display = 'block'
            scoreBlue++
            resetPositions()
        }
    });
});

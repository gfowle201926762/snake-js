



var previoustime = 0
var speed = 5
const speed_increment = .2
var snake_segments = [
    [15, 15],
]
const board = document.getElementById('board')
const score_board = document.getElementById('scoreboard')
var direction = 'stationary'
var result = 1
var food = []
var score = 0
var end_game = false


function main(currentTime){
    window.requestAnimationFrame(main)
    time_elapsed = (currentTime - previoustime) / 1000

    if (time_elapsed >= (1 / speed)){
        if (result != 0){
            clear()
            result = update()
            draw_snake()
            draw_food()
            draw_score()
            previoustime = currentTime
        }
        else if (result == 0){
            end_game = true
            restart_display()
        }
    }

}

document.addEventListener('keydown', handlekeydown)

function handlekeydown(event){
    var keyname = event.key
    if (keyname == "ArrowUp"){
        direction = 'up'
    }
    else if (keyname == "ArrowDown"){
        direction = 'down'
    }
    else if (keyname == "ArrowRight"){
        direction = 'right'
    }
    else if (keyname == "ArrowLeft"){
        direction = 'left'
    }
    else if (keyname == "Enter" && end_game == true){
        restart()
    }

}



function update(){
    if (direction != 'stationary'){
        var head_y = snake_segments[snake_segments.length - 1][1]
        var head_x = snake_segments[snake_segments.length - 1][0]
        if (direction == 'up'){
            head_y --
        }
        else if (direction == 'down'){
            head_y ++
        }
        else if (direction == 'right'){
            head_x ++
        }
        else if (direction == 'left'){
            head_x --
        }

        console.log(head_x, head_y)

        fail_result = check_fail(head_x, head_y)
        if (fail_result == 0){
            return 0
        }

        food_result = check_food(head_x, head_y)

        var new_head = [head_x, head_y]
        snake_segments.push(new_head)

        if (food_result != 2){
            snake_segments.shift()
        }
    }
    
}


function check_food(head_x, head_y){
    if (head_x == food[0] && head_y == food[1]){
        update_food()
        speed += speed_increment
        score ++
        return 2
    }
}




function check_fail(head_x, head_y){
    var lost = 1
    if (head_x < 0 || head_x > 31 || head_y < 0 || head_y > 31){
        lost = 0
    }
    var count = 0
    snake_segments.forEach(segment => {
        if (count < (snake_segments.length - 1) && (head_x == segment[0] && head_y == segment[1])){
            lost = 0
        }
        count ++
    })
    return lost
}



function clear(){
    board.innerHTML = ''
}


function draw_snake(){
    snake_segments.forEach(segment => {
        const snake_element = document.createElement('div')
        snake_element.style.gridColumnStart = segment[0]
        snake_element.style.gridRowStart = segment[1]
        snake_element.classList.add('snake')
        board.appendChild(snake_element)
    })
}


function update_food(){
    food = []
    var food_x = Math.floor(Math.random() * 31) + 1
    var food_y = Math.floor(Math.random() * 31) + 1
    food.push(food_x, food_y)
}

function draw_food(){
    const food_element = document.createElement('div')
    food_element.style.gridColumnStart = food[0]
    food_element.style.gridRowStart = food[1]
    food_element.classList.add('food')
    board.appendChild(food_element)
}

function draw_score(){
    score_board.innerHTML = `Score: ${score} Speed: ${Math.round(speed * 10) / 10}`
}

function restart_display(){
    score_board.innerHTML = `Score: ${score} Speed: ${Math.round(speed * 10) / 10} YOU LOST! Press enter to play again.`
    
}

function restart(){
    previoustime = 0
    speed = 5
    snake_segments = [
        [15, 15],
    ]
    direction = 'stationary'
    result = 1
    food = []
    score = 0
    end_game = false
    update_food()
    window.requestAnimationFrame(main)
}

restart()
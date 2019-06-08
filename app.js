const canvas = document.getElementById('draw')
const ctx = canvas.getContext('2d')
const wrapper = document.getElementById('wrapper')

canvas.width = wrapper.clientWidth
canvas.height = wrapper.clientHeight

ctx.lineJoin = 'round'
ctx.lineCap = 'round'
ctx.lineWidth = 0

ctx.font = "38px sans-serif"
ctx.fillText("Press RMB to draw", 50, 40)
ctx.fillText("Press 'R' to reset", 50, 70)

let isDrawing = false
let lastX = 0
let lastY = 0
let hue = 0
let direction = true

function draw(e) {
    if (!isDrawing) return

    ctx.beginPath()
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`
    ctx.moveTo(lastX, lastY)
    ctx.lineTo(e.offsetX, e.offsetY)
    ctx.stroke()
    {[lastX, lastY] = [e.offsetX, e.offsetY]}
    hue++
    
    hue >= 360 ? hue = 0 : false
    ctx.lineWidth >= 100 || ctx.lineWidth <= 1 ? direction = !direction : false
    direction ? ctx.lineWidth++ : ctx.lineWidth--
}

function resetCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.font = "38px sans-serif"
    ctx.fillText("Press RMB to draw", 50, 40)
    ctx.fillText("Press 'R' to reset", 50, 70)
}

document.addEventListener('keydown', e => e.keyCode === 82 ? resetCanvas() : false )

canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY]
})

canvas.addEventListener("mousemove", draw)
canvas.addEventListener("mouseup", () => isDrawing = false)
canvas.addEventListener("mouseout", () => isDrawing = false)
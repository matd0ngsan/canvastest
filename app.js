const canvas = document.getElementById("jsCanvas");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");
const reset = document.getElementById("jsReset");

const ctx = canvas.getContext("2d");

const colorsts = document.getElementById("color__status");

canvas.width = 700;
canvas.height = 700;

let drawing = false;
let filling = false;
ctx.lineWidth = 5;

ctx.strokeStyle = "#000000";
ctx.fillStyle = "#ffffff";
ctx.fillRect(0, 0, canvas.width, canvas.height);

const canvas2 = document.getElementById("line__canvas");
const ctx2 = canvas2.getContext("2d");

canvas2.width = 100;
canvas2.height = 100;

function lineCanvasLoad() {
    ctx2.fillStyle = "#ffffff";
    ctx2.fillRect(0, 0, canvas.width, canvas.height);

    ctx2.strokeStyle = ctx.strokeStyle;
    ctx2.lineWidth = ctx.lineWidth;

    ctx2.beginPath();
    ctx2.arc(50, 50, 25, 0, Math.PI*2, true);
    ctx2.stroke();

    ctx2.font = '16px gothic';
    ctx2.fillStyle = ctx2.strokeStyle;
    ctx2.textBaseline ="middle";
    ctx2.textAlign = "center";
    ctx2.fillText(ctx2.lineWidth, 50, 50);
}

lineCanvasLoad()

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;

    if(drawing) {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function startDrawing(event) {
    const x = event.offsetX;
    const y = event.offsetY;

    drawing = true;
    ctx.beginPath();
}

function stopDrawing(event) {
    drawing = false;
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseleave", stopDrawing);
}

//그리기

function controlsRange(event) {
    const point = event.target.value;
    ctx.lineWidth = point;
    ctx2.lineWidth = point;

    lineCanvasLoad();
}

if (range) {
    range.addEventListener("input", controlsRange);
};

//굵기조절

function controlsColors(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = ctx.strokeStyle;
    colorsts.style.backgroundColor = color;
    ctx2.strokeStyle = ctx.strokeStyle;

    lineCanvasLoad();
}

Array.from(colors).forEach(color => color.addEventListener("click", controlsColors));

//색변경

function controlsBtns() {
    if (filling === true) {
        filling = false;
        mode.innerText = "paint";
        colorsts.innerText = "PAINT";
    } else {
        filling = true;
        mode.innerText = "fill";
        colorsts.innerText = "FILL";
    }
}

if (mode) {
    mode.addEventListener("click", controlsBtns)
}

function handleCanvasClick() {
    if (filling === true) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

if (canvas) {
    canvas.addEventListener("click", handleCanvasClick);
}

//채우기

function saveCanvas() {
    const image = canvas.toDataURL('image/png', 1.0);
    const link = document.createElement("a");
    link.href = image;
    link.download = "Canvas";
    link.click();
}

if (save) {
    save.addEventListener("click", saveCanvas);
}

//저장

function clearCanvas() {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
} 

if (reset) {
    reset.addEventListener("click", clearCanvas);
}

//리셋

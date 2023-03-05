const canvas = document.querySelector('canvas');
const ctx=canvas.getContext('2d');
const colors=document.getElementsByClassName('jsColor');
const range=document.getElementById('jsRange');
const mode =document.getElementById('jsMode');
const saveBtn=document.getElementById('jsSave');
const clearBtn=document.getElementById('jsClear');
const eraseBtn=document.getElementById('jsErase');
const INITIAL_COLOR='2c2c2c';


canvas.width=500;
canvas.height=700;
ctx.fillStyle='white';
ctx.fillRect(0,0,canvas.width,canvas.height);
ctx.strokeStyle=INITIAL_COLOR;
ctx.fillStyle=INITIAL_COLOR;
ctx.lineWidth=2.5;

let painting= false;
let filling=false;
let erasing=false;
let currentColor='white';
let currentRange=2.5;
function stopAction(){  
    if((eraseBtn.classList.contains('clicked'))){
        erasing=false;
}
    painting=false;
}
function startAction(){
    if(eraseBtn.classList.contains('clicked')){
        erasing=true;
    }
    else if((!filling)){
        painting=true;
    }
}
function onMouseMove(event){
    const x=event.offsetX;
    const y=event.offsetY;
    if (!painting && !erasing){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }
    else if(erasing){
        ctx.lineTo(x,y);
        ctx.stroke();
    }
    else if(painting){
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}
function handleColorClick(event){
    const color=event.target.style.backgroundColor;
    ctx.strokeStyle=color;
    ctx.fillStyle=color;
}
function handleRangeChange(event){
    const size=event.target.value
    ctx.lineWidth=size;
}
function handleModeClick(){
    if(filling ===true){
        filling=false;
        mode.innerText='Fill';
    }
    else{
        filling=true
        mode.innerText='Paint';
    }
}
function handleCanvasClick(){
    if (!erasing && filling){
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }
}
function handleCM(event){
    event.preventDefault();
}
function handleSaveClick(){
    const image=canvas.toDataURL();
    const link=document.createElement('a');
    link.href=image
    link.download='PaintJS[🖌️]';
    link.click();
}
function handleClearClick(){
    currentColor=ctx.fillStyle
    ctx.fillStyle='white';  
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle=currentColor;
}
function handleEraseClick(){
    if(eraseBtn.classList.contains('clicked')){
        ctx.strokeStyle=currentColor;
        ctx.lineWidth=currentRange;
        eraseBtn.classList.remove('clicked');
    }
    else{
        currentColor=ctx.strokeStyle;
        ctx.strokeStyle='white';
        eraseBtn.classList.add('clicked');
    }
}
if (canvas){
    canvas.addEventListener('mousemove',onMouseMove)
    canvas.addEventListener('mousedown',startAction)
    canvas.addEventListener('mouseup',stopAction)
    canvas.addEventListener('mouseleave',stopAction)
    canvas.addEventListener('click',handleCanvasClick)
    canvas.addEventListener('contextmenu',handleCM)
}
Array.from(colors).forEach(color => color.addEventListener('click',handleColorClick))

if (range){
    range.addEventListener('input',handleRangeChange)
}
if (mode){
    mode.addEventListener('click',handleModeClick)
}
if (saveBtn){
    saveBtn.addEventListener('click',handleSaveClick)
}
if (clearBtn){
    clearBtn.addEventListener('click',handleClearClick)
}
if (eraseBtn){
    eraseBtn.addEventListener('click',handleEraseClick)
}
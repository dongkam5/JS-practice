const msg=document.querySelector('.hello h1');
function handleMouseOver(){
    msg.innerText='The mouse is here!';
    msg.style.color='red';
}
function handleMouseOut(){
    msg.innerText='The mouse is gone!';
    msg.style.color='blue';
}
function handleResize(){
    msg.innerText='You just resized!';
    msg.style.color='purple';
}
function handleRightButton(){
    msg.innerText='You was a right click!';
    msg.style.color='green';
}
msg.addEventListener('mouseover',handleMouseOver);
msg.addEventListener('mouseout',handleMouseOut);
window.addEventListener('resize',handleResize);
window.addEventListener('contextmenu',handleRightButton);
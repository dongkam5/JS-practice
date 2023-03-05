const h1=document.querySelector('.hello h1')
function handletitleClick(){
    h1.style.color='blue';
}
function handleMouseEnter(){
    h1.innerText='mouse is here';
    h1.style.color='red';
}
function handleMouseLeave(){
    h1.innerText='mouse is leave';
    h1.style.color='green';
}
function handleWinodwResize(){
    document.body.style.backgroundColor='tomato';
}
function handleWinodwCopy(){
    alert('copier');
}
function handleWinodwOffline(){
    alert('SoS or WIFI');
}
function handleWinodwOnline(){
    alert('All good');
}
h1.addEventListener('mouseenter',handleMouseEnter);
h1.addEventListener('mouseleave',handleMouseLeave);
h1.addEventListener('click',handletitleClick);

window.addEventListener('resize',handleWinodwResize);
window.addEventListener('copy',handleWinodwCopy);
window.addEventListener('offline',handleWinodwOffline);
window.addEventListener('offline',handleWinodwOnline);
const title=document.querySelector('.hello h1')
function handletitleClick(){
    title.style.color='blue'
}
function handleMouseEnter(){
    title.innerText='mouse is here'
    title.style.color='red'
}
function handleMouseLeave(){
    title.innerText='mouse is leave'
    title.style.color='green'
}
title.addEventListener('mouseenter',handleMouseEnter);
title.addEventListener('mouseleave',handleMouseLeave);
title.addEventListener('click',handletitleClick);

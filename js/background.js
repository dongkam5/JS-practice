const body=document.querySelector('body');

function paintImage(imgNumber){
    const image=new Image();
    image.src=`img/${imgNumber}.jpg`;
    image.classList.add('bgImage');
    body.prepend(image);
}
function getRandom(){
    const number=Math.floor(Math.random()*4);
    return number;
}
function init(){
    const randNum=getRandom();
    paintImage(randNum);
}
init();
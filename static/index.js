const bar = document.getElementById('bar');
const nav = document.getElementById('navbarIn');

if(bar){
    bar.addEventListener('click',()=>{
        nav.classList.add('active');
    })
}
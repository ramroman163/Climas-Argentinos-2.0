const header = document.querySelector(".header");
let prevY = window.scrollY;

window.addEventListener("scroll", () =>{
    if(prevY > 50){
        header.classList.add("header--bg");
    }
    else{
        header.classList.remove("header--bg");
    }

    prevY = window.scrollY;
})
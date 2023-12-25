document.addEventListener("DOMContentLoaded", function () {
 
    let burger = document.getElementById("menu-burger")
    let navLeft = document.getElementById("nav-left")
    let exit = document.querySelector(".exit-button")

    exit.addEventListener("click", ()=>
    {
        navLeft.classList.remove("show")
        
    })

    
    burger.addEventListener("click", ()=>{
        
        navLeft.classList.add("show")
        console.log("click SAVE")
    })

    

})
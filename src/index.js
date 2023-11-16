document.addEventListener("DOMContentLoaded", function() {
   getDogs()
   function getDogs(){ fetch("http://localhost:3000/pups")
    .then (res=>res.json())
    .then (dogs => renderDogs(dogs))
}


function renderDogs(dogs){
    
    let dogBar = document.querySelector("#dog-bar")
    dogBar.innerHTML=""
        
    for(const dog of dogs){
    
        let dogName = document.createElement("span")
         dogName.innerText = dog.name
         dogBar.appendChild(dogName)

         dogName.addEventListener("click", function(event){
           dogClicked =  event.target.innerText
           //console.log(dogClicked)
            fetch("http://localhost:3000/pups")
            .then(res=> res.json())
            .then(dogs=> {
                for (const dog of dogs){
                    if (dog.name === dogClicked){
                       // console.log (dog)
                       renderDogCard(dog)
                    }
                }

            })

         })
    }}


function renderDogCard(dogObj){
    let dogInfo = document.querySelector("#dog-info")
    dogInfo.innerHTML=""
    
    let doggoName = document.createElement("h2")
    doggoName.textContent = dogObj.name
    dogInfo.appendChild(doggoName)

    let doggoImg = document.createElement("img")
    doggoImg.src= dogObj.image
    dogInfo.appendChild(doggoImg)

    let doggoStatus = document.createElement("button")
    if (dogObj.isGoodDog = true){
        doggoStatus.innerText = "Good Dog!"
    }
    else {
        doggoStatus.innerText = "Bad Dog!"
    }

   dogInfo.appendChild(doggoStatus) 

   doggoStatus.addEventListener("click", function () {
    //console.log("button was clicked")
    console.log(dogObj.isGoodDog)
    if (dogObj.isGoodDog == true){
        //console.log(dogObj)
        dogObj.isGoodDog = false
         doggoStatus.textContent = "Bad Dog!"   
    }
    else if (dogObj.isGoodDog == false){
        dogObj.isGoodDog = true
        doggoStatus.textContent = "Good Dog!"
    }

    fetch(`http://localhost:3000/pups/${dogObj.id}`,{
        method:"PATCH",
        headers:{
            'content-Type':'application/json'
        },
        body:JSON.stringify(dogObj)
    })

   })

}

let filterButton = document.querySelector("#good-dog-filter")
 
filterButton.addEventListener('click', function (){

    if (filterButton.textContent == "Filter good dogs: OFF"){
        filterButton.textContent = "Filter good dogs:ON"
        fetch('http://localhost:3000/pups')
        .then (res=>res.json())
        .then (function(dogs){
            let goodDogs =[]
            for (const dog of dogs){
                if (dog.isGoodDog ==true){
                    goodDogs.push(dog)
                    renderDogs(goodDogs)
                }
            }
        })
    }
    else{
        filterButton.textContent = "Filter good dogs: OFF"
        getDogs()
        
    }


 }

 
 
 
  )









})
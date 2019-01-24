document.addEventListener("DOMContentLoaded", e => {
    const dogBar = document.getElementById("dog-bar")
    const dogInfo = document.getElementById("dog-info")
    const button = document.getElementsByClassName("button")

    fetch("http://localhost:3000/pups")
    .then(r => r.json())
    .then(pups => pups.forEach(pup => {
        showPup(pup)
    }))

    const showPup = (pup) => {
        dogBar.innerHTML += `<span data-id="${pup.id}">${pup.name}</span>`
    }


    dogBar.addEventListener("click", e => {
        if (e.target.dataset.id) {
            
            const dataId = e.target.dataset.id
            const id = parseInt(dataId)
            fetch(`http://localhost:3000/pups/${id}`)
            .then(r => r.json())
            .then(dog => {
                showDog(dog)
            })
        }
            
    })

    const showDog = (dog) => {
        if (dog.isGoodDog) {
            dogInfo.innerHTML = ""
            dogInfo.innerHTML += 
            `<img src=${dog.image}>
            <h2>${dog.name}</h2>
            <button class="button" data-id="${dog.id}">Bad Dog</button>`
        } else if (!dog.isGoodDog) {
            dogInfo.innerHTML = ""
            dogInfo.innerHTML += 
            `<img src=${dog.image}>
            <h2>${dog.name}</h2>
            <button class="button" data-id="${dog.id}">Good Dog</button>`
        }
    }

    dogInfo.addEventListener("click", e => {
        if (e.target.classList.contains("button")) {
            const buttonNode = e.target.classList.contains("button")
            const dataId = e.target.dataset.id
            const id = parseInt(dataId)
            const goodDog = e.target.innerText === "Bad Dog"
            
            fetch(`http://localhost:3000/pups/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    isGoodDog: !goodDog 
                })
            })
            .then(r => r.json())
            .then(dog => {
                button.innerText = showDog(dog)
            })

        }
    })



    


}) // DOMContentLoaded
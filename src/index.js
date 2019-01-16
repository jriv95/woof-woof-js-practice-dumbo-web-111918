
document.addEventListener('DOMContentLoaded', e = () => {
  const dogBar = document.querySelector('#dog-bar')
    fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(pups => showDogs(pups))

dogInfo = document.querySelector('#dog-info')

    const showDogs = (dogs) => {
      dogs.forEach(dog => {
        dogBar.innerHTML += `<span data-id="${dog.id}"> ${dog.name} </span>`
      })
    }

    dogBar.addEventListener('click', e => {
      if(e.target) {
        const dataId = e.target.getAttribute('data-id')

        fetch(`http://localhost:3000/pups/${dataId}`)
        .then(res => res.json())
        .then(dogData => showDog(dogData))
      }
    })

    const showDog = (dog) => {
        dogInfo.innerHTML = `<div data-id ="${dog.id}"><img src=${dog.image}>
        <h2>${dog.name}</h2>
        <button id="button"> ${dog.isGoodDog ? "Make bad dog" : "Make good dog"} </button>
        </div>`
    }

    dogInfo.addEventListener('click', e => {
      if(e.target.id === 'button') {
        const buttonId = e.target.parentNode.querySelector('#button')
        const buttonValue = buttonId.innerHTML
        const dataId = e.target.parentNode.getAttribute('data-id')
        const changeDog = e.target.innerText === "Make good dog"

          fetch(`http://localhost:3000/pups/${dataId}`, {
            method: 'PATCH',
            body: JSON.stringify({
              isGoodDog: changeDog
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(res => res.json())
          .then(data => showDog(data))
      }

    })

})

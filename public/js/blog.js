const images = document.querySelectorAll('img')
images.forEach(image => {
    image.addEventListener('click', function (e) {
        console.log("Image Clicked");
        const imageSrc = e.target.src
        const imageAlt = e.target.alt
        const modal = document.querySelector('#modal')
        const modalImage = document.querySelector('#modal-image')
        modalImage.src = imageSrc
        modalImage.alt = imageAlt
        modal.classList.add('active')
    })
})

window.addEventListener('click', (e) => {
    if (e.target.id != 'modal-content' && !e.target.src) {
        const modal = document.querySelector('#modal')
        modal.classList.remove('active')
    }
})
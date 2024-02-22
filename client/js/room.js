const roomNameLabel = document.getElementById('roomNameLabel')
const roomContentTextArea = document.getElementById('notepadContent')

const params = new URLSearchParams(window.location.search)

const roomName = params.get('name')
roomNameLabel.innerText = roomName

roomContentTextArea.addEventListener("keyup", (e)=> {
    console.log('change')
})



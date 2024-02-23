const roomNameLabel = document.getElementById('roomNameLabel')
const roomContentTextArea = document.getElementById('notepadContent')

const params = new URLSearchParams(window.location.search)

const roomName = params.get('name')
roomNameLabel.innerText = roomName

roomContentTextArea.addEventListener("keyup", async (e)=> {
    const { value } = e.target
    
   await fetch('http://localhost:3000/api-update-notepad', {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            noteName: roomName,
            noteContent: value
        }),
    })
   console.log(e.target.value)
})

window.addEventListener('load', async ()=> {
    const data = await fetch(`http://localhost:3000/api/get-notepad/${roomName}`)
})



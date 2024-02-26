const roomNameLabel = document.getElementById('roomNameLabel')
const roomContentTextArea = document.getElementById('notepadContent')

const params = new URLSearchParams(window.location.search)

const roomName = params.get('name')
roomNameLabel.innerText = roomName

Pusher.logToConsole = true;

const pusher = new Pusher('919f06b6a4ef43e6857f', {
  cluster: 'us2'
}); 

// Ao soltar a tecla, o valor digitado é inserido no banco de dados.
roomContentTextArea.addEventListener("keyup", async (e)=> {
    const { value } = e.target
    
   await fetch('http://localhost:3000/api-update-notepad', {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            noteName: roomName,
            noteContent: value,
            userID: pusher.sessionID
        }),
    }
    )

})

window.addEventListener('load', async ()=> {
  const data = await fetch(`http://localhost:3000/api/get-notepad/${roomName}`).then(res => res.json())
  
  roomContentTextArea.value = await data.noteContent
})

if(roomName) {
    const channel = pusher.subscribe(roomName);
   
    channel.bind("updated-note", data => {
        // Só atualizar a tela se o UserID for diferente do atual, resolvendo o problema de flics na tela.
        if(data.content && data.userID != pusher.sessionID) {
            roomContentTextArea.value = data.content
        }
    })
}





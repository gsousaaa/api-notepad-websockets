const roomNameLabel = document.getElementById('roomNameLabel')
const roomContentTextArea = document.getElementById('notepadContent')

const params = new URLSearchParams(window.location.search)

const roomName = params.get('name')
roomNameLabel.innerText = roomName

Pusher.logToConsole = true;

const pusher = new Pusher('919f06b6a4ef43e6857f', {
  cluster: 'us2',
  channelAuthorization: {
    endpoint: "http://localhost:3000/pusher/authorize",
    paramsProvider: () => {
        return {
            user_id: localStorage.getItem('user_id'),
            username: localStorage.getItem('username')
        }
    }
  },
  userAuthentication: {
    endpoint: "http://localhost:3000/pusher/authenticate",
    paramsProvider:  () => {
        return {
            user_id: localStorage.getItem('user_id'),
            username: localStorage.getItem('username')
        }
    }
}
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

const userQuantityLabel = document.getElementById('userQty')

if(roomName) {
    pusher.signin()
    const channel = pusher.subscribe(roomName);
   
    channel.bind("updated-note", data => {
        // Só atualizar a tela se o UserID for diferente do atual, resolvendo o problema de flics na tela.
        if(data.content && data.userID != pusher.sessionID) {
            roomContentTextArea.value = data.content
        }
    })

    channel.bind("pusher:member_added", () => {
        userQuantityLabel.innerText = Number(userQuantityLabel.innerText) + 1
    })

    channel.bind("pusher:member_removed", () => {
        userQuantityLabel.innerText =  Number(userQuantityLabel.innerText) -1
    })

    channel.bind("pusher:subscription_succeeded", () => {
        console.log({channel})
        userQuantityLabel.innerText = channel.members.count
    })
}





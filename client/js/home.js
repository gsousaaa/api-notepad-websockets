const roomNameInput = document.getElementById("roomName")
const joinRoomButton = document.getElementById("joinRoomButton")
const userNameInput = document.getElementById("username")

joinRoomButton.addEventListener("click", () => {
    if (!roomNameInput.value || !userNameInput.value){
        return;
    }

    localStorage.setItem("username", userNameInput.value)

    const randomNumber = Math.floor(Math.random() * 1000)
    localStorage.setItem("user_id", `${userNameInput.value}-${randomNumber}`)

    window.location.href = `/client/room.html?name=${roomNameInput.value}`;
})


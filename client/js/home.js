const roomNameInput = document.getElementById("roomName")
const joinRoomButton = document.getElementById("joinRoomButton")

joinRoomButton.addEventListener("click", () => {
    if (!roomNameInput.value){
        return;
    }
    
    window.location.href = `/client/room.html?name=${roomNameInput.value}`;


})

const socket = io('http://localhost:5000');
let namespaceSocket;

function inittNameSpaceConnection(endpoint) {
    if (namespaceSocket) namespaceSocket.close()
    namespaceSocket = io(`http://localhost:5000/${endpoint}`)
    namespaceSocket.on('connect', () => {
        namespaceSocket.on('roomlist', rooms => {
            getRoomInfo(endpoint, rooms[0].name)

            const roomsElem = document.querySelector('#contacts ul')
            roomsElem.innerHTML = ''
            if (rooms.length === 0) {

                roomsElem.innerHTML = `<li  class="contactw">
              No Conversation

            </li>`
            }
            for (const room of rooms) {
                roomsElem.innerHTML = `<li class="contact" roomName="${room.name}">
                    <div class="wrap">
                    <img src="${room.image}" height="30"/>
                        <div class="meta">
                            <p class="name">${room.name}</p>
                            <p class="preview">${room.description}</p>
                        </div>
                    </div>
                </li>`

            }
            const roomNodes = document.querySelectorAll('ul li.contact');
            for (const room of roomNodes) {
                room.addEventListener('click', () => {
                    const roomName = room.getAttribute('roomName');
                    getRoomInfo(endpoint, roomName)
                })
            }

        })
    })
}
function getRoomInfo(endpoint, room) {

    document.querySelector('#roomName h3').setAttribute('roomName', room)
    document.querySelector('#roomName h3').setAttribute('endpoint', endpoint)
    namespaceSocket.emit('joinRoom', room)
    namespaceSocket.off('roomInfo')
    namespaceSocket.on('roomInfo', roomInf => {
        document.querySelector('.messages ul').innerText = ''
        document.querySelector('#roomName h3').innerText = roomInf.description;
        const messages = roomInf.messages
        const userId = document.getElementById('userID').value
        for (const message of messages) {
            const li = `
            <li class="${(userId == message.sender) ? 'sent' : 'replies'}">
            <img src="https://media-exp1.licdn.com/dms/image/C5603AQE3g9gHNfxGrQ/profile-displayphoto-shrink_200_200/0/1645507738281?e=1659571200&v=beta&t=wtwELdT1gp6ICp3UigC2EgutGAQgDP2sZKUx0mjCTwI"
                alt="" />
            <p>${message.message}</p>
        </li>`;
            document.querySelector(".messages ul").innerHTML += li
        }
    })
    namespaceSocket.on('CountOfOnlineUsers', count => {
        document.getElementById('onlineCount').innerText = count
    })
}

async function sendMessage() {
    const roomName = document.querySelector('#roomName h3').getAttribute('roomName');
    const endpoint = document.querySelector('#roomName h3').getAttribute('endpoint');
    let message = document.querySelector('.message-input input#messageInput').value;
    if (message.trim() === '') {
        return alert('لطفا متنی را بفرستید')
    }

    const authorization = document.getElementById('userID').value

    namespaceSocket.emit('newMessage', {
        message,
        roomName,
        endpoint,
        sender: authorization
    })
    namespaceSocket.off('confirmMessage')
    namespaceSocket.on('confirmMessage', data => {
   
        const li = `
        <li class="${(authorization == data.sender) ? 'sent' : 'replies'}">
        <img src="https://media-exp1.licdn.com/dms/image/C5603AQE3g9gHNfxGrQ/profile-displayphoto-shrink_200_200/0/1645507738281?e=1659571200&v=beta&t=wtwELdT1gp6ICp3UigC2EgutGAQgDP2sZKUx0mjCTwI"
            alt="" />
        <p>${data.message}</p>
    </li>`;
     
            document.querySelector('.messages ul').innerHTML += li

       
        document.querySelector('.message-input input#messageInput').value = ''
        const messageElement = document.querySelector('div.messages');
        console.log(messageElement);
        messageElement.scrollTo(0, messageElement.scrollHeight)

    })

}

socket.on('connect', () => {
    socket.on('namespacesList', dataList => {
        const nameSpacesElement = document.getElementById('namespaces')
        nameSpacesElement.innerHTML = ''
        inittNameSpaceConnection(dataList[0].endpoint)
        for (const namespace of dataList) {
            const liElem = document.createElement('li');
            const pElem = document.createElement('p');
            pElem.setAttribute('class', 'namespaceTitle')
            pElem.setAttribute('endpoint', namespace.endpoint)
            pElem.innerText = namespace.title
            liElem.appendChild(pElem)
            nameSpacesElement.appendChild(liElem)

        }

        const namesapceNode = document.querySelectorAll('#namespaces li p.namespaceTitle');
        for (const namespace of namesapceNode) {
            namespace.addEventListener('click', () => {
                const endpoint = namespace.getAttribute('endpoint')
                inittNameSpaceConnection(endpoint)
            })

        }
    })
    window.addEventListener('keydown', (e) => {
        if (e.code === 'Enter') {
            sendMessage()
        }
    })

    document.querySelector('button.submit').addEventListener('click', sendMessage)
})



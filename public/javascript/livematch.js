const socket = io.connect('http://localhost:5000');
console.log("hello")
  
  let submit_button=document.getElementById('submit');
  socket.on('connect', function() {
    console.log('Connected to the server!');
  });

  submit_button.addEventListener('click',()=>{
    let content=document.getElementById('message_content').value;
    let id=document.getElementById('matchid').textContent;
    document.getElementById('message_content').value="";
    let message_object={
      text:content,
      matchid:id,
      image:document.getElementById('sender_image').getAttribute('src')
    }
    const div = document.createElement('div');
    div.innerHTML = `
      <div class="d-flex align-items-baseline mb-4">
        <div style="width:50px;height:50px;border-radius:50%;border:2px solid red;padding:2px;float:left;">
          <img src="message_object.image" alt="" class="img-fluid rounded-circle" style="height:43px;width:50px;">
        </div>
        <div class="text-container" style="width: 100%;">
          <div class="card d-inline-block p-2 px-3 m-1" style="background-color: orange;">
            ${content}
          </div>
        </div>
        
      </div>
    `;
    document.getElementById('card-body').appendChild(div);
    socket.emit('message',message_object)

    
  })
  socket.on('server',(text_object)=>{
    // console.log("hello world")
    const div = document.createElement('div');
    div.innerHTML = `
      <div class="d-flex align-items-baseline mb-4">
        <div style="width:50px;height:50px;border-radius:50%;border:2px solid red;padding:2px;float:left;">
          <img src=${text_object.image} alt="" class="img-fluid rounded-circle" style="height:43px;width:50px;">
        </div>
        <div class="text-container" style="width: 100%;">
          <div class="card d-inline-block p-2 px-3 m-1" style="background-color: #b1fc03;">
            ${text_object.text}
          </div>
        </div>
        
      </div>
    `;
    document.getElementById('card-body').appendChild(div);
    
  })
let prompt=document.querySelector("#prompt");
let btn=document.querySelector("#btn");
let chatContainer=document.querySelector(".chat-container");
let container=document.querySelector(".container");
let userMessage=null;

let api="https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBS14yT32V-50KR9kJra5MrNd3zvRXFfm0";

function createChatBox(html,className) {
    let div= document.createElement("div");
    div.classList.add("className");
    div.innerHTML=html;
    return div
}

async function getApiResponse(aiChatBox) {
    try {
        let response = await fetch(api, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [{ text: userMessage }]
                    }
                ]
            })
        });
        
        let data = await response.json();
        console.log(data);
        aiChatBox.querySelector(".text").innerText = data.candidates[0].content.parts[0].text;
    } 
    
    catch (err) {
        console.log(err);
    }

    finally{
        aiChatBox.querySelector("#loading").remove();
    }
}


function showLoading() {
    let html=` <div class="ai-chat-box">
     <i class="fa-solid fa-robot"></i>
            <p class="text"></p>
            <img src="loading.gif" alt="Loading..." id="loading" height="50px"> <div>`;
    
    let aiChatBox=createChatBox(html,"ai-chat-box");
    chatContainer.appendChild(aiChatBox);

    getApiResponse(aiChatBox);
}

btn.addEventListener("click",()=>{ 
    userMessage=prompt.value
    if(!userMessage){
        prompt.placeholder="Please enter a message";
        container.style.display="flex"; 
        return;
    }{
        container.style.display="none";
    }

    let html= `<div class="user-chat-box">
            <i class="fa-solid fa-user"></i>
            <p class="text"></p>
        </div>`;

    let userChatBox=createChatBox(html,"user-chat-box")
    userChatBox.querySelector(".text").innerText=userMessage;
    chatContainer.appendChild(userChatBox);
    prompt.value="";
    setTimeout(showLoading,500)
})


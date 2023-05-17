import axios from "axios";
import React, { useState, useRef, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";

import "./chatbot.css";

function Chatbot({ setModalOpen}){
    const [umessage, setUmessage] = useState('');
    const scrollRef = useRef();

    const [name, setName] = useState('');
    const history = useNavigate();

    const closeModal = () => {
        setModalOpen(false);
    };

    const getUser = async () => {
        const jwt = localStorage.getItem("token");
        if (jwt === null) {
          history("/");
        }
        else {
          axios.get("http://localhost:3000/show", { params: { "token": jwt } })
            .then(function (resp) {
              setName(resp.data.name);
            })
            .catch(function (err) {
              alert(err);
            })
        }
      }

    function sendBtnClick(){
        // 입력한 문자열을 chatbox 에 추가
        let elementUser = document.createElement('div');
        elementUser.setAttribute('align', 'right');

        let element = document.createElement('div');
        element.innerHTML = umessage;
        element.setAttribute("class", "usermsg");

        const chatbox = document.getElementById("chatbox");
        elementUser.appendChild(element);
        chatbox.appendChild(elementUser);
        chatbox.appendChild(document.createElement('br'));

        setUmessage('');

        // 데이터 받기(back-end)
        axios.post("http://localhost:3000/chatBot", null, { params:{ "msg":umessage } })
        .then(function(resp){
            ChatbotAnswer(resp.data);

            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;

        }).catch(function(err){
            alert(err);
        })        
    }

    function ChatbotAnswer(respData){
        let type = respData.bubbles[0].type;
        // 판별(문자열, 링크, 이미지, 버튼)
        if(type === "text"){
            let element = document.createElement("div");
            element.innerHTML = respData.bubbles[0].data.description;
            element.setAttribute("class", "botmsg");

            const chatbox = document.getElementById("chatbox");            
            chatbox.appendChild(element);
            chatbox.appendChild(document.createElement('br'));
        }
        else if(type === "template"){
 
            if(respData.bubbles[0].data.cover.type === "image"){                
                let element = document.createElement("img");
                element.setAttribute("src", respData.bubbles[0].data.cover.data.imageUrl);
                element.setAttribute("width", "200px");
                element.setAttribute("height", "140px");

                const chatbox = document.getElementById("chatbox");            
                chatbox.appendChild(element);
                chatbox.appendChild(document.createElement('br'));
            }

            else if(respData.bubbles[0].data.cover.type === "text"){

                let title = respData.bubbles[0].data.contentTable[0][0].data.title;
                let url = respData.bubbles[0].data.contentTable[0][0].data.data.action.data.url;

                let element = document.createElement("a");
                element.innerHTML = title;
                element.setAttribute("href", url);
                element.setAttribute("class", "botmsg");
                element.setAttribute("target", "_blank");

                const chatbox = document.getElementById("chatbox");            
                chatbox.appendChild(element);
                chatbox.appendChild(document.createElement('br'));
            }
        }

    }

    const activeEnter = (e) => {
        if(e.key === "Enter") {
            sendBtnClick();
        }
      }

      useEffect(() => {
        getUser();
      }, []);


    return (
        <div className="wrapper">
            <button id="close3" onClick={closeModal}>X</button>
            <div className="menu">
                <h3 className="welcome">{name} 님, Welcome!</h3>
            </div>

            <div className="chatbox" id="chatbox" ref={scrollRef}>            

            </div>

            <div className="myform">
                <input type="text" className="usermsgwrite" 
                    value={umessage} onChange={(e)=>setUmessage(e.target.value)} onKeyDown={(e) => activeEnter(e)} placeholder="메시지 기입" />
                
                <input type="button" className="submitmsg" onClick={sendBtnClick} value="send" />
            </div>
        </div>
    )
}

export default Chatbot;
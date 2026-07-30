// หน้าแรก
const idle = document.getElementById("idle");

if (idle) {

    document.body.addEventListener("click", function(){

        window.location.href = "form.html";

    });

}


// หน้ากรอกข้อมูล
const sendBtn = document.getElementById("sendBtn");

if(sendBtn){

sendBtn.onclick = function(){

    const book = document.getElementById("bookID").value;
    const email = document.getElementById("email").value;


    if(book === "" || email === ""){

        alert("กรุณากรอกข้อมูลให้ครบ");

        return;

    }


    localStorage.setItem("bookID",book);
    localStorage.setItem("email",email);


    window.location.href="receive.html";

};

}


// หน้าวางหนังสือ

const placedBtn = document.getElementById("placedBtn");


if(placedBtn){

placedBtn.onclick=function(){

    window.location.href="checking.html";

};

}const speech=new SpeechSynthesisUtterance(

"ระบบได้รับข้อมูลแล้ว กรุณาวางหนังสือไว้ในตู้ค่ะ"

);

speech.lang="th-TH";

speechSynthesis.speak(speech);

placedBtn.onclick = async ()=>{

const book =
localStorage.getItem("bookID");

const email =
localStorage.getItem("email");

await fetch(API_URL,{

method:"POST",

body:JSON.stringify({

bookId:book,

email:email

})

});

window.location="checking.html";

};

// หน้า checking

if(location.pathname.includes("checking")){

const speech2=new SpeechSynthesisUtterance(

"กำลังตรวจสอบ กรุณารอสักครู่ค่ะ"

);

speech2.lang="th-TH";

speechSynthesis.speak(speech2);

setTimeout(()=>{

window.location="finish.html";

},4000);

}

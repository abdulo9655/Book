// =======================
// หน้าแรก
// =======================

const idle = document.getElementById("idle");

if(idle){

    document.body.onclick = function(){

        window.location.href = "form.html";

    };

}



// =======================
// หน้าส่งคืน
// =======================

const sendBtn = document.getElementById("sendBtn");


if(sendBtn){

    sendBtn.onclick = function(){

        let book =
        document.getElementById("bookID").value;


        let email =
        document.getElementById("email").value;


        if(book==="" || email===""){

            alert("กรุณากรอกข้อมูลให้ครบ");

            return;

        }


        localStorage.setItem(
            "bookID",
            book
        );


        localStorage.setItem(
            "email",
            email
        );


        window.location.href =
        "receive.html";

    };

}



// =======================
// หน้าวางหนังสือ
// =======================

const placedBtn =
document.getElementById("placedBtn");


if(placedBtn){


    // เสียงทันทีเมื่อเปิดหน้า

    let speech =
    new SpeechSynthesisUtterance(
    "ระบบได้รับข้อมูลแล้ว กรุณาวางหนังสือไว้ในตู้ค่ะ"
    );


    speech.lang="th-TH";


    speechSynthesis.speak(speech);



    placedBtn.onclick=function(){


        let speech2 =
        new SpeechSynthesisUtterance(
        "กำลังตรวจสอบ กรุณารอสักครู่ค่ะ"
        );


        speech2.lang="th-TH";


        speechSynthesis.speak(speech2);



        setTimeout(()=>{

            window.location.href =
            "checking.html";

        },3000);


    };

}

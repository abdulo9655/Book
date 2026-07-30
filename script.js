const API_URL = "https://script.google.com/macros/s/AKfycbwLLZOVkKMhSHkkhBAC6NukjvP3beoSAu7VYXt71vQx4ZMkXwY-53aqpPjSU0wm1rruew/exec";
// หน้าแรก
if (document.getElementById("idle")) {
    document.body.addEventListener("click", () => {
        window.location.href = "form.html";
    });
}

// หน้ากรอกข้อมูล
const sendBtn = document.getElementById("sendBtn");

if (sendBtn) {
    sendBtn.addEventListener("click", () => {

        const book = document.getElementById("bookID").value.trim();
        const email = document.getElementById("email").value.trim();

        if (!book || !email) {
            alert("กรุณากรอกข้อมูลให้ครบ");
            return;
        }

        // พาร์ตต่อไปจะส่งข้อมูลไป Google Sheets ตรงนี้
        window.location.href = "receive.html";
    });
}
// หน้า receive

const placedBtn=document.getElementById("placedBtn");

if(placedBtn){

const speech=new SpeechSynthesisUtterance(

"ระบบได้รับข้อมูลแล้ว กรุณาวางหนังสือไว้ในตู้ค่ะ"

);

speech.lang="th-TH";

speechSynthesis.speak(speech);

placedBtn.onclick=()=>{

window.location="checking.html";

};

}

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

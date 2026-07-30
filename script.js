const standby =
document.getElementById("standby");


const system =
document.getElementById("system");



if(standby){


standby.onclick=function(){


standby.style.display="none";


system.style.display="block";


document.getElementById("rfidInput").focus();


};


}
const API_URL =
"https://script.google.com/macros/s/AKfycbxXRl4vQ5zNHNIms1NmxDNOHwQ5wzzJ2O-GNGYsV1XjosjgTJCegbzEEtaGOST9duZ/exec";



const rfidInput = document.getElementById("rfidInput");
const result = document.getElementById("result");
const returnBtn = document.getElementById("returnBtn");



let currentBook = null;
let lastRFID = "";



// แก้ RFID เพี้ยนภาษาไทย
function normalizeRFID(input){


const map = {

"จ":"0",
"ข":"1",
"ฃ":"2",
"๓":"3",
"๔":"4",
"ู":"5",
"ึ":"6",
"ค":"7",
"ต":"8",
"ๅ":"1",
"ภ":"2",
"ถ":"3",
"ุ":"4"

};


let output = "";


for(let i=0;i<input.length;i++){


let c = input[i];


if(map[c]){

output += map[c];

}else{

output += c;

}


}


return output;


}



// เปิดเว็บให้พร้อมรับ RFID

window.onload=function(){

if(rfidInput){

rfidInput.focus();

}

};




// รับค่า RFID

if(rfidInput){


rfidInput.addEventListener(
"keydown",
async function(e){


if(e.key==="Enter"){


let rfid =
normalizeRFID(
rfidInput.value.trim()
);



if(!rfid) return;



// กันแตะซ้ำ

if(rfid===lastRFID){

return;

}


lastRFID = rfid;



result.innerHTML =
"⏳ กำลังค้นหาหนังสือ...";



try{


let response =
await fetch(API_URL,{

method:"POST",

body:JSON.stringify({

rfid:rfid

})

});



let data =
await response.json();



if(data.success){


currentBook =
data.book;



result.innerHTML = `

<h2>✅ พบหนังสือ</h2>

<p>
📚 ${data.book.name}
</p>

<p>
รหัสหนังสือ :
${data.book.code}
</p>

<p>
RFID :
${data.book.rfid}
</p>

`;



}else{


result.innerHTML =
"❌ ไม่พบข้อมูลหนังสือ";


}



}catch(error){


result.innerHTML =
"⚠️ เชื่อมต่อระบบไม่ได้";


}



}


});

}



// ปุ่มคืนหนังสือ

if(returnBtn){


returnBtn.onclick = async function(){


if(!currentBook){


alert(
"กรุณาแตะ RFID หนังสือก่อน"
);


return;


}



let email =
prompt(
"กรุณากรอก Email เพื่อรับผลการคืน"
);



if(!email) return;



result.innerHTML =
"⏳ กำลังบันทึกข้อมูล...";



try{


await fetch(API_URL,{

method:"POST",

body:JSON.stringify({

rfid:currentBook.rfid,

email:email

})

});



result.innerHTML = `

<div class="success-box">

<h1>
✅ คืนหนังสือสำเร็จ
</h1>


<p>
ระบบส่ง Email ยืนยันแล้ว
</p>


<p>
ขอบคุณที่ใช้บริการ
</p>


<p id="countdown">
รีเซ็ตใน 10 วินาที
</p>


</div>

`;



let time = 10;


let timer =
setInterval(()=>{


time--;


let c =
document.getElementById("countdown");


if(c){

c.innerHTML =
"รีเซ็ตใน "
+time+
" วินาที";

}



if(time<=0){


clearInterval(timer);

location.reload();


}


},1000);



}catch(error){


result.innerHTML =
"❌ ส่งข้อมูลไม่สำเร็จ";


}


};


}
let idleTimer;


function resetIdle(){


clearTimeout(idleTimer);



idleTimer=setTimeout(()=>{


location.reload();


},60000);


}



document.addEventListener(
"mousemove",
resetIdle
);


document.addEventListener(
"keydown",
resetIdle
);


resetIdle();

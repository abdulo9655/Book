const API_URL =
"https://script.google.com/macros/s/AKfycbxXRl4vQH5zNHNIms1NmxDNOHwQ5wzzJ2O-GNGYsV1XjosjgTJCegbzEEtaGOST9duZ/exec";


const rfidInput =
document.getElementById("rfidInput");

const result =
document.getElementById("result");

const returnBtn =
document.getElementById("returnBtn");


let currentBook = null;



// แก้ RFID ภาษาไทยเพี้ยน

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


let output="";


for(let char of input){


if(map[char]){

output += map[char];

}else{

output += char;

}


}


return output;

}



// เปิดเว็บให้ช่อง RFID พร้อม

window.onload=function(){


if(rfidInput){

rfidInput.focus();

}


};




// รับ RFID

if(rfidInput){


rfidInput.addEventListener(
"keydown",
async function(e){


if(e.key==="Enter"){


let rfid =
normalizeRFID(
rfidInput.value.trim()
);



if(!rfid)return;



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
"❌ ไม่พบหนังสือ";


}



}catch(error){


result.innerHTML =
"⚠️ เชื่อมต่อระบบไม่ได้";


}



}


});

}



// ส่งคืนหนังสือ

if(returnBtn){


returnBtn.onclick=async function(){


if(!currentBook){


alert(
"กรุณาแตะ RFID หนังสือก่อน"
);


return;


}



let email =
prompt(
"กรุณากรอก Email"
);



if(!email)return;



result.innerHTML =
"⏳ กำลังส่งข้อมูล...";



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


<p>
ตู้พร้อมใช้งานอีกครั้ง
</p>


</div>

`;



setTimeout(()=>{


location.reload();


},8000);



}catch(error){


result.innerHTML =
"❌ ส่งข้อมูลไม่สำเร็จ";


}



};


}

const API_URL =
"https://script.google.com/macros/s/AKfycbxXRl4vQ5zNHNIms1NmxDNOHwQ5wzzJ2O-GNGYsV1XjosjgTJCegbzEEtaGOST9duZ/exec";



const rfidInput =
document.getElementById("rfidInput");


const result =
document.getElementById("result");


const returnBtn =
document.getElementById("returnBtn");



let currentBook = null;



rfidInput.focus();



rfidInput.addEventListener(
"keydown",
async function(e){


if(e.key==="Enter"){


let rfid =
rfidInput.value.trim();



if(!rfid){

return;

}



result.innerHTML =
"⏳ กำลังค้นหาหนังสือ...";



try{


const response =
await fetch(API_URL,{
method:"POST",

body:JSON.stringify({

rfid:rfid

})

});



const data =
await response.json();



if(data.success){


currentBook=data.book;



result.innerHTML=
`

<h3>✅ พบหนังสือ</h3>

<p>
📚 ${data.book.name}
</p>

<p>
รหัส:
${data.book.code}
</p>

<p>
RFID:
${data.book.rfid}
</p>

`;



}else{


result.innerHTML=
`
❌ ไม่พบหนังสือ
`;

}


}catch(err){


result.innerHTML=
"⚠️ เชื่อมต่อระบบไม่ได้";


}



}

});



returnBtn.onclick=async function(){


if(!currentBook){

alert(
"กรุณาแตะ RFID ก่อน"
);

return;

}



let email =
prompt(
"กรอก Email เพื่อรับผลการคืน"
);



if(!email){

return;

}



await fetch(API_URL,{

method:"POST",

body:JSON.stringify({

rfid:currentBook.rfid,

email:email

})

});



result.innerHTML=

`
<h2>✅ ส่งคืนเรียบร้อย</h2>

<p>
เจ้าหน้าที่จะตรวจสอบและแจ้งผลทาง Email
</p>
`;



setTimeout(()=>{

location.reload();

},8000);



};

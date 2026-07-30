const rfidInput =
document.getElementById("rfidInput");


const result =
document.getElementById("result");


const returnBtn =
document.getElementById("returnBtn");


// รับ RFID จากเครื่องอ่าน
rfidInput.focus();



rfidInput.addEventListener(
"keydown",
function(e){


if(e.key==="Enter"){


let rfid =
rfidInput.value;


result.innerHTML =
`
<h3>✅ อ่าน RFID แล้ว</h3>
<p>รหัส: ${rfid}</p>
`;

}


});



returnBtn.onclick=function(){


alert(
"เตรียมส่งข้อมูลคืนหนังสือ"
);


};

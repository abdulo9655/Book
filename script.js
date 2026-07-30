// ============================
// Book Return System Script
// ============================


// หน้าแรก แตะเพื่อเริ่ม
document.addEventListener("DOMContentLoaded", function(){

    const idle = document.getElementById("idle");

    if(idle){

        document.body.addEventListener("click", function(){

            window.location.href = "form.html";

        });

    }



    // ============================
    // หน้ากรอกข้อมูล
    // ============================

    const sendBtn = document.getElementById("sendBtn");


    if(sendBtn){

        sendBtn.addEventListener("click", function(){

            const book =
            document.getElementById("bookID").value.trim();


            const email =
            document.getElementById("email").value.trim();



            if(book === "" || email === ""){

                alert("กรุณากรอกข้อมูลให้ครบ");

                return;

            }



            localStorage.setItem("bookID", book);

            localStorage.setItem("email", email);



            window.location.href = "receive.html";


        });

    }



    // ============================
    // หน้าวางหนังสือ
    // ============================

    const placedBtn =
    document.getElementById("placedBtn");


    if(placedBtn){


        const receiveSound =
        document.getElementById("receiveSound");


        // เล่นเสียงรับข้อมูล
        if(receiveSound){

            receiveSound.play()
            .catch(()=>{});

        }



        placedBtn.addEventListener("click", function(){


            const checkingSound =
            document.getElementById("checkingSound");


            if(checkingSound){

                checkingSound.play()
                .catch(()=>{});

            }



            window.location.href = "checking.html";


        });


    }



    // ============================
    // หน้ากำลังตรวจสอบ
    // ============================

    const checkingPage =
    document.getElementById("checkingPage");


    if(checkingPage){


        setTimeout(function(){

            window.location.href="finish.html";


        },4000);


    }



});

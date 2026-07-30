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

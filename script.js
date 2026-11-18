
    let currentQR = null;

    // GENERATE QR CODE

    document.getElementById("studentForm")
        .addEventListener("submit", function(event) {

        event.preventDefault();

        const student = {
            id: document.getElementById("studentID").value.trim(),
            name: document.getElementById("fullName").value.trim(),
            program: document.getElementById("program").value.trim(),
            year: document.getElementById("yearLevel").value.trim(),
            section: document.getElementById("section").value.trim()
        };

        currentQR = JSON.stringify(student);

        document.getElementById("qrcode").innerHTML = "";

        new QRCode(document.getElementById("qrcode"), {
            text: currentQR,
            width: 200,
            height: 200,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });

        document.getElementById("qrResult").style.display = "block";

    });


    // DOWNLOAD QR CODE

    function downloadQR() {

        const qr = document.querySelector("#qrcode img");

        if (!qr) return;

        const link = document.createElement("a");

        link.href = qr.src;
        link.download = "student-qrcode.png";

        link.click();

    }


    // SCAN QR CODE

    function onScanSuccess(decodedText) {

        try {

            const student = JSON.parse(decodedText);

            if (
                !student.id ||
                !student.name ||
                !student.program ||
                !student.year ||
                !student.section
            ) {
                throw new Error("Invalid student information");
            }

            document.getElementById("showID").textContent = student.id;
            document.getElementById("showName").textContent = student.name;
            document.getElementById("showProgram").textContent = student.program;
            document.getElementById("showYear").textContent = student.year;
            document.getElementById("showSection").textContent = student.section;

            document.getElementById("studentInfo").style.display = "block";

            document.getElementById("scanMessage").textContent =
                "Student information successfully retrieved!";

        } catch (error) {

            document.getElementById("scanMessage").textContent =
                "Invalid QR Code. Please scan a student QR code.";

        }

    }


    const scanner = new Html5QrcodeScanner(
        "reader",
        {
            fps: 10,
            qrbox: {
                width: 250,
                height: 250
            }
        },
        false
    );

    scanner.render(onScanSuccess);
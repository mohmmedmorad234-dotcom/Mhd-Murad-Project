function toggleDetails(id) {
    let row = document.getElementById(id);
    if (row.style.display === "none" || row.style.display === "") {
        row.style.display = "table-row";
    } else {
        row.style.display = "none";
    }
}

function showOrderForm() {
    let allChecks = document.getElementsByName("mealSelection");
    let chosenCodes = [];
    let chosenNames = [];
    let chosenPrices = [];
    let total = 0;

    for (let i = 0; i < allChecks.length; i++) {
        if (allChecks[i].checked) {
            let code = allChecks[i].getAttribute("data-code");
            let name = allChecks[i].getAttribute("data-name");
            let price = parseInt(allChecks[i].getAttribute("data-price"));
            chosenCodes.push(code);
            chosenNames.push(name);
            chosenPrices.push(price);
            total += price;
        }
    }

    if (chosenCodes.length === 0) {
        alert("الرجاء اختيار وجبة واحدة على الأقل.");
        return;
    }

    let html = "<h3>الوجبات التي تم اختيارها:</h3>";
    html += "<table>";
    html += "<tr><th>الرمز</th><th>الوجبة</th><th>السعر</th></tr>";
    for (let j = 0; j < chosenCodes.length; j++) {
        html += "<tr>";
        html += "<td>" + chosenCodes[j] + "</td>";
        html += "<td>" + chosenNames[j] + "</td>";
        html += "<td>" + chosenPrices[j] + " ل.س</td>";
        html += "</tr>";
    }
    html += "<tr><td colspan='2'><strong>الإجمالي</strong></td><td><strong>" + total + " ل.س</strong></td></tr>";
    html += "</table>";

    document.getElementById("selectedMeals").innerHTML = html;
    document.getElementById("orderFormDiv").style.display = "block";
}

function validateForm() {
    let name = document.getElementById("fullname").value.trim();
    let namePattern = /^[a-zA-Z]+ [a-zA-Z]+$/;
    if (!namePattern.test(name)) {
        alert("الاسم الكامل يجب أن يكون بالإنكليزية (اسم وكنية) ويفصل بينهما مسافة واحدة فقط.");
        return false;
    }

    let acc = document.getElementById("account").value.trim();
    let accPattern = /^\d{6}$/;
    if (!accPattern.test(acc)) {
        alert("رقم الحساب المصرفي يجب أن يكون 6 أرقام.");
        return false;
    }

    let dob = document.getElementById("dob").value.trim();
    let dobPattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    let match = dob.match(dobPattern);
    if (!match) {
        alert("تاريخ الميلاد يجب أن يكون بالصيغة dd/mm/yyyy");
        return false;
    }
    let day = parseInt(match[1], 10);
    let month = parseInt(match[2], 10);
    let year = parseInt(match[3], 10);
    if (month < 1 || month > 12 || day < 1 || day > 31) {
        alert("تاريخ الميلاد غير صحيح.");
        return false;
    }

    let mob = document.getElementById("mobile").value.trim();
    let mobPattern = /^\d{10}$/;
    if (!mobPattern.test(mob)) {
        alert("رقم الموبايل يجب أن يكون 10 أرقام.");
        return false;
    }

    alert("تم إرسال الطلب بنجاح! شكراً لك يا " + name);
    return false;
}
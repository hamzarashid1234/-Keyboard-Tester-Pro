/* =========================================
   KEYBOARD TESTER PRO
   JavaScript
========================================= */


/* =========================================
   ELEMENTS
========================================= */

const testArea = document.getElementById("testArea");

const keyDisplay = document.getElementById("keyDisplay");

const codeDisplay = document.getElementById("codeDisplay");

const statusDisplay = document.getElementById("statusDisplay");

const pressCount = document.getElementById("pressCount");

const clearButton = document.getElementById("clearButton");

const keyboard = document.getElementById("keyboard");

const menuButton = document.getElementById("menuButton");

const navigation = document.getElementById("navigation");


/* =========================================
   NEW: KEYBOARD DETAILS ELEMENTS
========================================= */

const codeField = document.getElementById("code");
const modelField = document.getElementById("model");
const companyField = document.getElementById("company");
const addressField = document.getElementById("address");
const originField = document.getElementById("origin");
const connectionField = document.getElementById("connection");
const layoutField = document.getElementById("layout");
const keyCountField = document.getElementById("keyCount");

const saveBtn = document.getElementById("saveDetails");
const resetBtn = document.getElementById("resetDetails");
const printBtn = document.getElementById("printDetails");

const batterySection = document.getElementById("batterySection");
const batterySlider = document.getElementById("batterySlider");
const batteryPercent = document.getElementById("batteryPercent");
const batteryBar = document.getElementById("batteryBar");
const batteryNote = document.getElementById("batteryNote");


/* =========================================
   STATE
========================================= */

let totalPresses = 0;

let pressedKeys = new Set();


/* =========================================
   FOCUS TEST AREA
========================================= */

function focusTester() {

    if (testArea) {
        testArea.focus();
    }

}


/* =========================================
   FIND VISUAL KEY
========================================= */

function findVisualKeys(code) {

    if (!keyboard) {
        return [];
    }

    return Array.from(
        keyboard.querySelectorAll(
            `.key[data-key="${CSS.escape(code)}"]`
        )
    );

}


/* =========================================
   SHOW ACTIVE KEY
========================================= */

function activateVisualKey(code) {

    const keys = findVisualKeys(code);

    keys.forEach((key) => {

        key.classList.add("active");

    });

}


/* =========================================
   REMOVE ACTIVE KEY
========================================= */

function deactivateVisualKey(code) {

    const keys = findVisualKeys(code);

    keys.forEach((key) => {

        key.classList.remove("active");

    });

}


/* =========================================
   NEW: AUTO-FILL KEYBOARD CODE
========================================= */

function autoFillCode(code) {

    if (!codeField) return;

    codeField.value = code;

    // Green flash effect
    codeField.style.background = "#dcfce7";
    codeField.style.borderColor = "#22c55e";
    codeField.style.color = "#166534";

    setTimeout(() => {
        codeField.style.background = "";
        codeField.style.borderColor = "";
        codeField.style.color = "";
    }, 800);

}


/* =========================================
   KEY DOWN
========================================= */

document.addEventListener("keydown", function(event) {

    totalPresses++;

    pressCount.textContent = totalPresses;

    keyDisplay.textContent = event.key || "Unknown";

    codeDisplay.textContent = event.code || "Unknown";

    statusDisplay.textContent = "Detected";

    statusDisplay.style.color = "#16a34a";


    activateVisualKey(event.code);


    pressedKeys.add(event.code);


    /* ✅ NEW: Auto-fill keyboard code field */

    autoFillCode(event.code);


    /*
       Prevent browser scrolling when Space is pressed
       while the tester is active.
    */

    if (
        event.code === "Space" &&
        document.activeElement === testArea
    ) {

        event.preventDefault();

    }

});


/* =========================================
   KEY UP
========================================= */

document.addEventListener("keyup", function(event) {

    deactivateVisualKey(event.code);

    pressedKeys.delete(event.code);

});


/* =========================================
   RESET
========================================= */

function resetTester() {

    totalPresses = 0;

    pressedKeys.clear();

    pressCount.textContent = "0";

    keyDisplay.textContent = "—";

    codeDisplay.textContent = "—";

    statusDisplay.textContent = "Waiting";

    statusDisplay.style.color = "#16a34a";


    if (keyboard) {

        keyboard
            .querySelectorAll(".key.active")
            .forEach((key) => {

                key.classList.remove("active");

            });

    }

    focusTester();

}


if (clearButton) {

    clearButton.addEventListener(
        "click",
        resetTester
    );

}


/* =========================================
   VISUAL KEYBOARD CLICK
========================================= */

if (keyboard) {

    keyboard.addEventListener("click", function(event) {

        const keyButton = event.target.closest(".key");

        if (!keyButton) {
            return;
        }


        const code = keyButton.dataset.key;

        const displayName =
            keyButton.textContent.trim();


        keyDisplay.textContent =
            displayName || code;


        codeDisplay.textContent =
            code;


        statusDisplay.textContent =
            "Visual key selected";


        statusDisplay.style.color =
            "#2563eb";


        keyButton.classList.add("active");


        setTimeout(() => {

            keyButton.classList.remove("active");

        }, 180);


        /* ✅ NEW: Auto-fill keyboard code field on visual click too */

        autoFillCode(code);


        focusTester();

    });

}


/* =========================================
   MOBILE MENU
========================================= */

if (menuButton && navigation) {

    menuButton.addEventListener(
        "click",
        function() {

            navigation.classList.toggle("open");

        }
    );


    navigation.querySelectorAll("a").forEach((link) => {

        link.addEventListener(
            "click",
            function() {

                navigation.classList.remove("open");

            }
        );

    });

}


/* =========================================
   CLOSE MENU WITH ESCAPE
========================================= */

document.addEventListener("keydown", function(event) {

    if (
        event.key === "Escape" &&
        navigation
    ) {

        navigation.classList.remove("open");

    }

});


/* =========================================
   NEW: BATTERY SECTION TOGGLE
========================================= */

function toggleBattery() {

    if (!connectionField || !batterySection) return;

    const val = connectionField.value;

    if (val === "Wireless" || val === "Bluetooth") {

        batterySection.style.display = "block";

    } else {

        batterySection.style.display = "none";

    }

}


if (connectionField) {

    connectionField.addEventListener("change", toggleBattery);

}


/* =========================================
   NEW: BATTERY LEVEL UPDATE
========================================= */

function updateBattery() {

    if (!batterySlider) return;

    const val = parseInt(batterySlider.value, 10);

    batteryPercent.textContent = val + "%";

    batteryBar.style.width = val + "%";


    let color = "#22c55e";
    let note = "Battery level: Full";


    if (val <= 20) {

        color = "#ef4444";
        note = "⚠️ Battery low — please charge soon!";

    } else if (val <= 50) {

        color = "#f59e0b";
        note = "Battery level: Medium";

    } else if (val <= 80) {

        color = "#84cc16";
        note = "Battery level: Good";

    }


    batteryBar.style.background = color;

    batteryNote.textContent = note;

}


if (batterySlider) {

    batterySlider.addEventListener("input", updateBattery);

}


/* =========================================
   NEW: SAVE DETAILS TO LOCALSTORAGE
========================================= */

function saveDetails() {

    const data = {

        model: modelField ? modelField.value : "",
        code: codeField ? codeField.value : "",
        company: companyField ? companyField.value : "",
        address: addressField ? addressField.value : "",
        origin: originField ? originField.value : "",
        connection: connectionField ? connectionField.value : "USB",
        layout: layoutField ? layoutField.value : "QWERTY",
        keyCount: keyCountField ? keyCountField.value : "",
        battery: batterySlider ? batterySlider.value : "100"

    };

    localStorage.setItem(
        "keyboardDetails",
        JSON.stringify(data)
    );


    if (saveBtn) {

        saveBtn.textContent = "✅ Saved!";

        setTimeout(() => {

            saveBtn.textContent = "💾 Save Details";

        }, 1500);

    }

}


if (saveBtn) {

    saveBtn.addEventListener("click", saveDetails);

}


/* =========================================
   NEW: LOAD DETAILS FROM LOCALSTORAGE
========================================= */

function loadDetails() {

    const saved = localStorage.getItem("keyboardDetails");

    if (!saved) return;

    try {

        const data = JSON.parse(saved);

        if (modelField && data.model) modelField.value = data.model;
        if (codeField && data.code) codeField.value = data.code;
        if (companyField && data.company) companyField.value = data.company;
        if (addressField && data.address) addressField.value = data.address;
        if (originField && data.origin) originField.value = data.origin;
        if (connectionField && data.connection) connectionField.value = data.connection;
        if (layoutField && data.layout) layoutField.value = data.layout;
        if (keyCountField && data.keyCount) keyCountField.value = data.keyCount;
        if (batterySlider && data.battery) batterySlider.value = data.battery;

        toggleBattery();
        updateBattery();

    } catch (err) {

        console.warn("Failed to load details:", err);

    }

}


/* =========================================
   NEW: RESET DETAILS
========================================= */

function resetDetails() {

    if (!confirm("Are you sure you want to reset all keyboard details?")) return;

    localStorage.removeItem("keyboardDetails");

    const form = document.getElementById("detailsForm");

    if (form) form.reset();

    toggleBattery();

    updateBattery();

}


if (resetBtn) {

    resetBtn.addEventListener("click", resetDetails);

}


/* =========================================
   NEW: PRINT DETAILS
========================================= */

if (printBtn) {

    printBtn.addEventListener("click", function() {

        window.print();

    });

}


/* =========================================
   INITIAL STATE
========================================= */

window.addEventListener("load", function() {

    /*

       We do not automatically focus the tester on page load.

       This prevents unexpected keyboard capture when a visitor

       is navigating the page.

    */

    if (statusDisplay) {

        statusDisplay.textContent = "Waiting";

    }


    /* Load saved details */

    loadDetails();

});

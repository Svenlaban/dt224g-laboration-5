"use strict";
/*
 * Laboration 5 - Studentkortsgenerator
 * Namn: Micael Huczkowski
 */

// Hämta element från DOM
const form = document.querySelector("#studentform");
const clearButton = document.querySelector("#clear");

const fullnameInput = document.querySelector("#fullname");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const fontSelect = document.querySelector("#font");

const previewFullname = document.querySelector("#previewfullname");
const previewEmail = document.querySelector("#previewemail");
const previewPhone = document.querySelector("#previewphone");

const errorList = document.querySelector("#errorlist");
const historySection = document.querySelector("#history");
const deleteHistoryButton = document.querySelector("#delete");


// Array som används för felmeddelanden
let errors = [];

// Array som innehåller sparade studentkort
let history = [];

/**
 * Validerar formulärets inmatning.
 * @returns {boolean}
 */
function validateForm() {
    errors = [];
    // Kontrollera formulärets obligatoriska fält
    if (fullnameInput.value.trim() === ""){
        errors.push("Namn saknas.");
    }

    if (emailInput.value.trim() === "") {
        errors.push("E-post saknas.");
    }

    if (phoneInput.value.trim() === "") {
        errors.push("Telefonnummer saknas.");
    }
    // Visa eventuella felmeddelanden
    displayErrors();

    // Returnera resultatet (true eller false) av valideringen
    return errors.length === 0;    
}


/**
 * Visar felmeddelanden på sidan.
 */
function displayErrors() {
    // Rensa tidigare felmeddelanden
    errorList.innerHTML = "";

    // Skriv ut aktuella felmeddelanden till DOM
    for (let index = 0; index < errors.length; index++) {
        const listItem = document.createElement("li");
        listItem.textContent = errors[index];
        errorList.appendChild(listItem);
    }
}


/**
 * Skapar ett studentkort och visar det på sidan.
 */
function createStudentCard() {
    // Hämta information från formuläret
    const fullname = fullnameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const selectedFont = fontSelect.value;

    // Uppdatera studentkortet
    previewFullname.textContent = fullname;
    previewEmail.textContent = email;
    previewPhone.textContent = phone;

    // Använder rätt typsnitt från formuläret
    previewFullname.style.fontFamily = selectedFont;
    previewEmail.style.fontFamily = selectedFont;
    previewPhone.style.fontFamily = selectedFont;
    
    
    // Lägg till studentkortet i historiken
    const studentCard = {
        name: fullname,
        email: email,
        phone: phone,
        font: selectedFont
    };

    // Lägg det senaste kortet först i historiken
    history.unshift(studentCard);

    // Spara och uppdatera historiken
    saveHistory();
    renderHistory();
}


/**
 * Sparar historiken i localStorage.
 */
function saveHistory() {
    // Spara history i localStorage
    localStorage.setItem("studentCardHistory", JSON.stringify(history));
}


/**
 * Läser in tidigare historik från localStorage.
 */
function loadHistory() {
    // Hämta eventuell sparad historik
    const savedHistory = localStorage.getItem("studentCardHistory");

    // Uppdatera history
    if (savedHistory !== null) {
        history = JSON.parse(savedHistory);
    }
}


/**
 * Visar historiken på sidan.
 */
function renderHistory() {
    // Rensa tidigare visad historik
    historySection.innerHTML = "";

    // Skriv ut innehållet i history till DOM
    for (let index = 0; index < history.length; index++) {
        const studentCard = history[index];

        const historyItem = document.createElement("div");
        historyItem.style.fontFamily = studentCard.font;

        const nameParagraph = document.createElement("p");
        nameParagraph.textContent = "Namn: " + studentCard.name;

        const emailParagraph = document.createElement("p");
        emailParagraph.textContent = "E-post: " + studentCard.email;

        const phoneParagraph = document.createElement("p");
        phoneParagraph.textContent = "Telefon: " + studentCard.phone;

        historyItem.appendChild(nameParagraph);
        historyItem.appendChild(emailParagraph);
        historyItem.appendChild(phoneParagraph);

        historySection.appendChild(historyItem);
    }
}


/**
 * Rensar formulär, aktuellt studentkort och felmeddelanden.
 */
function clearForm() {
    // Återställ formulär och studentkort
    form.reset();
    // Återställer innehållet
    previewFullname.textContent = "Namn";
    previewEmail.textContent = "E-post";
    previewPhone.textContent = "Telefon";

    // Återställer typsnittet
    previewFullname.style.fontFamily = "";
    previewEmail.style.fontFamily = "";
    previewPhone.style.fontFamily = "";

    // Rensa eventuella felmeddelanden
    errors = [];
    displayErrors();
}


/**
 * Raderar hela historiken.
 */
function deleteHistory() {
    // Radera sparad historik
    localStorage.removeItem("studentCardHistory");

    // Tömmer arrayen
    history = [];

    // Uppdatera history och visningen på sidan
     renderHistory();
}


// Eventlyssnare

// När formuläret skickas:
// - validera inmatningen
// - skapa studentkort om valideringen lyckas
form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (validateForm()) {
        createStudentCard();
    }
});

// När användaren klickar på "Rensa"
clearButton.addEventListener("click", function () {
    clearForm();
});

// När användaren klickar på "Radera historik"
deleteHistoryButton.addEventListener("click", function () {
    deleteHistory();
});

// När sidan laddas:
// - läs in och visa eventuell tidigare historik
window.addEventListener("DOMContentLoaded", function () {
    loadHistory();
    renderHistory();
});
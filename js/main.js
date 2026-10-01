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

    if (fullnameInput.value.trim() === ""){// Kontrollera formulärets obligatoriska fält
        errors.push("Namn saknas.");
    }

    if (emailInput.value.trim() === "") {
        errors.push("E-post saknas");
    }

    if (phoneInput.value.trim() === "") {
        errors.push("Telefonnummer saknas");
    }

    displayErrors();// Visa eventuella felmeddelanden

    return errors.length === 0;    // Returnera resultatet (true eller false) av valideringen
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

    // Försökt till att få till fonter, behöver felsökas
    previewFullname.style.fontFamily = selectedFont;
    previewEmail.style.fontFamily = selectedFont;
    previewPhone.style.fontFamily = selectedFont;
    
    
    // Lägg till studentkortet i historiken

    // Spara och uppdatera historiken
}


/**
 * Sparar historiken i localStorage.
 */
function saveHistory() {
    // Spara history i localStorage
}


/**
 * Läser in tidigare historik från localStorage.
 */
function loadHistory() {
    // Hämta eventuell sparad historik

    // Uppdatera history
}


/**
 * Visar historiken på sidan.
 */
function renderHistory() {
    // Rensa tidigare visad historik

    // Skriv ut innehållet i history till DOM
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

    // Återställer fonterna
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

    // Uppdatera history och visningen på sidan
}


// Eventlyssnare

// När formuläret skickas:
// - validera inmatningen
// - skapa studentkort om valideringen lyckas
form.addEventListener("submit", function (event) {// Submit sker när formuläret skickas
    event.preventDefault();

    if (validateForm()) {//kontrollerar fälten och kör create om den ger true
        createStudentCard();
    }
});

// När användaren klickar på "Rensa"
clearButton.addEventListener("click", function () {
    clearForm();
});

// När användaren klickar på "Radera historik"


// När sidan laddas:
// - läs in och visa eventuell tidigare historik
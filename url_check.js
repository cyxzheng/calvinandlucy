document.addEventListener('DOMContentLoaded', function (e) {
    const url = new URL(window.location.href);
    console.log("URL: " + url.search);
    if (url.search.includes("submitted")) {
        console.log("SUBMIT :)");
        alert("Got it, thanks!")
    }
});

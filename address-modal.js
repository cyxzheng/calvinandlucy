document.addEventListener('DOMContentLoaded', function (e) {
    // Get the modal
    var modal = document.getElementById("address-form-modal");
    console.log(modal)

    // Get the button that opens the modal
    var btn = document.getElementById("address-form-modal-btn");
    console.log(btn)

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal 
    btn.onclick = function () {
        console.log("clicked")
        document.getElementById("address-form-modal").style["display"] = "flex";
        console.log(modal)
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
})
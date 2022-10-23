function hamburgermenu() {
    var x = document.getElementById("sidebar-menu");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}
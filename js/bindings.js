
function toggleMenu() {
  $("#menuOptions").slideToggle(250);
}
$(document).on("click", "#menuButton", toggleMenu);

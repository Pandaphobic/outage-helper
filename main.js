console.log("JS Loaded")

// Text field vars
const search = document.getElementById("template")
const summary = document.getElementById("summary")
const userid = document.getElementById("userid")
const role = document.getElementById("role")
const name = document.getElementById("name")
const phone = document.getElementById("phone")
const region = document.getElementById("region")

// Text area var
const result = document.getElementById("result")

// Button vars
document.getElementById("copy").addEventListener("click", copyAll)
document.getElementById("clear").addEventListener("click", clearAll)
document.getElementById("save").addEventListener("click", saveAll)
document.getElementById("popout").addEventListener("click", popout)

function popout() {
  window.open("https://eager-almeida-a52a97.netlify.app/", "popUpWindow", "height=500,width=400,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes")
}

// Handle copy button
function copyAll() {
  console.log(userid.value)

  result.value = getAllText()
  result.select()

  document.execCommand("Copy")
}

// Handle clear
function clearAll() {
  console.log("cleared")
}
// Handle save
function saveAll() {
  console.log("saved")
}

function getAllText() {
  return `User ID:\u00A0 ${userid.value}
Name:\u00A0 ${name.value}
Role:\u00A0 ${role.value}
Phone:\u00A0${phone.value}
Region:\u00A0${region.value}`
}

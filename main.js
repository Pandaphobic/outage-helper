const OutageCtrl = (function () {
  // Gets declared only once
  let outages = getOutageList()
  // Retrieve list from LS
  function getOutageList() {
    var outageList = localStorage.getItem("outages")
    // If an outage array exists - export it - else - return empty array
    var outageObjArr = outageList !== null ? JSON.parse(outageList) : []
    return outageObjArr
  }

  return {
    add: function (outageObj) {
      // Get outages
      outages = getOutageList()

      // Assign ID to Outage
      outageObj.ID = outages.length+1
      console.log(outageObj)

      outages.push(outageObj)

      localStorage.setItem("outages", JSON.stringify(outages))
      // getOutageList()
      console.log(outages)
      ModalCtrl.hide()
      this.updateOutageList()
    },
    get: function () {
      // getOutageList()
    },
    udpate: function () {
      console.log("update-called")
    },
    delete: function (outageToDelete) {
      console.log(outageToDelete)
      var newOutageList = getOutageList()
      // remove item from new array (outage list)
      newOutageList.splice(outageToDelete-1, 1)
      // Update LS
      localStorage.setItem("outages", JSON.stringify(newOutageList))
      // redraw the list based on LS
      this.updateOutageList()
    },
    init: function () {
      getOutageList()
      this.updateOutageList()
    },
    updateOutageList: function () {
      const outageList = getOutageList()
      var outageTableBody = document.getElementById("list-body")
      const newOutageTable = document.createElement("tbody")

      // Draw each outage based on parsed list from LS
      outageList.forEach((outage, index) => {
        // reset table color / type
        var tableType = ""
        // Figure out what color based on scope
        if (outage.scope === "P1") {
          tableType = "table-danger"
        } else if (outage.scope === "P2") {
          tableType = "table-warning"
        } else if (outage.scope === "P3") {
          tableType = "table-info"
        } else if (outage.scope === "Up") {
          tableType = "table-success"
        }

        newOutageTable.innerHTML += `
        <tr class="${tableType}" data-id="${index+1}">
          <td>${outage.scope}</td>
          <td>${outage.inc}</td>
          <td>${outage.desc}</td>
          <td>${outage.inst}</td>
          <td><a href="#"><i class="fas fa-trash"></i></a></td>
        </tr>
        `
      })
      console.log(newOutageTable)
      // Replace the old tbody innerhtml with the new tbody innerhtml
      outageTableBody.innerHTML = newOutageTable.innerHTML
    }
  }
})()

const ModalCtrl = (function () {
  const modalWindow = document.querySelector("#modal")

  return {
    show: function () {
      // Show a modal window
      modalWindow.style.display = "flex"
    },
    hide: () => {
      // Hide modal window
      modalWindow.style.display = "none"
    },
    clear: () => {
      // Clear fields of the modal
    },
    get: () => {
      // returns an outage object containing all fields in the modal
    }
  }
})()

function handleDeleteBtn(e){
  e.preventDefault()
  try {
  if(e.target.parentElement.parentElement.parentElement.parentElement.classList.contains('remove')){
    var outageToDelete = e.target.parentElement.parentElement.parentElement.dataset.id
    OutageCtrl.delete(outageToDelete) 
  } 
}catch{
  // If you select everything, throws an error because the item is null
  // It doesn't break anything to ignore it (for now)
}
}

function handleAddBtn() {
  ModalCtrl.show()
}
function handleCloseBtn() {
  ModalCtrl.hide()
}
function handleBackBtn() {
  ModalCtrl.hide()
}

function handleSubmit() {
  // Grab text from fields
  const modalInc = document.getElementById("modal-inc")
  const modalScope = document.getElementById("modal-scope")
  const modalDesc = document.getElementById("modal-desc")
  const modalInst = document.getElementById("modal-inst")

  console.log("Submit Pushed")
  const outageObj = {
    scope: modalScope.value,
    inc: modalInc.value,
    desc: modalDesc.value,
    inst: modalInst.value,
    ID: ''
  }

  ModalCtrl.hide()
  OutageCtrl.add(outageObj)
}

// Modal

// Event Listeners
document.getElementById("add-btn").addEventListener("click", handleAddBtn)
document.getElementById("modal-close-btn").addEventListener("click", handleCloseBtn)
document.getElementById("modal-back-btn").addEventListener("click", handleBackBtn)
document.getElementById("modal-submit-btn").addEventListener("click", handleSubmit)
// Listen for delete outage
document.querySelector('tbody').addEventListener('click', handleDeleteBtn)


OutageCtrl.init()

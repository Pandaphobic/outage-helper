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
    delete: function () {
      console.log("delete-called")
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
      outageList.forEach(outage => {
        var row = newOutageTable.insertRow(0)
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

        // Create a blank row
        row.classList.add(tableType)

        // Create blank cells in the blank row
        var rscope = row.insertCell(0)
        var rinc = row.insertCell(1)
        var rdesc = row.insertCell(2)
        var rinst = row.insertCell(3)
        // Assingn the fields to the cells
        rscope.innerHTML = outage.scope
        rinc.innerHTML = outage.inc
        rdesc.innerHTML = outage.desc
        rinst.innerHTML = outage.inst
      })
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
  const outage = {
    scope: modalScope.value,
    inc: modalInc.value,
    desc: modalDesc.value,
    inst: modalInst.value
  }

  ModalCtrl.hide()
  OutageCtrl.add(outage)
}

// Modal

// Event Listeners
document.getElementById("add-btn").addEventListener("click", handleAddBtn)
document.getElementById("modal-close-btn").addEventListener("click", handleCloseBtn)
document.getElementById("modal-back-btn").addEventListener("click", handleBackBtn)
document.getElementById("modal-submit-btn").addEventListener("click", handleSubmit)

OutageCtrl.init()

//arrow rotate function
document.getElementById("arrow1").onclick = () => {
    var element = document.getElementById("arrowAccounts");
    element.classList.toggle("rotate");
}
document.getElementById("arrow2").onclick = () => {
    var element = document.getElementById("arrowPrefferences");
    element.classList.toggle("rotate");
}

//api call and search result function
const useraction = async (searchText) => {
    const resopnse = await fetch(`https://staging.staging.b2brain.com/search/autocomplete_org_all/?q=${searchText}`)
    const json = await resopnse.json()
    console.log(json)
    var obj = JSON.parse(JSON.stringify(json));


    obj.forEach(element => {
        let contDiv = document.getElementById("search-div");
        let cardDiv = document.createElement("div");
        cardDiv.setAttribute("class", "pt-3 d-flex d-inline-flex flex-columns pb-4 pe-5 width")
        cardDiv.setAttribute("id", "delete")
        if (element.logo == "") {
            let imgDiv = document.createElement("div")
            imgDiv.setAttribute("class", "position-relative")
            let initial = document.createTextNode(element.company[0])
            let initialDiv = document.createElement("div")
            initialDiv.setAttribute("class", "position-absolute top-50 start-50 translate-middle company-initial")
            initialDiv.appendChild(initial)
            imgDiv.appendChild(initialDiv)
            let companyImage = document.createElement("img")
            companyImage.style.backgroundColor = element.color
            companyImage.setAttribute("height", "50")
            companyImage.setAttribute("width", "50")
            imgDiv.appendChild(companyImage)
            cardDiv.appendChild(imgDiv);
        } else {
            let imgDiv = document.createElement("div")
            imgDiv.setAttribute("class", "pe-4")
            let companyImage = document.createElement("img")
            companyImage.src = element.logo
            companyImage.setAttribute("height", "50")
            companyImage.setAttribute("width", "50")
            imgDiv.appendChild(companyImage)
            cardDiv.appendChild(imgDiv);
        }
        let infoContainer = document.createElement("div");
        infoContainer.setAttribute("class", "ms-4 align-items-center  flex-grow-1 ")
        let companyName = document.createElement("div");
        let cName = document.createTextNode(element.company)
        companyName.appendChild(cName)
        companyName.setAttribute("class", "company-name")
        let companyWebsite = document.createElement("div")
        let website = document.createTextNode(element.website)
        companyWebsite.setAttribute("class", "website")
        companyWebsite.appendChild(website)
        infoContainer.appendChild(companyName)
        infoContainer.appendChild(companyWebsite)
        let button = document.createElement("button")
        let track = document.createTextNode("Track")
        button.appendChild(track)
        button.setAttribute("class", "ps-2 pe-2 button")
        cardDiv.appendChild(infoContainer);
        cardDiv.appendChild(button);
        contDiv.appendChild(cardDiv)
    });
}

document.getElementById("search-text").onchange = () => {
    let searchtext = document.getElementById("search-text").value;
    useraction(searchtext)
    //removing previous search
    let delElement = document.querySelectorAll("#delete")
    delElement.forEach(element => {
        element.remove()
    });
}
const disableDiv = document.getElementById("disable-div")
const inputField = document.getElementById("search-text")
const searchClose = document.getElementById("searchClose")
const searchIcon = document.getElementById("searchIcon")
const mainSearchDiv = document.getElementById("search-div-main")

//input field focus event 
inputField.addEventListener("focus", () => {
    searchContainer()
    disableDiv.style.display = "none"
    mainSearchDiv.style.display = "block"
    searchIcon.style.display = "none"
    searchClose.style.display = "inline-block"

})
//input field o event 
inputField.addEventListener("blur", () => {
    disableDiv.style.display = "block"
    searchIcon.style.display = "inline-block"
    mainSearchDiv.style.display = "none"
    searchClose.style.display = "none"
    inputField.value = ""
    let delElement = document.querySelectorAll("#delete")
    delElement.forEach(element => {
        element.remove()
    });
    let delElement1 = document.querySelectorAll("#delete1")
    delElement1.forEach(element => {
        element.remove()
    });
})

function searchContainer() {
    let maindiv = document.getElementById("search-div-main")
    let sAcontainer = document.createElement("div")
    sAcontainer.setAttribute("class", "ps-2 flex-grow-1 flex-wrap pt-5 ps-5 pe-5")
    sAcontainer.setAttribute("id", "delete1")
    let saText = document.createElement("div")
    let text = document.createTextNode("Similar accounts")
    saText.setAttribute("class", "fs-4 qaText")
    saText.appendChild(text)
    let searchDiv = document.createElement("div")
    searchDiv.setAttribute("class", "d-flex flex-column flex-wrap search-results")
    searchDiv.setAttribute("id", "search-div")
    sAcontainer.appendChild(saText)
    sAcontainer.appendChild(searchDiv)
    maindiv.appendChild(sAcontainer)
    let qAcontainer = document.createElement("div")
    qAcontainer.setAttribute("class", "pe-5 me-5  pt-5 ps-5 pe-5    ")
    qAcontainer.setAttribute("id", "delete1")
    let qa = document.createElement("div")
    qa.setAttribute("class", "pb-4 fs-4 me-5 qaText")
    let qaText = document.createTextNode("Quick Action")
    qa.appendChild(qaText)
    let tna = document.createElement("div")
    let tnaText = document.createTextNode("Track new accounts")
    tna.setAttribute("class", "pb-4 text")
    tna.appendChild(tnaText)
    let bta = document.createElement("div")
    let btaText = document.createTextNode("Bulk track accounts")
    bta.setAttribute("class", "pb-4 text")
    bta.appendChild(btaText)
    let ma = document.createElement("div")
    let maText = document.createTextNode("Mannage accounts")
    ma.setAttribute("class", "pb-4 text")
    ma.appendChild(maText)
    qAcontainer.appendChild(qa)
    qAcontainer.appendChild(tna)
    qAcontainer.appendChild(bta)
    qAcontainer.appendChild(ma)
    maindiv.appendChild(qAcontainer)
}

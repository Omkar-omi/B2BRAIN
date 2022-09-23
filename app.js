const disableDiv = document.getElementById("disable-div");
const inputField = document.getElementById("search-text");
const searchClose = document.getElementById("searchClose");
const searchIcon = document.getElementById("searchIcon");
const mainSearchDiv = document.getElementById("search-div-main");
const sidebarContainer = document.getElementById("sidebar-container")


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
    const resopnse = await fetch(`https://staging.staging.b2brain.com/search/autocomplete_org_all/?q=${searchText}`);
    const json = await resopnse.json();
    // console.log(json);
    var obj = JSON.parse(JSON.stringify(json));

    obj.forEach(element => {
        let contDiv = document.getElementById("search-div");
        let cardDiv = document.createElement("div");
        cardDiv.setAttribute("class", "pt-3 d-flex d-inline-flex flex-columns pb-4 pe-lg-5 card-div-width");
        cardDiv.setAttribute("id", "delete");
        if (element.logo == "") {
            let imgDiv = document.createElement("div");
            imgDiv.setAttribute("class", "position-relative");
            let initial = document.createTextNode(element.company[0]);
            let initialDiv = document.createElement("div");
            initialDiv.setAttribute("class", "position-absolute  company-initial");
            initialDiv.appendChild(initial);
            imgDiv.appendChild(initialDiv);
            let companyImage = document.createElement("img");
            companyImage.style.backgroundColor = element.color;
            companyImage.setAttribute("height", "50");
            companyImage.setAttribute("width", "50");
            imgDiv.appendChild(companyImage);
            cardDiv.appendChild(imgDiv);
        } else {
            let imgDiv = document.createElement("div");
            let companyImage = document.createElement("img");
            companyImage.src = element.logo;
            companyImage.setAttribute("height", "50");
            companyImage.setAttribute("width", "50");
            imgDiv.appendChild(companyImage);
            cardDiv.appendChild(imgDiv);
        }
        let infoContainer = document.createElement("div");
        infoContainer.setAttribute("class", "ms-lg-4 ms-3 align-items-center flex-grow-1 ");
        let companyName = document.createElement("div");
        let cName = document.createTextNode(element.company);
        companyName.appendChild(cName);
        companyName.setAttribute("class", "text-wrap company-name");
        let companyWebsite = document.createElement("div");
        let website = document.createTextNode(element.website);
        companyWebsite.setAttribute("class", "website");
        companyWebsite.appendChild(website);
        infoContainer.appendChild(companyName);
        infoContainer.appendChild(companyWebsite);
        let button = document.createElement("button");
        let spinner = document.createElement("span")
        spinner.setAttribute("style", "width: 10px; height: 10px;")
        spinner.setAttribute("class", "d-none me-2 spinner-border spinner-border-sm")
        spinner.setAttribute("id", "spinner")
        button.appendChild(spinner)
        let track = document.createTextNode("Track");
        button.appendChild(track);
        button.setAttribute("class", "ps-2 pe-2 button");
        button.setAttribute("id", "track");
        cardDiv.appendChild(infoContainer);
        cardDiv.appendChild(button);
        contDiv.appendChild(cardDiv);
    });
}

document.getElementById("search-text").onchange = () => {
    let searchtext = document.getElementById("search-text").value;
    useraction(searchtext);
    //removing previous search
    let delElement = document.querySelectorAll("#delete");
    delElement.forEach(element => {
        element.remove();
    });
    disableDiv.style.display = "none";
    mainSearchDiv.style.display = "block";
    searchIcon.style.display = "none";
    searchClose.style.display = "inline-block";
}


//input field focus event 
inputField.addEventListener("focus", () => {
    disableDiv.style.display = "none";
    mainSearchDiv.style.display = "block";
    searchIcon.style.display = "none";
    searchClose.style.display = "inline-block";
    sidebarContainer.style.height = "850px"

})
inputField.addEventListener("blur", () => {
    sidebarContainer.style.height = "1420px"
})
//search close function
document.getElementById("searchClose").onclick = () => {
    disableDiv.style.display = "block";
    searchIcon.style.display = "inline-block";
    mainSearchDiv.style.display = "none";
    searchClose.style.display = "none";
    let delElement = document.querySelectorAll("#delete");
    delElement.forEach(element => {
        element.remove();
    });
    let delElement1 = document.querySelectorAll("#delete1");
    delElement1.forEach(element => {
        element.remove();
    });
    inputField.value = "";
}
document.addEventListener("click", e => {
    if (e.target && e.target.id == "track") {
        e.target.classList.add("tracking-button")
        let child = e.target.querySelector("#spinner")
        child.classList.remove("d-none")
        setTimeout(() => {
            child.classList.add("d-none")
            e.target.textContent = "Tracking"
        }, 2000)
    }
})

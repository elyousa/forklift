
const socket = io('http://localhost:7000'); // or your server URL

socket.on('forklift-update', (data) => {
    console.log("Received update from server", data);
    refreshForklifts(data);
});

//load all fork lifts when page is done loading
document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:7000/loadAllData')
        .then(response => response.json())
        .then(data => refreshForklifts(data['data']));
});

//fetches all data
function GetAllData(){
    fetch('http://localhost:7000/loadAllData')
        .then(response => response.json())
        .then(data => refreshForklifts(data['data']));
}

//refresh forklifts on dashboard
function refreshForklifts(data) {

    const container = document.getElementById("imageContainer");
    const children = container.querySelectorAll("img");

    //remove all forklifts on dashboard
    children.forEach(img => {
        if (img.id !== "mainImage") {
        container.removeChild(img);
        }
    });


    for (let liftData of data) {
        const requiredFields = ["ID", "Name", "Status", "lat", "lng"];

        if (requiredFields.some(field => liftData[field] == null)) {
            continue; //skip if any fields are null
        }
        const img = document.createElement("img");
        if (liftData.Status == "Available")
        {
            img.src = "Pictures/glift.png";
        }
        else if (liftData.Status == "Running")
        {
            img.src = "Pictures/ylift.png";
        }
        else
        {
            img.src = "Pictures/rlift.png";
        }
        img.classList.add("small-image");
        img.style.position = "absolute";
        img.style.left = `${liftData.lng}%`;
        img.style.top = `${liftData.lat}%`;
        img.style.cursor = "pointer";
        img.style.transform = "translate(-50%, -50%)";

        // Attach data as attributes
        img.setAttribute("data-id", liftData.ID);
        img.setAttribute("data-name", liftData.Name);
        img.setAttribute("data-status", liftData.Status);
        img.addEventListener("click", function () {
            handleImageClick(liftData);
        });

        container.appendChild(img);
    };

    const infocontainer = document.getElementById("forkInfo");
    infocontainer.innerHTML = ""; 
}

//when forklifts are clicked
function handleImageClick(liftData)
{
    const container = document.getElementById("forkInfo");
    container.innerHTML = ""; 

    const infoFields = [
        { label: "ID", value: liftData.ID },
        { label: "Name", value: liftData.Name },
        { label: "Status", value: liftData.Status },
        { label: "Lat", value: liftData.lat },
        { label: "Lng", value: liftData.lng }
    ];

    infoFields.forEach((field, index) => {
        const line = document.createElement("p");
        line.id = `info-${index}`;
        line.innerText = `${field.label}: ${field.value}`;
        line.style.margin = "4px 0";
        line.style.fontSize = "16px"; 
        container.appendChild(line);
    });
}



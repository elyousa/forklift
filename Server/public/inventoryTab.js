var selectedFork;

//load all forklifts when page is loaded
document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:7000/loadAllData')
        .then(response => response.json())
        .then(data => loadForkTableHTML(data['data']));
});

//add forklift
$(document).ready(function () {
    $("#newForkBtn").click(function () {
        let forkName = prompt("Enter Forklift ID:", "");
        if (forkName == null || forkName == "") {
        } else {
            fetch('http://localhost:7000/insertForklift', {
                headers: {
                    'Content-type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({ id: forkName })
            })
                .then(response => response.json())
                .then(data => insertForkIntoTable(data['data']));
        }
    })
});

//display forklift table
function loadForkTableHTML(data) {
    var groupList = "";

    for (var fork of data) {
        groupList += '<li class="list-group-item list-group-item-action" data-id="' + fork.ID + '">' +
        fork.ID + '</li>';
    }

    document.getElementById("forkListGroup").innerHTML = groupList;
}

function insertForkIntoTable(data) {
    var forkList = "";

    forkList += '<li class="list-group-item list-group-item-action" data-id=' + data.ID + '>'
    forkList += data.ID + '</li>';

    document.getElementById("forkListGroup").innerHTML += forkList;

    //reload table
    fetch('http://localhost:7000/loadAllData')
        .then(response => response.json());
}

//when forklift ID is clicked
document.getElementById("forkListGroup").addEventListener('click', function (event) {
    getForkInfo(event.target.dataset.id);
});

//when info field of forklift is clicked
document.getElementById("forkInfoGroup").addEventListener('click', function (event) {
    getMoreForkInfo(event.target.dataset.id);
});

function getForkInfo(ID) {
    fetch('http://localhost:7000/loadForkInfo/' + ID)
        .then(response => response.json())
        .then(data => showForkInfo(data['data']));
}

function getMoreForkInfo(info) {
    fetch('http://localhost:7000/loadForkInfo/' + selectedFork)
        .then(response => response.json())
        .then(data => showMoreForkInfo(data['data'], info));
}


function showForkInfo(data) {

    selectedFork = data[0].ID;
    document.getElementById("forkMoreInfo").innerHTML = "";
    document.getElementById("forkMoreInfoTitle").innerHTML = "";

    var forkInfo = "";


    forkInfo += '<li class="list-group-item list-group-item-action" id="IDText" data-id="id"> ID: &nbsp;&nbsp;' + data[0].ID + '</li>';
    forkInfo += '<li class="list-group-item list-group-item-action" id="NameText" data-id="name"> Name: &nbsp;&nbsp;' + data[0].Name + '</li>';
    forkInfo += '<li class="list-group-item list-group-item-action" id="StatusText" data-id="status"> Status: &nbsp;&nbsp;' + data[0].Status + '</li>';
    forkInfo += '<li class="list-group-item list-group-item-action" id="LatText" data-id="lat"> Lat: &nbsp;&nbsp;' + data[0].lat + '</li>';
    forkInfo += '<li class="list-group-item list-group-item-action" id="LongText" data-id="long"> Lng: &nbsp;&nbsp;' + data[0].lng + '</li>';
    forkInfo += '<li class="list-group-item list-group-item-action list-group-item-danger" id="deleteText" data-id="delete"> Delete </li>';


    document.getElementById("forkInfoGroup").innerHTML = forkInfo;
}

//show info clicked
function showMoreForkInfo(forkData, info) {
    document.getElementById("forkMoreInfoTitle").innerHTML = "";
    document.getElementById("forkMoreInfo").innerHTML = "";

    if (info == "id") {
        document.getElementById("forkMoreInfo").innerHTML = '<div class="input-group mb-3 shadow-sm"> <input type="text" class="form-control text-secondary" id="IDInput" name="ID" value="'
            + forkData[0].ID + '"> <button class="btn btn-primary" type="submit" onclick="UpdateID(' + forkData[0].ID + ')">Edit</button> </div>';

        document.getElementById("forkMoreInfoTitle").innerHTML = "ID";
    }
    else if (info == "name") {
        document.getElementById("forkMoreInfo").innerHTML = '<form action="http://localhost:7000/updateName/' + forkData[0].ID + '" method="POST" target="dummyframe">' +
            '<div class="input-group mb-3 shadow-sm"> <input type="text" class="form-control text-secondary" id="IPInput" name="name" value="'
            + forkData[0].Name + '"> <button class="btn btn-primary" type="submit" onclick="forkUpdated(2)">Edit</button> </div></form>';
        document.getElementById("forkMoreInfoTitle").innerHTML = "Name";
    }
    else if (info == "status") {
        document.getElementById("forkMoreInfo").innerHTML = '<form action="http://localhost:7000/updateStatus/' + forkData[0].ID + '" method="POST" target="dummyframe">' +
            '<div class="input-group mb-3 shadow-sm"> <select class="form-select" id="StatusInput" name="status">' +
            '<option value="Available">Available</option>' +
            '<option value="Running">Running</option>' +
            '<option value="Maint">Maint</option>' +
            '</select>'
            + '<button class="btn btn-primary" type="submit" onclick="forkUpdated(3)">Set</button> </div></form>'
        document.getElementById("forkMoreInfoTitle").innerHTML = "Status";
    }
    else if (info == "lat") {
        document.getElementById("forkMoreInfo").innerHTML = '<form action="http://localhost:7000/updateLat/' + forkData[0].ID + '" method="POST" target="dummyframe">' +
            '<div class="input-group mb-3 shadow-sm"> <input type="text" class="form-control text-secondary" id="LatInput" name="lat" value="'
            + forkData[0].lat + '"> <button class="btn btn-primary" type="submit" onclick="forkUpdated(4)">Edit</button> </div></form>';
        document.getElementById("forkMoreInfoTitle").innerHTML = "Lat";
    }
    else if (info == "long") {
        document.getElementById("forkMoreInfo").innerHTML = '<form action="http://localhost:7000/updateLng/' + forkData[0].ID + '" method="POST" target="dummyframe">' +
            '<div class="input-group mb-3 shadow-sm"> <input type="text" class="form-control text-secondary" id="LongInput" name="lng" value="'
            + forkData[0].lng + '"> <button class="btn btn-primary" type="submit" onclick="forkUpdated(5)">Edit</button> </div></form>';
        document.getElementById("forkMoreInfoTitle").innerHTML = "Lng";
    }
    else if (info == "delete") {
        document.getElementById("forkMoreInfo").innerHTML = "";
        var result = confirm("Are you sure you want to delete " + forkData[0].ID + "?");
        if (result) {
            deleteFork();
        }
    }
}

async function deleteFork() {
    var deleteFork = new Promise((resolve, reject) => {
        fetch('http://localhost:7000/deleteForklift', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                id: selectedFork,
            })
        })
            .then(response => response.json())
            .then(data => resolve(data['data']));
    });

    await deleteFork;

    fetch('http://localhost:7000/loadAllData')
        .then(response => response.json())
        .then(data => reloadForkTableHTML(data['data']));
}

function reloadForkTableHTML(data) {
    var groupList = "";

    for (var fork of data) {
        groupList += '<li class="list-group-item list-group-item-action" data-id="' + fork.ID + '">' +
        fork.ID + '</li>';
    }

    document.getElementById("forkListGroup").innerHTML = groupList;

    document.getElementById("forkInfoGroup").innerHTML = "";
    document.getElementById("forkMoreInfo").innerHTML = "";
    document.getElementById("forkMoreInfoTitle").innerHTML = "";

}


async function UpdateID(originalID) {
    const newID = document.getElementById('IDInput').value;

    var UpdateID = new Promise((resolve, reject) => {
        fetch('http://localhost:7000/updateID/'+ originalID , {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                ID: newID,
            })
        })
            .then(response => response.json())
            .then(data => resolve(data['data']));
    });

    await UpdateID;

    fetch('http://localhost:7000/loadAllData')
        .then(response => response.json())
        .then(data => reloadForkTableHTML(data['data']));

    //update info on inventory tab
    forkUpdated(1);
}

function forkUpdated(mesgNum) {
    if (mesgNum == 1) {
        document.getElementById("IDText").innerHTML = "ID: &nbsp;&nbsp;" + document.getElementById("IDInput").value;
    }
    else if (mesgNum == 2) {
        document.getElementById("NameText").innerHTML = "Name: &nbsp;&nbsp;" + document.getElementById("IPInput").value;
    }
    else if (mesgNum == 3) {
        document.getElementById("StatusText").innerHTML = "Status: &nbsp;&nbsp;" + document.getElementById("StatusInput").value;
    }
    else if (mesgNum == 4) {
        document.getElementById("LatText").innerHTML = "Lat: &nbsp;&nbsp;" + document.getElementById("LatInput").value;
    }
    else if (mesgNum == 5) {
        document.getElementById("LongText").innerHTML = "Lng: &nbsp;&nbsp;" + document.getElementById("LongInput").value;
    }
}








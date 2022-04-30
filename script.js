var url = 'https://adminpaneldata-edyoda-sourav.herokuapp.com/admin/data';
var userData = [];
let tableData = document.getElementById("table-data");
let table = document.createElement("table");
tableData.append(table);
var infoContent = document.getElementById("info-content");

$.get(url, function (res) {
    var searchInput = document.getElementById("search-box");
    searchInput.oninput = () => {
        var searchedData = res.filter((item) => {
            if(item.firstName.toLowerCase().includes(searchInput.value.toLowerCase()) || item.lastName.toLowerCase().includes(searchInput.value.toLowerCase()) || item.email.toLowerCase().includes(searchInput.value.toLowerCase())){
                return item;
            }
        })
        table.innerHTML = "";
        searchedData.forEach((item, i) => {
            table.innerHTML += ` <tr id = "${item.id}" onclick = "showDetails(${item.id})" class = 'table-row ${i == 0 ? "active" : ""}'>
            <td class="column1">${item.id}</td>
            <td class="column2">${item.firstName}</td>
            <td class="column3">${item.lastName}</td>
            <td class="column4">${item.email}</td>
            <td class="column5">${item.phone}</td>
            </tr>`
        })
    if(searchedData.length == 0){
        $("#info-content").css("display", "none");  
    }else{
        $("#info-content").css("display", "block"); 
        infoContent.innerHTML = `
            <div><b>User selected : </b>${searchedData[0].firstName} ${searchedData[0].lastName}</div>
            <div>
                <b>Description: </b>
                <textarea cols="50" rows="5" readonly>${searchedData[0].description}</textarea>
            </div>
            <div><b>Address : </b>${searchedData[0].address.streetAddress}</div>
            <div><b>City : </b>${searchedData[0].address.city}</div>
            <div><b>State : </b>${searchedData[0].address.state}</div>
            <div><b>Zip : </b>${searchedData[0].address.zip}</div>`;
        }
    }
    res.forEach((users, i) => {
        userData.push(users, i);
        table.innerHTML += ` <tr id = "${users.id}" onclick = "showDetails(${users.id})" class = 'table-row ${i == 0 ? "active" : ""}'>
        <td class="column1">${users.id}</td>
        <td class="column2">${users.firstName}</td>
        <td class="column3">${users.lastName}</td>
        <td class="column4">${users.email}</td>
        <td class="column5">${users.phone}</td>
        </tr>`
        if(i == 0){
            $("#info-content").css("display", "block"); 
            infoContent.innerHTML = `
                <div><b>User selected : </b>${users.firstName} ${users.lastName}</div>
                <div>
                    <b>Description: </b>
                    <textarea cols="50" rows="5" readonly>${users.description}</textarea>
                </div>
                <div><b>Address : </b>${users.address.streetAddress}</div>
                <div><b>City : </b>${users.address.city}</div>
                <div><b>State : </b>${users.address.state}</div>
                <div><b>Zip : </b>${users.address.zip}</div>
            `;
        }
        })
    })
function showDetails(id) {
    var selectedRow = document.getElementsByClassName("active")[0];
    if(selectedRow){
        selectedRow.classList.remove("active");
    }
    var clickedRow = document.getElementById(id);
    clickedRow.classList.add("active");
    var selectedRowDetails = userData.filter((item) => {
        if (item.id == id) {
            return item;
        }
    })
    $("#info-content").css("display", "block"); 
    infoContent.innerHTML = `
        <div><b>User selected : </b>${selectedRowDetails[0].firstName} ${selectedRowDetails[0].lastName}</div>
        <div>
            <b>Description: </b>
            <textarea cols="50" rows="5" readonly>${selectedRowDetails[0].description}</textarea>
        </div>
        <div><b>Address : </b>${selectedRowDetails[0].address.streetAddress}</div>
        <div><b>City : </b>${selectedRowDetails[0].address.city}</div>
        <div><b>State : </b>${selectedRowDetails[0].address.state}</div>
        <div><b>Zip : </b>${selectedRowDetails[0].address.zip}</div>`;
}

// Citation for the following function:
// Date: 03/07/2024
// Based on: CS 340 starter code 'Step 8 Dynamically Updating Data'
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app


let updateServiceDuringVisitForm = document.getElementById('update-service-during-visit-form-ajax');

// Execute when form is submitted 
updateServiceDuringVisitForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting automatically
    e.preventDefault();

    //Get the id that represents the data we wish to update and values that are to be updated from form fields 
    //and save it into an object
    let selectServiceDuringVisitId = document.getElementById("select-service-during-visit-id");
    let updateVisitId = document.getElementById("update-visit-id");
    let updateServiceId = document.getElementById("update-service-id");

    let serviceDuringVisitIdValue = selectServiceDuringVisitId.value;
    let visitIdValue = updateVisitId.value;
    let serviceIdValue = updateServiceId.value;

    let data = {
        service_during_visit_id: serviceDuringVisitIdValue,
        visit_id: visitIdValue,
        service_id: serviceIdValue,
    }

    //Initialize AJAX request to receive data
    // Upon receiving data, we update row to table, clear input fields, and send data
    // Handles errors if AJAX not set up correctly or invalid inputs
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-service-during-visit-form-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // update new data to the table
            updateRow(xhttp.response, serviceDuringVisitIdValue);

            selectServiceDuringVisitId.value = '';
            updateVisitId.value = '';
            updateServiceId.value = '';

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    xhttp.send(JSON.stringify(data));

})

//Finds table and iterates through the rows until the row's unique value is equivalent to the provided row id
//Once row is found, iterate through cells and update with new data
function updateRow(data, serviceDuringVisitID) {
    let parsedData = JSON.parse(data);

    let table = document.getElementById("services-during-visit-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == serviceDuringVisitID) {

            let updateRowIndex = table.getElementsByTagName("tr")[i];
            let visit_id_td = updateRowIndex.getElementsByTagName("td")[1];
            let service_id_td = updateRowIndex.getElementsByTagName("td")[2];

            //update cells with new data values
            visit_id_td.innerHTML = parsedData[0].visit_date + ' ' + parsedData[0].pet_name;
            service_id_td.innerHTML = parsedData[0].service_name;
        }
    }
}
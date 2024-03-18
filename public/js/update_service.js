// Citation for the following function:
// Date: 03/07/2024
// Based on: CS 340 starter code 'Step 8 Dynamically Updating Data'
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app


let updateServiceForm = document.getElementById('update-service-form-ajax');

// Execute when form is submitted 
updateServiceForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting automatically
    e.preventDefault();

    //Get the id that represents the data we wish to update and values that are to be updated from form fields 
    //and save it into an object
    let selectServiceId = document.getElementById("select-service-id");
    let updateServiceName = document.getElementById("update-service-name");
    let updateServiceCost = document.getElementById("update-service-cost");
    let updateServiceDescription = document.getElementById("update-service-description");


    let serviceIdValue = selectServiceId.value;
    let serviceNameValue = updateServiceName.value;
    let serviceCostValue = updateServiceCost.value;
    let serviceDescriptionValue = updateServiceDescription.value;
    
    let data = {
        service_id: serviceIdValue,
        service_name: serviceNameValue,
        service_cost: serviceCostValue,
        service_description:serviceDescriptionValue,
    }

    //Initialize AJAX request to receive data
    // Upon receiving data, we update row to table, clear input fields, and send data
    // Handles errors if AJAX not set up correctly or invalid inputs
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-service-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");


    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // update new data to the table
            updateRow(xhttp.response, serviceIdValue);

            selectServiceId.value = '';
            updateServiceName.value = '';
            updateServiceCost.value = '';
            updateServiceDescription.value = '';

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    xhttp.send(JSON.stringify(data));

})

//Finds table and iterates through the rows until the row's unique value is equivalent to the provided row id
//Once row is found, iterate through cells and update with new data
function updateRow(data, serviceID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("services-table");

    for (let i = 0, row; row = table.rows[i]; i++) {

       if (table.rows[i].getAttribute("data-value") == serviceID) {

            let updateRowIndex = table.getElementsByTagName("tr")[i];
            let service_name_td = updateRowIndex.getElementsByTagName("td")[1];
            let service_cost_td = updateRowIndex.getElementsByTagName("td")[2];
            let service_description_td = updateRowIndex.getElementsByTagName("td")[3];

            //update cells with new data values
            service_name_td.innerHTML = parsedData[0].service_name; 
            service_cost_td.innerHTML = parsedData[0].service_cost; 
            service_description_td.innerHTML = parsedData[0].service_description; 
       }
    }
}
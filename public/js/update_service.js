// Citation for the following function:
// Date: 03/07/2024
// Based on: CS 340 starter code 'Step 8 Dynamically Updating Data'
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let updateServiceForm = document.getElementById('update-service-form-ajax');

// Modify the objects we need
updateServiceForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();
    // Get form fields we need to get data from
    let selectServiceId = document.getElementById("select-service-id");
    let updateServiceName = document.getElementById("update-service-name");
    let updateServiceCost = document.getElementById("update-service-cost");
    let updateServiceDescription = document.getElementById("update-service-description");

    // Get the values from the form fields
    let serviceIdValue = selectServiceId.value;
    let serviceNameValue = updateServiceName.value;
    let serviceCostValue = updateServiceCost.value;
    let serviceDescriptionValue = updateServiceDescription.value;
    


    // Put our data we want to send in a javascript object
    let data = {
        service_id: serviceIdValue,
        service_name: serviceNameValue,
        service_cost: serviceCostValue,
        service_description:serviceDescriptionValue,
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-service-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, serviceIdValue);

            // Clear the input fields for another transaction
            selectServiceId.value = 'Select';
            updateServiceName.value = '';
            updateServiceCost.value = '';
            updateServiceDescription.value = '';

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, serviceID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("services-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == serviceID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of parent_id value
            let service_name_td = updateRowIndex.getElementsByTagName("td")[1];

            let service_cost_td = updateRowIndex.getElementsByTagName("td")[2];

            // Get td of breed value
            let service_description_td = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign homeworld to our value we updated to
            service_name_td.innerHTML = parsedData[0].service_name; 
            service_cost_td.innerHTML = parsedData[0].service_cost; 
            service_description_td.innerHTML = parsedData[0].service_description; 
       }
    }
}
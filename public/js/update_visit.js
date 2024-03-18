// Citation for the following function:
// Date: 03/07/2024
// Based on: CS 340 starter code 'Step 8 Dynamically Updating Data'
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app


let updateVisitForm = document.getElementById('update-visit-form-ajax');

// Execute when form is submitted 
updateVisitForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting automatically
    e.preventDefault();

    //Get the id that represents the data we wish to update and values that are to be updated from form fields 
    //and save it into an object
    let selectVisitId = document.getElementById("select-visit-id");
    let updatePetId = document.getElementById("update-pet-id");
    let updateVisitDate = document.getElementById("update-visit-date");
    let updateVisitCost = document.getElementById("update-visit-cost");

    let visitIdValue = selectVisitId.value;
    let petIdValue = updatePetId.value;
    let visitDateValue = updateVisitDate.value;
    let visitCostValue = updateVisitCost.value;
    
    let data = {
        visit_id: visitIdValue,
        pet_id: petIdValue,
        visit_date: visitDateValue,
        visit_cost:visitCostValue,
    }

    //Initialize AJAX request to receive data
    // Upon receiving data, we update row to table, clear input fields, and send data
    // Handles errors if AJAX not set up correctly or invalid inputs
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-visit-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");


    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // update new data to the table
            updateRow(xhttp.response, visitIdValue);

            selectVisitId.value = 'Select';
            updatePetId.value = 'Select';
            updateVisitDate = '';
            updateVisitCost = '';

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    xhttp.send(JSON.stringify(data));

})

//Finds table and iterates through the rows until the row's unique value is equivalent to the provided row id
//Once row is found, iterate through cells and update with new data
function updateRow(data, visitID){
    let parsedData = JSON.parse(data);
    let table = document.getElementById("visits-table");
    
    for (let i = 0, row; row = table.rows[i]; i++) {
       if (table.rows[i].getAttribute("data-value") == visitID) {

            let updateRowIndex = table.getElementsByTagName("tr")[i];
            let pet_id_td = updateRowIndex.getElementsByTagName("td")[1];
            let visit_date_td = updateRowIndex.getElementsByTagName("td")[2];
            let visit_cost_td = updateRowIndex.getElementsByTagName("td")[3];

            //update cells with new data values
            pet_id_td.innerHTML = parsedData[0].pet_id; 
            visit_date_td.innerHTML = parsedData[0].visit_date; 
            visit_cost_td.innerHTML = parsedData[0].visit_cost; 
       }
    }
}
/**
 * Created by Computer on 2/24/2017.
 */


/**
 * Will handle information recieved from the user and through ajax and
 * send inputs to other functions for validation or displaying for the user
 */
function pageHandler(event) {
    event.preventDefault();
    //perform ajax to get the data from the openstates api
    resetErrors();
    var state = $("#state").val();
    $.ajax({
        url: "https://openstates.org/api/v1/legislators/?state=" + state,
        success: function(response) {
            displayData(response);
        },
        error: function(){
            //display an error saying their was an issue
            $("#error")
                .attr("hidden", false)
                .html("There was an error");
        }
    });

}

/**
 * Will confirm the state entered is valid and activate the submit button or
 * else provide an error for the user
 */
function verifyState () {
    resetErrors();
    var userState = $('#state').val().toUpperCase();
    var validState = false;
    var stateAbbreviations = ["DC","AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA",
        "ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK",
        "OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];
    //loop through each state and compare to see if it matches the users state
    $(stateAbbreviations).each(function(index) {
        if (stateAbbreviations[index] == userState){
            validState = true;
            return validState;
        }
    });
    if (!validState){
        showErrors();
    }
}

/**
 * Will find take the state data and create modify the index page to create a bootstrap table
 */
function displayData (response){
    var cleanedResponse = organizeResponse(response);

    $(cleanedResponse).each(function(index){
        //create a row to append to the table
        var row = $("<tr></tr>");
        var singleLegislator = cleanedResponse[index];
        $.each(singleLegislator, function(key, value){
            row.append("<td>" + singleLegislator[key] + "</td>");
            $("thead").append(row);
        });
    });
}
/**
 *  sorts through the response and parses it down to an array with only the data needed
 *  for each legislator
 */

function organizeResponse (response){
    var cleanedResponseCollection = [];
    $(response).each(function(index) {
        //organize all of the data we are adding to the table into an object
        var dataObject = {};
        dataObject.image = response[index].photo_url;
        dataObject.name = response[index].full_name;
        dataObject.district = response[index].district;
        dataObject.chamer = response[index].chamber;
        dataObject.phoneNumber = response[index].office_phone;
        dataObject.email = response[index].email;
        cleanedResponseCollection.push(dataObject);
    });
    return cleanedResponseCollection;
}

/**
 * resets errors on the screen
 */
function resetErrors (){
    $("#error")
        .attr("hidden", true)
        .html("");
    $('[value="submit"]')
        .prop("disabled", false);
}

function showErrors (){
    $("#error")
        .attr("hidden", false)
        .html("Please enter a valid state");
    $('[value="submit"]')
        .prop("disabled", true);
}
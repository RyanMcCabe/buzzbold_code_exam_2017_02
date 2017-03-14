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
            console.log(response);
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
    console.log(response)
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
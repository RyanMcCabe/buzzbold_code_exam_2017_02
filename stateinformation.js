/**
 * Created by Computer on 2/24/2017.
 */

//code to make sure page has loaded before allowing access
$(document).ready(function () {
    $("#form-state-request").submit()
});

/**
 * Will handle information recieved from the user and through ajax and
 * send inputs to other functions for validation or displaying for the user
 */
function pageHandler(event) {
    //make sure page doesn't reload and reset errors on page every attempt
    event.preventDefault();
    resetErrors();

    //validate if the state provided is correct and use act accordingly


}

/**
 * Will confirm the state entered is valid and activate the submit button or
 * else provide an error for the user
 */
function verifyState () {
    event.preventDefault();
    var userState = $('[name="state"]').val.toUpperCase();
    console.log(userState);
    var validState = false;
    var stateAbbreviations = ["DC","AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA",
        "ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK",
        "OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];
    $.each(stateAbbreviations), function(state) {
        if (state == userState){
            validState = true;
            $('[type="submit"]').prop("disabled", false)
        } else {
            $("#error")
                .attr("hidden", false)
                .html("This is not a valid state");
        }
    };
    return validState;
}
/**
 * Will find take the state data and create modify the index page to create a bootstrap table
 */
function displayData (){

}

function resetErrors (){
    $("#error")
        .attr("hidden", true)
        .html("");
}
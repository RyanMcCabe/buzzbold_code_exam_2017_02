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
    event.preventDefault();


}

/**
 * Will confirm the state entered is valid and activate the submit button or
 * else provide an error for the user
 */
function verifyState () {

}
/**
 * Will find take the state data and create modify the index page to create a bootstrap table
 */
function displayData (){

}
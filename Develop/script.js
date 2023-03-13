// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

    // function to save the user input to local storage
    function saveInput() {
      // get the id of the time block that was clicked
      var timeBlockId = $(this).parent().attr("id");
      // get the user input from the textarea element
      var userInput = $(this).siblings("textarea").val();
      // save the user input to local storage
      localStorage.setItem(timeBlockId, userInput);
    }
    // add a click event listener to the save button
    $(".saveBtn").on("click", saveInput);
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

    // function to add the past, present, or future class to each time block
    function addClass() {
      // get the current hour
      var currentHour = parseInt(dayjs().hour());
      // loop through each time block
      $(".time-block").each(function () {
        // set the time block id to an integer value of the id attribute of the time block element that was clicked on (this) and save it to a variable called timeBlockId
        var timeBlockId = parseInt(($(this).attr("id")).split("-")[1])
        console.log(timeBlockId, currentHour);
        // if the time block id is less than the current hour, add the past class and remove the present and future classes if they exist
        if (timeBlockId < currentHour) {
          $(this).addClass("past");
          $(this).removeClass("present");
          $(this).removeClass("future");
          // if the time block id is equal to the current hour, add the present class and remove the past and future classes if they exist
        } else if (timeBlockId === currentHour) {
          $(this).addClass("present");
          $(this).removeClass("past");
          $(this).removeClass("future");
          // if the time block id is greater than the current hour, add the future class and remove the past and present classes if they exist
        } else {
          $(this).addClass("future");
          $(this).removeClass("past");
          $(this).removeClass("present");
        }
      });
    }
    // call the addClass function
    addClass();
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  function getInput() {
    // loop through each time block
    $(".time-block").each(function () {
      // get the id of the time block
      var timeBlockId = $(this).attr("id");
      // get the user input from local storage
      var userInput = localStorage.getItem(timeBlockId);
      // set the value of the textarea element to user input
      $(this).children("textarea").val(userInput);
    });
  }
  // call getInput function
  getInput();
});
  //
  // TODO: Add code to display the current date in the header of the page.
  $("#currentDay").text(dayjs().format("dddd, MMMM D"));


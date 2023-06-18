function getDate(date) {
  const year = date.getFullYear();
  var month = date.getMonth() + 1;
  if(month<10)
  {
      month="0"+month;
  }

  var day = date.getDate();
  if(day<10) {
      day="0"+day;
  }

  date=year+'-'+month+'-'+day;
  return date;
}

var problems_date = document.getElementById("given_date").dataset.problems_date;
var today_date = new Date();
today_date=getDate(today_date);
console.log("today_date: ", today_date);
console.log("problems_date: ", problems_date);


if(today_date !=problems_date) {
  $("#add_problem").prop('disabled', true);
}


$(document).ready( function() {
  if( problems_date!=today_date ){
    return;
  }
    $("tr").dblclick(function(event) 
    {
        const elementId = event.currentTarget.id;
        console.log(event.currentTarget);
        console.log(elementId, "double clicked");
        $.ajax({
            url: "./deleteProblem",
            method: "POST",
            data: {
              id: elementId
            },
            success: function(data) {
                // Update the DOM with the response data
                location.reload();


              },
            error: function(error) {
              console.log(error);
            }
          });
      });

     $("select").change(function(event) {
        console.log("event.currentTarget: ", event.currentTarget);
        const elementId=event.currentTarget.id.substring(7);
        console.log("select changed: ", elementId);
        console.log("value:", event.currentTarget.value);
        $.ajax({
            url: "./updateProblem",
            method: "POST",
            data: {
              id: elementId,
              status: event.currentTarget.value
            },
            success: function(data) {
                // Update the DOM with the response data
                console.log("update successful");
                location.reload();
              },
            error: function(error) {
              console.log(error);
            }
          });
      });

     

  });
const selectElements = document.getElementsByTagName("select");
  console.log(selectElements);
 for (const selectElement of selectElements) {
    console.log(selectElement);
    // Select the option at the index of `selectedIndex`.
    var value=selectElement.dataset.value;
    console.log("value: ", value);
 if(value=="Accepted") {
    selectElement.options[0].selected=true;
 selectElement.style.backgroundColor = "lightgreen";

 }
 else if(value=="Seen") {
    selectElement.options[1].selected=true;
 selectElement.style.backgroundColor = "lightyellow";

 }
 else
 {
    selectElement.options[2].selected=true;
 }
 }

 $('select').change(
    function(event) {
        console.log("event.currentTarget: ", event.currentTarget);
        const value=event.currentTarget.value;

    if(value=="Accepted") {
    event.currentTarget.style.backgroundColor = "lightgreen";
    }
    else if(value=="Seen") {
   event.currentTarget.style.backgroundColor = "lightyellow";
    }
    }
 );



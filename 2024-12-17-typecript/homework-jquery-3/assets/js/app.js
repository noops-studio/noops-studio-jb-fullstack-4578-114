$(function () {
    $("#myform").submit(function (event) {
      event.preventDefault();
      const start = $("#start").val();
      const end = $("#end").val();
  
      for (let i = start; i <= end; i++) {
        $('#myselect').append(`<option value="${i}">${i}</option>`);  
      }
  
      console.log(start, end);
    });
  });
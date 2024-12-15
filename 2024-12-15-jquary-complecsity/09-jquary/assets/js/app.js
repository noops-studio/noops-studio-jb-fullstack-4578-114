$(() => {
  $("#button").css("color", "red");
  $("#button").click(function (event) {
    $(this).css("color", "blue");
    $(this).fadeOut(2000).fadeIn(2000);
    $(this).addClass("tamir");
    $("div").each(function () {
      $(this).css("background-color", "green");
    });
  });
  $.getJSON("https://jsonplaceholder.typicode.com/todos", data,
    function (data) {
        console.log(data);
    }
  );
});

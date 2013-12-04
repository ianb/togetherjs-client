window.TogetherJSConfig = {

  on_ready: function () {
    $("#session-id").val(TogetherJS.require("session").shareId);
    TogetherJS.send({
      type: "browser-hello"
    });
  },

  hub: {
    "browse": function (msg) {
      $("#file-list").empty();
      var tmpl = $("#file-template").clone();
      tmpl.attr("id", null);
      var sessionId = TogetherJS.require("session").shareId;
      msg.files.forEach(function (file) {
        var href = file.href + "#&togetherjs=" + sessionId;
        var item = tmpl.clone();
        var name = href.replace(/#.*/, "");
        name = name.replace(/[^a-zA-Z0-9_.]/g, "");
        item.find(".file").attr("href", href);
        item.find(".file").text(file.filename);
        //item.find(".fint").attr("target", name);
        $("#file-list").append(item);
      });
    },

    "hello": function (msg) {
      TogetherJS.send({type: "browser-hello"});
    }
  },

  autoStart: true,
  suppressJoinConfirmation: true

};


$(function () {

  $("#session-form").on("submit", function () {
    var href = location.href + "";
    href = href.replace(/#.*/, "");
    href += "#&togetherjs=" + $("#session-id").val();
    location.href = href;
    return false;
  });

});

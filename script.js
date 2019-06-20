function submit() {
  var input = document.getElementById("fixtures").value;
  var lines = input.split("\n");
  var output = "";
  let i = 0;
  while (i < lines.length) {
    var t = moment(lines[i], "dddd Do MMMM");
    if (t.isValid()) {
      if (lines[i].indexOf(":") >= 0) {
        var home = lines[i - 1];
        var away = lines[i + 1];
        var s = home + " v " + away + "\n";
        output += s;
        i += 1;
        continue;
      }
      if (i > 0) {
        output += "\n";
      }
      i += 1;
      output += t.format("DD/MM/YYYY") + "\n";
      continue;
    }
    i += 1;
  }

  document.getElementById("fixtures").value = output;
}

(function go() {
  document.getElementById("submit").addEventListener("click", submit);
})();

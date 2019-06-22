import "core-js/stable";
import { format } from "./formatter.js";

const submit = () => {
  const textarea = document.getElementById("fixtures");
  textarea.value = format(textarea.value);
  textarea.select();
  document.execCommand("copy");
};

(() => {
  document.getElementById("submit").addEventListener("click", submit);
})();

import moment from "moment";

export const format = input => {
  const lines = input.split("\n");
  return lines.reduce((output, line, i) => {
    const t = moment(line, "dddd Do MMMM");
    if (!t.isValid()) {
      return output;
    }

    if (line.indexOf(":") === -1) {
      return `${output}${i > 0 ? "\n" : ""}${t.format("DD/MM/YYYY")}\n`;
    }

    return `${output}${lines[i - 1]} v ${lines[i + 1]}\n`;
  }, "");
};

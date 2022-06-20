export function format(command, value) {
  document.execCommand(command, false, value);
}

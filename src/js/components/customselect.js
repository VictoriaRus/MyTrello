export function CustomSelect(options) {
  let elem = options.elem;

  elem.onclick = function (event) {
    if (event.target.className == "title-select") {
      toggle();
    } else if (event.target.tagName == "LI") {
      setValue(event.target.innerHTML, event.target.dataset.value);
      close();
    }
  }

  let isOpen = false;

  function onDocumentClick(event) {
    if (!elem.contains(event.target)) close();
  }

  function setValue(title, value) {
    elem.querySelector(".title-select").innerHTML = title;

    const widgetEvent = new CustomEvent("select", {
      bubbles: true,
      detail: {
        title: title,
        value: value
      }
    });

    elem.dispatchEvent(widgetEvent);
  }

  function toggle() {
    if (isOpen) close()
    else open();
  }

  function open() {
    elem.classList.add("open");
    document.addEventListener("click", onDocumentClick);
    isOpen = true;
  }

  function close() {
    elem.classList.remove("open");
    document.removeEventListener("click", onDocumentClick);
    isOpen = false;
  }

}
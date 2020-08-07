const action = document.querySelector(".title-content-span.action");

const setAction = (data) => {
  const ok = document.querySelector(".btn-ctn.green");
  const toCheck = document.querySelector(".btn-ctn.yellow");
  const notOk = document.querySelector(".btn-ctn.red");

  ok.addEventListener("click", (e) => {
    action.innerHTML = "&nbspOK";
    action.style.setProperty("color", "#04647e");
    data[action.dataset.value].Action = "OK";
    e.stopPropagation();
    // console.log(action.dataset.value);
    // console.log(data[action.dataset.value]);
  });

  notOk.addEventListener("click", (e) => {
    action.innerHTML = "&nbspNOT OK";
    action.style.setProperty("color", "rgb(255, 80, 0)");
    data[action.dataset.value].Action = "NOT OK";
    e.stopPropagation();
    // console.log(action.dataset.value);
    // console.log(data[action.dataset.value]);
  });

  toCheck.addEventListener("click", (e) => {
    action.innerHTML = "&nbspTO CHECK";
    action.style.setProperty("color", "#faa307");
    data[action.dataset.value].Action = "TO CHECK";
    e.stopPropagation();
    // console.log(action.dataset.value);
    // console.log(data[action.dataset.value]);
  });
};

export { setAction };

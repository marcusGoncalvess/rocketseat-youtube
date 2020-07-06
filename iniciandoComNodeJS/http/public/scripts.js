const ul = document.querySelector("ul");
const input = document.querySelector("input");
const form = document.querySelector("form");

async function load() {
  const res = await fetch("http://localhost:3000/").then((data) => data.json());

  res.urls.map(({ name, url }) =>
    addElement({ name, url }, (useFetch = false))
  );
}

load();

function addElement({ name, url }, useFetch = true) {
  if (useFetch) {
    fetch(`http://localhost:3000/?name=${name}&url=${url}`);
  }

  const li = document.createElement("li");
  const a = document.createElement("a");
  const trash = document.createElement("span");

  a.href = url;
  a.innerHTML = name;
  a.target = "_blank";

  trash.innerHTML = "x";
  trash.id = url;
  trash.onclick = () => removeElement(trash,trash.id);

  li.append(a);
  li.append(trash);
  ul.append(li);
}

function removeElement(el,url) {
  if (confirm("Tem certeza que deseja deletar?")) el.parentNode.remove();
  fetch(
    `http://localhost:3000/?name=Rocketseat&url=${url}&del=1`
  );
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let { value } = input;

  if (!value) return alert("Preencha o campo");

  const [name, url] = value.split(",");

  if (!url) return alert("formate o texto da maneira correta");

  if (!/^http/.test(url)) return alert("Digite a url da maneira correta");

  addElement({ name, url });

  input.value = "";
});

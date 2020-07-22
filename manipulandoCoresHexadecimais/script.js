let colorSelected = document.querySelector("input[name=color]");
let currentColorDiv = document.querySelector(".current-color");
let range = document.querySelector("input[type=range]");
let newValue = document.querySelector("input[name=newValue]");
let color;
let currentColor;

colorSelected.addEventListener("keyup", (e) => {
  color = e.target.value;
  currentColorDiv.style.backgroundColor = e.target.value;

  const isValidHex = color.length === 7 || color.length === 4;
  if (isValidHex) {
    currentColor = color;
  }
});

range.addEventListener("change", (e) => {
  let colorChanged = lumiance(currentColor, e.target.value);
  currentColorDiv.style.backgroundColor = colorChanged;
  newValue.value = colorChanged;
});

// logica para converter o hex em cor mais clara ou mais escura
// eu aceito hex decimal com 3 ou 6 digitos
function lumiance(hex, luminosity = 0) {
  // hexadecimal é um valor que vai de 0 até F
  // contém 16 digitos
  // 0 = black
  // f = white

  // procurar tudo que não for de 0-9 e de a-f e substituir por ""
  // g = pode verficiar todo o texto passado
  // i = não importa se estiver maiusculo ou minisculo
  hex = hex.replace(/[^0-9a-f]/gi, "");
  const isValidHex = hex.length === 6 || hex.length === 3;
  if (!isValidHex) throw new Error("Invalid HEX");

  // se for 3 digitos, transformar para 6 digitos
  if (hex.length === 3) {
    // o [0] que é usado para array pode ser usado para strings também
    // para pegar o caractere que tem na posição desejada
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  // aplicar uma formula matematica para aumentar ou diminuir a luminosidade
  // preciso transformar o hex em rgb

  // encontre de 0-9 e de a-f mas separada em grupos de 2
  const twoDigitGroup = hex.match(/([0-9a-f]){2}/gi);

  let newHex = "#";
  for (let twoDigit of twoDigitGroup) {
    // parseInt(var, 10||16||2)
    // 10 = transforma de decimal
    // 16 = transforma de hexadecimal para decimal
    // 2 = transforma de binario em número decimal

    const numberFromHex = parseInt(twoDigit, 16);
    const calculateLuminosity = numberFromHex + luminosity * 255;
    // limitando o resultado a 0 e 255
    const blackOrLuminosity = Math.max(0, calculateLuminosity);
    const partialColor = Math.min(255, blackOrLuminosity);
    // impedir que o número venha quebrado
    const newColor = Math.round(partialColor);
    // converter de volta para hex
    const numberToHex = newColor.toString(16);
    const finalHex = `0${numberToHex}`.slice(-2);

    newHex = newHex + finalHex;
  }

  return newHex;
}

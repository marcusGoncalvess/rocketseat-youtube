const fields = document.querySelectorAll("[required]");

for (field of fields) {
  field.addEventListener("invalid", (event) => {
    // Eliminar o buble
    event.preventDefault();
    customValidation(event);
  });
  field.addEventListener("blur", customValidation);
}

function ValidateField(field) {
  // Logica para verificar se existem erros
  function verifyErrors() {
    let foundError = false;

    for (let error in field.validity) {
      if (field.validity[error] && !field.validity.valid) {
        foundError = error;
      }
    }

    return foundError;
  }

  function setCustomMessage(message) {
    const spanError = field.parentNode.querySelector("span.error");
    if (message) {
      spanError.classList.add("active");
      spanError.innerHTML = message;
    } else {
      spanError.classList.remove("active");
      spanError.innerHTML = "";
    }
  }

  function customMessage(typeError) {
    const messages = {
      text: {
        valueMissing: "Por favor, preencha este campo",
      },
      email: {
        valueMissing: "Email é obrigatório",
        typeMismatch: "Por favor, preencha um email válido",
      },
    };
    return messages[field.type][typeError];
  }

  return function () {
    const error = verifyErrors();
    if (error) {
      const message = customMessage(error);
      field.style.borderColor = "red";
      setCustomMessage(message);
    } else {
      field.style.borderColor = "green";
      setCustomMessage();
    }
  };
}

function customValidation(event) {
  const field = event.target;
  const validation = ValidateField(field);
  validation();
  // Trocar mensagem do required
  /*if (error) {
    field.setCustomValidity("Esse campo é obrigatório");
  } else {
    field.setCustomValidity("");
  }*/
}

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
});

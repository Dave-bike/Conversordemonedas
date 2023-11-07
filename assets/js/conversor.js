async function get_data() {
  try {
    let url = "https://mindicador.cl/api/";
    response = await fetch(url);
    return await response.json();
  } catch (err) {
    alert("OOOHH! ocurrio un problema!!!");
  }
}

dolar_value = 0;
uf_value = 0;
libra_cobre_value = 0;

get_data().then((data) => {
  dolar_value = data["dolar"]["valor"];
  euro_value = data["euro"]["valor"];
  libra_cobre_value = data["libra_cobre"]["valor"];
});

async function calcular() {
  let inputClp = Number(document.getElementById("pesoChileno").value);
  let data = await get_data();
  let dolar = parseInt(data["dolar"]["valor"]);
  let euro = parseInt(data["euro"]["valor"]);
  let libra = parseInt(data["libra_cobre"]["valor"]);
  let result = document.getElementById("result");
  result = 0;
  let select = document.getElementById("monedas");
  if (select.value == "dolar") {
    result = inputClp / dolar;
  }
  if (select.value == "euro") {
    result = inputClp / euro;
  }
  if (select.value == "libraCobre") {
    result = inputClp / libra;
  }

  if (select.value == "dolar") {
    document.getElementById("result").innerText = new Intl.NumberFormat(
      "en-US",
      { style: "currency", currency: "USD" }
    ).format(result);
  }
  if (select.value == "euro") {
    document.getElementById("result").innerText = new Intl.NumberFormat(
      "de-DE",
      {
        style: "currency",
        currency: "EUR",
      }
    ).format(result);
  }
  if (select.value == "libraCobre") {
    document.getElementById("result").innerText = new Intl.NumberFormat(
      "es-CL",
      { style: "currency", currency: "cUS" }
    ).format(result);
  }
}

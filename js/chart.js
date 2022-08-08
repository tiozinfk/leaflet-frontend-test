// declarando o params para ser usado na url
let params = new URLSearchParams(document.location.search.substring(1));

//console.log(params.get("id"));

//Realizado o fetch na url de acordo com o id do point utilizando o "SerchParams"
fetch(`https://terraq.com.br/api/teste-leaflet/ponto/${params.get("id")}`)
  .then((response) => response.json())
  .then((response) => {
    //Map feito para buscar os dados dentro da api para serem usadas no grafico
    const data = response.map((x) => x.data);
    const umidade = response.map((x) => x.umidade);
    const temperatura = response.map((x) => x.temperatura);
    const precipitacao = response.map((x) => x.precipitacao);
    const visibilidade = response.map((x) => x.visibilidade);
    const vento = response.map((x) => x.vento);

    //Criado o grafico dos utltimos 30 dias com a blibioteca "Chart.js"
    const graph = {
      labels: data,
      datasets: [
        {
          label: "Temperatura",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: temperatura,
        },
        {
          label: "Umidade",
          backgroundColor: "#8ae317",

          data: umidade,
        },
        {
          label: "Precipitacao",
          backgroundColor: "#4d8de8",

          data: precipitacao,
        },
        {
          label: "Visibilidade",
          backgroundColor: "#540461",

          data: visibilidade,
        },
        {
          label: "Vento",
          backgroundColor: "#7d6d6d",

          data: vento,
        },
      ],
    };

    const config = {
      type: "bar",
      data: graph,
      options: {},
    };

    const myChart = new Chart(document.getElementById("myChart"), config);
  });

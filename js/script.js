// Realizado o fetch para buscar os dados de visao inicial no endpoint
fetch("https://terraq.com.br/api/teste-leaflet/visao-inicial/")
  .then((response) => response.json())
  .then((data) => {
    // Definindo a longitude, altitude e o zoom buscando o valor dos mesmos na Api

    const lat = data.initial_view.center.lat;
    const lng = data.initial_view.center.lng;
    const zoom = data.initial_view.zoom;

    // Definido o setView com os dados da api
    var map = L.map("map").setView([lat, lng], zoom);

    // Constante com o caminho da url do primeiro mapa
    const url1 = data.tile_layers[0];
    // Constante com o caminho da url do segundo mapa
    const url2 = data.tile_layers[1];

    //Definido a url de ambos os mapas
    const Mapa1 = L.tileLayer(url1.url);
    const Mapa2 = L.tileLayer(url2.url);

    //Definido o "Mapa1(OpenStreetMap)" como default
    Mapa1.addTo(map);

    //Criado um objeto para definir a descrição e a camada
    const baseLayer = {
      OpenStreetMap: Mapa1,
      Satélite: Mapa2,
    };

    //Adicionado o controle de mapas
    L.control.layers(baseLayer).addTo(map);

    //Realizado o fech no endpoint "user"
    fetch("https://terraq.com.br/api/teste-leaflet/user")
      .then((response) => response.json())
      .then((data) => {
        //Buscando os elementos do html pelo DOM
        let avatar = document.getElementById("img-avatar");
        let liName = document.getElementById("li-name");
        let liEmail = document.getElementById("li-email");
        let liDate = document.getElementById("li-date");
        let liSex = document.getElementById("li-sex");
        let liNumber = document.getElementById("li-number");

        //Definindo o conteudo do dropdown de acordo com os dados do endpoint
        //utlizando o "src" e o "inner Html"
        avatar.src = data.avatar;
        liName.innerHTML = `Nome: ${data.nome}`;
        liEmail.innerHTML = `Email: ${data.email}`;
        liDate.innerHTML = `Data de Nascimento: ${data.data_nascimento}`;
        liSex.innerHTML = `Sexo: ${data.sexo}`;
        liNumber.innerHTML = `Telefone: ${data.telefone}`;
      });

    function onEachFeature(feature, layer) {
      //Declarado o id para ser utizado na tag <a>
      const id = feature.properties.id;

      var popupContent =
        "<p>" +
        feature.properties.name +
        "</p>" +
        //tag <a> utilizando params para redirecionar ao grafico
        `<a href = './chart.html?id=${id}' target='_blank'>` +
        "Medições históricas " +
        "</a>";

      if (feature.properties && feature.properties.popupContent) {
        popupContent +=
          //Adicionado as informações do point em especifico
          `<ul class='ul-popUp'>          
            <li>            
             <strong>Temperatura:</strong>
             ${feature.properties.temperatura}
             </li>
             <li>
             <strong>Umidade:</strong>
             ${feature.properties.umidade}
             </li>
             <li>
             <strong>Precipitacao:</strong>
             ${feature.properties.precipitacao}
             </li>
             <li>
             <strong>Visibilidade:</strong>
             ${feature.properties.visibilidade}
             </li>
             <li>
             <strong>Vento:</strong>
             ${feature.properties.vento}
             </li>
          </ul>`;

        `<a href = './chart.html?id=${id}' target='_blank'>` +
          "Medições históricas " +
          "</a>";
      }
      layer.bindPopup(popupContent);
    }

    $.getJSON(
      "https://terraq.com.br/api/teste-leaflet/pontos",
      function (data) {}
    ).done(function (data) {
      var featureCollection = L.geoJSON(data, {
        pointToLayer: function (feature, latlng) {
          // alterado os icones do mapa
          var iconUrl = feature.properties.icon;
          var featureIcon = L.icon({
            iconUrl,
            iconSize: [32, 37],
            iconAnchor: [16, 37],
            popupAnchor: [0, -28],
          });
          return L.marker(latlng, { icon: featureIcon });
        },
        onEachFeature: onEachFeature,
      }).addTo(map);
    });
  });

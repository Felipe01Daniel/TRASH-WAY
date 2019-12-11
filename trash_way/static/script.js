//Joguei as variáveis aqui em cima para poder chamar elas dentro das funções
let map;
let locs = [];
let markers = [];
let headToPoint = {};
let input = document.getElementById('pac-input');
let searchBox = {};
let directionsService = new google.maps.DirectionsService();
let directionsDisplay = {};

//Callback que inicia o código
let initMap = function() {
    //Aqui são as configurações do mapa. Posicionamento, estilo, etc.
    let options = {
        zoom:11,
        styles: [
            {
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#6195a0"
                    }
                ]
            },
            {
                "featureType": "administrative.province",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [
                    {
                        "lightness": "0"
                    },
                    {
                        "saturation": "0"
                    },
                    {
                        "color": "#f5f5f2"
                    },
                    {
                        "gamma": "1"
                    }
                ]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "all",
                "stylers": [
                    {
                        "lightness": "-3"
                    },
                    {
                        "gamma": "1.00"
                    }
                ]
            },
            {
                "featureType": "landscape.natural.terrain",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#bae5ce"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 45
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#fac9a9"
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "color": "#4e4e4e"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#787878"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "transit.station.airport",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "hue": "#0a00ff"
                    },
                    {
                        "saturation": "-77"
                    },
                    {
                        "gamma": "0.57"
                    },
                    {
                        "lightness": "0"
                    }
                ]
            },
            {
                "featureType": "transit.station.rail",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#43321e"
                    }
                ]
            },
            {
                "featureType": "transit.station.rail",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "hue": "#ff6c00"
                    },
                    {
                        "lightness": "4"
                    },
                    {
                        "gamma": "0.75"
                    },
                    {
                        "saturation": "-68"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#eaf6f8"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#c7eced"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "lightness": "-49"
                    },
                    {
                        "saturation": "-53"
                    },
                    {
                        "gamma": "0.79"
                    }
                ]
            }
        ],
        center: {lat:-23.5489, lng: -46.6388},
            //Controle panorama (moveLeft/moveUp/moveRight/moveDown)
        panControl: true,
        panControlOptions: {
        position: google.maps.ControlPosition.TOP_RIGHT
    },  
            //Controle do zoom (zoomIn/zoomOut)
        zoomControl: true,
        zoomControlOptions: {
        style: google.maps.ZoomControlStyle.LARGE,
        position: google.maps.ControlPosition.TOP_LEFT
    },
            //Controle de escala
        scaleControl: true,
        streetViewControl: true,
        streetViewControlOptions: {
        position: google.maps.ControlPosition.TOP_LEFT
    },
    //Isso faz tirar aquela mensagem
    gestureHandling: 'greedy',

    //Restringe o mapa a uma área (neste caso, SP)
        restriction: {
        latLngBounds: {
          south: -23.769026404890145,
          west: -47.16037595288009,
          north: -23.32840439347181,
          east: -46.11722404711992
        },
        strictBounds: true,
    }
}

    //Novo Mapa
  map = new google.maps.Map(document.getElementById('map'), options);
    //Chamando serviço de direções do Google
  directionsDisplay = new google.maps.DirectionsRenderer({
    map: map,
    suppressMarkers: true
  });

  AddInitialMarkers();
  SetupInputsToMap();
  FindClosestDirection();
}
//Adicionando marcadores das rotas
function AddInitialMarkers() {

  headToPoint = new google.maps.Marker({
    position: {
      lat: 0,
      lng: 0
    },
    map: map,
  })

//Posições dos pontos de coletas para rota
  //Ecoponto Santa Cruz
  locs[0] = ['', '-23.5996933', '-46.6231753']
  //Ecoponto Vicente Rao
  locs[1] = ['', '-23.628375', '-46.685577']
  //Ecoponto Brás
  locs[2] = ['', '-23.554468', '-46.610806']
  //Ecoponto Viaduto Antártica
  locs[3] = ['', '-23.524417', '-46.670641']
  //Ecoponto Alvarenga
  locs[4] = ['', '-23.695453', '-46.651554']
  //Ecoponto Vila Madalena
  locs[5] = ['', '-23.558397', '-46.687488']
  //Ecoponto Vila Mariana
  locs[6] = ['', '-23.593116', '-46.635120']
  //Ecoponto Vila Berrini
  locs[7] = ['', '-23.597401', '-46.691452']
  //Ecoponto Tereza Cristina
  locs[8] = ['', '-23.569094', '-46.608511']
  //Ecoponto Bresser
  locs[9] = ['', '-23.543457', '-46.606410']
  //Ecoponto Tatuapé
  locs[10] = ['', '-23.529909', '-46.583025']
  //Ecoponto Vila das Mercês
  locs[11] = ['', '-23.623759', '-46.605431']
  //Ecoponto Imigrantes
  locs[12] = ['', '-23.632373', '-46.630577']
  //Ecoponto Saioá
  locs[13] = ['', '-23.594423', '-46.622648']
  //Ecoponto Mirandópolis
  locs[14] = ['', '-23.611692', '-46.644651']
  //Ecoponto Vila Nova
  locs[15] = ['', '-23.472241', '-46.669897']
  //Ecoponto Cônego José Salomon
  locs[16] = ['', '-23.492242', '-46.721936']
  //Ecoponto Cupecê
  locs[17] = ['', '-23.665439', '-46.654224']
  //Ecoponto Liberdade
  locs[18] = ['', '-23.556584', '-46.637028']
  //Ecoponto Tiquatira
  locs[19] = ['', '-23.513541', '-46.543706']
  //Ecoponto Tucuruvi
  locs[20] = ['', '-23.467260', '-46.609947']
  //Ecoponto Jardim Maria do Carmo
  locs[21] = ['', '-23.595602', '-46.746835']
  //Ecoponto Jabaquara
  locs[22] = ['', '-23.653258', '-46.649455']
  //Ecoponto Moóca
  locs[23] = ['', '-23.547460', '-46.602705']
  //Ecoponto Olinda
  locs[24] = ['', '-23.634093', '-46.758048']
  //Ecoponto Vila Guilherme
  locs[25] = ['', '-23.517127', '46.600380']

  locs[26] = ['', '-23.662031', '-46.722554']

  locs[27] = ['', '-23.550065', '-46.525032']

  locs[28] = ['', '-23.575918', '-46.765089']

  locs[29] = ['', '-23.509897', '-46.432791']

  locs[30] = ['', '-23.543282', '-46.593916']

  locs[31] = ['', '-23.485615', '-46.565275']

  locs[32] = ['', '-23.520789', '-46.463578']

  locs[33] = ['', '-23.505748', '-46.704552']

  locs[34] = ['', '-23.638090', '-46.741615']

  locs[35] = ['', '-23.605491', '-46.496939']

  locs[36] = ['', '-23.599187', '-46.534555']

  locs[37] = ['', '-23.662829', '-46.594838']

  locs[38] = ['', '-23.503931', '-46.527497']

  locs[39] = ['', '-23.519577', '-46.580863']

  locs[40] = ['', '-23.453053', '-46.749656']

  locs[41] = ['', '-23.587385', '-46.509063']

  locs[42] = ['', '-23.539237', '-46.505162']

  locs[43] = ['', '-23.549149', '-46.483279']

  locs[44] = ['', '-23.549149', '-46.483279']

  locs[45] = ['', '-23.589181', '-46.755096']

  locs[46] = ['', '-23.550811', '-46.494909']

  locs[47] = ['', '-23.663999', '-46.776785']

  locs[48] = ['', '-23.710667', '-46.586437']

  locs[49] = ['', '-23.579237', '-46.495361']

  locs[50] = ['', '-23.469882', '-46.674867']
  //Ecoponto Jardim São Nicolau
  locs[51] = ['', '-23.522995', '-46.482757']
  //Ecoponto Imperador
  locs[52] = ['', '-23.513981', '-46.456650']
  //Ecoponto Penha
  locs[53] = ['', '-23.531294', '-46.525451']
  //Ecoponto Vila Cardoso Franco
  locs[54] = ['', '-23.623292', '-46.509081']
  //Ecoponto Barra Funda
  locs[55] = ['', '-23.527089', '-46.648613']
  //Ecoponto Vila Luisa
  locs[56] = ['', '-23.531202', '-46.552460']
  //Ecoponto Corinthians
  locs[57] = ['', '-23.547408', '-46.436838']
  //Ecoponto Cidade Líder
  locs[58] = ['', '-23.522995', '-46.482757']
  //Ecoponto Inácio Monteiro
  locs[59] = ['', '-23.573347', '-46.401498']
  //Ecoponto Piraporinha
  locs[60] = ['', '-23.669831', '-46.736531']
  //Ecoponto Giovanni Gronchi
  locs[61] = ['', '-23.610030', '-46.726838']
  //Ecoponto Cipoaba
  locs[62] = ['', '-23.629368', '-46.462159']
  //Ecoponto Boa Esperança
  locs[63] = ['', '-23.606197', '-46.451714']
  //Ecoponto Pedro Nunes
  locs[64] = ['', '-23.503518', '-46.465800']
  //Ecoponto Jardim Feital
  locs[65] = ['', '-23.661198', '-46.429387']

  let loc;
  for (i = 0; i < locs.length; i++) {
    loc = new google.maps.Marker({
      position: new google.maps.LatLng(locs[i][1], locs[i][2]),
      icon: ""     
    });

    google.maps.event.addListener(loc, (function(loc, i) {
    })(loc, i));
    markers.push(loc)
  }
}
//Criando caixa de pesquisa
function SetupInputsToMap() {
  searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP].push(input);
    // Isso faz com que as sugestões de pesquisa foque somente na área visível do  mapa e não em outros lugares
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });
  searchBox.addListener('places_changed', new_place_selected);
}

function new_place_selected() {

  let places = searchBox.getPlaces();
  if (places.length == 0) {
    return;
  }
  
  let bounds = new google.maps.LatLngBounds();
  places.forEach(function(place) {
    if (!place.geometry) {
      console.log("Returned place contains no geometry");
      return;
    }
    let icon = {
      url: 'https://cdn3.iconfinder.com/data/icons/map-and-location-outline/144/People_Map-512.png',
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    };

    headToPoint.setPosition(place.geometry.location);
    headToPoint.setIcon(icon);
    headToPoint.setTitle(place.name);
    markers.push(headToPoint);

    if (place.geometry.viewport) {
      bounds.union(place.geometry.viewport);
    } else {
      bounds.extend(place.geometry.location);
    }

  });
  map.fitBounds(bounds);
  map.setOptions({
    zoom: 17
  });
  FindClosestDirection();
}
//Função para buscar rota
let FindClosestDirection = function() {

  let closestDistance = Number.MAX_SAFE_INTEGER;
  let closest;

  for (i = 0; i < markers.length; i++) {
    if (markers[i].position !== headToPoint.getPosition()) {
      let distance = google.maps.geometry.spherical.computeDistanceBetween(headToPoint.getPosition(), markers[i].position);
      if (distance < closestDistance) {
        closestDistance = distance;
        closest = markers[i];
      }
    }
  }
  calculateAndDisplayRoute(directionsService, directionsDisplay, headToPoint.getPosition(), closest.position);

}
//Função para calcular e desenhar rota do ponto A ao ponto B
function calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB) {
  directionsService.route({
    origin: pointA,
    destination: pointB,
    travelMode: 'WALKING'
  }, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    }
  })

  //Array de marcadores
let markers = [
    {       //Santa Cruz
        coords: {lat:-23.5996933, lng: -46.6231753},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Santa Cruz</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>R. Santa Cruz, 1452 - Vila Mariana</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },

    {	//Vila Mariana
        coords: {lat:-23.5929202, lng: -46.6349351},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Vila Mariana</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>R. Afonso Celso, 147 - Vila Mariana</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },

    {	//Vicente Rao
        coords: {lat:-23.628375, lng: -46.685577},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Vicente Rao</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>Av. Professor Vicente Rao, 308 - Santo Amaro</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },

    {	//Ecoponto Brás
        coords: {lat:-23.554468, lng: -46.610806},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Brás</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>R. Palmorino Mônaco - Mooca,</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },

    {	//Ecoponto Viaduto Antártica
        coords: {lat:-23.524417, lng: -46.670641},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Viaduto Antártica</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>Rua Robert Bosch, 242 - Parque Industrial Tomas Edson</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },

    {	//Ecoponto Alvarenga
        coords: {lat:-23.695453, lng: -46.651554},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Alvarenga</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>Estr. do Alvarenga, 2475 - Jardim Itapura</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },

    {	//Ecoponto Vila Madalena
        coords: {lat:-23.558397, lng: -46.687488},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Vila Madalena</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>R. Girassol, 15 - Vila Madalena</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },

    {	//Ecoponto Vila Mariana
        coords: {lat:-23.593116, lng: -46.635120},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Vila Mariana</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>R. Afonso Celso, 147 - Vila Mariana</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },

    {	//Ecoponto Vila Berrini
        coords: {lat:-23.597401, lng: -46.691452},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Berrini</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>Praça do Cancioneiro, 15 - Cidade Monções</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },
    
    {	//Ecoponto Tereza Cristina
        coords: {lat:-23.569094, lng: -46.608511},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Berrini</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>Av. Teresa Cristina, 10 - Ipiranga</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },

    {	//Ecoponto Bresser
        coords: {lat:-23.543457, lng: -46.606410},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Berrini</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>Praça Giuseppe Cesari, 54 - Brás</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },
    
    {	//Ecoponto Tatuapé
        coords: {lat:-23.529909, lng: -46.583025},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Tatuapé</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>Av. Salim Farah Maluf, 179 - Tatuapé</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },

    {	//Ecoponto Vila das Mercês
        coords: {lat:-23.623759, lng: -46.605431},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Vila das Mercês</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>R. Italva, 86 - Vila Moraes</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },

    {	//Ecoponto Imigrantes
        coords: {lat:-23.632373, lng: -46.630577},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Imigrantes</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>Rua Opixé - Vila Guarani</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },

    {	//Ecoponto Saioá
        coords: {lat:-23.594423, lng: -46.622648},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Saioá</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>Rua Professor Oswaldo Lacerda Gomes Cardim - Chácara Klabin</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },

    {	//Ecoponto Mirandópolis
        coords: {lat:-23.611692, lng: -46.644651},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Mirandópolis</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>Av. Senador Casemiro da Rocha, 1220</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },

    {	//Ecoponto Vila Nova
        coords: {lat:-23.472241, lng: -46.669897},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Vila Nova</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>Rua Felix Alves Pereira, 113 - Vila Nova Cachoeirinha</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },

    {	//Ecoponto Cônego José Salomon
        coords: {lat:-23.492242, lng: -46.721936},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Cônego José Salomon</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>Av. Cônego José Salomon, 861 - Jardim Felicidade</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },

    {	//Ecoponto Cupecê
        coords: {lat:-23.665439, lng: -46.654224},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Cupecê</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>R. Anália Maria de Jesus, 131 - Jardim Itacolomi</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },
    
    {	//Ecoponto Liberdade
        coords: {lat:-23.556584, lng: -46.637028},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Cupecê</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>Rua Jaceguai, 67 - Liberdade</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },

    {	//Ecoponto Tiquatira
        coords: {lat:-23.513541, lng: -46.543706},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Cupecê</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>Av. Governador Carvalho Pinto - Jardim Mariana</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },

    {	//Ecoponto Tucuruvi
        coords: {lat:-23.467260, lng: -46.609947},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Cupecê</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>R. Eduardo Vicente Nasser, 519 - Jardim Leonor Mendes de Barros</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },

    {	//Ecoponto Jardim Maria do Carmo
        coords: {lat:-23.595602, lng: -46.746835},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Jardim Maria do Carmo</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>R. Caminho do Engenho, 800 - Ferreira</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },

    {	//Ecoponto Jabaquara
        coords: {lat:-23.653258, lng: -46.649455},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Jabaquara</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>Rua Jupatis, 140 - Vila Mira</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },

    {	//Ecoponto Moóca
        coords: {lat:-23.547460, lng: -46.602705},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Moóca</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>R, Av. Pires do Rio, 600 - Belém</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },

    {	//Ecoponto Olinda
        coords: {lat:-23.634093, lng: -46.758048},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Olinda</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>R. Nelsom Brissac, 1235 - Parque Regina</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },

    {	//Ecoponto Olinda
        coords: {lat:-23.634093, lng: -46.758048},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Olinda</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>R. Nelsom Brissac, 1235 - Parque Regina</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },

    {	//Ecoponto Vila Guilherme
        coords: {lat:-23.517127, lng: -46.600380},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Vila Guilherme</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>Rua José Bernardo Pinto, 1480 - Vila Guilherme</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },

    {   //Ecoponto Cidade Saudável
        coords: {lat:-23.662031, lng:-46.722554},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Cidade Saudável</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>R. Ptolomeu, 869 - Jardim São Luís</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },

    {	//Ecoponto Astarte
        coords: {lat:-23.550065, lng:-46.525032},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Astarte</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>Rua Astarté, 500 - Vila Carrao</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },

    {   //Ecoponto Politécnica
        coords: {lat:-23.575918, lng:-46.765089},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Politécnica</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>Rua Paulino Baptista Conti - Vila Antonio</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },

    {//Ecoponto Itaqueruna
        coords: {lat:-23.509897, lng:-46.432791},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Itaqueruna</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>Rua Domitilia dAbril - Cidade Nova São Miguel</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },

    {//Ecoponto Belém
        coords: {lat:-23.543282, lng:-46.593916},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Belém</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>R. Artur Mota - Belenzinho, São Paulo</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },

    {//Ecoponto Alceu Maynard de Araújo
        coords: {lat:-23.635509, lng:-46.713052},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Alceu Maynard de Araújo</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>Av. Professor Alceu Maynard Araújo, 330 - Vila Cruzeiro</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },

    {//Ecoponto Vila Sabrina
        coords: {lat:-23.485615, lng:-46.565275},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Vila Sabrina</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>Av. do Poe., 931 - Jardim Julieta</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },

    {//Ecoponto Parque Guarani
        coords: {lat:-23.520789, lng:-46.463578},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Parque Guarani</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>R. Manuel Alves da Rocha, 584 - Parque Guarani</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },

    {//Ecoponto Freguesia do Ó
        coords: {lat:-23.505748, lng:-46.704552},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Freguesia do Ó</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>R. Souza Filho, 690 - Vila Arcadia</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },

    {//Ecoponto Vila das Belezas
        coords: {lat:-23.638090, lng:-46.741615},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Vila das Belezas</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>R. Campo Novo do Sul, 500 - Vila Andrade</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },

    {//Ecoponto Sapopemba
        coords: {lat:-23.605491, lng:-46.496939},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Sapopemba</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>R. Francesco Usper, 550 - Conj. Promorar Sapopemba</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },

    {//EcoPonto São Lucas
        coords: {lat:-23.599187, lng:-46.534555},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto São Lucas</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>R. Florêncio Sanches, 307 - Vila Prudente</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },

    {//Ecoponto Taboão/Paulicéia
        coords: {lat:-23.662829, lng:-46.594838},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Taboão/Paulicéia</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>R. Pedro Ivo - Vila Florida, São Bernardo do Campo</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },

    {//Ecoponto Cangaíba
        coords: {lat:-23.503931, lng:-46.527497},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Cangaíba</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>Cangaiba</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },

    {//Ecoponto Vila Maria
        coords: {lat:-23.519577, lng:-46.580863},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Vila Maria</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>R. Curuçá, 1700 - Vila Maria</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },

    {//Ecoponto Alexios Jafet
        coords: {lat:-23.453053, lng:-46.749656},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Alexios Jafet</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>Av. Alexios Jafet - Vila Chica Luisa, São Paulo</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },

    {//Ecoponto Nova York
        coords: {lat:-23.587385, lng:-46.509063},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Nova York</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>R. Acácio Antunes, 89 - Jardim das Rosas</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },

    {//Ecoponto Vila Matilde
        coords: {lat:-23.539237, lng:-46.505162},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Vila Matilde</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>R. Mateus de Siqueira - Cidade Patriarca</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },

    {//Ecoponto Manoel da Nobrega
        coords: {lat:-23.549149, lng:-46.483279},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Manoel da Nóbrega</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>Av. Padre Estanislau de Campos, 46-62 - Conj. Hab. Padre Manoel da Nobrega</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },

    {//Ecoponto Jaqueline
        coords: {lat:-23.589181, lng:-46.755096},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Jaqueline</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>Kardim Raposo Tavares, SP</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },

    {   //Ecoponto Gamelinha
        coords: {lat:-23.550811, lng:-46.494909},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Gamelinha</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p> R. Morfeu, 25 - Vila Nhocuné</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },

    {   //Ecoponto Santo Dias
        coords: {lat:-23.663999, lng:-46.776785},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Santo Dias</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>Travessa Rosifloras, 301 - Conj. Hab. Instituto Adventista</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },

    {//Ecoponto Parque Dos Passaros
        coords: {lat:-23.710667, lng:-46.586437},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Parque Dos Passaros</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>R. dos Guarás, 867 - Parque dos Passaros, São Bernardo do Campo</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },

    {   //Ecoponto Montalvania
        coords: {lat:-23.579237, lng:-46.495361},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Montalvania</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>R. Montalvânia, 195 - Jardim Sao Cristovao</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },

    {   //Ecoponto Vila Rica
        coords: {lat:-23.469882, lng:-46.674867},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Vila Rica</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>R. Jorge Mamede da Silva, 200 - Vila Rica, São Paulo</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },

    {   //Ecoponto Jardim São Nicolau
        coords: {lat:-23.522995, lng:-46.482757},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Jardim São Nicolau</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>R. Agreste de Itabaiana, 590 - Jardim Artur Alvim</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },
    {   //Ecoponto Imperador
        coords: {lat:-23.513981, lng:-46.456650},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Imperador</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>Av. Ribeirão Jacu, 201 - Jardim Santana</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },

    {   //Ecoponto Penha
        coords: {lat:-23.531294, lng:-46.525451},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Penha</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>R. Dr. Heládio, 104 - Penha de França</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },

    {   //Ecoponto Vila Cardoso Franco
        coords: {lat:-23.623292, lng:-46.509081},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Penha</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>Centro de Reciclagem · Rua dos Vorás, 25</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },

    {   //Ecoponto Barra Funda
        coords: {lat:-23.527089, lng:-46.648613},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Barra Funda</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>Serviço de coleta de lixo · Rua Solon</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },

    {   //Ecoponto Vila Luisa
        coords: {lat:-23.531202, lng:-46.552460},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Vila Luisa</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>R. Manoel Graça - Guaiauna</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },

    {   //Ecoponto Corinthians
        coords: {lat:-23.547408, lng:-46.436838},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Corinthians</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>Centro de Reciclagem · R. Ana Perena</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },

    {   //Ecoponto Cidade Líder
        coords: {lat:-23.563072, lng:-46.495495},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Cidade Líder</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>Centro de Reciclagem · R. Charles Manguin, 2-20</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },

    {   //Ecoponto Inácio Monteiro
        coords: {lat:-23.573347, lng:-46.401498},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Inácio Monteiro</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>Centro de Reciclagem · R. Regresso Feliz, 1190</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },

    {   //Ecoponto Piraporinha
        coords: {lat:-23.669831, lng:-46.736531},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Piraporinha</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>Serviço de coleta de lixo · R. João de Abreu, 326</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },

    {   //Ecoponto Giovanni Gronchi
        coords: {lat:-23.610030, lng:-46.726838},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Giovanni Gronchi</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>Centro de Reciclagem · Av. Giovanni Gronchi, 3413</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },

    {   //Ecoponto Cipoaba
        coords: {lat:-23.629368, lng:-46.462159},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Cipoaba</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>Centro de Reciclagem · R. Padre Luís de Siqueira</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },

    {   //Ecoponto Boa Esperança
        coords: {lat:-23.606197, lng:-46.451714},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Boa Esperança</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>Parque Boa Esperança</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },

    {   //Ecoponto Pedro Nunes
        coords: {lat:-23.503518, lng:-46.465800},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Boa Esperança</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>Centro de Reciclagem · R. Varzelândia, 100</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },

    {   //Ecoponto Jardim Feital
        coords: {lat:-23.522995, lng:-46.482757},
        iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
        content: '<h2 style="text-align: center;">Ecoponto Jardim Feital</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>Vila Lisboa, Mauá </p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
    },
    
]

//loop pelos marcadores
for(let i = 0; i < markers.length; i++) {
addMarker(markers[i])
}

//Criando popup
let infoWindow;
infoWindow = new google.maps.InfoWindow()

//função  de adicionar marcador
function addMarker(props) {
let marker = new google.maps.Marker({
    position: props.coords,
    map: map
});

//checar ícone custumizado 
if(props.iconImage) {
    //setar ícone
    marker.setIcon(props.iconImage)
}
    //checar conteúdo
if(props.content) {
    marker.addListener('click', function() {
        infoWindow.setContent(props.content)
        infoWindow.open(map, marker);
    })
        //remover popup ao clicar no mapa
    map.addListener('click', function() {
        if (infoWindow) infoWindow.close()
    });
}}}

initMap();
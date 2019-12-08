function initMap() {
        //opções mapa
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
        restriction: {
        latLngBounds: {
          south: -23.769026404890145,
          west: -47.16037595288009,
          north: -23.32840439347181,
          east: -46.11722404711992
        },
        strictBounds: true
    }
}
        //novo mapa
    let map = new
    google.maps.Map(document.getElementById("map"), options)

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
                content: '<h2 style="text-align: center;">Ecoponto Olinda</h2> <img class="icone" src="../static/images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>Rua José Bernardo Pinto, 1480 - Vila Guilherme</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
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
        }
    }
        //Caixa de busca
        SetupInputsToMap()
        function SetupInputsToMap() {
            let searchBox = new google.maps.places.SearchBox(document.getElementById('pac-input'))

            map.controls[google.maps.ControlPosition.TOP_CENTER].push(document.getElementById('pac-input'))
            google.maps.event.addListener(searchBox, 'places_changed', function() {
                searchBox.set('map', null)

                    let places = searchBox.getPlaces()
                    let bounds = new google.maps.LatLngBounds()
                    let i, place
                    for (i = 0; place = places[i]; i++) {
                        (function(place) {
                            let markerSearch = new google.maps.Marker({
                                position: place.geometry.location,
                                icon: '../static/images/marcadorpesquisa.png',
                            })
                        
                    markerSearch.bindTo('map', searchBox, 'map')
                        
                    google.maps.event.addListener(markerSearch, 'map_changed', function() {
                        if (!this.getMap()) {
                            this.unbindAll()
                            }
                        })
                    bounds.extend(place.geometry.location)
                        }   
                    (place))
                    }
                    map.fitBounds(bounds);
                    searchBox.set('map', map);
                    map.setZoom(Math.min(map.getZoom(),12));
    })
        // Isso faz com que as sugestões de pesquisa foque somente na área visível do  mapa e não em outros lugares
		map.addListener('bounds_changed', function () {
			searchBox.setBounds(map.getBounds());
        })
    }
}
function initialize() {
    initMap();
 }

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
            content: '<h2 style="text-align: center;">Ecoponto Santa Cruz</h2> <img class="icone" src="images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>R. Santa Cruz, 1452 - Vila Mariana</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
        },

        {	//Vila Mariana
            coords: {lat:-23.5929202, lng: -46.6349351},
            iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
            content: '<h2 style="text-align: center;">Ecoponto Vila Mariana</h2> <img class="icone" src="images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>R. Afonso Celso, 147 - Vila Mariana</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
        },

        {	//Vicente Rao
            coords: {lat:-23.628375, lng: -46.685577},
            iconImage: 'https://img.icons8.com/bubbles/50/000000/trash.png',
            content: '<h2 style="text-align: center;">Ecoponto Vicente Rao</h2> <img class="icone" src="images/iconepopup.png" alt=""> <br> <h3>Endereço:</h3> <p>Av. Professor Vicente Rao, 308 - Santo Amaro</p> <br> <h3>Horário:</h3> <p>Abre de seg à domingo das 6:00 às 22hs. Aos domingos fecha às 18hs.</p>'
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
                                icon: 'images/marcadorpesquisa.png',
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
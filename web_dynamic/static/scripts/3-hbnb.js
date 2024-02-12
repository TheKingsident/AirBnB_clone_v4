$(document).ready(function () {
  const checkedAmenities = {};

  $('input[type="checkbox"]').change(function () {
    if (this.checked) {
      checkedAmenities[$(this).data('id')] = $(this).data('name');
    } else {
      delete checkedAmenities[$(this).data('id')];
    }
    $('.amenities h4').text(Object.values(checkedAmenities).join(', '));
  });

  $.get('http://localhost:5001/api/v1/status/', function (data) {
    console.log(data);
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  }).fail(function () {
    $('#api_status').removeClass('available');
  });

  $.ajax({
    url: 'http://localhost:5001/api/v1/places_search/',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({}),
    success: function (data) {
      const placesContainer = $('.places');
      placesContainer.empty();
      data.forEach(function (place) {
        const placeArticle = $('<article></article>');

        // Title box
        const titleBoxDiv = $('<div class="title_box"></div>');
        titleBoxDiv.append(`<h2>${place.name}</h2>`);
        titleBoxDiv.append(`<div class="price_by_night">$${place.price_by_night}</div>`);
        placeArticle.append(titleBoxDiv);

        // Information box
        const infoDiv = $('<div class="information"></div>');
        infoDiv.append(`<div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>`);
        infoDiv.append(`<div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>`);
        infoDiv.append(`<div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>`);
        placeArticle.append(infoDiv);

        // Description box
        const descriptionDiv = $('<div class="description"></div>');
        descriptionDiv.html(place.description);
        placeArticle.append(descriptionDiv);

        placesContainer.append(placeArticle);
      });
    }
  }).fail(function () {
    console.log('Failed to retrieve places.');
  });
});

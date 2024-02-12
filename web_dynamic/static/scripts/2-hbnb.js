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
});

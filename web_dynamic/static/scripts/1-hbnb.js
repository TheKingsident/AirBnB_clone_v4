$(document).ready(function () {
  const checkedAmenites = {};

  $('input[type="checkbox"]').change(function () {
    if (this.checked) {
      checkedAmenites[$(this).data('id')] = $(this).data('name');
    } else {
      delete checkedAmenites[$(this).data('id')];
    }
    $('.amenities h4').text(Object.values(checkedAmenites).join(', '));
  });
});

var options = {
  minimumInputLength: 1,
  language: {
    inputTooShort: function (args) {
      return "";
    }
  },
  ajax: {
    url: 'https://autocomplete.geocoder.cit.api.here.com/6.2/suggest.json',
    delay: 250,
    dataType: 'json',
    data: function (params) {
      return {
        query: params.term,
        app_id: 'DemoAppId01082013GAL',
        app_code: 'AJKnXv84fjrb0KIHawS0Tg',
        country: 'USA, CAN'
      };
    },
    processResults: function (data) {
      return {
        results: $.map(data.suggestions, function (obj) {
          let houseNumber = obj.address.houseNumber ? obj.address.houseNumber : '';
          let street = obj.address.street ? obj.address.street : '';
          let city = obj.address.city ? obj.address.city : '';
          let state = obj.address.state ? obj.address.state : '';
          let country = obj.address.country ? obj.address.country : '';
          let postalCode = obj.address.postalCode ? obj.address.postalCode : '';
          return {
            id: obj.locationId,
            text: houseNumber + ' ' + street + ', ' + city + ', ' + state + ' ' + postalCode + ', ' + country,
            streetaddr: houseNumber + ' ' + street,
            city: city,
            state: state,
            postalCode: postalCode,
            country: country
          };
        })
      };
    }
  },
  escapeMarkup: function (markup) {
    return markup;
  }
};
document.addEventListener('DOMContentLoaded', function (e) {
  $('#location').select2(options).on('select2:select', function (e) {
    $.getJSON('https://geocoder.cit.api.here.com/6.2/geocode.json', {
      app_id: 'DemoAppId01082013GAL',
      app_code: 'AJKnXv84fjrb0KIHawS0Tg',
      locationId: e.params.data.id
    });

    $("#location-input").val(e.params.data.streetaddr);
    $("#city-input").val(e.params.data.city);
    $("#state-input").val(e.params.data.state);
    $("#postal-input").val(e.params.data.postalCode);
    $("#country-input").val(e.params.data.country);
  });
});
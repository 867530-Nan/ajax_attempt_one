var currentPlanet = {}
var showForm = false;
var editingPlanet;

$(document).ready( function() {
	function toggle() {
	showForm = !showForm
	$('#planet-form').remove();
	$('#planets-list').toggle();

		if (showForm) {
			$.ajax({
				url: '/planet_form',
				method: 'GET',
				data: { id: editingPlanet }
			}).done( function(html) {
				$('#toggle').after(html)
			});
		}
	};

function getPlanet(id) {
	$.ajax({
		url: '/planets/' + id,
		method: 'GET',
	}).done( function(planet) {
		if (editingPlanet) {
			var li = $("[data-id'" + id + "'")
			$(li).parent().replaceWith(planet)
			editingPlanet = null
		} else {
			$('#planets-list').append(planet);
		}
	});
}

$(document).on('submit', '#planet-form form', function(e) {
	e.preventDefault();
	var data = $(this).serializeArray();
	var url = '/planets';
	var method = 'POST';

	if (editingPlanet) {
		url = url + '/' + editingPlanet;
		method: 'PUT'
	}

	$.ajax({
		url: url,
		type: method,
		dataType: 'JSON', 
		data: data
	}).done( function(planet) {
		toggle();
		getPlanet(planet.id)
	}).fail(function(err) {
		alert(err.responseJSON.errors)
	});
});

$('#toggle').on('click', function() {
    toggle();
  });

$(document).on('click', '#edit-planet', function() {
	editingPlanet = $(this).siblings('.planet-item').data().id
	toggle();
});

$(document).on('click', '#delete-planet', function() {
	var id = $(this).siblings('.planet-item').data().id;
	$.ajax({
		url: '/planets/' + id, 
		method: 'DELETE'
	}).done( function() {
		var row = $("[data-id='" + id + "'");
		row.parent('li').remove();
	});
});



$(document).on('click', '.planet-item', function() {
		currentPlanet.id = this.dataset.id
		currentPlanet.name = this.dataset.name

		$.ajax({
			url: '/planets/' + currentPlanet.id + '/locations',
			method: 'GET', 
			dataType: 'JSON'
		}).done( function(locations) {
			$('#planet').text('Locations in ' + currentPlanet.name)
			var list = $('#locations');
			list.empty();
			locations.forEach( function(char) {
				var li = '<li data-location-id="' + char.id + '">' + char.specie + '-' + char.location + '</li>'
				list.append(li)
			});
		});
	});
});
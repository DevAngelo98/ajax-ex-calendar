$(document).ready(function(){

  $.ajax({
		url: "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0",
		method: "GET",
		success: function(datoRicevuto){
			var numeroDiGiorni = moment("01-2018", "DD/YYYY").daysInMonth();
      var source = $("#template").html();
      var template = Handlebars.compile(source);
      var arrayRicevuto = datoRicevuto.response;
      console.log(arrayRicevuto);

      for(var i=1; i<=numeroDiGiorni;i++){
        var dataControllo;
        var date = moment("2018-01", "YYYY/DD").format(i+" MMMM");
        var context = {data: date};
        var html = template(context);
        $(".date").append(html);

        arrayRicevuto.forEach(element => {
          dataControllo = moment(element.date, "YYYY-MM-DD").format("D MMMM");
          name = element.name;
          if(dataControllo==date){
            $(".date li").last().remove();
            var festivo = date + " - " + element.name;
            var contextFestivo = {data: festivo, color: "red"};
            var htmlFestivo = template(contextFestivo);
            console.log(htmlFestivo);
            $(".date").append(htmlFestivo);
          }
        });
        
      }
				
		},
		error: function(stato){
			console.log("Errore " + stato);
		}
	});


});
$(document).ready(function(){

  var next=-1;
  $(".succ svg").click(function(){
    next++;
    if(next==12){
      next=0;
      chiamata(next);
    } else{
      chiamata(next);
    }
  });

  $(".prec svg").click(function(){
    next--;
    if(next==-1){
      next=11;
      chiamata(next);
    } else{
      chiamata(next);
    }  });

  $(".succ svg").click();

  function chiamata(month){
  console.log(month);

    $.ajax({
      url: "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=" + month,
      method: "GET",
      success: function(datoRicevuto){
        $(".date *").remove();        
        var mese = (month+1);
        //Inserisco il nome dell'anno
        var nomeMese = moment("2018-"+mese, "YYYY-M").format("MMMM" + " 2018");
        $(".title h2").text(nomeMese).addClass("capitalize");

        //Creazione dei giorni del mese e template
        var numeroDiGiorni = moment("2018-"+mese, "YYYY-M").daysInMonth();
        var source = $("#template").html();
        var template = Handlebars.compile(source);
        var arrayRicevuto = datoRicevuto.response;
        console.log(arrayRicevuto);
       

        
        for(var i=1; i<=numeroDiGiorni;i++){
          var dataControllo;
          var date = moment("2018-"+mese, "YYYY-M").format(i+" MMMM");
          var context = {data: date};
          var html = template(context);
          $(".date").append(html);

          arrayRicevuto.forEach(element => {
            dataControllo = moment(element.date, "YYYY-MM-DD").format("D MMMM");
            if(dataControllo==date){
              $(".date li").last().remove();
              var festivo = date + " - " + element.name;
              var contextFestivo = {data: festivo, color: "red"};
              var htmlFestivo = template(contextFestivo);
              $(".date").append(htmlFestivo);
            }
          });
        }
      },
      error: function(stato){
        console.log("Errore " + stato);
      }
    });
  }
});
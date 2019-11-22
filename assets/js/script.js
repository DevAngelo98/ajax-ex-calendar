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
        $("ul *").remove();        
        var mese = (month+1);
        //Inserisco il nome dell'anno
        var nomeMese = moment("2018-"+mese, "YYYY-M").format("MMMM" + " 2018");
        $(".title h2").text(nomeMese).addClass("capitalize");

        //Creazione dei giorni del mese e template
        var numeroDiGiorni = moment("2018-"+mese, "YYYY-M").daysInMonth();
        var source = $("#template").html();
        var template = Handlebars.compile(source);
        var arrayRicevuto = datoRicevuto.response;

        for(var i=1; i<=numeroDiGiorni;i++){
          var dataControllo;
          var date = moment("2018-"+mese, "YYYY-M").format(i+" MMMM");
          var giornoTemp = moment("2018-"+mese+"-"+i, "YYYY-M-D").format("dddd");
          var valInserire = moment("2018-"+mese+"-"+i, "YYYY-M-D").format("D");
          console.log(giornoTemp);
          var context = {data: valInserire, giorno:giornoTemp};
          var html = template(context)

          switch (giornoTemp) { 
            case 'lunedì': 
              $(".lunedi ul").append(html);
              break;
            case 'martedì': 
              $(".martedi ul").append(html);
              break;
            case 'mercoledì': 
              $(".mercoledi ul").append(html);
              break;		
            case 'giovedì': 
              $(".giovedi ul").append(html);
              break;
            case 'venerdì': 
              $(".venerdi ul").append(html);
              break;
            case 'sabato': 
              $(".sabato ul").append(html);
              break;
            case 'domenica': 
              $(".domenica ul").append(html);
              break;
            default:
              console.log('Nobody Wins!');
          }
          

          arrayRicevuto.forEach(element => {
            dataControllo = moment(element.date, "YYYY-MM-DD").format("D MMMM");
            if(dataControllo==date){
              // $(".date li").last().remove();
              var newLine = /\n+/g;
              var festivo = valInserire;
              var contextFestivo = {data: festivo, color: "red", festa: element.name};
              var htmlFestivo = template(contextFestivo);
             
              switch (giornoTemp) { 
                case 'lunedì': 
                  $(".lunedi ul li").last().remove(); 
                  $(".lunedi ul").append(htmlFestivo);
                  break;
                case 'martedì': 
                  $(".martedi ul li").last().remove(); 
                  $(".martedi ul").append(htmlFestivo);
                  break;
                case 'mercoledì': 
                  $(".mercoledi ul li").last().remove(); 
                  $(".mercoledi ul").append(htmlFestivo);
                  break;		
                case 'giovedì': 
                  $(".giovedi ul li").last().remove(); 
                  $(".giovedi ul").append(htmlFestivo);
                  break;
                case 'venerdì': 
                  $(".venerdi ul li").last().remove(); 
                  $(".venerdi ul").append(htmlFestivo);
                  break;
                case 'sabato': 
                  $(".sabato ul li").last().remove(); 
                  $(".sabato ul").append(htmlFestivo);
                  break;
                case 'domenica': 
                  $(".domenica ul li").last().remove(); 
                  $(".domenica ul").append(htmlFestivo);
                  break;
                default:
                  console.log('Nobody Wins!');
              }
            }
          });
        }
      },
      error: function(stato){
        console.log("Errore " + stato);
      }
    });
  }
  $(".container > div").on("mouseenter", "li", function(){
    $(this).parent().parent().find("h4").addClass("textGradient");
    
  });
  $(".container > div").on("mouseleave", "li", function(){
    $(this).parent().parent().find("h4").removeClass("textGradient");
    
  });

  setInterval(movesuc,8000);
  function movesuc(){
    $(".succ svg").addClass("succmove");
    $('.succ svg').on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){
      $(this).removeClass("succmove");
    });
  }

  setInterval(moveprec,8000);
  function moveprec(){
    $(".prec svg").addClass("precmove");
    $('.prec svg').on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){
      $(this).removeClass("precmove");
    });
  }

});
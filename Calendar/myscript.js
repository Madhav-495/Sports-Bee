var logo1 = "";
var logo2 = "";
var name1 = "";
var name2 = "";
var venue = "";
var date = "";
var a = $('#Date').val();


$('#search').click(function () {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    
    
    $.ajax({
        url:"http://localhost:5000/sechdule",
        dataType: 'json',
        async: true,
        success: function (info) {
            
            $(info).each(function (i) {
                var d = info[i];
                $.each(d, function (k, v) {
                    if(k=="name1"){
                        name1=v;
                    }if(k=="name2"){
                        name2=v;
                    }if(k=="logo1"){
                        logo1=v;
                    }if(k=="logo2"){
                        logo2=v;
                    }
                    if(k=="venue"){
                        venue=v;
                    }if(k=="time"){
                        date=v;
                    }
                    


                })
                $("#search").after('<div class="matches">' + '<img src="' + logo1 + '" alt="" id="logo1">' + '<p id="team1">' + name1 + '</p>' + '<h1 id=venue>Venue:</h1>' + '<h1 id="Venue">' + venue + '</h1>' + '<h3 id="date">' + date + '</h3>' + '<p id="team2">' + name2 + '</p>' + '<img src="' + logo2 + '" alt="#" id="logo2">' + '</div>');
                
            })
        }

    })
    
    
})
$('#Date').keyup(function () {
    var data = $('#Date').val().toLowerCase();
    $('.matches ').filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(data) > -1)
    })
})


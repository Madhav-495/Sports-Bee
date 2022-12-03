
$('#search').click(function(){
        var player=$('#searchbar').val()
        
        
        $.get('/stats/player',function(data,status){
            $(data).each(function(i){
                var d=data[i];
                
                $.each(d,function(k,v){
                    
                    if(k=="name"&&v!=player){
                        return false;
                       
                    }
                    if(k=="image"){
                        $('#playerimage').attr("src",v);
                    }
                    if(k=="name"){
                        $('.virat').text(v);
                    }
                    if(k=="testmatches"){
                        $('#testmatches').text(v);
                        
                        
                    }
                    if(k=="testruns"){
                        
                            $('#testruns').text(v);
                        
                       
                    }if(k=="testaverage"){
                        
                            $('#testaverage').text(v);
                        
                        
                    }if(k=="odimatches"){
                        
                            $('#odimatches').text(v);
                        
                        
                    }if(k=="odiruns"){
                        
                            $('#odiruns').text(v);
                        
                        
                    }if(k=="odiaverage"){
                        
                            $('#odiaverage').text(v);
                        
                       
                    }if(k=="tmatches"){
                        
                            $('#tmatches').text(v);
                        
                        
                    }if(k=="truns"){
                        
                            $('#truns').text(v);
                        
                        
                    }if(k=="taverage"){
                        
                            $('#taverage').text(v);
                        
                        
                    }
                    
                })
            })
        })
    })



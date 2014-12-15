$(document).ready(function(){
	var ifMobile = $.appMobile();
	if(ifMobile){
	    $.event.special.tap.tapholdThreshold = 175;

	    $("body")
	    	.on("vmousedown",function(e){
	    		localStorage.holdX = e.clientX;
    			localStorage.holdY = e.clientY;
	    	})
	    	.on("taphold",function (e){
	    		toggleMouseMenu(localStorage.holdX,localStorage.holdY)
	    })
	}
    else{
    	$(this).mousedown(function(e) {
            if (e.button == 2) {
                toggleMouseMenu(e.clientX,e.clientY);
                $(document)[0].oncontextmenu = function() {
                    return false;
                }
            }
        });
    }


    function toggleMouseMenu(posX,posY){
    	var mouseMenu = $('#circle-mouse');
        if (!mouseMenu.hasClass('open')) {
            mouseMenu.css({
                left:posX+"px",
                top:posY+"px"
            }).addClass('open');
        }
        else
            mouseMenu.removeClass('open');
    }




    function initFakeMenu(nbElem){
        var container= $('<div>',{"id":"circle-mouse","class":"circle"});

        var elem = $("<div>",{"class":"elem"});

        var elemCenter = $("<div>",{"class":"circle-center"}).html("X");
        elemCenter.on('vclick',function(){
            toggleMouseMenu();
        })
        $.each(nbElem,function (key, val){
            var circleId = key+1;
            for (var i = 1; i <= val; i++) {
                var newElem = elem.clone().addClass("circle-"+circleId).addClass("pos-"+i).html("<a href='#'>"+i+"</a>");
                container.append(newElem);
            };
        })
        
        container.append(elemCenter);
        $(".result").html(container);
    }

    initFakeMenu(new Array(6,12));

});
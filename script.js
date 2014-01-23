<script>
function initVisual() {
	$(".promo_collection > ul > li").each(function(i){
	
		if ($(this).children("a").children("img").length > 0) {
			$(this).children("a").children("img").attr(
				"src",
				$(this).children("a").children("img").attr("src").replace("303x227", "330x270")
			);	
		}
		
		if ($(this).attr("data-filter") !== undefined && $(this).children(".tags").length <= 0) {
			var tags = $(this).attr("data-filter").split(",");
			var _dom = "";
			
			for (i = 0; i < tags.length; i++) {
				_dom += "<div class='tag-item'>"+tags[i].replace(/-/g," ");
				_dom += (i === tags.length -1) ? "</div>" : ",</div>";
			}
			
			$(this).children("h4").after("<div class='tags'>"+_dom+"</div>");
		}
		
		if ($(this).children("a").attr("href") !== undefined && $(this).children(".section-title").length <= 0) {
			var url=$(this).children("a").attr("href");
			var section = "";
			if (url.indexOf("/news/") > -1 || url.indexOf("news.nationalgeographic.com") > -1) {
				section = "Daily News";
			} else if (url.indexOf("newswatch.nationalgeographic.com") > -1) {
				section="Water Currents";
			} else if (url.indexOf("video.nationalgeographic.com") > -1) {
				section = "Video";
			} else if (url.indexOf("ngm.nationalgeographic.com") > -1) {
				section = "Magazine";
			} else if ( (url.indexOf("environment.nationalgeographic.com") > -1) || (url.indexOf(".com/125/") > -1)  || (url.indexOf(".com/features/") > -1) ) {
				section = "Feature";
			} else {
				section = "&nbsp;"
			}
			
			$(this).children("h4").before("<div class='section-title'>"+section+"</div>");
		}
	});
}

function sortInt(a,b){  
	return $(a).data('pos') > $(b).data('pos') ? 1 : -1; 
};
    
function filterOn(tag){
	$('.bigthree li').each(function(indx, promo){
		if(!$(promo).hasClass('adbox')){
			if($(promo).data('pos') == undefined) $(promo).data('pos',indx+1);
			$(promo).appendTo('#filterTank');
		}
	});
    
   
    
    $('#filterTank li').sort(sortInt).appendTo('#filterTank');
   
    $('#filterTank li').each(function(){
        if(tag == 'all'){
            if($('.bigthree li').length < 3){
                $('.bigthree .adbox').before($(this)); 
            } else {
                $('.bigthree ul.horizontal').append($(this)); 
            }
        } else if($(this).attr('data-filter') == undefined){
            return true;
        } else {
            var tags = $(this).attr('data-filter');
            if(tags.indexOf(tag) >= 0){
                if($('.bigthree li').length < 3){
                    $('.bigthree .adbox').before($(this)); 
                } else {
                    $('.bigthree ul.horizontal').append($(this)); 
                }
            }
        }
        
    });
   
    $('.bigthree li').each(function(indx, promo){
        $(this).removeClass();
        if(indx == 2){
            $(this).addClass('adbox');
        }
        var pos = indx+1;
        $(this).addClass('sq'+pos);
    });
}

$('.bigthree').ready(function(){
	
	$("#page_head h1.geocore_head").html("Freshwater").animate({
		opacity: 1
	});
	
	/** 
	 * For filter
	 */
	$('.bigthree').after('<div id="filterTank" class="hidden" />');

	if(window.location.hash != '' && window.location.hash != "#") {
		$(".filter > select").val(window.location.hash.replace("#","")).prop('selected', true);
		filterOn(window.location.hash.replace("#",""));
	}

	initVisual();
	
	$(".filter > select").change(function(){
/*
		window.location.href = $(this).find(":selected").attr("value") == "all" ? "#" : "#" + $(this).find(":selected").attr("value");
		if(window.location.hash == "" || window.location.hash == "#") {
			filterOn("all");
		} else {
			filterOn($(this).find(":selected").attr("value"));
		}
*/

		window.location.href = "#" + $(this).find(":selected").attr("value");
		if(window.location.hash != "")
			filterOn($(this).find(":selected").attr("value"));
		
		initVisual();
	});
	
/*
	$(".filter > select").mouseover(function(){
		$(this).css({
			"background": "#39433A",
			"color": "#ffffff"
		});
	});
	
	$(".filter > select").mouseout(function(){
		$(this).css({
			"background": "#eeeeee",
			"color": "#888888"
		});
	});
*/
	
});




</script>
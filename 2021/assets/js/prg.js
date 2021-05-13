var timestr=function(t){var e=t.getHours(),a=t.getMinutes();return hours=0==e?"00":e.toString(),minutes=0==a?"00":a.toString(),hours+":"+minutes},datestr=function(t){var e=t.getDate();return e+nth(e)+" "+["January","February","March","April","May","June","July","August","September","October","November","December"][t.getMonth()]+" "+t.getFullYear()},nth=function(t){if(3<t&&t<21)return"th";switch(t%10){case 1:return"st";case 2:return"nd";case 3:return"rd";default:return"th"}};$(function(){$.getJSON("../../programme.json",function(t){var a=$("#programme"),s={};$.each(t,function(t,e){var a=new Date(Date.parse(e.start_time));start_date_index=datestr(a),start_date_index in s||(s[start_date_index]=[]),s[start_date_index].push(e)}),$("#numdays").html(Object.keys(s).length),$(".timezone").text("converted to your operating system's timezone ("+Intl.DateTimeFormat().resolvedOptions().timeZone+")");var n=0,r=0;$.each(s,function(t){var e=new Date;datestr(e)==t&&(r=n),n++}),n=0,$.each(s,function(t,e){html='<div class="card"><div class="card-header bg-dark" id="programmeDay'+n+'">',html+='<h2 class="mb-0"><button class="btn btn-link btn-block text-white font-weight-bold" type="button" id="day'+n+'" data-toggle="collapse" data-target="#programme'+n+'" aria-expanded="'+(n==r?"true":"false")+'" aria-controls="programme'+n+'">',html+=t+"</button></h2></div>",html+='<div id="programme'+n+'" class="collapse'+(n==r?" show":"")+'" aria-labelledby="programmeDay'+n+'" data-parent="#programme">',html+='<ul class="list-unstyled prg-day mb-0 border-0 rounded-0">',$.each(e,function(t,e){"Break"==e.type?(html+='<li class="media p-3 bg-light border-bottom rounded-0" id="session-'+n+'"><div class="media-body text-center text-muted">',""!=e.description&&(html+=e.description),html+="</div></li>"):(html+='<li class="media prg-row p-3 rounded bg-light border-bottom rounded-0" id="session-'+e.id+'"><div class="mr-3"><div class="badge badge-primary text-capitalize mb-2 mr-3">'+e.type+"</div>",html+='<div class="mb-1 small"><span alt="A clock" class="d-inline-block prg-icon-timing prg-icon-start mr-2"></span><span class="d-inline-block prg-text-timing">Starts at <span class="prg-timing"><span></span>'+timestr(new Date(Date.parse(e.start_time)))+"</span></div>",html+='<div class="mt-1 small"><span alt="A stopwatch" class="d-inline-block prg-icon-timing prg-icon-end mr-2"></span><span class="d-inline-block prg-text-timing">Ends at <span class="prg-timing"><span></span>'+timestr(new Date(Date.parse(e.end_time)))+"</span>",html+="</div></div>",html+='<div class="media-body">',""!=e.youtube&&(html+='<div class="float-right"><a href="'+e.youtube+'" title="Watch the session on YouTube" class="d-block prg-icon-yt mr-4"><span class="sr-only">Watch on YouTube</span></a></div>'),html+='<h4 class="text-primary mt-0 mb-1">'+e.title+"</h4>",""!=e.presenters&&(html+=e.presenters),""!=e.chairs&&(html+='<em class="small">Chaired by '+e.chairs+"</em>"),0<e.presentations.length&&(html+='<ol class="list-group mt-3">',$.each(e.presentations,function(t){presentation=e.presentations[t],html+='<li class="list-group-item pb-3">',presentation.acmdl&&(html+='<div class="float-right">',html+='<a href="'+presentation.acmdl+'" title="See the paper in the ACM Digital Library" class="d-block prg-inner-icon prg-icon-acmdl"><span class="sr-only">View paper on the ACM DL</span></a>',html+="</div>"),html+="<strong>"+presentation.title+("Panel"!=presentation.type?' <span class="badge badge-secondary">'+presentation.type+"</span>":"")+"</strong><br>",html+=presentation.authors+"</li>"}),html+="</ol>"),html)}),html+="</ul></div>",html+="</div>",a.append(html),n++})})});
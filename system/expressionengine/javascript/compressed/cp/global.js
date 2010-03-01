/*jslint browser: true, onevar: true, undef: true, nomen: true, eqeqeq: true, plusplus: true, bitwise: true, regexp: true, strict: true, newcap: true, immed: true */
"use strict";if(typeof console==="undefined"||!console.log){console={log:function(){return false}}}jQuery(document).ready(function(){var d=jQuery;d(document).bind("ajaxComplete",function(f,g){if(g.status&&(+g.status)===401){window.location=EE.BASE+"&"+g.responseText}});EE.create_searchbox=function(){var g=document.createElement("input"),f;if("placeholder" in g){f=function(i,h){this.setAttribute("type","search");d(this).attr({autosave:h,results:"10",placeholder:i})}}else{f=function(j){var i=d(this),h=i.css("color");i.focus(function(){i.css("color",h);if(i.val()===j){i.val("")}}).blur(function(){if(i.val()===""||i.val===j){i.val(j).css("color","#888")}}).trigger("blur")}}EE.create_searchbox=function(h,j,i){h=document.getElementById(h);if(h){f.call(h,j,i)}};EE.create_searchbox.apply(EE.create_searchbox,arguments)};EE.create_searchbox("cp_search_keywords",EE.lang.search,"ee_cp_search");EE.create_searchbox("template_keywords",EE.lang.search_template,"ee_template_search");d('a[rel="external"]').click(function(){window.open(this.href);return false});function b(){var j=EE.SESS_TIMEOUT-60000,g=EE.XID_TIMEOUT-60000,f=(j<g)?j:g,h=false,k,i;i=function(){d.ajax({type:"POST",dataType:"json",url:EE.BASE+"&C=login&M=refresh_xid",success:function(l){d("input[name='XID']").val(l.xid);EE.XID=l.xid;setTimeout(i,g)}})};k=function(){var m='<form><div id="logOutWarning" style="text-align:center"><p>'+EE.lang.session_expiring+'</p><label for="username">'+EE.lang.username+'</label>: <input type="text" id="log_backin_username" name="username" value="" style="width:100px" size="35" dir="ltr" id="username" maxlength="32"  />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label for="password">'+EE.lang.password+'</label>: <input class="field" id="log_backin_password" type="password" name="password" value="" style="width:100px" size="32" dir="ltr" id="password" maxlength="32"  />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="submit" id="submit" name="submit" value="'+EE.lang.login+'" class="submit" /><span id="logInSpinner"></span></div></form>',l;if(h===true){finalLogOutTimer();return false}else{setTimeout(finalLogOutTimer,f)}d.ee_notice(m,{type:"custom",open:true,close_on_click:false});l=d("#logOutWarning");l.find("#log_backin_username").focus();l.find("input#submit").click(function(){var q=l.find("input#log_backin_username").val(),o=l.find("input#log_backin_password").val(),n=d(this),p=l.find("span#logInSpinner");n.hide();p.html('<img src="'+EE.PATH_CP_GBL_IMG+'loader_blackbg.gif" />');d.ajax({type:"POST",dataType:"json",url:EE.BASE+"&C=login&M=authenticate&is_ajax=true",data:{username:q,password:o,XID:EE.XID},success:function(r){clearTimeout(k);if(r.messageType==="success"){d("input[name='XID']").val(r.xid);l.slideUp("fast");d.ee_notice(r.message,{type:"custom",open:true});EE.XID=r.xid;h=true;setTimeout(k,f)}else{if(r.messageType==="failure"){l.before('<div id="loginCheckFailure">'+r.message+"</div>");p.hide("fast");n.css("display","inline")}else{if(r.messageType==="logout"){window.location.href=EE.BASE+"&C=login&M=logout&auto_expire=true"}}}}});return false})};if(EE.SESS_TYPE=="c"){setTimeout(i,g)}else{setTimeout(k,f)}}finalLogOutTimer=function(){var i=d('<div id="logOutConfirm">'+EE.lang.session_timeout+" </div>"),g=30,h=g,f,j,m,k;m=function(){window.location=EE.BASE+"&C=login&M=logout&auto_expire=true"};k=function(){if(g<1){return setTimeout(m,0)}else{if(g===h){d(window).bind("unload.logout",m)}}i.dialog("option","title",EE.lang.logout+" ("+(g--||"...")+")");f=setTimeout(k,1000)};function l(){clearTimeout(f);d(window).unbind("unload.logout");g=h}j={Cancel:function(){d(this).dialog("close")}};j[EE.lang.logout]=m;i.dialog({autoOpen:false,resizable:false,modal:true,title:EE.lang.logout,position:"center",minHeight:"0px",buttons:j,beforeclose:l});d("#logOutConfirm").dialog("open");d(".ui-dialog-buttonpane button:eq(2)").focus();k();return false};if(EE.SESS_TIMEOUT){b()}function e(){var g={revealSidebarLink:"77%",hideSidebarLink:"100%"},i=d("#mainContent"),j=d("#sidebarContent"),h=i.height(),f=j.height(),k;if(EE.CP_SIDEBAR_STATE==="off"){i.css("width","100%");d("#revealSidebarLink").css("display","block");d("#hideSidebarLink").hide();j.show();f=j.height();j.hide()}else{j.hide();h=i.height();j.show()}k=f>h?f:h;d("#revealSidebarLink, #hideSidebarLink").click(function(){var n=d(this),l=n.siblings("a"),m=(this.id==="revealSidebarLink");d("#sideBar").css({position:"absolute","float":"",right:"0"});n.hide();l.css("display","block");j.slideToggle();i.animate({width:g[this.id],height:m?k:h},function(){d("#sideBar").css({position:"","float":"right"})});return false})}e();function a(){var k=d(".notice").filter("p.js_hide"),g={success:"message_success",notice:"message",error:"message_failure"},l=[],f=0,h,j;for(h in g){if(EE.flashdata.hasOwnProperty(g[h])){if(h==="error"){j=k.filter(".failure").slice(0,1)}else{if(h==="success"){j=k.filter(".success").slice(0,1)}else{j=k.slice(0,1)}}l[f++]={message:EE.flashdata[g[h]],type:h};j.remove()}}if(l.length){d.ee_notice(l)}}if(EE.flashdata!==undefined){a()}EE.notepad=(function(){var j=d("#notePad"),h=d("#notepad_form"),g=d("#notePadTextEdit"),i=d("#notePadControls"),l=d("#notePadText").removeClass("js_show"),f=l.text(),k=g.val();return{init:function(){if(k){l.html(k.replace(/</ig,"&lt;").replace(/>/ig,"&gt;").replace(/\n/ig,"<br />"))}j.click(EE.notepad.show);i.find("a.cancel").click(EE.notepad.hide);h.submit(EE.notepad.submit);i.find("input.submit").click(EE.notepad.submit);g.autoResize()},submit:function(){k=d.trim(g.val());var m=k.replace(/</ig,"&lt;").replace(/>/ig,"&gt;").replace(/\n/ig,"<br />");g.attr("readonly","readonly").css("opacity",0.5);i.find("#notePadSaveIndicator").show();d.post(h.attr("action"),{notepad:k,XID:EE.XID},function(n){l.html(m||f).show();g.attr("readonly","").css("opacity",1).hide();i.hide().find("#notePadSaveIndicator").hide()},"json");return false},show:function(){if(i.is(":visible")){return false}var m="";if(l.hide().text()!==f){m=l.html().replace(/<br>/ig,"\n").replace(/&lt;/ig,"<").replace(/&gt;/ig,">")}i.show();g.val(m).show().height(0).focus().trigger("keypress")},hide:function(){l.show();g.hide();i.hide();return false}}}());EE.notepad.init();d("#accessoryTabs li a").click(function(){var f=d(this).parent("li"),g=d("#"+this.className);if(f.hasClass("current")){g.hide();f.removeClass("current")}else{if(f.siblings().hasClass("current")){g.show().siblings(":not(#accessoryTabs)").hide();f.siblings().removeClass("current")}else{g.slideDown()}f.addClass("current")}return false});function c(){var h=d("#search"),g=h.clone(),i=d("#cp_search_form").find(".searchButton"),f;f=function(){var j=d(this).attr("action"),k={cp_search_keywords:d("#cp_search_keywords").attr("value")};d.ajax({url:j+"&ajax=y",data:k,beforeSend:function(){i.toggle()},success:function(l){i.toggle();h=h.replaceWith(g);g.html(l);d("#cp_reset_search").click(function(){g=g.replaceWith(h);d("#cp_search_form").submit(f);d("#cp_search_keywords").select();return false})},dataType:"html"});return false};d("#cp_search_form").submit(f)}c();d("h4","#quickLinks").click(function(){window.location.href=EE.BASE+"&C=myaccount&M=quicklinks"}).add("#notePad").hover(function(){d(".sidebar_hover_desc",this).show()},function(){d(".sidebar_hover_desc",this).hide()}).css("cursor","pointer");d("#activeUser").one("mouseover",function(){var k=d('<div id="logOutConfirm">'+EE.lang.logout_confirm+" </div>"),g=30,i=g,m,j,l,h;l=function(){d.ajax({url:EE.BASE+"&C=login&M=logout",async:(!d.browser.safari)});window.location=EE.BASE+"&C=login&M=logout"};h=function(){if(g<1){return setTimeout(l,0)}else{if(g===i){d(window).bind("unload.logout",l)}}k.dialog("option","title",EE.lang.logout+" ("+(g--||"...")+")");m=setTimeout(h,1000)};function f(){clearTimeout(m);d(window).unbind("unload.logout");g=i}j={Cancel:function(){d(this).dialog("close")}};j[EE.lang.logout]=l;k.dialog({autoOpen:false,resizable:false,modal:true,title:EE.lang.logout,position:"center",minHeight:"0px",buttons:j,beforeclose:f});d("a.logOutButton",this).click(function(){d("#logOutConfirm").dialog("open");d(".ui-dialog-buttonpane button:eq(2)").focus();h();return false})});d(".js_show").show()});
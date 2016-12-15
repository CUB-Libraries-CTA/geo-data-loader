$(function() {
    //Customize by setting base_url to cybercom/api docker application
    base_url = "/api";
    //No other alterations is need to get the standard applicaiton running!
    login_url = base_url + "/api-auth/login/?next=";
    logout_url = base_url + "/api-auth/logout/?next=";
    user_task_url = base_url + "/queue/usertasks/.json?page_size=10";
    user_url = base_url + "/user/?format=json";
    prevlink=null;nextlink=null;
    set_auth(base_url,login_url);
    $("#aprofile").click(function(){activaTab('profile')})
    $("#alogout").click(function(){window.location = logout_url.concat(document.URL);})
    load_task_history(user_task_url);
    $('#prevlink').click(function(){load_task_history(prevlink);});
    $('#nextlink').click(function(){load_task_history(nextlink);});
    Handlebars.registerHelper('json_metatags', function(context) {
                if (typeof context !== 'undefined') {
                    return JSON.stringify(context).replace(/"/g,'').replace(/\[/g,'').replace(/\]/g,'').replace(/,/g,', ');
                }else{
                    return ""
                } 
    });
    load_example_task();
    //$('#reset_password').click(function(){$('#pass_form').toggle(!$('#pass_form').is(':visible'));});
    //$('#user_form').submit(function(){var formData = JSON.parse($("#user_form").serializeArray());console.log(formData);return false;})
});//End of Document Ready

function load_example_task(){
    addtask_template = Handlebars.templates['tmpl-add-form']
    $('#home').empty()
    $('#home').append(addtask_template({"x":0,"y":0}))

    $('#addTask').click(function(){run_example_task();})
}
function run_example_task(){
    add_url = "/api/queue/run/cybercomq.tasks.tasks.add/.json"
    task_name = "cybercomq.tasks.tasks.add"
    form_data=$('#addTaskForm').serializeObject()
    cybercom_submit_task(add_url,task_name,[parseInt(form_data.x),parseInt(form_data.y)],{},"task_result")
}
function submit_user(){
    console.log(user_url)
    $.post( user_url,$('#user_form').serializeObject(),function(data){
        data.csrftoken = getCookie('csrftoken')
        $('#profile').empty();
        //source = $('#user-template').html()
        //user_template = Handlebars.compile(source);
        user_template = Handlebars.templates['tmpl-user']
        $('#profile').append(user_template(data))
        $('#user_form').hide()
        $('#view_form').show()
        $('#reset_password').click(function(){$('#pass_form').toggle(!$('#pass_form').is(':visible'));});
    })
    .fail(function(){ alert("Error Occured on User Update.")});
    //$('#user_form').hide()
    //$('#view_form').show()
    //var formData = JSON.parse($("#user_form").serializeArray());
    //console.log(formData);
    return false;
}
function edit_user(){
    $('#user_form').show()
    $('#view_form').hide()
    return false;
}
function set_password(){
    pass = $('#pass_form').serializeObject()
    if (pass.password !== pass.password2){
        alert("Passwords were not identical")
        return false;

    }
    $.post( user_url,$('#pass_form').serializeObject(),function(data){
        $('#reset_password').click(function(){$('#pass_form').toggle(!$('#pass_form').is(':visible'));});
        alert(JSON.stringify(data))
    })
    .fail(function(){ alert("Error Occured on Password Reset.")});
    return false;
}
function set_auth(base_url,login_url){
    $.getJSON( base_url + "/user/.json",function(data){
        $('#user').html(data['username'].concat( ' <span class="caret"></span> '));
        $("#user").append($('<img style="border-radius:80px;">').attr("src",data['gravator_url'] + "?s=40&d=mm") );
        data.csrftoken = getCookie('csrftoken')
        //source = $('#user-template').html()
        //user_template = Handlebars.compile(source);
        user_template = Handlebars.templates['tmpl-user']
        $('#profile').append(user_template(data))
        $('#user_form').hide()
        $('#view_form').show() 
        $('#reset_password').click(function(){$('#pass_form').toggle(!$('#pass_form').is(':visible'));});
    })
    .fail(function() {
        var slink = login_url.concat(document.URL);
        window.location = slink
    });
}
function activaTab(tab){
    $('a[href="#' + tab + '"]').tab('show')
};
function load_task_history(url){
    $.getJSON(url, function(data){
    prevlink = data.previous;
    nextlink = data.next;
    if (prevlink == null){$('#li_prevlink').addClass("disabled");} else {$('#li_prevlink').removeClass("disabled");};
    if (nextlink == null){$('#li_nextlink').addClass("disabled");} else {$('#li_nextlink').removeClass("disabled");};
    setTaskDisplay(data);
    //source = $('#tr-template').html();
    //tr_template = Handlebars.compile(source);
    tr_template = Handlebars.templates['tmpl-tr']
    $('#result_tbody').html("")//clear table
    $.each(data.results, function(i, item) {
        temp=item.task_name.split('.')
        item['task_name']= temp[temp.length-1]
        item.timestamp = item.timestamp.substring(0,19).replace('T',' ')
        $('#result_tbody').append(tr_template(item)) 
    });
    });
}
function setTaskDisplay(data){
    if (data.count <= data.meta.page_size){
        $('#task_count').text('Task 1 - ' + data.count +  ' Total ' + data.count );
    }else{
        rec_start = data.meta.page_size*data.meta.page - data.meta.page_size +1;
        rec_end = "";
        if(data.meta.page_size*data.meta.page >= data.count){
            rec_end = data.count;
        }else{
            rec_end = data.meta.page_size*data.meta.page;
        }   
        $('#task_count').text('Task ' + rec_start + ' - ' + rec_end  +  ' Total ' + data.count )
    }

}
//Cybercommons task result showResult()
function showResult(url){
    //myModalLabel -->title
    $.getJSON(url + ".json" , function(data){
        json_data = JSON.stringify(data,null, 4);
        $("#myModalbody").html(json_data);
        $("#myModalbody").urlize();
        $("#myModal").modal('show');
    });
}
//Cybercommons example submit add task. 
function cybercom_submit_task(task_url,task_name,task_args,task_kwargs,html_result){
    //"cybercomq.tasks.tasks.add"
    //get and set task_data
    task_data = $.getCYBERCOM_JSON_OBJECT(task_name);
    task_data.args=task_args;
    task_data.kwargs=task_kwargs;
    //call add task and poll for status
    $.postJSON(task_url,task_data,function(data){
            cybercom_poll(data.result_url,html_result);
            load_task_history(user_task_url);
    });
}
//Example general display status to console.log. Used in cybercom_poll!
//Customize tomake success, fail, and pending functions. This is general status function!
function general_status(data,html_result){
    console.log(JSON.stringify(data.result,null, 4));
    $('#' + html_result).empty();
    $('#' + html_result).append(JSON.stringify(data.result,null, 4));
}
//Cybercommons polling task status
function cybercom_poll(url,html_result){
    $.getJSON( url , function(data) {
            if (data.result.status=="PENDING"){
                //cybercom_pending used to adjust html items to allow user response
                //Example: $('#task_result').empty();$('#task_result').append("<pre>" + JSON.stringify(data.result,null, 4) + "</pre>");
                general_status(data,html_result);
                //Set timeout to 3 seconds
                setTimeout(function() { cybercom_poll(url,html_result); }, 3000);
            };
            if (data.result.status=="SUCCESS"){
                //cybercom_success used to adjust html items to allow user response
                //Example: $('#task_result').empty();$('#task_result').append("<pre>" + JSON.stringify(data.result,null, 4) + "</pre>");
                //          $('#task_result').urlize();
                general_status(data,html_result);
            };
            if (data.result.status=="FAILURE"){
                //cybercom_fail used to adjust html items to allow user response
                //Example: $('#task_result').empty();$('#task_result').append("<pre>" + JSON.stringify(data.result,null, 4) + "</pre>");
                general_status(data,html_result);
            };
       });
}
//Default JSON object to submit to cybercommons api task queue
$.getCYBERCOM_JSON_OBJECT = function(task_name){
    return {"function": task_name,"queue": "celery","args":[],"kwargs":{},"tags":[]};
}
//postJSON is custom call for post to cybercommons api
$.postJSON = function(url, data, callback,fail) {
    return jQuery.ajax({
        'type': 'POST',
        'url': url,
        'contentType': 'application/json',
        'data': JSON.stringify(data),
        'dataType': 'json',
        'success': callback,
        'error':fail,
        'beforeSend':function(xhr, settings){
            xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
        }
    });
}
//Used to serialize form object to get form data
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
}
//add links to http and https items
jQuery.fn.urlize = function() {
    if (this.length > 0) {
        this.each(function(i, obj){
            // making links active
            var x = $(obj).html();
            var list = x.match( /\b(http:\/\/|www\.|http:\/\/www\.)[^ <]{2,200}\b/g );
            if (list) {
                for ( i = 0; i < list.length; i++ ) {
                    var prot = list[i].indexOf('http://') === 0 || list[i].indexOf('https://') === 0 ? '' : 'http://';
                    x = x.replace( list[i], "<a target='_blank' href='" + prot + list[i] + "'>"+ list[i] + "</a>" );
                }

            }
            $(obj).html(x);
        });
    }
};
//get cookie Value
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

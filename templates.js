!function(){var a=Handlebars.template,l=Handlebars.templates=Handlebars.templates||{};l["tmpl-add-form"]=a({compiler:[7,">= 4.0.0"],main:function(a,l,n,e,s){var t,o=n.helperMissing,r="function",m=a.escapeExpression;return'        <form id="addTaskForm" class="form-stacked">\n            <fieldset>\n            <div class="">\n		<div class="form-group">\n                    <label for="x"> x </label>\n                    <input type="x" name="x" class="form-control input-sm" id="x" value='+m((t=null!=(t=n.x||(null!=l?l.x:l))?t:o,typeof t===r?t.call(l,{name:"x",hash:{},data:s}):t))+'>\n                </div>\n                <div class="form-group">\n                    <label for="y"> y </label>\n                    <input type="y" name="y" class="form-control input-sm" id="y" value='+m((t=null!=(t=n.y||(null!=l?l.y:l))?t:o,typeof t===r?t.call(l,{name:"y",hash:{},data:s}):t))+'>\n                </div>\n                <button id="addTask" class="btn btn-info-outline btn-success" type="button">Add Task</button>\n            </div>\n            </fieldset>\n        </form>\n'},useData:!0}),l["tmpl-tr"]=a({compiler:[7,">= 4.0.0"],main:function(a,l,n,e,s){var t,o=n.helperMissing,r="function",m=a.escapeExpression;return'<tr><td><a href="#" onclick="showResult(\''+m((t=null!=(t=n.result||(null!=l?l.result:l))?t:o,typeof t===r?t.call(l,{name:"result",hash:{},data:s}):t))+"');return false;\" >"+m((t=null!=(t=n.task_name||(null!=l?l.task_name:l))?t:o,typeof t===r?t.call(l,{name:"task_name",hash:{},data:s}):t))+"</a></td><td>"+m((t=null!=(t=n.timestamp||(null!=l?l.timestamp:l))?t:o,typeof t===r?t.call(l,{name:"timestamp",hash:{},data:s}):t))+"</td><td>"+m((n.json_metatags||l&&l.json_metatags||o).call(l,null!=l?l.tags:l,{name:"json_metatags",hash:{},data:s}))+"</td></tr>\n"},useData:!0}),l["tmpl-user"]=a({compiler:[7,">= 4.0.0"],main:function(a,l,n,e,s){var t,o=n.helperMissing,r="function",m=a.escapeExpression;return'      <h2>User Profile</h2>\n      <div id="user_profile">\n          <div id="photo" class="col-md-2" style="width:200px ">\n            <img src="'+m((t=null!=(t=n.gravator_url||(null!=l?l.gravator_url:l))?t:o,typeof t===r?t.call(l,{name:"gravator_url",hash:{},data:s}):t))+'?s=180&d=mm"><br><br>\n            <a href="https://en.gravatar.com/" target="_blank" style="clear:both;">Profile Image</a><br><br>\n            <a id="reset_password" style="clear:both;">Reset Password</a>\n          </div>\n          <form  id="view_form" class="form-horizontal col-md-4" onsubmit="return edit_user();">\n              <div class="form-group">\n                <label class="col-md-3 control-label">Username</label>\n                  <div class="col-md-09">\n                <p class="form-control-static">'+m((t=null!=(t=n.username||(null!=l?l.username:l))?t:o,typeof t===r?t.call(l,{name:"username",hash:{},data:s}):t))+'</p>\n                </div>\n            </div>\n             <div class="form-group">\n                  <label class="col-md-3 control-label">Name</label>\n                    <div class="col-md-09">\n                  <p class="form-control-static">'+m((t=null!=(t=n.name||(null!=l?l.name:l))?t:o,typeof t===r?t.call(l,{name:"name",hash:{},data:s}):t))+'</p>\n                  </div>\n            </div>\n              <div class="form-group">\n                <label class="col-md-3 control-label">Email</label>\n                  <div class="col-md-09">\n                    <p class="form-control-static">'+m((t=null!=(t=n.email||(null!=l?l.email:l))?t:o,typeof t===r?t.call(l,{name:"email",hash:{},data:s}):t))+'</p>\n                 </div>\n             </div>\n             <button type="submit" id="form_submit" class="btn btn-default pull-right" style="margin-right:40px;">Edit</button>\n         </form>\n          <form class="col-md-4" id="user_form" onsubmit="return submit_user();">\n              <div style="display:none">\n                  <input type="hidden" name="csrfmiddlewaretoken" value="'+m((t=null!=(t=n.csrftoken||(null!=l?l.csrftoken:l))?t:o,typeof t===r?t.call(l,{name:"csrftoken",hash:{},data:s}):t))+'"/>\n             </div>\n              <div class="form-group">\n                 <label for="first_name">First Name</label>\n                  <input type="text" class="form-control" name="first_name" placeholder="John" value="'+m((t=null!=(t=n.first_name||(null!=l?l.first_name:l))?t:o,typeof t===r?t.call(l,{name:"first_name",hash:{},data:s}):t))+'">\n             </div>\n              <div class="form-group">\n                   <label for="last_name">Last Name</label>\n                    <input type="text" class="form-control" name="last_name" placeholder="Doe" value="'+m((t=null!=(t=n.last_name||(null!=l?l.last_name:l))?t:o,typeof t===r?t.call(l,{name:"last_name",hash:{},data:s}):t))+'">\n               </div>\n              <div class="form-group">\n                 <label for="email">Email address</label>\n                  <input type="email" class="form-control" name="email" placeholder="Enter email" value="'+m((t=null!=(t=n.email||(null!=l?l.email:l))?t:o,typeof t===r?t.call(l,{name:"email",hash:{},data:s}):t))+'">\n             </div>\n             <button type="submit" id="form_submit" class="btn btn-default pull-right">Update</button>\n         </form>\n         <div class="row" style="width:100%;clear:both;"></div>\n          <form class="form-inline" id="pass_form" onsubmit="return set_password();" style="display:none">\n            <div style="display:none">\n                    <input type="hidden" name="csrfmiddlewaretoken" value="'+m((t=null!=(t=n.csrftoken||(null!=l?l.csrftoken:l))?t:o,typeof t===r?t.call(l,{name:"csrftoken",hash:{},data:s}):t))+'"/>\n           </div>\n            <div class="form-group">\n             <label for="password">New Password</label>\n              <input type="password" class="form-control" name="password" placeholder="New Password">\n           </div>\n            <div class="form-group">\n             <label for="password2">Retype New Password</label>\n              <input type="password" class="form-control" name="password2" placeholder="Retype New Password">\n           </div>\n           <button type="submit" class="btn btn-default">Set Password</button>\n         </form>\n     </div>\n'},useData:!0})}();

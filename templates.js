!function(){var n=Handlebars.template,l=Handlebars.templates=Handlebars.templates||{};l["tmpl-add-form"]=n({compiler:[7,">= 4.0.0"],main:function(n,l,a,e,t){var i,s=null!=l?l:n.nullContext||{},o=a.helperMissing,d=n.escapeExpression;return'<h3> Example Add Task </h3>\n<form id="addTaskForm" class="form-stacked">\n    <fieldset>\n    <div class="col-md-4">\n        <div class="form-group">\n            <label for="x"> x </label>\n            <input type="x" name="x" class="form-control input-sm" id="x" value='+d((i=null!=(i=a.x||(null!=l?l.x:l))?i:o,"function"==typeof i?i.call(s,{name:"x",hash:{},data:t}):i))+'>\n        </div>\n        <div class="form-group">\n            <label for="y"> y </label>\n            <input type="y" name="y" class="form-control input-sm" id="y" value='+d((i=null!=(i=a.y||(null!=l?l.y:l))?i:o,"function"==typeof i?i.call(s,{name:"y",hash:{},data:t}):i))+'>\n        </div>\n        <button id="addTask" class="btn btn-info-outline btn-primary" type="button">Add Task</button>\n    </div>\n    </fieldset>\n</form>\n<div class="col-md-6"><pre id="task_result"></pre></div>\n'},useData:!0}),l["tmpl-dropzone"]=n({compiler:[7,">= 4.0.0"],main:function(n,l,a,e,t){var i,s=null!=l?l:n.nullContext||{},o=a.helperMissing,d=n.escapeExpression;return'<div id="helptxt" style="margin:0 0 20 28;">\n  <h3>GeoLibrary Data Import </h3>\n  <ol>\n    <li>Drag and drop zip files or click Dropzone for file selection</li>\n    <li>Once file is selected the workflow process will begin</li>\n    <li>The result will be a populated form that has been crosswalked from available xml metadata</li>\n    <li> Click generate schema</li>\n    <li> Dialog box populated with geoblacklight schema.</li>\n    <li> Double check metadata save and index data</li>\n  </ol>\n</div>\n<div id="dropzone" class="center">\n  <form id="dropzone1" action="/api/upload/" class="dropzone needsclick">\n    <div style="display:none">\n      <input type="hidden" name="csrfmiddlewaretoken" value="'+d((i=null!=(i=a.csrftoken||(null!=l?l.csrftoken:l))?i:o,"function"==typeof i?i.call(s,{name:"csrftoken",hash:{},data:t}):i))+'" />\n    </div>\n    <div style="display:none">\n      <input type="hidden" name="callback" value="'+d((i=null!=(i=a.task||(null!=l?l.task:l))?i:o,"function"==typeof i?i.call(s,{name:"task",hash:{},data:t}):i))+'" />\n    </div>\n    <div style="display:none">\n      <input type="hidden" name="tags" value="'+d((i=null!=(i=a.tags||(null!=l?l.tags:l))?i:o,"function"==typeof i?i.call(s,{name:"tags",hash:{},data:t}):i))+'" />\n    </div>\n    <div class="dz-message needsclick center">\n      <strong>Drop zip files here or click to upload.</strong>\n    </div>\n  </form>\n</div>\n<script>\n  Dropzone.autoDiscover = false;\n  $("#dropzone1").dropzone({\n    url: "/api/upload/",\n    maxFilesize: 10000,\n    uploadMultiple: false,\n    addRemoveLinks: true,\n    acceptedFiles: ".zip",\n    init: function () {\n      this.on("complete", function (file) {\n        this.removeFile(file);\n      });\n      this.on("success", function (file, response) {\n        console.log(response);\n        load_task_history(user_task_url);\n        showChildResult(response[0].callback.response.result_url);\n      });\n      this.on("error", function (file) {\n        if (!file.accepted) { alert("File must be a zipfile."); }\n        this.removeFile(file);\n      });\n    }\n  });\n<\/script>'},useData:!0}),l["tmpl-geolibrary-form"]=n({compiler:[7,">= 4.0.0"],main:function(n,l,a,e,t){var i,s=n.lambda,o=n.escapeExpression;return'<h3>Geoblacklight Schema</h3>\n<form id="geoblacklightform" action="" class="">\n    <div style="display:none">\n        <input type="hidden" name="status" value="'+o(s(null!=(i=null!=l?l.data:l)?i.status:i,l))+'" />\n    </div>\n    <div style="display:none">\n        <input type="hidden" name="style" value="'+o(s(null!=(i=null!=l?l.data:l)?i.style:i,l))+'" />\n    </div>\n    <div style="display:none">\n        <input type="hidden" name="dct_references_s" value="'+o(s(null!=(i=null!=l?l.data:l)?i.dct_references_s:i,l))+'" />\n    </div>\n    <div style="display:none">\n        <input type="hidden" name="uuid" value="'+o(s(null!=(i=null!=l?l.data:l)?i.uuid:i,l))+'" />\n    </div>\n    <div style="display:none">\n        <input type="hidden" name="dc_identifier_s" value="'+o(s(null!=(i=null!=l?l.data:l)?i.dc_identifier_s:i,l))+'" />\n    </div>\n    <div style="display:none">\n        <input type="hidden" name="layer_id_s" value="'+o(s(null!=(i=null!=l?l.data:l)?i.layer_id_s:i,l))+'" />\n    </div>\n    <div style="display:none">\n        <input type="hidden" name="dc_language_s" value="'+o(s(null!=(i=null!=l?l.data:l)?i.dc_language_s:i,l))+'" />\n    </div>\n    <div style="display:none">\n        <input type="hidden" name="dct_provenance_s" value="'+o(s(null!=(i=null!=l?l.data:l)?i.dct_provenance_s:i,l))+'" />\n    </div>\n    <div style="display:none">\n        <input type="hidden" name="dct_type_s" value="'+o(s(null!=(i=null!=l?l.data:l)?i.dct_type_s:i,l))+'" />\n    </div>\n    <div style="display:none">\n        <input type="hidden" name="layer_slug_s" value="'+o(s(null!=(i=null!=l?l.data:l)?i.layer_slug_s:i,l))+'" />\n    </div>\n    <div style="display:none">\n        <input type="hidden" name="dc_type_s" value="'+o(s(null!=(i=null!=l?l.data:l)?i.dc_type_s:i,l))+'" />\n    </div>\n    <div id="geolayers" class="form-group">\n    </div>\n    <div class="form-group">\n        <label for="dc_title_s">Title</label>\n        <input type="text" class="form-control" name="dc_title_s" value="'+o(s(null!=(i=null!=l?l.data:l)?i.dc_title_s:i,l))+'" />\n    </div>\n    <div class="form-group">\n        <label for="dc_description_s">Description</label>\n        <textarea name="dc_description_s" class="form-control" rows="10"\n            cols="60">'+o(s(null!=(i=null!=l?l.data:l)?i.dc_description_s:i,l))+'</textarea>\n    </div>\n    <div class="form-group">\n        <label for="dc_rights_s">Rights</label>\n        <select name="dc_rights_s" class="form-control" value='+o(s(null!=(i=null!=l?l.data:l)?i.dc_rights_s:i,l))+'>\n            <option value="Public">Public</option>\n            <option value="Restricted">Restricted</option>\n        </select>\n    </div>\n    <div class="form-group">\n        <label for="layer_geom_type_s">Geometry Type</label>\n        <select id="layer_geom_type_s" class="form-control" name="layer_geom_type_s">\n            <option value="Raster">Raster</option>\n            <option value="Polygon">Polygon</option>\n            <option value="Point">Point</option>\n            <option value="Line">Line</option>\n            <option value="MultiPolygon">MultiPolygon</option>\n            <option value="MultiPoint">MultiPoint</option>\n            <option value="MultiLineString">MultiLineString</option>\n            <option value="UNDETERMINED">UNDETERMINED</option>\n            <option value="Image">Image</option>\n            <option value="Mixed">Mixed</option>\n            <option value="Paper Map">Paper Map</option>\n        </select>\n    </div>\n    <div class="form-group">\n        <label for="dc_format_s">File Format</label>\n        <select id="dc_format_s" class="form-control" name="dc_format_s">\n            <option value="Shapefile">Shapefile</option>\n            <option value="GeoTiff">GeoTiff</option>\n            <option value="Scanned Map">Scanned Map</option>\n            <option value="File">File</option>\n        </select>\n    </div>\n    <div class="form-group">\n        <label for="dc_publisher_s">Publisher</label>\n        <input class="form-control" type="text" name="dc_publisher_s" value="'+o(s(null!=(i=null!=l?l.data:l)?i.dc_publisher_s:i,l))+'" />\n    </div>\n\n    <div class="form-group">\n        <label for="dct_issued_s">Date Issued</label>\n        <input class="form-control" type="text" name="dct_issued_s" value="'+o(s(null!=(i=null!=l?l.data:l)?i.dct_issued_s:i,l))+'" />\n    </div>\n    <div class="form-group">\n        <label for="dc_creator_sm1">Creator List</label>\n        <input class="form-control" type="text" name="dc_creator_sm1" value="'+o(s(null!=(i=null!=l?l.data:l)?i.dc_creator_sm1:i,l))+'" />\n    </div>\n    <div class="form-group">\n        <label for="dc_subject_sm1">Subject List</label>\n        <input class="form-control" type="text" name="dc_subject_sm1" value="'+o(s(null!=(i=null!=l?l.data:l)?i.dc_subject_sm1:i,l))+'" />\n    </div>\n    <div class="form-group">\n        <label for="dct_temporal_sm1">Temporal List</label>\n        <input class="form-control" type="text" name="dct_temporal_sm1" value="'+o(s(null!=(i=null!=l?l.data:l)?i.dct_temporal_sm1:i,l))+'" />\n    </div>\n    <div class="form-group">\n        <label for="dct_spatial_sm1">Spatial List</label>\n        <input class="form-control" type="text" name="dct_spatial_sm1" value="'+o(s(null!=(i=null!=l?l.data:l)?i.dct_spatial_sm1:i,l))+'" />\n    </div>\n    <div class="form-group">\n        <label for="BoundBox">Bounding Box</label>\n        <input class="form-control" type="text" name="solr_geom" value="'+o(s(null!=(i=null!=l?l.data:l)?i.solr_geom:i,l))+'" />\n    </div>\n    <button class="btn btn-primary" type="button" id="getblight">Get Schema</button>\n</form>'},useData:!0}),l["tmpl-geolibrary-new"]=n({compiler:[7,">= 4.0.0"],main:function(n,l,a,e,t){var i,s=n.lambda,o=n.escapeExpression;return'<div class="">\n  <div class="row">\n    <button class="btn btn-primary" type="button" style="float:right;margin-right:10px;" onclick="resetDZexit()">Exit\n      Data\n      Import</button>\n    <div class="col-sm-6">\n      <h3>XML Data</h3>\n      <div id="selectxml" style="margin:10px;padding-top:10px">\n      </div>\n      <pre id="xmlfilexml"></pre>\n    </div>\n    <div id="geoFormDiv" class="col-sm-6">\n      <h3>Geoblacklight Schema</h3>\n      <form id="geoblacklightform" action="" class="">\n        <div style="display:none">\n          <input type="hidden" name="status" value="'+o(s(null!=(i=null!=l?l.data:l)?i.status:i,l))+'" />\n        </div>\n        <div style="display:none">\n          <input type="hidden" name="style" value="'+o(s(null!=(i=null!=l?l.data:l)?i.style:i,l))+'" />\n        </div>\n        <div style="display:none">\n          <input type="hidden" name="dct_references_s" value="'+o(s(null!=(i=null!=l?l.data:l)?i.dct_references_s:i,l))+'" />\n        </div>\n        <div style="display:none">\n          <input type="hidden" name="uuid" value="'+o(s(null!=(i=null!=l?l.data:l)?i.uuid:i,l))+'" />\n        </div>\n        <div style="display:none">\n          <input type="hidden" name="dc_identifier_s" value="'+o(s(null!=(i=null!=l?l.data:l)?i.dc_identifier_s:i,l))+'" />\n        </div>\n        <div style="display:none">\n          <input type="hidden" name="layer_id_s" value="'+o(s(null!=(i=null!=l?l.data:l)?i.layer_id_s:i,l))+'" />\n        </div>\n        <div style="display:none">\n          <input type="hidden" name="dc_language_s" value="'+o(s(null!=(i=null!=l?l.data:l)?i.dc_language_s:i,l))+'" />\n        </div>\n        <div style="display:none">\n          <input type="hidden" name="dct_provenance_s" value="'+o(s(null!=(i=null!=l?l.data:l)?i.dct_provenance_s:i,l))+'" />\n        </div>\n        <div style="display:none">\n          <input type="hidden" name="dct_type_s" value="'+o(s(null!=(i=null!=l?l.data:l)?i.dct_type_s:i,l))+'" />\n        </div>\n        <div style="display:none">\n          <input type="hidden" name="layer_slug_s" value="'+o(s(null!=(i=null!=l?l.data:l)?i.layer_slug_s:i,l))+'" />\n        </div>\n        <div style="display:none">\n          <input type="hidden" name="dc_type_s" value="'+o(s(null!=(i=null!=l?l.data:l)?i.dc_type_s:i,l))+'" />\n        </div>\n        <div id="geolayers" class="form-group">\n        </div>\n        <div class="form-group">\n          <label for="dc_title_s">Title</label>\n          <input type="text" class="form-control" name="dc_title_s" value="'+o(s(null!=(i=null!=l?l.data:l)?i.dc_title_s:i,l))+'" />\n        </div>\n        <div class="form-group">\n          <label for="dc_description_s">Description</label>\n          <textarea name="dc_description_s" class="form-control" rows="10"\n            cols="60">'+o(s(null!=(i=null!=l?l.data:l)?i.dc_description_s:i,l))+'</textarea>\n        </div>\n        <div class="form-group">\n          <label for="dc_rights_s">Rights</label>\n          <select name="dc_rights_s" class="form-control" value='+o(s(null!=(i=null!=l?l.data:l)?i.dc_rights_s:i,l))+'>\n            <option value="Public">Public</option>\n            <option value="Restricted">Restricted</option>\n          </select>\n        </div>\n        <div class="form-group">\n          <label for="layer_geom_type_s">Geometry Type</label>\n          <select id="layer_geom_type_s" class="form-control" name="layer_geom_type_s">\n            <option value="Raster">Raster</option>\n            <option value="Polygon">Polygon</option>\n            <option value="Point">Point</option>\n            <option value="Line">Line</option>\n            <option value="MultiPolygon">MultiPolygon</option>\n            <option value="MultiPoint">MultiPoint</option>\n            <option value="MultiLineString">MultiLineString</option>\n            <option value="UNDETERMINED">UNDETERMINED</option>\n            <option value="Image">Image</option>\n            <option value="Mixed">Mixed</option>\n            <option value="Paper Map">Paper Map</option>\n          </select>\n        </div>\n        <div class="form-group">\n          <label for="dc_format_s">File Format</label>\n          <select id="dc_format_s" class="form-control" name="dc_format_s">\n            <option value="Shapefile">Shapefile</option>\n            <option value="GeoTiff">GeoTiff</option>\n            <option value="Scanned Map">Scanned Map</option>\n            <option value="File">File</option>\n          </select>\n        </div>\n        <div class="form-group">\n          <label for="dc_publisher_s">Publisher</label>\n          <input class="form-control" type="text" name="dc_publisher_s" value="'+o(s(null!=(i=null!=l?l.data:l)?i.dc_publisher_s:i,l))+'" />\n        </div>\n\n        <div class="form-group">\n          <label for="dct_issued_s">Date Issued</label>\n          <input class="form-control" type="text" name="dct_issued_s" value="'+o(s(null!=(i=null!=l?l.data:l)?i.dct_issued_s:i,l))+'" />\n        </div>\n        <div class="form-group">\n          <label for="dc_creator_sm1">Creator List</label>\n          <input class="form-control" type="text" name="dc_creator_sm1" value="'+o(s(null!=(i=null!=l?l.data:l)?i.dc_creator_sm1:i,l))+'" />\n        </div>\n        <div class="form-group">\n          <label for="dc_subject_sm1">Subject List</label>\n          <input class="form-control" type="text" name="dc_subject_sm1" value="'+o(s(null!=(i=null!=l?l.data:l)?i.dc_subject_sm1:i,l))+'" />\n        </div>\n        <div class="form-group">\n          <label for="dct_temporal_sm1">Temporal List</label>\n          <input class="form-control" type="text" name="dct_temporal_sm1" value="'+o(s(null!=(i=null!=l?l.data:l)?i.dct_temporal_sm1:i,l))+'" />\n        </div>\n        <div class="form-group">\n          <label for="dct_spatial_sm1">Spatial List</label>\n          <input class="form-control" type="text" name="dct_spatial_sm1" value="'+o(s(null!=(i=null!=l?l.data:l)?i.dct_spatial_sm1:i,l))+'" />\n        </div>\n        <div class="form-group">\n          <label for="BoundBox">Bounding Box</label>\n          <input class="form-control" type="text" name="solr_geom" value="'+o(s(null!=(i=null!=l?l.data:l)?i.solr_geom:i,l))+'" />\n        </div>\n        <button class="btn btn-primary" type="button" id="getblight">Get Schema</button>\n      </form>\n\n    </div>\n\n  </div>\n</div>\n<script>\n  $("#layer_geom_type_s").val("'+o(s(null!=(i=null!=l?l.data:l)?i.layer_geom_type_s:i,l))+'");\n  $("#dc_format_s").val("'+o(s(null!=(i=null!=l?l.data:l)?i.dc_format_s:i,l))+'");\n/*\n                            var container = document.getElementById("jsoneditor");\n                            var options = {};\n                            var editor = new JSONEditor(container, options);\n                            editor.set(jsonData)\n                          */\n<\/script>'},useData:!0}),l["tmpl-geoserver-select"]=n({1:function(n,l,a,e,t){var i=n.lambda,s=n.escapeExpression;return'    <option value="'+s(i(null!=l?l.name:l,l))+'">'+s(i(null!=l?l.name:l,l))+"</option>\n"},compiler:[7,">= 4.0.0"],main:function(n,l,a,e,t){var i,s,o=null!=l?l:n.nullContext||{},d=a.helperMissing,r=n.escapeExpression;return'<label for="geoblacklight_status">GeoBlacklight Status</label>\n<select id="geoblacklight_status" name="geoblacklight_status" class="form-control">\n    <option value="indexed">Indexed</option>\n    <option value="notindexed">Not Indexed</option>\n</select>\n<label for="geoserver_style">Geoserver Default Style</label>\n<select id="geoserver_style" name="geoserver_style" class="form-control">\n'+(null!=(i=a.each.call(o,null!=l?l.styles:l,{name:"each",hash:{},fn:n.program(1,t,0),inverse:n.noop,data:t}))?i:"")+'</select>\n<script>\n$("#geoblacklight_status").val("'+r((s=null!=(s=a.status||(null!=l?l.status:l))?s:d,"function"==typeof s?s.call(o,{name:"status",hash:{},data:t}):s))+'");\n$("#geoserver_style").val("'+r((s=null!=(s=a.style||(null!=l?l.style:l))?s:d,"function"==typeof s?s.call(o,{name:"style",hash:{},data:t}):s))+'");\n<\/script>\n'},useData:!0}),l["tmpl-main-geoedit"]=n({compiler:[7,">= 4.0.0"],main:function(n,l,a,e,t){return'<div>\n<div class="form-inline" style="margin-bottom:5px">\n<label class="control-label" for="ssearch">Search</label>\n<input type="text" class="form-control" name="ssearch" id="search" style="min-width:50%;max-width:60%">\n<button class="btn btn-primary" id="submitSearch">Search</button>\n</div>\n<div id="paginate-div" class="col-md-2" style="text-align:center;margin-bottom:10px;">\n    Filter: <input id="filterIII" type="checkbox" > Inactive Status\n</div>\n<table class="table table-bordered" id=\'editmeta\'>\n  <tr>\n      <th>GeoLibrary Indexed Metadata</th>\n      <th class="tablebtn">\n        <button class="btn btn-primary btn-table" onclick="reIndexAll()">Index All</button>\n      </th>\n  </tr>\n  <tbody id=\'tablebody\'>\n  </tbody>\n</table>\n<div id="paginate-div-bt" style="text-align:center"></div>\n<script>\n    $("#filterIII").click(function(){run_search();});\n<\/script>\n'},useData:!0}),l["tmpl-main-tr"]=n({compiler:[7,">= 4.0.0"],main:function(n,l,a,e,t){var i,s=null!=l?l:n.nullContext||{},o=a.helperMissing,d="function",r=n.escapeExpression;return'<tr><td>\n<div>\n    <label style="margin-right:15px">\n        Title:</label><span><em>'+r((i=null!=(i=a.dc_title_s||(null!=l?l.dc_title_s:l))?i:o,typeof i===d?i.call(s,{name:"dc_title_s",hash:{},data:t}):i))+'</em></span>\n    <div style="float:right;">\n    <label style="margin-right:15px">\n        Status:</label><span><em>'+r((i=null!=(i=a.status||(null!=l?l.status:l))?i:o,typeof i===d?i.call(s,{name:"status",hash:{},data:t}):i))+'</em></span>\n    </div>\n    <br>\n    <label style="margin-right:15px"> Description:</label><span>'+r((i=null!=(i=a.dc_description_s||(null!=l?l.dc_description_s:l))?i:o,typeof i===d?i.call(s,{name:"dc_description_s",hash:{},data:t}):i))+'</span><br>\n\n\n</div>\n</td>\n<td>\n    <button class="btn btn-primary btn-table" onclick="editMetadata(\''+r((i=null!=(i=a._id||(null!=l?l._id:l))?i:o,typeof i===d?i.call(s,{name:"_id",hash:{},data:t}):i))+'\')">Edit</button>\n    <button class="btn btn-primary btn-table" onclick="setStatusMetadata(\''+r((i=null!=(i=a._id||(null!=l?l._id:l))?i:o,typeof i===d?i.call(s,{name:"_id",hash:{},data:t}):i))+'\')">Properties</button>\n    <div class="delete-btn btn-table" style="display:none;margin-top:100;">\n        <button class="btn btn-primary btn-table" onclick="deleteMetadata(\''+r((i=null!=(i=a._id||(null!=l?l._id:l))?i:o,typeof i===d?i.call(s,{name:"_id",hash:{},data:t}):i))+"',['"+r((i=null!=(i=a.layer_id_s||(null!=l?l.layer_id_s:l))?i:o,typeof i===d?i.call(s,{name:"layer_id_s",hash:{},data:t}):i))+"'])\">Delete</button>\n    </div>\n</td>\n</tr>\n"},useData:!0}),l["tmpl-modal-footer-properties"]=n({compiler:[7,">= 4.0.0"],main:function(n,l,a,e,t){var i;return'    <div id=ModalFooter style="float:right;">\n        <button type="button" class="btn btn-primary" data-dismiss="modal" aria-label="Close">Cancel</button>\n        <button class="btn btn-primary" onclick="saveProperties(\''+n.escapeExpression((i=null!=(i=a._id||(null!=l?l._id:l))?i:a.helperMissing,"function"==typeof i?i.call(null!=l?l:n.nullContext||{},{name:"_id",hash:{},data:t}):i))+"',false)\">Update</button>\n    </div>\n"},useData:!0}),l["tmpl-modalAppMetadata"]=n({compiler:[7,">= 4.0.0"],main:function(n,l,a,e,t){var i,s=null!=l?l:n.nullContext||{},o=a.helperMissing,d=n.escapeExpression;return'<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\n  <div class="modal-dialog modal-lg">\n    <div class="modal-content">\n      <div class="modal-header">\n        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n        <h3 class="modal-title" id="myModalLabel">'+d((i=null!=(i=a.modal_name||(null!=l?l.modal_name:l))?i:o,"function"==typeof i?i.call(s,{name:"modal_name",hash:{},data:t}):i))+'</h3>\n      </div>\n      <div class="modal-body">\n        <textarea  id="myMetadataModalbody" rows="30" cols="" style="width:100%;padding:10px;">'+d((i=null!=(i=a.modal_data||(null!=l?l.modal_data:l))?i:o,"function"==typeof i?i.call(s,{name:"modal_data",hash:{},data:t}):i))+'</textarea>\n      </div>\n      <div class="modal-footer">\n          <div id=ModalFooter style="float:right;">\n              <button type="button" class="btn btn-primary" data-dismiss="modal" aria-label="Close">Cancel</button>\n              <button class="btn btn-primary" onclick="saveMetadata(\''+d((i=null!=(i=a._id||(null!=l?l._id:l))?i:o,"function"==typeof i?i.call(s,{name:"_id",hash:{},data:t}):i))+'\',false)">Save and Close</button>\n              <button class="btn btn-primary" onclick="saveMetadata(\''+d((i=null!=(i=a._id||(null!=l?l._id:l))?i:o,"function"==typeof i?i.call(s,{name:"_id",hash:{},data:t}):i))+"',true)\">Save and Index</button>\n          </div>\n      </div>\n    </div>\n  </div>\n</div>\n"},useData:!0}),l["tmpl-modalAppTaskResult"]=n({compiler:[7,">= 4.0.0"],main:function(n,l,a,e,t){var i,s=null!=l?l:n.nullContext||{},o=a.helperMissing,d=n.escapeExpression;return'<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\n  <div class="modal-dialog modal-lg">\n    <div class="modal-content">\n      <div class="modal-header">\n        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n        <h3 class="modal-title" id="myModalLabel">'+d((i=null!=(i=a.modal_name||(null!=l?l.modal_name:l))?i:o,"function"==typeof i?i.call(s,{name:"modal_name",hash:{},data:t}):i))+'</h3>\n      </div>\n      <div id="modalBody" class="modal-body">\n        <pre id="myModalbody">'+d((i=null!=(i=a.modal_data||(null!=l?l.modal_data:l))?i:o,"function"==typeof i?i.call(s,{name:"modal_data",hash:{},data:t}):i))+'</pre>\n      </div>\n      <div id="modalFooter" class="modal-footer">\n      </div>\n    </div>\n  </div>\n</div>\n'},useData:!0}),l["tmpl-modalMessage"]=n({compiler:[7,">= 4.0.0"],main:function(n,l,a,e,t){var i,s=null!=l?l:n.nullContext||{},o=a.helperMissing,d=n.escapeExpression;return'<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\n  <div class="modal-dialog modal-lg">\n    <div class="modal-content">\n      <div class="modal-header">\n        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n        <h3 class="modal-title" id="myModalLabel">'+d((i=null!=(i=a.title||(null!=l?l.title:l))?i:o,"function"==typeof i?i.call(s,{name:"title",hash:{},data:t}):i))+'</h3>\n      </div>\n      <div class="modal-body">\n          <label>'+d((i=null!=(i=a.message||(null!=l?l.message:l))?i:o,"function"==typeof i?i.call(s,{name:"message",hash:{},data:t}):i))+'</label>\n      </div>\n      <div class="modal-footer">\n          <div id=ModalFooter style="float:right;">\n              <button type="button" class="btn btn-primary" data-dismiss="modal" aria-label="Close">Close</button>\n          </div>\n      </div>\n    </div>\n  </div>\n</div>\n'},useData:!0}),l["tmpl-tr"]=n({compiler:[7,">= 4.0.0"],main:function(n,l,a,e,t){var i,s=null!=l?l:n.nullContext||{},o=a.helperMissing,d=n.escapeExpression;return'<tr><td><a href="#" onclick="showResult(\''+d((i=null!=(i=a.result||(null!=l?l.result:l))?i:o,"function"==typeof i?i.call(s,{name:"result",hash:{},data:t}):i))+"');return false;\" >"+d((i=null!=(i=a.task_name||(null!=l?l.task_name:l))?i:o,"function"==typeof i?i.call(s,{name:"task_name",hash:{},data:t}):i))+"</a></td><td>"+d((i=null!=(i=a.timestamp||(null!=l?l.timestamp:l))?i:o,"function"==typeof i?i.call(s,{name:"timestamp",hash:{},data:t}):i))+"</td><td>"+d((a.json_metatags||l&&l.json_metatags||o).call(s,null!=l?l.tags:l,{name:"json_metatags",hash:{},data:t}))+"</td></tr>\n"},useData:!0}),l["tmpl-user"]=n({compiler:[7,">= 4.0.0"],main:function(n,l,a,e,t){var i,s=null!=l?l:n.nullContext||{},o=a.helperMissing,d="function",r=n.escapeExpression;return'      <h2>User Profile</h2>\n      <div id="user_profile">\n          <div id="photo" class="col-md-2" style="width:200px ">\n            <img src="'+r((i=null!=(i=a.gravator_url||(null!=l?l.gravator_url:l))?i:o,typeof i===d?i.call(s,{name:"gravator_url",hash:{},data:t}):i))+'?s=180&d=mm"><br><br>\n            <a href="https://en.gravatar.com/" target="_blank" style="clear:both;">Profile Image</a><br><br>\n            <a id="reset_password" style="clear:both;">Reset Password</a>\n          </div>\n          <form  id="view_form" class="form-horizontal col-md-4" onsubmit="return edit_user();">\n              <div class="form-group">\n                <label class="col-md-3 control-label">Username</label>\n                  <div class="col-md-09">\n                <p class="form-control-static">'+r((i=null!=(i=a.username||(null!=l?l.username:l))?i:o,typeof i===d?i.call(s,{name:"username",hash:{},data:t}):i))+'</p>\n                </div>\n            </div>\n             <div class="form-group">\n                  <label class="col-md-3 control-label">Name</label>\n                    <div class="col-md-09">\n                  <p class="form-control-static">'+r((i=null!=(i=a.name||(null!=l?l.name:l))?i:o,typeof i===d?i.call(s,{name:"name",hash:{},data:t}):i))+'</p>\n                  </div>\n            </div>\n              <div class="form-group">\n                <label class="col-md-3 control-label">Email</label>\n                  <div class="col-md-09">\n                    <p class="form-control-static">'+r((i=null!=(i=a.email||(null!=l?l.email:l))?i:o,typeof i===d?i.call(s,{name:"email",hash:{},data:t}):i))+'</p>\n                 </div>\n             </div>\n             <button type="submit" id="form_submit" class="btn btn-default pull-right" style="margin-right:40px;">Edit</button>\n         </form>\n          <form class="col-md-4" id="user_form" onsubmit="return submit_user();">\n              <div style="display:none">\n                  <input type="hidden" name="csrfmiddlewaretoken" value="'+r((i=null!=(i=a.csrftoken||(null!=l?l.csrftoken:l))?i:o,typeof i===d?i.call(s,{name:"csrftoken",hash:{},data:t}):i))+'"/>\n             </div>\n              <div class="form-group">\n                 <label for="first_name">First Name</label>\n                  <input type="text" class="form-control" name="first_name" placeholder="John" value="'+r((i=null!=(i=a.first_name||(null!=l?l.first_name:l))?i:o,typeof i===d?i.call(s,{name:"first_name",hash:{},data:t}):i))+'">\n             </div>\n              <div class="form-group">\n                   <label for="last_name">Last Name</label>\n                    <input type="text" class="form-control" name="last_name" placeholder="Doe" value="'+r((i=null!=(i=a.last_name||(null!=l?l.last_name:l))?i:o,typeof i===d?i.call(s,{name:"last_name",hash:{},data:t}):i))+'">\n               </div>\n              <div class="form-group">\n                 <label for="email">Email address</label>\n                  <input type="email" class="form-control" name="email" placeholder="Enter email" value="'+r((i=null!=(i=a.email||(null!=l?l.email:l))?i:o,typeof i===d?i.call(s,{name:"email",hash:{},data:t}):i))+'">\n             </div>\n             <button type="submit" id="form_submit1" class="btn btn-default pull-right">Update</button>\n         </form>\n         <div class="row" style="width:100%;clear:both;"></div>\n          <form class="form-inline" id="pass_form" onsubmit="return set_password();" style="display:none">\n            <div style="display:none">\n                    <input type="hidden" name="csrfmiddlewaretoken" value="'+r((i=null!=(i=a.csrftoken||(null!=l?l.csrftoken:l))?i:o,typeof i===d?i.call(s,{name:"csrftoken",hash:{},data:t}):i))+'"/>\n           </div>\n            <div class="form-group">\n             <label for="password">New Password</label>\n              <input type="password" class="form-control" name="password" placeholder="New Password">\n           </div>\n            <div class="form-group">\n             <label for="password2">Retype New Password</label>\n              <input type="password" class="form-control" name="password2" placeholder="Retype New Password">\n           </div>\n           <button type="submit" class="btn btn-default">Set Password</button>\n         </form>\n     </div>\n'},useData:!0}),l["tmpl-wait-finish"]=n({compiler:[7,">= 4.0.0"],main:function(n,l,a,e,t){var i,s=n.lambda,o=n.escapeExpression;return"<h2>"+o(s(null!=(i=null!=l?l.data:l)?i.title:i,l))+' </h2>\n<span><IMG SRC="spinner.gif" width="50" height="50" />'+o(s(null!=(i=null!=l?l.data:l)?i.message:i,l))+"</span>"},useData:!0}),l["tmpl-xml-select"]=n({1:function(n,l,a,e,t){var i=n.lambda,s=n.escapeExpression;return'    <option value="'+s(i(null!=l?l.url:l,l))+'">'+s(i(null!=l?l.name:l,l))+"</option>\n"},compiler:[7,">= 4.0.0"],main:function(n,l,a,e,t){var i;return'<label for="xml_file">XML Files</label>\n<select id="xml_file" style="width:40%;margin-right:10px;">\n'+(null!=(i=a.each.call(null!=l?l:n.nullContext||{},null!=l?l.xml_list:l,{name:"each",hash:{},fn:n.program(1,t,0),inverse:n.noop,data:t}))?i:"")+'</select>\n<a id="xmllink" href="" target="_blank" style="margin-left:05px;">View XML</a>\n<button class="btn btn-primary" type="button" style="float:right;padding-top:4px;margin-bottom:20px;"\n    id="crosswalkxml">Crosswalk XML File >></button>'},useData:!0})}();

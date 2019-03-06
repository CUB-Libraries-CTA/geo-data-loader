/* eslint-disable jquery/no-text */
/* eslint-disable jquery/no-class */
/* eslint-disable jquery/no-attr */
/* eslint-disable jquery/no-html */
/* eslint-disable jquery/no-sizzle */
/* eslint-disable jquery/no-toggle */
/* eslint-disable jquery/no-map */
/* eslint-disable jquery/no-hide */
/* eslint-disable jquery/no-show */
/* eslint-disable jquery/no-each */
/* eslint-disable jquery/no-is */
/* eslint-disable jquery/no-val */
/* eslint-disable jquery/no-ajax */
/* eslint-disable jquery/no-ready */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
$(function() {
  //Customize by setting base_url to cybercom/api docker application
  base_url = "https://geo.colorado.edu/api";
  //No other alterations is need to get the standard applicaiton running!
  login_url = base_url + "/api-auth/login/?next=";
  logout_url = base_url + "/api-auth/logout/?next=";
  user_task_url = base_url + "/queue/usertasks/.json?page_size=10";
  user_url = base_url + "/user/?format=json";
  prevlink = null;
  nextlink = null;
  zipurl = "zipfile.zip";
  workflowdata = null;
  geoschema = {};
  set_auth(base_url, login_url);
  $("#aprofile").click(function() {
    activaTab("profile");
  });
  $("#alogout").click(function() {
    window.location = logout_url.concat(document.URL);
  });
  load_task_history(user_task_url);
  $("#prevlink").click(function() {
    load_task_history(prevlink);
  });
  $("#nextlink").click(function() {
    load_task_history(nextlink);
  });
  Handlebars.registerHelper("json_metatags", function(context) {
    if (typeof context !== "undefined") {
      return JSON.stringify(context)
        .replace(/"/g, "")
        .replace(/\[/g, "")
        .replace(/\]/g, "")
        .replace(/,/g, ", ");
    } else {
      return "";
    }
  });
  load_metadata();
  load_dropzone(
    "geoblacklightq.tasks.workflow.geoLibraryLoader",
    "geoLibraryLoader"
  );
  jsonData = {};
  styles = [];
  loadStyles();
  //load_example_task();
}); //End of Document Ready
function loadStyles() {
  //generate style List
  sty_url =
    base_url + "/queue/run/geoblacklightq.tasks.geoservertasks.getstyles";
  postdata = $.getCYBERCOM_JSON_OBJECT(
    "geoblacklightq.tasks.geoservertasks.getstyles"
  );
  $.postJSON(sty_url + "/.json", postdata, getStyles);
}
function poll_styles(url) {
  $.getJSON(url, function(data) {
    status = check_status(data);
    if (status == "PENDING") {
      setTimeout(function() {
        poll_styles(url);
      }, 1000);
    }
    if (status == "SUCCESS") {
      if (!("result" in data)) {
        setTimeout(function() {
          poll_styles(url);
        }, 1000);
      } else {
        styles = data.result.result;
      }
    }
    if (status == "FAILURE") {
      alert(
        "Task Failure occured loading Geoserver styles. Please refresh page."
      );
    }
  });
}
function getStyles(data) {
  poll_styles(data.result_url);
}
function resetDropzone() {
  load_dropzone(
    "geoblacklightq.tasks.workflow.geoLibraryLoader",
    "geoLibraryLoader"
  );
  jsonData = {};
}
function load_metadata() {
  main_tmpl = Handlebars.templates["tmpl-main-geoedit"];

  $("#dataitems").empty();
  $("#dataitems").append(main_tmpl({}));

  $("#tablebody").empty();
  $("#submitSearch").click(function() {
    run_search();
  });
  $("#search").keyup(function(event) {
    if (event.keyCode == 13) {
      run_search();
    }
  });
  catalog_url =
    base_url +
    '/catalog/data/catalog/geoportal/.json?query={"filter":{"status":{"$ne":"notindexed"}}}&page_size=0';
  $.getJSON(catalog_url, function(data) {
    tr_templates = Handlebars.templates["tmpl-main-tr"];
    // eslint-disable-next-line jquery/no-each
    $.each(data.results, function(idx, item) {
      $("#tablebody").append(tr_templates(item));
    });
  });
}
function run_search() {
  $("#tablebody").empty();
  search = $("#search").val();
  if ($("#filterIII").is(":checked") == true) {
    query = "eq";
  } else {
    query = "ne";
  }
  if (search == "" || search == "*") {
    catalog_url =
      base_url +
      '/catalog/data/catalog/geoportal/.json?query={"filter":{"status":{"$' +
      query +
      '":"notindexed"}}}&page_size=0';
  } else {
    catalog_url =
      base_url +
      '/catalog/data/catalog/geoportal/.json?query={"filter":{"$text":{"$search":"' +
      search +
      '"},"status":{"$' +
      query +
      '":"notindexed"}}}&page_size=0';
  }
  $.getJSON(catalog_url, function(data) {
    tr_templates = Handlebars.templates["tmpl-main-tr"];
    $.each(data.results, function(idx, item) {
      $("#tablebody").append(tr_templates(item));
    });
    if ($("#filterIII").is(":checked")) {
      $(".delete-btn").show();
    } else {
      $(".delete-btn").hide();
    }
  });
}

function editMetadata(catalog_id) {
  $("#modals").empty();
  task_template = Handlebars.templates["tmpl-modalAppMetadata"];
  url = base_url + "/catalog/data/catalog/geoportal/" + catalog_id;
  $.getJSON(url + "/.json", function(data) {
    delete data._id;
    json_data = JSON.stringify($.objectWithKeySorted(data), null, 4);
    tmpdata = {
      _id: catalog_id,
      modal_data: json_data,
      modal_name: data.dc_title_s
    };
    $("#modals").append(task_template(tmpdata));
    $("#myModal").modal("show");
  });
}

function deleteMetadata(catalog_id, args, confirmation) {
  $.confirm({
    title: "Please confirm deletion?",
    content: "The data item will be deleted.",
    type: "red",
    buttons: {
      ok: {
        text: "Delete",
        btnClass: "btn-primary",
        keys: ["enter"],
        action: function() {
          url =
            base_url +
            "/catalog/data/catalog/geoportal/" +
            catalog_id +
            "/.json";
          $.deleteJSON(url, run_search);
          postdata = $.getCYBERCOM_JSON_OBJECT(
            "geoblacklightq.tasks.geoservertasks.deleteGeoserverStore"
          );
          postdata.args = args;
          taskurl =
            "/api/queue/run/geoblacklightq.tasks.geoservertasks.deleteGeoserverStore/";
          $.postJSON(taskurl, postdata, $.alert("Geoserver Store Deleted"));
          console.log("the user clicked confirm");
        }
      },
      cancel: function() {
        console.log("the user clicked cancel");
      }
    }
  });
  /*if (!confirmation) {
    alert("this does something");
  }
  url = base_url + "/catalog/data/catalog/geoportal/" + catalog_id + "/.json";
  $.deleteJSON(url, run_search);
  postdata = $.getCYBERCOM_JSON_OBJECT(
    "geoblacklightq.tasks.geoservertasks.deleteGeoserverStore"
  );

  postdata.args = args;
  taskurl =
    "/api/queue/run/geoblacklightq.tasks.geoservertasks.deleteGeoserverStore/";
  //(url, data, callback,fail)
  $.postJSON(taskurl, postdata, alert("Geoserver Store Deleted"));
  */
}

function setStatusMetadata(catalog_id) {
  modal_template = Handlebars.templates["tmpl-modalAppTaskResult"];
  task_template = Handlebars.templates["tmpl-geoserver-select"];
  url = base_url + "/catalog/data/catalog/geoportal/";
  $.getJSON(url + catalog_id + "/.json", function(data) {
    $("#modals").empty();
    tmpdata = {
      modal_data: {},
      modal_name: "GeoLayer Properties: " + data.dc_title_s
    };
    $("#modals").append(modal_template(tmpdata));
    $("#myModal").modal("show");
    //generate style List
    data.styles = styles;
    $("#modalBody").empty();
    $("#modalBody").append(task_template(data));
    $("#modalFooter").empty();
    footer_template = Handlebars.templates["tmpl-modal-footer-properties"];
    $("#modalFooter").append(footer_template(data));
  });
}
function saveProperties(catalog_id) {
  url = base_url + "/catalog/data/catalog/geoportal/";
  url = url + catalog_id + "/.json";
  dirty_index = false;
  dirty_style = false;
  $.getJSON(url, function(data) {
    if (data.status != $("#geoblacklight_status").val()) {
      data.status = $("#geoblacklight_status").val();
      dirty_index = true;
    }
    if (data.style != $("#geoserver_style").val()) {
      data.style = $("#geoserver_style").val();
      dirty_style = true;
    }
    if (dirty_index) {
      $.postJSON(url, data, run_search, null, "PUT");
    } else {
      $.postJSON(url, data, function(data2) {}, null, "PUT");
    }
    if (dirty_style) {
      //need to post to geoserver
      layer_name = data.layer_id_s;
      style = $("#geoserver_style").val();
      taskurl =
        "/api/queue/run/geoblacklightq.tasks.geoservertasks.setLayerDefaultStyle/";
      postdata = $.getCYBERCOM_JSON_OBJECT(
        "geoblacklightq.tasks.geoservertasks.setLayerDefaultStyle"
      );
      postdata.args = [layer_name, style];
      $.postJSON(taskurl, postdata, geoserverStyleCallback);
    }
  });
  $("#myModal").modal("hide");
}

function saveMetadata(catalog_id, reindex) {
  try {
    data = JSON.parse($("#myMetadataModalbody").val());
  } catch (err) {
    alert(err.message);
    return;
  }
  if (catalog_id != "") {
    data._id = catalog_id;
  }
  url = base_url + "/catalog/data/catalog/geoportal/.json";
  if (reindex) {
    $.postJSON(url, data, reIndexAll);
  } else {
    $.postJSON(url, data);
  }
  $("#myModal").modal("hide");
  resetDropzone();
  run_search();
}

function reIndexAll() {
  url =
    base_url +
    '/catalog/data/catalog/geoportal/.json?query={"filter":{"status":{"$ne":"notindexed"}}}&page_size=0';
  $.getJSON(url, function(data) {
    index_data = $.map(data.results, function(n) {
      n.id = n._id;
      delete n._id;
      delete n.id;
      delete n.status;
      delete n.style;
      return n;
    });
    postdata = $.getCYBERCOM_JSON_OBJECT(
      "geoblacklightq.tasks.workflow.resetSolrIndex"
    );
    postdata.args = [index_data];
    taskurl = "/api/queue/run/geoblacklightq.tasks.workflow.resetSolrIndex/";
    $.postJSON(taskurl, postdata, reIndexCallback);
    run_search();
  });
}
function poll_layers(url) {
  $.getJSON(url, function(data) {
    status = check_status(data);
    if (status == "PENDING") {
      setTimeout(function() {
        poll_layers(url);
      }, 3000);
    }
    if (status == "SUCCESS") {
      $("#geolayers").empty();
      select_tmpl = Handlebars.templates["tmpl-geoserver-select"];
      layers = [];
      $.each(data.result.result, function(idx, itm) {
        itm.objct_string = JSON.stringify(itm);
        layers.push(itm);
      });
      $("#geolayers").append(select_tmpl({ layers: layers }));
    }
    if (status == "FAILURE") {
      alert("Task Failure occured load Geoserver Layers. Please try again.");
    }
  });
}
function loadGeoServerMetadata(data) {
  poll_layers(data.result_url);
}
function geoserverStyleCallback(data) {
  url = data.result_url;
  cybercom_poll(url + ".json", "myModalbody");
}
function reIndexCallback(data) {
  url = data.result_url;
  showChildResult(url);
}
function load_dropzone(task, tags) {
  dropzone_tmpl = Handlebars.templates["tmpl-dropzone"];
  $("#home").empty();
  $("#home").append(
    dropzone_tmpl({ csrftoken: getCookie("csrftoken"), task: task, tags: tags })
  );
}
function load_example_task() {
  addtask_template = Handlebars.templates["tmpl-add-form"];
  $("#home").empty();
  $("#home").append(
    addtask_template({ x: 10, y: 10, csrftoken: getCookie("csrftoken") })
  );
  $("#addTask").click(function() {
    run_example_task();
  });
}
function run_example_task() {
  add_url = "/api/queue/run/geoblacklightq.tasks.tasks.add/.json";
  task_name = "geoblacklightq.tasks.tasks.add";
  form_data = $("#addTaskForm").serializeObject();
  cybercom_submit_task(
    add_url,
    task_name,
    [parseInt(form_data.x), parseInt(form_data.y)],
    {},
    "task_result"
  );
}
function submit_user() {
  $.post(user_url, $("#user_form").serializeObject(), function(data) {
    data.csrftoken = getCookie("csrftoken");
    $("#profile").empty();
    user_template = Handlebars.templates["tmpl-user"];
    $("#profile").append(user_template(data));
    $("#user_form").hide();
    $("#view_form").show();
    $("#reset_password").click(function() {
      $("#pass_form").toggle(!$("#pass_form").is(":visible"));
    });
  }).fail(function() {
    alert("Error Occured on User Update.");
  });
  return false;
}
function edit_user() {
  $("#user_form").show();
  $("#view_form").hide();
  return false;
}
function set_password() {
  pass = $("#pass_form").serializeObject();
  if (pass.password !== pass.password2) {
    alert("Passwords were not identical");
    return false;
  }
  $.post(user_url, $("#pass_form").serializeObject(), function(data) {
    $("#reset_password").click(function() {
      $("#pass_form").toggle(!$("#pass_form").is(":visible"));
    });
    alert(JSON.stringify(data));
  }).fail(function() {
    alert("Error Occured on Password Reset.");
  });
  return false;
}
function set_auth(base_url, login_url) {
  $.getJSON(base_url + "/user/.json", function(data) {
    $("#user").html(data["username"].concat(' <span class="caret"></span> '));
    $("#user").append(
      $('<img style="border-radius:80px;">').attr(
        "src",
        data["gravator_url"] + "?s=40&d=mm"
      )
    );
    data.csrftoken = getCookie("csrftoken");
    user_template = Handlebars.templates["tmpl-user"];
    $("#profile").append(user_template(data));
    $("#user_form").hide();
    $("#view_form").show();
    $("#reset_password").click(function() {
      $("#pass_form").toggle(!$("#pass_form").is(":visible"));
    });
  }).fail(function() {
    var slink = login_url.concat(document.URL);
    window.location = slink;
  });
}
function activaTab(tab) {
  $('a[href="#' + tab + '"]').tab("show");
}
function load_task_history(url) {
  $.getJSON(url, function(data) {
    prevlink = data.previous;
    nextlink = data.next;
    if (prevlink == null) {
      $("#li_prevlink").addClass("disabled");
    } else {
      $("#li_prevlink").removeClass("disabled");
    }
    if (nextlink == null) {
      $("#li_nextlink").addClass("disabled");
    } else {
      $("#li_nextlink").removeClass("disabled");
    }
    setTaskDisplay(data);
    tr_template = Handlebars.templates["tmpl-tr"];
    $("#result_tbody").html(""); //clear table
    $.each(data.results, function(i, item) {
      temp = item.task_name.split(".");
      item["task_name"] = temp[temp.length - 1];
      item.timestamp = item.timestamp.substring(0, 19).replace("T", " ");
      $("#result_tbody").append(tr_template(item));
    });
  });
}
function setTaskDisplay(data) {
  if (data.count <= data.meta.page_size) {
    $("#task_count").text("Task 1 - " + data.count + " Total " + data.count);
  } else {
    rec_start = data.meta.page_size * data.meta.page - data.meta.page_size + 1;
    rec_end = "";
    if (data.meta.page_size * data.meta.page >= data.count) {
      rec_end = data.count;
    } else {
      rec_end = data.meta.page_size * data.meta.page;
    }
    $("#task_count").text(
      "Task " + rec_start + " - " + rec_end + " Total " + data.count
    );
  }
}
function showResult(url) {
  $("#modals").empty();
  task_template = Handlebars.templates["tmpl-modalAppTaskResult"];
  $.getJSON(url + ".json", function(data) {
    json_data = JSON.stringify(data, null, 4);
    tmpdata = { modal_data: json_data, modal_name: "Task Result" };
    $("#modals").append(task_template(tmpdata));
    $("#myModalbody").urlize();
    $("#myModal").modal("show");
  });
}
//Cybercommons task result showResult()
function showChildResult(url, title, message) {
  title = $.defaultFor(title, "Task Result");
  message = $.defaultFor(message, "Checking Workflow status");
  $("#modals").empty();
  task_template = Handlebars.templates["tmpl-modalAppTaskResult"];
  tmpdata = { modal_name: title };
  $("#modals").append(task_template(tmpdata));
  $("#myModalbody").empty();
  $("#myModal").modal("show");
  $("#myModalbody").html(message);
  cybercom_poll(url + ".json", "myModalbody");
}
//Cybercommons example submit add task.
function cybercom_submit_task(
  task_url,
  task_name,
  task_args,
  task_kwargs,
  html_result
) {
  //"cybercomq.tasks.tasks.add"
  //get and set task_data
  task_data = $.getCYBERCOM_JSON_OBJECT(task_name);
  task_data.args = task_args;
  task_data.kwargs = task_kwargs;
  //call add task and poll for status
  $.postJSON(task_url, task_data, function(data) {
    cybercom_poll(data.result_url, html_result);
    load_task_history(user_task_url);
  });
}

function loadxmlLoad(url, textarea_id) {
  $.ajax({
    type: "GET",
    url: url,
    cache: false,
    dataType: "xml",
    success: function(xml) {
      var xmlText = new XMLSerializer().serializeToString(xml);
      $("#" + textarea_id).text(xmlText);
    }
  });
}
function cleanLists(datalist) {
  return datalist.filter(function(el) {
    return el != "";
  });
}
function serilize_formdata(formid) {
  data = $("#geoblacklightform").serializeObject();
  data.dc_creator_sm = cleanLists(data.dc_creator_sm1.split("|"));
  data.dc_subject_sm = cleanLists(data.dc_subject_sm1.split("|"));
  data.dct_temporal_sm = cleanLists(data.dct_temporal_sm1.split("|"));
  data.dct_spatial_sm = cleanLists(data.dct_spatial_sm1.split("|"));
  //geoserver_layers = JSON.parse(data.geoserver_layers);
  //delete data.geoserver_layers
  delete data.dct_spatial_sm1;
  delete data.dct_temporal_sm1;
  delete data.dc_subject_sm1;
  delete data.dc_creator_sm1;
  data.dct_references_s =
    '{"http://schema.org/downloadUrl":"' +
    zipurl +
    '","http://www.opengis.net/def/serviceType/ogc/wfs":"https://geo.colorado.edu/geoserver/geocolorado/wfs","http://www.opengis.net/def/serviceType/ogc/wms":"https://geo.colorado.edu/geoserver/geocolorado/wms"}';
  data.dc_type_s = "Dataset";
  $("#modals").empty();
  task_template = Handlebars.templates["tmpl-modalAppMetadata"];
  json_data = JSON.stringify($.objectWithKeySorted(data), null, 4);
  tmpdata = { modal_data: json_data, modal_name: data.dc_title_s };
  $("#modals").append(task_template(tmpdata));
  $("#myModal").modal("show");
}
function reloadGeoserverMetadata() {
  postdata = $.getCYBERCOM_JSON_OBJECT(
    "geoblacklightq.tasks.geoservertasks.geoserverGetWorkspaceMetadata"
  );
  taskurl =
    "/api/queue/run/geoblacklightq.tasks.geoservertasks.geoserverGetWorkspaceMetadata/";
  $.postJSON(taskurl, postdata, loadGeoServerMetadata);
}
function getXMLdata(data) {
  temp = [];
  xmllists = data.result.xml;
  arrayLength = xmllists.files.length;
  for (var i = 0; i < arrayLength; i++) {
    temp.push({ name: xmllists.files[i], url: xmllists.urls[i] });
  }
  return temp;
}
function crosswalkResult(data) {
  $("#geoFormDiv").empty();
  geolibrary_tmpl = Handlebars.templates["tmpl-geolibrary-form"];
  geoschema = data.result;
  geoschema = cleanDicts(geoschema);
  geoschema.dc_creator_sm1 = geoschema.dc_creator_sm.join("|");
  geoschema.dc_subject_sm1 = geoschema.dc_subject_sm.join("|");
  geoschema.dct_temporal_sm1 = geoschema.dct_temporal_sm.join("|");
  geoschema.dct_spatial_sm1 = geoschema.dct_spatial_sm.join("|");
  $("#geoFormDiv").append(geolibrary_tmpl({ data: geoschema }));
}
function crosswalk_poll(url, callback) {
  $.getJSON(url, function(data) {
    status = check_status(data);
    if (status == "PENDING") {
      //Set timeout to 3 seconds
      setTimeout(function() {
        crosswalk_poll(url, callback);
      }, 3000);
    }
    if (status == "SUCCESS") {
      if (!("result" in data)) {
        setTimeout(function() {
          crosswalk_poll(url, callback);
        }, 2000);
      } else {
        callback(data);
      }
    }
    if (status == "FAILURE") {
      console.log("FAILURE");
    }
  });
}
function crosswalkCallback(data) {
  url = data.result_url;
  crosswalk_poll(url, crosswalkResult);
}
function crosswalkObject() {
  $.confirm({
    title: "Metadata Update",
    content:
      "The Geoblacklight Schema data will be replace with data from the new crosswalked xml data. Any changes made to schema will be lost.",
    type: "red",
    buttons: {
      ok: {
        text: "Crosswalk",
        btnClass: "btn-primary",
        keys: ["enter"],
        action: function() {
          postdata = $.getCYBERCOM_JSON_OBJECT(
            "geoblacklightq.tasks.geotransmeta.singleCrossWalkGeoBlacklight"
          );
          idx = $("#xml_file")[0].selectedIndex;
          jsond = workflowdata.result.xml.fgdc[idx];
          filename = jsond.file;
          layername = workflowdata.result.geoblacklightschema.layer_slug_s.split(
            ":"
          )[1];
          geoserver_layername =
            workflowdata.result.geoblacklightschema.layer_id_s;
          resource_type = workflowdata.result.resource_type;
          postdata.args = [
            filename,
            layername,
            geoserver_layername,
            resource_type
          ];
          taskurl =
            "/api/queue/run/geoblacklightq.tasks.geotransmeta.singleCrossWalkGeoBlacklight/";
          $.postJSON(taskurl, postdata, crosswalkCallback);
        }
      },
      cancel: function() {
        console.log("No crosswalk... the user clicked cancel");
      }
    }
  });
}

function loadxmldata() {
  myhref = $("#xml_file").val();
  $("#xmllink").attr("href", myhref);
  idx = $("#xml_file")[0].selectedIndex;
  jsond = workflowdata.result.xml.fgdc[idx];
  $("#xmlfilexml").empty();
  $("#xmlfilexml").append(JSON.stringify(jsond.data, null, 1));
}
//Example general display status to console.log. Used in cybercom_poll!
//Customize tomake success, fail, and pending functions. This is general status function!
function general_status(data, html_result) {
  workflowdata = data;
  if (data.result.hasOwnProperty("geoblacklightschema")) {
    urlxmlfgdc = "";
    if (data.result.xml.urls.length > 0) {
      urlxmlfgdc = data.result.xml.urls[0];
    }
    if (data.result.hasOwnProperty("zipurl")) {
      zipurl = data.result.zipurl;
    }
    jsonData = data.result.geoblacklightschema;
    $("#dropzone").hide();
    $("#helptxt").hide();
    url =
      "https://geo.colorado.edu/geoserver/rest/workspaces/geocolorado/datastores.json";
    geolibrary_tmpl = Handlebars.templates["tmpl-geolibrary-new"];
    geoschema = data.result.geoblacklightschema;
    geoschema = cleanDicts(geoschema);
    geoschema.dc_creator_sm1 = geoschema.dc_creator_sm.join("|");
    geoschema.dc_subject_sm1 = geoschema.dc_subject_sm.join("|");
    geoschema.dct_temporal_sm1 = geoschema.dct_temporal_sm.join("|");
    geoschema.dct_spatial_sm1 = geoschema.dct_spatial_sm.join("|");
    $("#home").append(
      geolibrary_tmpl({ data: geoschema, urlxmlfgdc: urlxmlfgdc })
    );
    //set xml select
    xml_select_tmpl = Handlebars.templates["tmpl-xml-select"];
    $("#selectxml").append(xml_select_tmpl({ xml_list: getXMLdata(data) }));
    $("#xml_file").change(function() {
      loadxmldata();
    });
    $("#crosswalkxml").click(function() {
      console.log($("#xml_file").val());
      crosswalkObject();
    });
    //Load initial xml data
    loadxmldata();
    $("#getblight").click(function() {
      serilize_formdata("geoblacklightform");
    });
  }
  if (data.hasOwnProperty("task_name")) {
    if (
      data.task_name ===
      "geoblacklightq.tasks.geoservertasks.setLayerDefaultStyle"
    ) {
      $("#modalBody").append(
        '<h3>Geoserver Result</h3><pre id="myModalbody"></pre>'
      );
    }
  }

  if (data.result.hasOwnProperty("children")) {
    children_poll(data.result.children, html_result);
  } else if (data.hasOwnProperty("children")) {
    children_poll(data.children, html_result);
  }

  $("#" + html_result).append(JSON.stringify(data.result, null, 4));
}
function cleanDicts(geoschema) {
  for (var key in geoschema) {
    if (typeof geoschema[key] == "string") {
      if (
        geoschema[key].search("text") !== -1 &&
        geoschema[key].search("{") !== -1
      ) {
        geoschema[key] = JSON.parse(
          geoschema[key].replace(/'/g, '"').replace(/u"/g, '"')
        ).text;
      }
    }
  }
  return geoschema;
}
function children_poll(children, html_result) {
  if (children.length > 0) {
    url = base_url + "/queue/task/" + children[0][0][0] + "/.json";
    cybercom_poll(url, html_result);
  }
}
function general_wait(data, html_result) {
  $("#" + html_result).append(JSON.stringify(data.result, null, 4));
}
function check_status(data) {
  if (data.hasOwnProperty("status")) {
    return data.status;
  } else if (data.result.hasOwnProperty("status")) {
    return data.result.status;
  }
}
//Cybercommons polling task status
function cybercom_poll(url, html_result) {
  $.getJSON(url, function(data) {
    status = check_status(data);
    if (status == "PENDING") {
      general_wait(data, html_result);
      //Set timeout to 3 seconds
      setTimeout(function() {
        cybercom_poll(url, html_result);
      }, 3000);
    }
    if (status == "SUCCESS") {
      if (!("result" in data)) {
        setTimeout(function() {
          cybercom_poll(url, html_result);
        }, 2000);
      } else {
        general_status(data, html_result);
      }
    }
    if (status == "FAILURE") {
      general_wait(data, html_result);
    }
  });
}

// ************ Jquery functions ****************

//Default JSON object to submit to cybercommons api task queue
$.getCYBERCOM_JSON_OBJECT = function(task_name) {
  return {
    function: task_name,
    queue: "celery",
    args: [],
    kwargs: {},
    tags: []
  };
};
$.defaultFor = function(arg, val) {
  return typeof arg !== "undefined" ? arg : val;
};

//postJSON is custom call for post to cybercommons api
$.postJSON = function(url, data, callback, fail, type) {
  type = $.defaultFor(type, "POST");
  return jQuery.ajax({
    type: type,
    url: url,
    contentType: "application/json",
    data: JSON.stringify(data),
    dataType: "json",
    success: callback,
    error: fail,
    beforeSend: function(xhr, settings) {
      xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"));
    }
  });
};

$.deleteJSON = function(url, callback, fail) {
  return jQuery.ajax({
    type: "DELETE",
    url: url,
    contentType: "application/json",
    success: callback,
    error: fail,
    beforeSend: function(xhr, settings) {
      xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"));
    }
  });
};

$.modalMesssage = function(title, message) {
  $("#modals").empty();
  template = Handlebars.templates["tmpl-modalMessage"];
  tmpdata = { title: title, message: message };
  $("#modals").append(template(tmpdata));
  $("#myModal").modal("show");
};

$.objectWithKeySorted = function(object) {
  var result = {};
  _.forEach(Object.keys(object).sort(), function(key) {
    result[key] = object[key];
  });
  return result;
};

//Used to serialize form object to get form data
$.fn.serializeObject = function() {
  var o = {};
  var a = this.serializeArray();
  $.each(a, function() {
    if (o[this.name] !== undefined) {
      if (!o[this.name].push) {
        o[this.name] = [o[this.name]];
      }
      o[this.name].push(this.value || "");
    } else {
      o[this.name] = this.value || "";
    }
  });
  return o;
};

//add links to http and https items
$.fn.urlize = function() {
  if (this.length > 0) {
    this.each(function(i, obj) {
      // making links active
      var x = $(obj).html();
      var list = x.match(/\b(http:\/\/|www\.|http:\/\/www\.)[^ <]{2,200}\b/g);
      if (list) {
        for (i = 0; i < list.length; i++) {
          var prot =
            list[i].indexOf("http://") === 0 ||
            list[i].indexOf("https://") === 0
              ? ""
              : "http://";
          x = x.replace(
            list[i],
            "<a target='_blank' href='" +
              prot +
              list[i] +
              "'>" +
              list[i] +
              "</a>"
          );
        }
      }
      $(obj).html(x);
    });
  }
};

//get cybercommons cookie Value
function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie != "") {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = jQuery.trim(cookies[i]);
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) == name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

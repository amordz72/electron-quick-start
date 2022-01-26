/*جلب بيانات من حقل
    innerText
*/
function getTd(colName, index) {
    let tbl = document.getElementById("tbl");
    var v = "";
  
    v = tbl.rows[index].cells.namedItem(colName).innerText;
  
    return v;
  }
  
  function formOver() {
    let text = ``;
    try {
      select_text = document.getElementById("txt_table").value;
      var txt_RootCssJs = document.querySelector("#txt_RootCssJs").value;
      text += `
    
    <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
     
      <title>${toUpperCaseFirst(select_text)}</title>
      
      <link rel="stylesheet"  href="${txt_RootCssJs}/css/normalize.css v8.0.1.css"/>
      <link rel="stylesheet" href="${txt_RootCssJs}/css/all.min.css" />
      <link href="${txt_RootCssJs}/css/bootstrap.rtl.min.css" rel="stylesheet" />
    
      <!--   <link href="${txt_RootCssJs}/css/bootstrap.min.css" rel="stylesheet" /> -->
  
      <link rel="stylesheet"  href="./css/${select_text}.css"/>
  
    </head>
    
    <div class="container-fluid" id="app">
    <div class="container">
    <div class="row mt-2">
    <h1 class="text-center">Form ${toUpperCaseFirst(select_text)}</h1> 
    <form @submit="preventDefault()" method="post" id="frm_${select_text}" name="frm_${select_text}">`;
  
      let tbl = document.getElementById("tbl");
  
      for (let r = 1; r < tbl.rows.length; r++) {
        if (tbl.rows[r].cells[2].firstChild.checked == true && r > 1) {
          text += inputOver(
            getTd("coName", r),
            getTd("control", r),
            getTd("caption", r),
            getTd("td_fk_id", r),
            getTd("td_fk_text", r),
            select_text
          );
        } else if (tbl.rows[r].cells[2].firstChild.checked == true && r == 1) {
          text += inputOverId(
            getTd("coName", r),
            getTd("control", r),
            getTd("caption", r),
            getTd("td_fk_id", r),
            getTd("td_fk_text", r),
            select_text
          );
        }
      }
      text += getTableHtml();
      text += getBtnHtml();
      text += `
      <div class="alert alert-primary my-2" role="alert" v-show="vif_msg">
      {{ msg}}
       </div>
      </form>
    </div>
    </div>
    </div>
    <script src="${txt_RootCssJs}/js/bootstrap.bundle.min.js"></script>
      <script src="${txt_RootCssJs}/js/all.min.js"></script>
    <script src="${txt_RootCssJs}/js/axios.min.js"></script>
    <script src="${txt_RootCssJs}/js/vue3.js"></script>
   
    <script src="./js/${select_text}.js"></script>
    <script src="./js/${select_text}_app.js"></script>
    <!--<script src="./component/public/NavBar.js"></script>--> 
  
  </body>
  </html>
    `;
    } catch (error) {}
  
    return text;
  }
  
  function inputOver(
    name,
    type = "text",
    text = "",
    _idfk = "",
    _txtFk = "",
    Tablename = ""
  ) {
    if (text == "") {
      text = name;
    }
    let _text = ``;
  
    if (type == "checkbox") {
      _text += `<div class="form-check">`;
      _text += ` <input type="${type}" id="${name}"  name="${name}" checked="false"   class="form-check-input"  v-model="${name.toUpperCase()}">`;
      _text += `<label for="${name}" class="form-check-label">${text}</label>
      </div>`;
    } else if (type == "radio") {
      _text += `<div class="form-check">`;
      _text += ` <input type="${type}" id="${name}"  name="${name}" checked   class="form-check-input"  v-model="${name.toUpperCase()}">`;
      _text += `<label for="${name}" class="form-check-label">${text}</label>
      </div>`;
    } else if (type == "select") {
      _text += `<div class="form-check">
      <select class="form-select"  v-model="${name.toUpperCase()}" >`;
      _text += `<option selected>Open this select menu</option>`;
      _text += `<option v-for="item in options_${name}" :key="item.${_idfk}" :value="item.${_idfk}">{{item.${_txtFk}}}</option>`;
      _text += `</select>
      </div>`;
    } else if (type == "textarea") {
      _text += `<div class="form-floating">
     <textarea class="form-control"   id="${name}" name="${name}"  v-model="${name.toUpperCase()}"></textarea>
      <label for="${name}">${name} :</label>
      </div>`;
    } else if (type == "number") {
      _text += `<div class="mb-3">`;
      _text += `<label for="${name}" class="form-label">${text}</label>`;
      _text += ` <input type="${type}" class="form-control" id="${name}"  name="${name}"  v-model="${name.toUpperCase()}" >
      </div>`;
    } else {
      _text += `<div class="mb-3">`;
      _text += `<label for="${name}" class="form-label">${text}</label>`;
      _text += ` <input type="${type}" class="form-control" id="${name}"  name="${name}"  v-model="${name.toUpperCase()}"></div>`;
    }
  
    return _text;
  }
  function inputOverId(
    name,
    type = "text",
    text = "",
    _idfk = "",
    _txtFk = "",
    Tablename = ""
  ) {
    if (text == "") {
      text = name;
    }
    let _text = ``;
  
    if (type == "checkbox") {
      _text += `<div class="form-check">`;
      _text += ` <input type="${type}" id="${name}"  name="${name}" checked="false"   class="form-check-input"  v-model="${name.toUpperCase()}">`;
      _text += `<label for="${name}" class="form-check-label">${text}</label>
      </div>`;
    } else if (type == "radio") {
      _text += `<div class="form-check">`;
      _text += ` <input type="${type}" id="${name}"  name="${name}" checked   class="form-check-input"  v-model="${name.toUpperCase()}">`;
      _text += `<label for="${name}" class="form-check-label">${text}</label>
      </div>`;
    } else if (type == "select") {
      _text += `<div class="form-check">
      <select class="form-select"  v-model="${name.toUpperCase()}" >`;
      _text += `<option selected>Open this select menu</option>`;
      _text += `<option v-for="item in options_${name}" :key="item.${_idfk}" :value="item.${_idfk}">{{item.${_txtFk}}}</option>`;
      _text += `</select>
      </div>`;
    } else if (type == "textarea") {
      _text += `<div class="form-floating">
     <textarea class="form-control"   id="${name}" name="${name}"  v-model="${name.toUpperCase()}"></textarea>
      <label for="${name}">${name} :</label>
      </div>`;
    } else if (type == "number") {
      _text += `<div class="mb-3">`;
      _text += `<label for="${name}" class="form-label">${text}</label>`;
      _text += ` <input type="${type}" class="form-control" id="${name}"  name="${name}"  v-model="${name.toUpperCase()}" @change="GetDataById_${Tablename}">
      </div>`;
    } else {
      _text += `<div class="mb-3">`;
      _text += `<label for="${name}" class="form-label">${text}</label>`;
      _text += ` <input type="${type}" class="form-control" id="${name}"  name="${name}"  v-model="${name.toUpperCase()}"></div>`;
    }
  
    return _text;
  }
  
  function getTableHtml() {
    let tbl = document.getElementById("tbl");
    let ch_table = document.getElementById("ch_table");
    let _text = ``;
    let myth = ``;
    let mytd = ``;
    let col_id = ``;
    if (document.querySelector("#ch_table").checked == true) {
      for (let index = 1; index < tbl.rows.length; index++) {
        if (tbl.rows[index].cells[2].firstChild.checked == true) {
          const element = tbl.rows[index].cells[0].innerText;
          const cap = tbl.rows[index].cells[4].innerText;
          myth += `<th scoop="col">${cap}</th>`;
          mytd += `<td scoop="row">{{item.${element}}}</td>`;
        }
        if (tbl.rows[index].cells[3].firstChild.checked == true) {
          col_id = tbl.rows[index].cells[0].innerText;
        }
      }
      _text += `
      <table class="table  table-hover   table-responsive table-bordered my-3 text-center">\n
    <thead class="table-dark">
     ${myth}\n
    </thead>\n
    
    <tbody>\n
    <tr v-for=" item in allData" :key="item.${col_id}">\n
    ${mytd}\n
    </tr>\n
    </tbody>
    </table>\n
     
    `;
    } else _text = ``;
  
    return _text;
  }
  
  function getBtnHtml() {
    let tbl = document.getElementById("tbl");
    let ch_table = document.getElementById("ch_table");
    let _text = ``;
  
    _text += `
      <div class="d-grid gap-2  d-md-flex justify-content-md-start">
      <button type="button" class="btn btn-primary" @click="add" :disabled="isEdited">Add</button>
      <button type="button" class="btn btn-warning" @click="update" :disabled="!isEdited">Edite</button>
      <button type="button" class="btn btn-danger" @click="deleted"  :disabled="!isEdited">Delete</button>
       <button type="button" class="btn btn-success" @click="clear()" >New</button>
     <!--  <div v-show="false">
       
        <button type="button" class="btn btn-info">Info</button>
        <button type="button" class="btn btn-secondary">retur</button>
      </div>--> 
    </div>
    `;
  
    return _text;
  }
  
  function getInputByName(name) {
    return document.querySelector(`input[name="${name}"]`);
  }
  //s-code
  
  function code() {
    let e = document.getElementById("ch_html");
    printCode(formOver(), e.checked);
  }
  
  //s- add row to table code  /**/
  
  /**
   *
   * @param {*} item
   * @param {*} t:innerText,h=innerHTML,v=value,c=checked
   * @returns
   */
  function _querySelector(item, params = "t") {
    if (params == "h") {
      var ite = document.querySelector(item).innerHTML;
  
      return ite;
    }
    if (params == "t") {
      var ite = document.querySelector(item).innerText;
  
      return ite;
    }
    if (params == "v") {
      var ite = document.querySelector(item).value;
  
      return ite;
    }
    if (params == "c") {
      var ite = document.querySelector(item).checked;
  
      return ite;
    }
  }
  
  function getCbxTextById(cbxId) {
    var e = document.getElementById(cbxId);
    var text = e.options[e.selectedIndex].text;
  
    return text;
  }
  
  function getCbxValueById(cbxId) {
    var e = document.getElementById(cbxId);
  
    var value = e.options[e.selectedIndex].value;
  
    return value;
  }
  
  function getCheckboxCheckedById(cbxId) {
    var e = document.getElementById(cbxId);
  
    return e.checked;
  }
  
  function getCheckboxValueById(chId) {
    var e = document.getElementById(chId);
  
    return e.value;
  }
  
  function getInputValueById(inId) {
    var e = document.getElementById(inId);
  
    return e.value;
  }
  
  function printCode(params, html = false) {
    if (html) {
      var pCode = document.getElementById("code");
      pCode.innerHTML = params;
    } else {
      var pCode = document.getElementById("code");
      pCode.innerText = params;
    }
  }
  
  function getCheckbooks(i) {
    let tbl = document.getElementById("tbl");
  
    var checkBox = tbl.rows[i].cells[2].firstChild;
  
    try {
      if (checkBox.checked == true) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
  
  function getCheckbookIf(i) {
    let tbl = document.getElementById("tbl");
  
    var checkBox = tbl.rows[i].cells[3].firstChild;
  
    try {
      if (checkBox.checked == true) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
  
  function getCheckbookSel(i) {
    let tbl = document.getElementById("tbl");
  
    var checkBox = tbl.rows[i].cells[2].firstChild;
  
    try {
      if (checkBox.checked == true) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
  
  function getControl(colName, index) {
    let tbl = document.getElementById("tbl");
    var v = "";
  
    v = tbl.rows[index].cells.namedItem(colName).firstChild.innerText;
  
    return v;
  }
  
  function getCellValueByColName(table, colName, indexStart = 1) {
    let tbl = document.getElementById(table);
    var v = "";
    for (let index = indexStart; index < tbl.rows.length; index++) {
      v = tbl.rows[index].cells.namedItem(colName).innerText;
      alert(v);
    }
    return v;
  }
  
  function getCellValueByColIndex(table, colIndex, indexStart = 1) {
    let tbl = document.getElementById(table);
    var v = "";
    for (let index = indexStart; index < tbl.rows.length; index++) {
      v = tbl.rows[index].cells[colIndex].innerText;
      alert(v);
    }
    return v;
  }
  
  function toUpperCaseFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  apiCode = function () {
    // var sel = document.getElementById("cbx_tables");
    // var tblName = sel.options[sel.selectedIndex].text;
    var tblName = document.getElementById("txt_table").value;
  
    var tbl = document.getElementById("tbl");
    var cols = "";
    var colsAddPar = "";
    var col_id = "";
    var colsUpdate = "";
    var arrCols = [];
  
    var colsToTable = "";
    var table2 = "";
    var isTwoTable = false;
    var where = "";
  
    for (let index = 1; index < tbl.rows.length; index++) {
      if (tbl.rows[index].cells[2].firstChild.checked == true) {
        cols += tbl.rows[index].cells[0].innerText + ",";
        colsAddPar += ":" + tbl.rows[index].cells[0].innerText + ",";
        arrCols.push(tbl.rows[index].cells[0].innerText);
  
        if (tbl.rows[index].cells[5].innerText == "select") {
          colsToTable +=
            tbl.rows[index].cells[8].innerText +
            " as " +
            tbl.rows[index].cells[0].innerText +
            ",";
          table2 += tbl.rows[index].cells[6].innerText + ",";
          where +=
            tbl.rows[index].cells[0].innerText +
            "=" +
            tbl.rows[index].cells[7].innerText +
            " and";
        } else {
          colsToTable += tbl.rows[index].cells[0].innerText + ",";
        }
      }
  
      if (tbl.rows[index].cells[3].firstChild.checked == true) {
        col_id = tbl.rows[index].cells[0].innerText;
      }
  
      if (
        ((tbl.rows[index].cells[3].firstChild.checked == false) ==
          tbl.rows[index].cells[2].firstChild.checked) ==
        true
      ) {
        colsUpdate +=
          tbl.rows[index].cells[0].innerText +
          " = :" +
          tbl.rows[index].cells[0].innerText +
          ",";
      }
    }
  
    cols = cols.substring(0, cols.length - 1);
    colsAddPar = colsAddPar.substring(0, colsAddPar.length - 1);
    colsUpdate = colsUpdate.substring(0, colsUpdate.length - 1);
    colsToTable = colsToTable.substring(0, colsToTable.length - 1);
  
    if (table2 != "") {
      table2 = table2.substring(0, table2.length - 1);
      where = where.substring(0, where.length - 3);
    }
  
    var code = `
    <?php 
  
    $username="root";
    $password="";
    $host="localhost";
    $database="${document.querySelector("#txt_db").value}";
    
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
    
    $connect = new PDO("mysql:host=$host;dbname=$database", "$username", "$password");
    $data = array();
    $received_data = json_decode(file_get_contents("php://input"));
      
   `;
    code += getPhpINSERT(tblName, arrCols, cols, colsAddPar);
    code += getPhpUPDATE(tblName, arrCols, colsUpdate, col_id);
    code += getPhpDELETE(tblName, col_id);
    code += getPhpMaxId(tblName, col_id);
    code += getPhpAdd_all(tblName, cols, colsAddPar, arrCols);
    code += getPhpG(tblName, colsToTable, table2, where);
    code += getPhpGetDataById(tblName, colsToTable, col_id, table2, where);
    code += getPhpSingle(tblName, cols, arrCols, col_id);
  
    code += selectPhpCode();
    document.getElementById("code").innerText = code;
    return code;
  };
  
  function getPhpG(table, cols, table2 = "", where = "") {
    if (table2 != "") {
      table2 = "," + table2;
      where = " where " + where;
    }
  
    var c = `if ($received_data->action == 'g_${table}') 
   { 
     $query = " SELECT * FROM ${table}${table2}${where}  ";
    $query = " SELECT ${cols} FROM ${table}${table2}${where} ";
   
   
    $statement = $connect->prepare($query);
   $statement->execute();
   while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
       $data[] = $row;
       }
   echo json_encode($data);
   }\n`;
    return c;
  }
  function getPhpGetDataById(tblName, cols, col_id, table2 = "", where = "") {
    if (table2 != "") {
      table2 = "," + table2;
      where = " and " + where;
    } else {
      table2 = tblName;
    }
    var code = `  if ($received_data->action == 'GetDataById_${tblName}') {
      $query = " SELECT ${cols} FROM ${table2}  
      where ${col_id} =". $received_data->_${col_id}." ${where} ORDER BY ${col_id} DESC";
     
      $statement = $connect->prepare($query);
      $statement->execute();
      while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
        $data[] = $row;
      }
      echo json_encode($data);
    }\n`;
  
    return code;
  }
  function getPhpMaxId(tblName, col_id) {
    return ` if ($received_data->action == 'max_${tblName}') {
      $max_id = 1;
      $stmt =  $connect->prepare("SELECT MAX(${col_id})+1 AS max_id FROM ${tblName}");
      $stmt->execute();
      $invNum = $stmt->fetch(PDO::FETCH_ASSOC);
      $max_id = $invNum['max_id'];
      if (empty($max_id) || $max_id == '') {
        $max_id = 1;
      }
      $data['${col_id}'] = $max_id;
      echo json_encode($data);
    }\n`;
  }
  
  function getPhpAdd_all(tblName, cols, colsAddPar, arrCols) {
    var code = ` if ($received_data->action == 'add_all_${tblName}') {
    $data = array(`;
    for (let index = 0; index < arrCols.length; index++) {
      code += `':${arrCols[index]}' => $received_data->_all[${index}],\n`;
    }
  
    code += `);
    $query = "INSERT INTO  ${tblName} (${cols}) VALUES (${colsAddPar} )";
    $statement = $connect->prepare($query);
    $statement->execute($data);
    $output = array('message' => 'Data Inserted');
    echo json_encode($output);
  }\n`;
  
    return code;
  }
  
  function getPhpSingle(tblName, cols, arrCols, col_id) {
    var code = `  if ($received_data->action == 's_${tblName}')\n {\n
      $query = " SELECT ${cols} FROM ${tblName} 
      WHERE ${col_id}= '" . $received_data->_${col_id} . "'";
      $statement = $connect->prepare($query);
      $statement->execute();
      $result = $statement->fetchAll();
      foreach ($result as $row)\n {\n`;
    for (let index = 0; index < arrCols.length; index++) {
      const element = arrCols[index];
      code += `$data['${element}'] = $row['${element}'];\n`;
    }
  
    code += `}
      echo json_encode($data);
    }\n`;
  
    return code;
  }
  
  function getPhpINSERT(tblName, arrCols, cols, colsAddPar) {
    var code = `if ($received_data->action == 'i_${tblName}') {
      $data = array(`;
    for (let index = 0; index < arrCols.length; index++) {
      code += `':${arrCols[index]}' => $received_data->_${arrCols[index]},\n`;
    }
  
    code += `);
      $query = "INSERT INTO  ${tblName} (${cols}) VALUES (${colsAddPar} )";
      $statement = $connect->prepare($query);
      $statement->execute($data);
      $output = array('message' => 'Data Inserted');
      echo json_encode($output);
    }\n`;
  
    return code;
  }
  
  function getPhpUPDATE(tblName, arrCols, colsUpdate, col_id) {
    var code = ` if ($received_data->action == 'u_${tblName}') {
      $data = array(`;
  
    arrCols.forEach((element) => {
      if (element != col_id) {
        code += `':${element}' => $received_data->_${element},\n`;
      } else {
        code += `':${col_id}'   => $received_data->hiddenId,\n`;
      }
    });
  
    code += `);
    
      $query = " UPDATE ${tblName} SET ${colsUpdate} WHERE  ${col_id} = :${col_id} ";
     
      $statement = $connect->prepare($query);
      $statement->execute($data);
      $output = array('message' => 'Data Updated');
      echo json_encode($output);
    }\n`;
  
    return code;
  }
  
  function getPhpDELETE(tblName, col_id) {
    return ` if ($received_data->action == 'd_${tblName}') {
      $query = "
     DELETE FROM ${tblName}  WHERE ${col_id}= '" . $received_data->_${col_id} . "'";
      $statement = $connect->prepare($query);
      $statement->execute();
      $output = array(
        'message' => 'Data Deleted'
      );
      echo json_encode($output);
    }\n`;
  }
  apiJsCode = function () {
    // var sel = document.getElementById("cbx_tables");
    // var tblName = sel.options[sel.selectedIndex].text;
    var tblName = document.getElementById("txt_table").value;
    var tbl = document.getElementById("tbl");
    var cols = "";
    var colsAddPar = "";
    var col_id = "";
    var colsUpdate = "";
    var arrCols = [];
  
    var _url = `https://localhost/${document
      .querySelector("#txt_proj")
      .value.toString()
      .trim()
      .replace("\\", "/")}/api/${tblName}.php`;
  
    for (let index = 1; index < tbl.rows.length; index++) {
      if (tbl.rows[index].cells[2].firstChild.checked == true) {
        cols += tbl.rows[index].cells[0].innerText + ",";
        colsAddPar += ":" + tbl.rows[index].cells[0].innerText + ",";
  
        arrCols.push(tbl.rows[index].cells[0].innerText);
      }
      if (tbl.rows[index].cells[3].firstChild.checked == true) {
        col_id = tbl.rows[index].cells[0].innerText;
      }
      if (
        ((tbl.rows[index].cells[3].firstChild.checked == false) ==
          tbl.rows[index].cells[2].firstChild.checked) ==
        true
      ) {
        colsUpdate +=
          tbl.rows[index].cells[0].innerText +
          " = :" +
          tbl.rows[index].cells[0].innerText +
          ",";
      }
    }
    cols = cols.substring(0, cols.length - 1);
    colsAddPar = colsAddPar.substring(0, colsAddPar.length - 1);
    colsUpdate = colsUpdate.substring(0, colsUpdate.length - 1);
  
    var code = `
    const app = Vue.createApp({
      props: ["title"],
      data() {
        return {
          allData: "",
          ALL: "",
          myModel: false,
           actionButton: 'Insert',
          dynamicTitle: 'Add Data',
           vif_msg: false,
            msg: '',
            date: new Date().toISOString().substr(0, 10),
            isEdited: false,
          `;
  
    for (let index = 1; index < tbl.rows.length; index++) {
      if (tbl.rows[index].cells[2].firstChild.checked == true) {
        if (tbl.rows[index].cells[5].innerText == "select") {
          code += `options_${tbl.rows[index].cells[0].innerText}: "",\n`;
          code += `${tbl.rows[index].cells[0].innerText.toUpperCase()}: "",\n`;
        } else if (tbl.rows[index].cells[5].innerText == "number") {
          code += `${tbl.rows[index].cells[0].innerText.toUpperCase()}:0,\n`;
        } else if (tbl.rows[index].cells[5].innerText == "checkbox") {
          code += `${tbl.rows[index].cells[0].innerText.toUpperCase()}:false,\n`;
        } else if (tbl.rows[index].cells[5].innerText == "date") {
          code += `${tbl.rows[
            index
          ].cells[0].innerText.toUpperCase()}: new Date().toISOString().substr(0, 10),\n`;
        } else {
          code += `${tbl.rows[index].cells[0].innerText.toUpperCase()}: "",\n`;
        }
      }
    }
  
    code += `rowIndex: 0,
    myUrl:"${_url}",
    };
       
  },
      computed: {},
      methods: {
        `;
    code += `
        clear: function () {
          `;
  
    for (let index = 1; index < tbl.rows.length; index++) {
      var item = tbl.rows[index].cells[0].innerText.toUpperCase();
  
      var control = tbl.rows[index].cells[5].innerText;
  
      if (tbl.rows[index].cells[2].firstChild.checked == true) {
        if (control == "date") {
          code += `this.${item} =  new Date().toISOString().substr(0, 10);\n`;
        } else if (control == "number") {
          code += `this.${item} = 0;\n`;
        } else if (control == "checkbox") {
          code += `this.${item} = false;\n`;
        } else {
          code += `this.${item} = "";\n`;
        }
      }
    }
    code += `
    this.fetchAllData_${tblName}();
    this.max(); 
    this.isEdited= false;
    },       
        max: function () {  
        var me=this;
          axios.post(me.myUrl, {   
              action: 'max_${tblName}'
          }).then(function (response) {\n`;
    code += `me.${col_id.toUpperCase()} = response.data.${col_id};\n`;
    code += ` }); 
        }
        ,
        fetchAllData_${tblName}: function () {
        var me=this;
         axios.post(me.myUrl, {
            action: 'g_${tblName}'
          }).then(function (response) {
            me.allData = response.data;
          });
        },
        fetchData_${tblName}: function (id="") {
          var me=this;
          if(id=="")
          {
            id=me.${col_id.toUpperCase()};
          }
              axios.post(me.myUrl, {
                action: 's_${tblName}',
                _${col_id}: id
              }).then(function (response) {
                `;
  
    for (let index = 1; index < tbl.rows.length; index++) {
      var item = tbl.rows[index].cells[0].innerText;
  
      if (tbl.rows[index].cells[2].firstChild.checked == true) {
        code += ` me.${item.toUpperCase()} = response.data.${item};\n`;
      }
    }
  
    code += `
    me.actionButton = 'Update';
   me.dynamicTitle = 'Edit Data';
   me.isEdited= true;
   me.myModel = true;
               
   });
  },
        
             `;
    code += add();
    code += update(col_id.toUpperCase());
    code += CantEmpty();
  
    code += selectJsCode();
  
    code += ` 
           
         `;
    code += `
   
         deleted: function (id="") {
         
            var me = this;
           
             id=me.${col_id.toUpperCase()};
               if (confirm("Are you sure you want to remove this data?")) {
                 axios
                   .post(me.myUrl, {
                     action: "d_${tblName}",
                     _${col_id}: id,
                   })
                   .then(function (response) {
                     me.msg = response.data.message;
                     me.vif_msg = true;
                     me.clear();
                     me.fetchAllData_${tblName}();
                    
                   });
               }
             },
         `;
    code += `
            
              
           `;
    code += `
           GetDataById_${tblName}: function (id = 1) {
            
              var me = this;
            
               id=me.${col_id.toUpperCase()};
            axios
              .post(me.myUrl, {
                action: "GetDataById_${tblName}",
                _${col_id}: id,
              })
              .then(function (response) {
                me.allData = response.data;
                   `;
    for (let index = 1; index < tbl.rows.length; index++) {
      if (tbl.rows[index].cells[2].firstChild.checked == true) {
        if (tbl.rows[index].cells[3].firstChild.checked == false) {
          code += ` me.${tbl.rows[
            index
          ].cells[0].innerText.toUpperCase()} = response.data[0].${
            tbl.rows[index].cells[0].innerText
          };\n`;
        }
      }
    }
    code += ` 
            me.isEdited = true;
  
              });
          },
           `;
    code += `
  
               
      },
      created() {
       
      },
      mounted() {
        `;
    for (let index = 1; index < tbl.rows.length; index++) {
      if (tbl.rows[index].cells[2].firstChild.checked == true) {
        if (tbl.rows[index].cells[5].innerText == "select") {
          code += ` this.fill_${tbl.rows[index].cells[0].innerText}();\n`;
        }
      }
    }
  
    code += ` 
    this.clear();
      },
    
  }) .mount("#app");
     
     `;
  
    document.getElementById("code").innerText = code;
    return code;
  };
  resetData = function () {
    deleteRowsTable("tbl");
  };
  deleteRowsTable = function (Tablename) {
    var myTable = document.getElementById(Tablename);
    var rowCount = myTable.rows.length;
    for (var x = rowCount - 1; x > 0; x--) {
      myTable.deleteRow(x);
    }
  };
  
  function add() {
    // var sel = document.getElementById("cbx_tables");
    // var tblName = sel.options[sel.selectedIndex].text;
    var tblName = document.getElementById("txt_table").value;
    var tbl = document.getElementById("tbl");
    var txt = "";
    for (let index = 1; index < tbl.rows.length; index++) {
      if (tbl.rows[index].cells[2].firstChild.checked == true) {
        const element = tbl.rows[index].cells[0].innerText;
  
        txt += `_${element}: me.${element.toUpperCase()}\n,`;
      }
    }
    return `
    add: function () {
      var me=this;
         axios
           .post(me.myUrl, {
             action: "i_${tblName}",
             ${txt}
             
           })
           .then(function (response) {
             me.myModel = false;
             me.msg = response.data.message;
             me.vif_msg = true;
             me.clear();
           });
       },
   `;
  }
  
  function update(id) {
    // var sel = document.getElementById("cbx_tables");
    // var tblName = sel.options[sel.selectedIndex].text;
    var tblName = document.getElementById("txt_table").value;
    var tbl = document.getElementById("tbl");
    var txt = "";
    for (let index = 1; index < tbl.rows.length; index++) {
      if (tbl.rows[index].cells[2].firstChild.checked == true) {
        const element = tbl.rows[index].cells[0].innerText;
  
        txt += `_${element}: me.${element.toUpperCase()}\n,`;
      }
    }
  
    return `
    update: function (id="") {
      var me = this;
      
       id=me.${id.toUpperCase()};
         
      axios
        .post(me.myUrl, {
   
          action: "u_${tblName}",
          ${txt}
          hiddenId: id,
        })
        .then(function (response) {
          me.myModel = false;
          me.hiddenId = "";
          me.msg = response.data.message;
          me.vif_msg = true;
          me.clear();
        });
    },
   `;
  }
  
  function CantEmpty() {
    // var sel = document.getElementById("cbx_tables");
    // var tblName = sel.options[sel.selectedIndex].text;
    var tblName = document.getElementById("txt_table").value;
    var tbl = document.getElementById("tbl");
    var txt = `CantEmpty :function(){
      if ( `;
    for (let index = 1; index < tbl.rows.length; index++) {
      if (tbl.rows[index].cells[2].firstChild.checked == true) {
        const element = tbl.rows[index].cells[0].innerText;
        txt += `this.${element.toUpperCase()}== "" ||`;
      }
    }
    txt = txt.substring(0, txt.length - 2);
    txt += `)
    {  
     alert('all fields required ...!');
      return;
       }
     
      },`;
    return txt;
  }
  
  function selectJsCode() {
    var tbl = document.getElementById("tbl");
    var txt = "";
    for (let index = 1; index < tbl.rows.length; index++) {
      if (tbl.rows[index].cells[2].firstChild.checked == true) {
        if (tbl.rows[index].cells[5].innerText == "select") {
          txt += ` 
          fill_${tbl.rows[index].cells[0].innerText}: function () {
            var me=this;
            axios
              .post(me.myUrl, {
                action: "fill_${tbl.rows[index].cells[0].innerText}",
              })
              .then(function (response) {
                me.options_${tbl.rows[index].cells[0].innerText} = response.data;
              });
          },
           `;
        }
      }
    }
  
    return txt;
  }
  
  function selectPhpCode() {
    var tbl = document.querySelector("#tbl");
    var Tablename = "";
  
    var sel = "";
    var txt = "";
    var cols = "";
  
    for (let index = 1; index < tbl.rows.length; index++) {
      if (tbl.rows[index].cells[2].firstChild.checked == true) {
        if (tbl.rows[index].cells[5].innerText == "select") {
          Tablename = tbl.rows[index].cells[6].innerText;
          sel = tbl.rows[index].cells[0].innerText;
          cols =
            tbl.rows[index].cells[7].innerText +
            "," +
            tbl.rows[index].cells[8].innerText;
  
          txt += ` 
        if ($received_data->action == 'fill_${sel}') {
          $query=" SELECT 
         ${cols}
        FROM
          ${Tablename}
        ";
          $statement = $connect->prepare($query);
          $statement->execute();
          while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
              $data[] = $row;
          }
          echo json_encode($data);
      
      }
         `;
        }
      }
    }
  
    return txt;
  }
  setTable = function () {
    var text = "";
  
    try {
      var cbx_tables = document.getElementById("cbx_tables");
      text = cbx_tables.options[cbx_tables.selectedIndex].text;
      document.getElementById("txt_table").value = text;
    } catch (error) {}
  };
  function copyToClipBoar0d() {
    /* Get the text field */
    var copyText = document.getElementById("code");
  
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
  
    /* Copy the text inside the text field */
    document.execCommand("copy");
  
    /* Alert the copied text */
    // alert("Copied the text: " + copyText.value);
  }
  function CopyToClipboard() {
    var r = document.createRange();
    r.selectNode(document.getElementById("code"));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(r);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
  }
  /**
   * create table to Db
   */
  
  function createTableCode() {
    var table = document.getElementById("tbl");
    var val_text = document.getElementById("txt_table").value;
    if (val_text.trim() == "") {
      document.getElementById("msg").innerText = "ادخل اسم الجدول اولا";
      document.getElementById("msg").style.display = "block";
  
      document.getElementById("txt_table").focus();
      return;
    }
  
    var pk = "";
    var cols = "";
  
    for (let index = 1; index < table.rows.length; index++) {
      const element = table.rows[index];
  
      if (index === 1) pk = element.cells[0].innerText;
  
      cols +=
        element.cells[0].innerText +
        " " +
        element.cells[1].innerText +
        "  NOT NULL ,";
    }
    // cols = cols.substring(0, cols.length - 1);
    var text = `CREATE TABLE ${val_text}  (
       ${cols}
     PRIMARY KEY ( ${pk}  )) ENGINE = InnoDB;`;
  
    var cntr = document.getElementById("code");
    cntr.innerText = text;
  }
  
  function edit(val) {
    var myTable = document.getElementById("tbl");
    var rowCount = myTable.rows.length;
    for (var x = 1; x > rowCount; x++) {
      if (val == myTable.rows[x].cells[0].innerText) {
        this.colName = myTable.rows[x].cells[0].innerText;
        this.colType = myTable.rows[x].cells[1].innerText;
      }
    }
  }
  function del(val) {
    //tbl.rows[index].cells[2].firstChild.checked
    var myTable = document.getElementById("tbl");
    var rowCount = myTable.rows.length;
    for (var x = rowCount - 1; x > 0; x--) {
      if (val == myTable.rows[x].cells[0].innerText) {
        myTable.deleteRow(x);
      }
    }
  }
  function myFunction(x) {
    p1 = x.parentNode;
    alert("Row index is: ");
  }
  
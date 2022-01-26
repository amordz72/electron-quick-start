const app = Vue.createApp({
    props: ["title"],
    data() {
      return {
        ti: "Form Creature",
        allTables: "",
        _url: "http://localhost/frm-cV2/admin/api/action_db.php",
        myJsonData: {
          visible_addCol: true,
          cbx: [
            "text",
            "checkbox",
            "number",
            "date",
            "password",
            "select",
            "textarea",
            "datetime-local",
            "email",
            "color",
            "file",
            "hidden",
            "image",
            "month",
            "reset",
            "button",
            "radio",
            "range",
            "search",
            "submit",
            "tel",
            "time",
            "url",
            "week",
          ],
          mysql: [
            "varchar(255)",
            "decimal(8,2)",
            "int(11)",
            "decimal(10,0)",
            "text",
            "float",
            "double",
            "REAL",
            "tinyint(1)",
            "date",
            "time",
            "datetime",
          ],
          myJsonDataFromFile: "",
        },
        allCols: "",
        allColumns: "",
        visible_addCol: true,
        rowIndex: 0,
        db: "mahal",
        txt_table: "",
        projectName: "frm-cV2",
        current_Lang: localStorage.getItem("lang") || "ar",
        msg: "",
        show_msg: false,
        colType: "",
        tableParent: "",
        colNameEnter: "",
        colcaptionEnter: "",
        addToDgv: false,
        controlName: "text",
        tableFk: "",
        fk_id: "",
        fk_txt: "",
        dgvTable: "",
        showAll: false,
        ch_html: localStorage.getItem("ch_html") || false,
        ch_table: localStorage.getItem("ch_table") || false,
  
        user_name: "",
        ch_sel: true,
        ch_if: false,
        code: "",
        codeLang: "html",
        projectFormName: localStorage.getItem("projectFormName") || "",
        laName: "html",
        RootCssJs: localStorage.getItem("RootCssJs") || "../admin/layout",
      };
    },
    computed: {
      lang: function () {
        if (this.current_Lang == "ar") {
        } else {
        }
  
        return "pr_" + this.db;
      },
    },
    methods: {
      getJsonData: function () {
        var db = "./admin/api/db.json";
        var me = this;
  
        axios.get(db, {}).then(function (response) {
          // me.myJsonData = response.data;
          // me.visible_addCol = me.myJsonData.visible_addCol;
          //بعد جلب ملف جسون يتم استبدال نجمة باسم مشروع
          // me._url = me.myJsonData.url.toString().replace("*", me.projectName);
        });
      },
      setDataType: function () {
        document.querySelector("#txt_coltypeEnter").value =
          document.querySelector("#cbx_dataType").value;
      },
      setProject: function () {
        if (this.projectFormName == "") {
          this.projectFormName = "pr_" + this.db;
          return this.projectFormName;
        }
      },
      fetchAllTables: function () {
        var me = this;
        axios
          .post(me._url, {
            action: "getTables",
            _db: document.getElementById("txt_db").value,
          })
          .then(function (response) {
            me.allTables = response.data;
          });
      },
      getCols: function () {
        var me = this;
        try {
          var self = this;
          // var cbx_tables = document.getElementById("cbx_tables");
          // var text = cbx_tables.options[cbx_tables.selectedIndex].text;
          //var   text=    self.txt_table;
          var text = document.getElementById("txt_table").value;
  
          axios
            .post(self._url, {
              action: "getCols",
              table: text,
              _db: me.db,
            })
            .then(function (response) {
              self.allCols = null;
              self.allCols = response.data;
              // console.log(response.data);
            });
        } catch (error) {
          console.error(error);
        }
      },
      setFk: function () {
        try {
          var self = this;
  
          axios
            .post(self._url, {
              action: "getCols",
              table: self.tableFk,
              _db: document.getElementById("txt_db").value,
            })
            .then(function (response) {
              if (self.tableFk != "Select ...") {
                self.fk_id = response.data[0].Field;
                self.fk_txt = response.data[1].Field;
                document.getElementById("cbx_control").value = "select";
              } else {
                self.fk_id = "";
                self.fk_text = "";
                self.tableFk = "";
              }
            });
        } catch (error) {
          console.error(error);
        }
      },
  
      deleteRowsTable: function () {
        var myTable = document.getElementById("tbl");
        var rowCount = myTable.rows.length;
        for (var x = rowCount - 1; x > 0; x--) {
          myTable.deleteRow(x);
        }
      },
      log: function (any = "") {
        console.log("===================");
        console.log(any);
      },
      setFields: function () {
        var e = document.getElementById("cbx_cols");
        var text = e.options[e.selectedIndex].text;
  
        this.allCols.forEach((element) => {
          if (element.Field == text) {
            this.colNameEnter = element.Field;
            //    document.getElementById("txt_coltypeEnter").value = element.Type;
            this.colType = element.Type;
            this.colcaptionEnter = element.Field.toUpperCase();
          }
        });
      },
      add_row: function () {
        var tbl = document.getElementById("tbl");
  
        if (this.colNameEnter.length < 1) {
          this.msg = "please enter  col Name ";
          this.show_msg = true;
  
          document.getElementById("txt_colNameEnter").focus();
          return;
        }
  
        if (this.colType.length < 1) {
          this.msg = "please enter txt_coltypeEnter";
          this.show_msg = true;
          document.getElementById("cbx_dataType").focus();
          return;
        }
        if (this.controlName.length < 1) {
          this.msg = "ادخل نوع الكنترول";
          this.show_msg = true;
          document.getElementById("cbx_control").focus();
          return;
        }
  
        if (this.colcaptionEnter.length < 1) {
          this.colcaptionEnter = this.colNameEnter.toUpperCase();
        }
  
        // alert(ch_selEnter);
        //  <td id="index" name="coName">${this.rowIndex}</td>
        let template = `<tr scoop="row">
                <td name="coName">${this.colNameEnter}</td>
                 <td name="coType">${this.colType}</td>
                 <td><input type="checkbox" id="sel" name="sel" checked = "${this.ch_sel}" value=""></td>
                  <td><input type="checkbox" id="if" name="if" checked ="${this.ch_if}" value=""  ></td>
                 <td name="caption">${this.colcaptionEnter}</td>
                 <td name="control"  value="">${this.controlName}</td>
                 <td name="tableFk"  value="">${this.tableFk}</td>
                 <td name="td_fk_id"  value="">${this.fk_id}</td>
                 <td name="td_fk_text"  value="">${this.fk_txt}</td>
                <!--    <td><button type="button" name="edit" class="btn btn-primary btn-xs edit" @click="edit('${this.colNameEnter}')">Edit</button></td>
                --> <td><button type="button" name="delete" class="btn btn-danger btn-xs delete" onclick="del('${this.colNameEnter}')">Del </button></td> 
                 </tr>`;
  
        tbl.innerHTML += template;
  
        this.fk_id = "";
        this.fk_txt = "";
        this.colNameEnter = "";
        this.colcaptionEnter = "";
        this.colType = "";
        this.rowIndex++;
        this.ch_sel = true;
        this.ch_if = false;
      },
      edit: function (val) {
        var myTable = document.getElementById("tbl");
        var rowCount = myTable.rows.length;
        for (var x = 1; x > rowCount; x++) {
          if (val == myTable.rows[x].cells[0].innerText) {
            this.colName = myTable.rows[x].cells[0].innerText;
            this.colType = myTable.rows[x].cells[1].innerText;
          }
        }
      },
      del: function (val) {
        //tbl.rows[index].cells[2].firstChild.checked
        var myTable = document.getElementById("tbl");
        var rowCount = myTable.rows.length;
        for (var x = rowCount - 1; x > 0; x--) {
          if (val == myTable.rows[x].cells[0].innerText) {
            myTable.deleteRow(x);
          }
        }
      },
      setTable: function () {
        "pr_" + this.db;
      },
      setLang: function () {
        localStorage.setItem("lang", document.querySelector("#ul_lang").value);
      },
      getData: function () {
        //  document.querySelector("#txt_coltypeEnter").value = document.querySelector("#cbx_dataType").value;
      },
      getLang: function (mot) {
        var langArrAr = {
          main: "الرئيسية",
          title: "منشئ الصفحات",
          langCaption: "اللغة",
          Search: "بحث",
          colName: "الحقل",
          coltypeEnter: "نوع",
          caption: "التسمية",
          control: "الاداة",
          tableFk: "الجدول الخارجي",
          fk_id: "معرف ",
          fk_text: "الاسم",
          Choose_Table: "الجدول :",
          Choose_columns: "الحقل :",
          Choose_Table: "لجدول الاب :",
          Db_name: "قاعدة البيانات :",
          Project_name: "المشروع :",
          DB: "تحميل الجداول ",
          Fields: "الحقول ",
          Vue: "فيو جي اس ",
          Php: "بي اتش بي  ",
          html: "بناء الصفحة",
          CopyToClipboard: "نسخ  ",
          add: "ادخل",
          tblClear: "تفريغ الجدول",
          ch_html: " مشاهدة الكود",
          table_html: " اضافة جدول  ",
          createTableCode: "كود انشاء جدول",
          createTable: " تنفيذ انشاء جدول ",
          dataType: "اختر نوع الحقل",
          LogOut: "خروج",
          user_name: "المستخدم : ",
          Choose_Table_fk: "الجدول الخارجي :",
        };
        var langArrEn = {
          main: "Home",
          title: "Page Create",
          langCaption: "Lang",
          Search: "Search",
          colName: "colName",
          coltypeEnter: "type",
          Choose_Table: "Choose Table :",
          Choose_columns: "Choose_columns :",
          Choose_Table_fk: "Choose Table fk :",
          Db_name: "Db name :",
          Project_name: "Project name :",
          DB: "DB ",
          Fields: "Fields ",
          Vue: "Vue",
          Php: "Php",
          html: "html ",
          CopyToClipboard: "CopyToClipboard ",
          add: "add ",
          tblClear: "Delete rows",
          ch_html: "View Page",
          table_html: "Creare Table",
          createTableCode: "create Table :",
          createTable: " create Table",
          dataType: "Select Data Type",
          LogOut: "Logout",
          user_name: "User : ",
        };
  
        if (this.current_Lang === "ar") {
          document.getElementById("pg").style.direction = "rtl";
          document.getElementById("b_css").href =
            "../admin/layout/css/bootstrap.rtl.min.css";
  
          return langArrAr[mot];
        } else if (this.current_Lang === "en") {
          document.getElementById("pg").style.direction = "ltr";
          document.getElementById("b_css").href =
            "../admin/layout/css/bootstrap.min.css";
          var ne = langArrEn[mot];
          if (ne == undefined) {
            ne = mot;
          }
          return ne;
        }
      },
      createTable: function () {
        var self = this;
        var sql = document.getElementById("code").innerText;
        axios
          .post(self._url, {
            action: "createTable",
            sql: sql,
          })
          .then(function (response) {
            self.msg = response.data.message;
            self.show_msg = true;
          });
      },
      handelSubmit: function () {},
      localStorageSave: function () {
        localStorage.setItem("ch_html", this.ch_html);
        localStorage.setItem("ch_table", this.ch_table);
        localStorage.setItem("projectFormName", this.projectFormName);
      },
      localStorageSaveRootCssJs: function () {
        localStorage.setItem("RootCssJs", this.RootCssJs);
      },
      createDb: function () {
        var me = this;
        axios
          .post(me._url, {
            action: "createDb",
            DATABASE: "form_c",
            ol_db: me.db,
          })
          .then(function (response) {
            // me.msg = response.data.msg;
          });
      },
      saveToDb: function () {
        var me = this;
        me.code = document.querySelector("#code").innerText;
        if (me.tableParent.trim() == "") {
          me.msg = "اختر الجدول";
          me.show_msg = true;
          return;
        } else if (me.tableParent.trim() == "") {
          me.msg = "ادخل اسم المشروع";
          me.show_msg = true;
          return;
        } else {
          me.msg = "";
          me.show_msg = false;
        }
        axios
          .post(me._url, {
            action: "saveToDb",
            _taName: me.tableParent,
            _prName: me.projectFormName,
            _laName: me.laName,
            _coText: me.code,
          })
          .then(function (response) {
            me.msg = response.data.msg;
          });
      },
      create_project: async function () {
        var me = this;
        await this.createDb();
        axios.post(me._url, {
          action: "i_project",
          projectFormName: me.projectFormName,
        });
      },
      delete_project: function () {
        var me = this;
  
        axios.post(me._url, {
          action: "d_project",
  
          projectFormName: me.projectFormName,
        });
      },
      viewCode: function () {
        // window.location = "./codeView.html?table="+this.tableParent;
        window.open(
          "./codeView.html?table=" +
            this.tableParent +
            "&projectName=" +
            this.projectFormName,
          "_blank"
        );
      },
      run_table_cols: function () {
        var tbl = document.querySelector("#tbl");
        for (let index = 1; index < tbl.rows.length; index++) {
          const COL_NAME = tbl.rows[index].cells[0].innerText;
          const TYPE = tbl.rows[index].cells[1].innerText;
          const COL_SEL = tbl.rows[index].cells[2].firstChild.checked;
          const COL_IF = tbl.rows[index].cells[3].firstChild.checked;
          const CAPTION = tbl.rows[index].cells[4].innerText;
          const COL_CONTROL = tbl.rows[index].cells[5].innerText;
          const TABLEFK = tbl.rows[index].cells[6].innerText;
          const FK_ID = tbl.rows[index].cells[7].innerText;
          const FK_TEXT = tbl.rows[index].cells[8].innerText;
          const PRNAME = this.projectFormName;
  
          this.i_table_cols(
            COL_NAME,
            TYPE,
            COL_SEL,
            COL_IF,
            CAPTION,
            COL_CONTROL,
            this.tableParent,
            TABLEFK,
            FK_ID,
            FK_TEXT,
            PRNAME
          );
        }
      },
      i_table_cols: function (
        COL_NAME,
        TYPE,
        COL_SEL,
        COL_IF,
        CAPTION,
        COL_CONTROL,
        TABLEFK,
        FK_ID,
        FK_TEXT,
        PRNAME
      ) {
        var me = this;
  
        axios
          .post(me._url, {
            action: "i_table_cols",
            _col_name: COL_NAME,
            _type: TYPE,
            _col_sel: COL_SEL,
            _col_if: COL_IF,
            _caption: CAPTION,
            _col_control: COL_CONTROL,
            _tableParent: me.tableParent,
            _tableFk: TABLEFK,
  
            _fk_id: FK_ID,
            _fk_text: FK_TEXT,
            _prName: me.projectFormName,
          })
          .then(function (response) {});
      },
      GetDataById_table_cols: function () {
        var me = this;
  
        axios
          .post(me._url, {
            action: "GetDataById_table_cols",
            _tableParent: me.tableParent,
            // _prName: me.projectFormName
          })
          .then(function (response) {
            me.allColumns = response.data;
            let tbl = document.getElementById("tbl");
  
            for (var x = tbl.rows.length - 1; x > 0; x--) {
              tbl.deleteRow(x);
            }
            for (let index = 0; index < me.allColumns.length; index++) {
              let v_allColumns = me.allColumns[index];
  
              let template = `<tr scoop="row">
      <td name="coName">${v_allColumns.col_name}</td>
       <td name="coType">${v_allColumns.type}</td>
       <td><input type="checkbox" id="sel" name="sel" checked = "${v_allColumns.col_sel}" value=""></td>
        <td><input type="checkbox" id="if" name="if" checked ="${v_allColumns.col_if}" value=""  ></td>
       <td name="caption">${v_allColumns.caption}</td>
       <td name="control"  value="">${v_allColumns.col_control}</td>
       <td name="tableFk"  value="">${v_allColumns.tableFk}</td>
       <td name="td_fk_id"  value="">${v_allColumns.fk_id}</td>
       <td name="td_fk_text"  value="">${v_allColumns.fk_text}</td>
      <!--    <td><button type="button" name="edit" class="btn btn-primary btn-xs edit" @click="edit('${v_allColumns.colNameEnter}')">Edit</button></td>
      --> <td><button type="button" name="delete" class="btn btn-danger btn-xs delete" onclick="del('${v_allColumns.colNameEnter}')">Del </button></td> 
       </tr>`;
  
              tbl.innerHTML += template;
            }
          });
      },
    },
    created() {
      // this.getJsonData();  this.createDb();
    },
    mounted() {
      this.setProject();
    },
  });
  
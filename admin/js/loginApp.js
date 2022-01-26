const app = Vue.createApp({
    props: ["title"],
    data() {
      return {
        _url: "http://localhost/frm-cV2/admin/api/action_db.php",
        //_url: "frm-cV2/admin/api/action_db.php",
        rowIndex: 0,
        db: "mahal",
        projectName: "frm-cV2",
        current_Lang: localStorage.getItem("lang") || "ar",
        msg: "",
        show_msg: false,
        user_name: "",
        user_pw: "",
      };
    },
    computed: {},
    methods: {
      login: function () {
        var me = this;
        axios
          .post(me._url, {
            action: "login",
            user: me.user_name,
            password: me.user_pw,
          })
          .then(function (response) {
              sessionStorage.removeItem("user");
           
            if (response.data.msg == "1") {
             // sessionStorage.setItem("user", response.data.user);
          me.setSession("user", response.data.user);
              window.location = "./views/dashbord.html";
            } else {
              //  me.msg = response.data;
              me.msg = "خطا في بيانات الدخول";
              me.show_msg = true;
            }
          });
      },
      handelSubmit: function () {
        
      },setSession:function (key, value) {
        sessionStorage.setItem(key, value);
      },
      getSession:function (key, selector = "") {
        let value = "";
        if (selector != "")
            document.querySelector(selector) = sessionStorage.getItem(key);
    
        value = sessionStorage.getItem(key);
        return value;
      },
      removeSession:function (key) {
        sessionStorage.removeItem(key);
      },
      clearSession:function () {
        sessionStorage.clear();  
      }
      ,
      logout: function () {
        sessionStorage.removeItem("user");
      },
      setLang: function () {
        localStorage.setItem("lang", document.querySelector("#ul_lang").value);
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
      
          Db_name: "Db name :",
          Project_name: "Project name :",
          DB: "DB ",
          Fields: "Fields ",
          Vue: "Vue",
          Php: "Php",
          html: "html ",
          CopyToClipboard: "CopyToClipboard ",
          add: "add  ",
          tblClear: "Delete rows",
          ch_html: "View Page",
          table_html: "Creare Table",
          createTableCode: "create Table :",
          createTable: " create Table",
          dataType: "Select Data Type",
        };
  
        if (this.current_Lang === "ar") {
          document.getElementById("pg").style.direction = "rtl";
          document.getElementById("b_css").href =
            "./admin/layout/css/bootstrap.rtl.min.css";
  
          return langArrAr[mot];
        } else if (this.current_Lang === "en") {
          document.getElementById("pg").style.direction = "ltr";
          document.getElementById("b_css").href =
            "./admin/layout/css/bootstrap.min.css";
          var ne = langArrEn[mot];
          if (ne == undefined) {
            ne = mot;
          }
          return ne;
        }
      },
    },
    created() {},
    mounted() {
      sessionStorage.clear();
    },
    unmounted() {
      //
    },
  });
  
  app.mount("#app");
  
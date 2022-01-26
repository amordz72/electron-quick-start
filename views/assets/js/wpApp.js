const app = Vue.createApp({
  props: ["title"],
  data() {
    return {
      msg: "",
      show_msg: false,
      templateName: localStorage.getItem("templateName") || "template 1 ",
      root: localStorage.getItem("root") || "asset",
      ver: localStorage.getItem("ver") || "1",
      _url: "http://localhost/frm-cV2/admin/api/action_db.php",
      projectFormName: localStorage.getItem("projectFormName") || "",
      RootCssJs: localStorage.getItem("RootCssJs") || "../admin/layout",
    };
  },
  computed: {
    lang: function () {
      if (this.current_Lang == "ar") {
      }

      return "pr_" + this.db;
    },
  },
  methods: {
    localStorageSave: function () {
      localStorage.setItem("templateName", this.templateName);
      localStorage.setItem("root", this.root);
      localStorage.setItem("ver", this.ver);
    },
 localSave: function (name,src) {
      localStorage.setItem(name,src);
    
    },
    create_project: async function () {
      var me = this;
      await this.createDb();
      axios.post(me._url, {
        action: "i_project",
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
  },
  created() {
    window.addEventListener("beforePageDestroyed", this.localStorageSave());
    // this.getJsonData();  this.createDb();
  },
  mounted() {},
  unmounted() {
    ;
  },
});

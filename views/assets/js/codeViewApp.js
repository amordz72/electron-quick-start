const app = Vue.createApp({
    data() {
      return {
        projectName: "",
        tableName: "",
        my_url: "http://localhost/frm-cV2/admin/api/action_db.php",
        allTables: "",
        coId: " ",
        coText:
          " ",
        laName: " ",
        prName: " ",
        taName: " ",
      };
    },
    computed: {},
    methods: {
      getTableNameFromUrl: function () {
        this.tableName = new URL(location.href).searchParams.get("table");
        this.projectName = new URL(location.href).searchParams.get("projectName");
      },
      getDataFromDb: function () {
        var me = this;
        axios
          .post(me.my_url, {
            action: "getDataFromDb",
            tableName: me.tableName.toString(),
          })
          .then(function (response) {
            me.allTables = response.data;
          //  console.log(response.data);
          });
      },
    },
    created() {
      this.getTableNameFromUrl();
    },
    mounted() {
      this.getDataFromDb();
    },
  });
  
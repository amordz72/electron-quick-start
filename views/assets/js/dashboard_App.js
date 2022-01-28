const app = {
  props: ["title"],
  data() {
    return {
      all_projs: null,
      all_tables: null,
      project_id: 0,
      project: "",
      allData: "",
      url: "http://localhost/fc_api/public/api/",
      count_lang: 0,
      count_users: 0,
    };
  },
  computed: {},
  methods: {
    all_p: function () {
      try {
        var me = this;

        axios.get(me.url + 'project', {

        }).then(function (response) {
          me.all_projs = response.data;

        });
      } catch (error) {
        console.log(error);
      }
    },
    all_tbls: function () {
      try {
        var me = this;
 
        axios.get(me.url + 'table/' +   me.project_id  , {

        }).then(function (response) {
          me.all_tables = response.data;

        });
      } catch (error) {
        console.log(error);
      }
    },

    get_count: function () {
      var me = this;
      axios
        .post(me._url, {
          action: "count_lang",
        })
        .then(function (response) {
          me.count_lang = response.data.count_lang;
        });
    },
    get: function (table, col, sub, control) {
      var me = this;
      axios
        .post(me._url, {
          action: "get",
          table: table,
          col: col,
          sub: sub,
        })
        .then(function (response) {
          if (control == "count_lang") {
            me.count_lang = response.data.sub;
            console.log(response.data.sub);
          }
          else if (control == "count_users") {
            me.count_users = response.data.sub;
          }
        });
    },
  },
  created() {
    // this.fetchAllTables(); this.getJsonData();
  },
  mounted() {
    this.all_p();

  },
}

Vue.createApp(app).mount('#app')
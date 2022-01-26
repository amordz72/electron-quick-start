const app = Vue.createApp({
    props: ["title"],
    data() {
      return {
        project:"",
        allData: "",
        _url: "https://localhost/formAssi/assets/api/dashbord.php",
        count_lang: 0,
        count_users: 0,
      };
    },
    computed: {},
    methods: {
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
      this.get("lang", "laId", "max", "count_lang");
      this.get("users", "usId", "max", "count_users");
    },
  });
  
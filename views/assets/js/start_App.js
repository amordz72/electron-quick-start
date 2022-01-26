const app = Vue.createApp({
    data() {
      return {
       body:'',
       ather:'',
       projectName:'',
       projectDir:'',
        my_url: "http://localhost/frm-cV2/admin/api/action_db.php",
     
      };
    },
    computed: {},
    methods: {
NewProject:function () {
  this.body=`composer create-project laravel/laravel ${this.projectName}
  cd ${this.projectName}
  start notepad ".env"
  
   `;
   this.ather=`DB_DATABASE=${this.projectName}_db\ncode .
  
   
   `;
   
   
},

   /*   getTableNameFromUrl: function () {
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
      },*/
    },
    created() {
    //   this.getTableNameFromUrl(); this.getDataFromDb();
    },
    mounted() {
     
    },
  }).mount('#app')
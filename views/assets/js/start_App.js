const app = Vue.createApp({
  data() {
    return {
      body: '',
      ather: '',
      projectDir: localStorage.getItem('projectDir') || '',
      projectName: localStorage.getItem('projectName') || '',

      my_url: "http://localhost/frm-cV2/admin/api/action_db.php",

    };
  },
  computed: {},
  methods: {
    NewProject: function () {

     
        this.body = `composer create-project laravel/laravel ${this.pr_url()}${this.projectName}
cd ${this.pr_url()}${this.projectName}
start notepad ".env"
       
       
     `;


        this.ather =

          `DB_DATABASE=${this.projectName}_db\ncode .
    //url:
http://localhost/${this.pr_url()}${this.projectName}/public     
        `;
      


      this.ather += `

php artisan migrate

//delete all old migrate
php artisan migrate:rollback

//delete and create   migrate
php artisan migrate:refresh

//delete and create   migrate
php artisan migrate:refresh --seed

php artisan db:seed


php artisan serve

php -S localhost:8000 
 `;




    },

    clear: function () {
      this.body = '';
      this.ather = '';
      this.projectDir = '';
      this.projectName = '';

      //localStorage.clear()

    },
    setItem: function (str, value) {
      localStorage.setItem(str, value)
    },
    getItem: function (str) {
      localStorage.getItem(str)
    },
    env: function () {
      return `APP_NAME=${this.projectName}
     APP_ENV=local
     APP_KEY=base64:JoyTHB91bSqV8Gnh0MBgVD9thy/zyo9VuMNnDWudDAA=
     APP_DEBUG=true
     APP_URL=http://localhost/${this.pr_url()}
     
     LOG_CHANNEL=stack
     LOG_DEPRECATIONS_CHANNEL=null
     LOG_LEVEL=debug
     
     DB_CONNECTION=mysql
     DB_HOST=127.0.0.1
     DB_PORT=3306
     DB_DATABASE=laravel
     DB_USERNAME=root
     DB_PASSWORD=
     
     BROADCAST_DRIVER=log
     CACHE_DRIVER=file
     FILESYSTEM_DRIVER=local
     QUEUE_CONNECTION=sync
     SESSION_DRIVER=file
     SESSION_LIFETIME=120
     
     MEMCACHED_HOST=127.0.0.1
     
     REDIS_HOST=127.0.0.1
     REDIS_PASSWORD=null
     REDIS_PORT=6379
     
     MAIL_MAILER=smtp
     MAIL_HOST=mailhog
     MAIL_PORT=1025
     MAIL_USERNAME=null
     MAIL_PASSWORD=null
     MAIL_ENCRYPTION=null
     MAIL_FROM_ADDRESS=null
     MAIL_FROM_NAME="${APP_NAME}"
     
     AWS_ACCESS_KEY_ID=
     AWS_SECRET_ACCESS_KEY=
     AWS_DEFAULT_REGION=us-east-1
     AWS_BUCKET=
     AWS_USE_PATH_STYLE_ENDPOINT=false
     
     PUSHER_APP_ID=
     PUSHER_APP_KEY=
     PUSHER_APP_SECRET=
     PUSHER_APP_CLUSTER=mt1
     
     MIX_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
     MIX_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"
     `
    },
    pr_url: function () {

      if (this.projectDir != '') {
        return this.projectDir + '/'
      } else
        return ''


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
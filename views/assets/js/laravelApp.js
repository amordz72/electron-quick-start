const app = Vue.createApp({
  props: ["title"],
  data() {
    return {
      msg: "",
      url: "http://localhost/formAssi/admin/api/action_webdb.php",
      show_msg: false,

      allData: "",

      cbx_cmd: '',
      cbx_cmd_db: '',

      projectName: localStorage.getItem("projectName") || "laravel_project",
      tableName: localStorage.getItem("tableName") || "users",
      tableNameCapitalize: "",
      pageName: localStorage.getItem("pageName") || "",
      DB_DATABASE: localStorage.getItem("DB_DATABASE") || "laravel",


      cbxKeys: [],

      code_title: '',
      code_body: '',
      code_des: '',

      columnName: '',
      columnDataType: '',
      columnLength: 11,
      columnDefault: "None",
      columnIndex: '---',
      ch_allow_null: false,
      is_USER_DEFINED: false,
      USER_DEFINED_val: "",
      myColumns: [],

    };
  },
  computed: {
    lang: function () {
      if (this.current_Lang == "ar") { }

      return "pr_" + this.db;
    },
  },
  methods: {
    USER_DEFINED: function () {
      if (this.columnDefault.trim() == 'USER_DEFINED') {
        this.is_USER_DEFINED = true

      }
      else {
        this.is_USER_DEFINED = false
        this.USER_DEFINED_val = ""
      }

    },

    saveInStorageSave: function () {
      localStorage.setItem("projectName", this.projectName);
      localStorage.setItem("tableName", this.tableName);
      localStorage.setItem("pageName", this.pageName);
      localStorage.setItem("DB_DATABASE", this.DB_DATABASE);
    },
    localSave: function (name, src) {
      localStorage.setItem(name, src);

    },
    create_project: async function () {
      var me = this;
      await this.createDb();
      axios.post(me.url, {
        action: "i_project",
        projectFormName: me.projectFormName,
      });
    },
    laravelCode_db: function () {


      for (let index = 0; index < this.allData.length; index++) {
        if (this.cbx_cmd_db == this.allData[index].id) {

          this.code_body = this.allData[index].code_body;
        }
        /*  console.log(this.cbx_cmd_db [index]);*/
      }

    },
    Capitalize: function () {
      this.tableNameCapitalize = this.tableName.charAt(0).toUpperCase() + this.tableName.slice(1);
    },
    clear: function () {
      this.code_title = "";
      this.code_body = "";
      this.code_des = "";

      this.fetchAllData_laravel_code();


      //this.isEdited = false;
    },

    fetchAllData_laravel_code: function () {
      try {
        var me = this;

        axios.post(me.url, {
          action: "all",
        }).then(function (response) {
          me.allData = response.data;
        });
      } catch (error) {
        console.log(error);
      }

    },
    insetCode: function () {
      try {
        var me = this;

        axios.post(me.url, {
          action: "i_code",
          code_title: me.code_title,
          code_body: me.code_body,
          code_des: me.code_des,
        });
      } catch (error) {
        console.log(error);
      }
      this.clear();
    },
    update: function (id = "") {
      var me = this;

      id = me.CODE_TITLE;

      axios
        .post(me.myUrl, {

          action: "u_laravel_code",
          _code_title: me.code_title,
          _code_body: me.code_body,
          _code_des: me.code_des,
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
    deleted: function (id = "") {

      var me = this;

      id = me.CODE_TITLE;
      if (confirm("Are you sure you want to remove this data?")) {
        axios
          .post(me.myUrl, {
            action: "d_laravel_code",
            _code_title: id,
          })
          .then(function (response) {
            me.msg = response.data.message;
            me.vif_msg = true;
            me.clear();
            me.fetchAllData_laravel_code();

          });
      }
    },
    setArrayKeys: function () {


      var index = [];

      // build the index
      for (var x in this.scripts) {
        index.push(x);
      }

      console.log(this.scripts[index[0]]);



      /*
       */



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
    mbox: function (msg, type = "m") {
      if (type != 'm') {
        console.log(msg)
        return;
      };
      alert(msg)
      // mbox(this.cbx_cmd)
    },

    laravelCode: function () {
      this.all_cmd().forEach(element => {
        if (element.id == this.cbx_cmd) {
          this.code_body = element.com_body;
        }
      });
    },
    all_cmd: function () {
      this.tableNameCapitalize = this.tableName.charAt(0).toUpperCase() + this.tableName.slice(1);

      return [
        {
          id: 0,
          cmd: "new",
          com_body:
            `
          , {
         id: 1,
        cmd: \`code_title\`,
        com_body:
        \`
        code_body
        \`
       }
         
        `
        },
        {
          id: 1,
          cmd: "new project",
          desc: 'project',
          com_body: `composer create-project laravel/laravel ${this.projectName}
    cd ${this.projectName}
    code .
start notepad ".env"
DB_DATABASE=${this.DB_DATABASE}

php artisan migrate
 php artisan serve

//delete all old migrate
php artisan migrate:rollback

//delete and create   migrate
php artisan migrate:refresh

// انشاء جدول لقاعدة بيانات 
php artisan make:migration create_${this.tableNameCapitalize}_table

//الكنترول وموديل 
php artisan make:model ${this.tableNameCapitalize}Model -mc -r

//توليد مفتاح للبرنامج
php artisan key:generate --ansi

//لبيانات وهمية
php artisan make:factory ${this.tableNameCapitalize}Factory

//بناء مع ادخال بيانات وهمية
php artisan migrate --seed


      `
        },
        {
          id: 2,
          cmd: "new host",
          com_body: `http://localhost/${this.projectName}/public/`
        },
        {
          id: 3,
          cmd: "new models",
          com_body: `php artisan make:model ${this.tableNameCapitalize}Model `
        },
        {
          id: 4,
          cmd: "new models & mig & cntr",
          com_body: code_body = `php artisan make:model ${this.tableName} -mcfs -r
        php artisan make:model ${this.tableName} -mc -r
        
        `
        },
        {
          id: 5,
          cmd: "Default Route Files",
          code_body: `use App\Http\Controllers\ ${this.tableNameCapitalize}Controller;
         
Route:: get('/${this.tableName}', [${this.tableNameCapitalize}Controller:: class, 'index'])=>name="${this.tableName}";
`
        },
        {
          id: 6,
          cmd: "Sanctum",
          com_body: `composer require laravel/sanctum
         php artisan vendor:publish --provider="Laravel\\Sanctum\\SanctumServiceProvider"
         php artisan migrate

         app/Http/Kernel.php file:
         'api' => [
    \\Laravel\\Sanctum\\Http\\Middleware\\EnsureFrontendRequestsAreStateful::class,
    'throttle:api',
    \\Illuminate\\Routing\\Middleware\\SubstituteBindings::class,
], 
`
        },
        {
          id: 7,
          cmd: "Route web",
          com_body: ``
        },
        {
          id: 8,
          cmd: "Route api",
          com_body: ``
        },

        {
          id: 9,
          cmd: "user Sanctom model",
          code_body: `
<?php

namespace App\\Models;

use Illuminate\\Contracts\\Auth\\MustVerifyEmail;
use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;
use Illuminate\\Foundation\\Auth\\User as Authenticatable;
use Illuminate\\Notifications\\Notifiable;
use Laravel\\Sanctum\\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
use HasApiTokens;
    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
`
        },
        {
          id: 10,
          cmd: `AuthControllerApi`,
          com_body:
            `
 <?php


namespace App\\Http\\Controllers;

use App\\Models\\User;
use Illuminate\\Http\\Request;
use Illuminate\\Http\\Response;
use Illuminate\\Support\\Facades\\Hash;
use Illuminate\\Support\\Facades\\Auth;


class AuthControllerApi extends Controller
{
    //this method adds new users
    public function createAccount(Request $request)
    {
        $attr = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users,email',
            'password' => 'required|string|min:6|confirmed'
        ]);

        $user = User::create([
            'name' => $attr['name'],
            'password' => bcrypt($attr['password']),
            'email' => $attr['email']
        ]);

        return   $user->createToken('tokens')->plainTextToken;
    }
    //use this method to signin users
    public function signin(Request $request)
    {
        /**/
        $attr = $request->validate([
            'email' => 'required|string|email|',
            'password' => 'required|string|min:6'
        ]);

        if (!Auth::attempt($attr)) {
            return $this->error('Credentials not match', 401);
        }
        $user = Auth::user();
        $id = Auth::id();
        return   $user->createToken('tokens')->plainTextToken;
    }

    //  this method signs out users by removing tokens
    public function signout()
    {
        auth()->user()->tokens()->delete();

        return [
            'message' => 'Tokens Revoked'
        ];
    }
}
           `
        }, {
          id: 11,
          cmd: `API Auth Routes`,
          com_body: `
<?php

use App\\Http\\Controllers\\AuthControllerApi;

use Illuminate\\Http\Request;
use Illuminate\\Support\\Facades\\Route;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


//register new user
Route::post('/create-account', [AuthControllerApi::class, 'createAccount']);
//login user
Route::post('/signin', [AuthControllerApi::class, 'signin']);


//using middleware
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/sign-out', [AuthControllerApi::class, 'logout']);
});
`
        }
        , {
          id: 12,
          cmd: `Migration code`,
          com_body: `<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

class CreatePostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('${this.tableName}s', function (Blueprint $table) {
           $table=${this.tableName};
          $table->id();
            ${this.setColumns()}
          $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('${this.tableName}s');
    }
}`
        }

        , {
          id: 13,
          cmd: `code Factories`,
          com_body:
            `
      <?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = User::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function unverified()
    {
        return $this->state(function (array $attributes) {
            return [
                'email_verified_at' => null,
            ];
        });
    }
}
        `
        }


        , {
          id: 14,
          cmd: `code Seeder`,
          com_body:
            `
        <?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
    }
}

        `
        }




      ]
    },
    dataTypes: function () {
      var dataTypes = [
        "bigIncrements",
        "bigInteger",
        'binary',
        'boolean',
        'char',
        "dateTimeTz",
        "dateTime",
        "date",
        "decimal",
        "double",
        "enum",
        "float",
        "foreignId",
        "foreignIdFor",
        "foreignUuid",
        "geometryCollection",
        "geometry",
        "id",
        "increments",
        "integer",
        "ipAddress",
        "json",
        "jsonb",
        "lineString",
        "longText",
        "macAddress",
        "mediumIncrements",
        "mediumInteger",
        "mediumText",
        "morphs",
        "multiLineString",
        "multiPoint",
        "multiPolygon",
        "nullableMorphs",
        "nullableTimestamps",
        "nullableUuidMorphs",
        "point",
        "polygon",
        "rememberToken",
        "set",
        "smallIncrements",
        "smallInteger",
        "softDeletesTz",
        "softDeletes",
        "string",
        "text",
        "timeTz",
        "time",
        "timestampTz",
        "timestamp",
        "timestampsTz",
        "timestamps",
        "tinyIncrements",
        "tinyInteger",
        "tinyText",
        "unsignedBigInteger",
        "unsignedDecimal",
        "unsignedInteger",
        "unsignedMediumInteger",
        "unsignedSmallInteger",
        "unsignedTinyInteger",
        "uuidMorphs",
        "uuid",
        "year",

      ]
      return dataTypes;
    }
    ,
    fillColumnsToJson: function () {
      if (this.columnName.trim() == '') {
        alert('ادخل الحقل')
        return
      }
      this.myColumns.push({
        columnName: this.columnName,
        columnDataType: this.columnDataType,
        columnLength: this.columnLength,
        columnDefault: this.columnDefault,
        columnDefault_val: this.USER_DEFINED_val,
        columnIndex: this.columnIndex,
      })
      // console.log(this.myColumns);
    },

    setColumns: function () {
      var cols = '';
      for (let index = 0; index < this.myColumns.length; index++) {
        const element = this.myColumns[index].columnName;
        const elementtype = this.myColumns[index].columnDataType;
        const columnDefault = this.myColumns[index].columnDefault;
        const columnIndex = this.myColumns[index].columnIndex;
        const columnLength = this.myColumns[index].columnLength;
        var det = "";

        if (columnDefault == "NULL") {
          det = "->nullable()"
        } else if (columnDefault == "CURRENT_TIMESTAMP") {
          det = "->CURRENT_TIMESTAMP()"
        }
        else if (this.columnDefault == "USER_DEFINED") {

          det = "->default('" + this.USER_DEFINED_val + "')"
        }
        var news = '';
        if (elementtype == "string") {

          news = `${element}', ${columnLength})`
        }
        else if (elementtype == "decimal")
          news = `${element}', 15,2);`
        else if (elementtype == "double")
          news = `${element}', 15,8);`
        else
          news = element+"'"

        var alkide = "";
        if (columnIndex == "UNIQUE") {
          alkide = "->unique()"
        }
        // else if (columnIndex == "PRIMARY") {
        //   alkide = "->increments()"
        // }
        cols += `$table->${elementtype}('${news})${det}${alkide};\n`;
        // $table -> decimal('decimal('dddddddd', 15,2);');
        // $table -> double('double('dddddddd', 15,8);');
      }
      console.log(cols);
      return cols

    },
    new: function () {

    },
  },

  created() {


  },
  mounted() {
    this.clear();
  },

});





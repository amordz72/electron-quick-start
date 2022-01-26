-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 01 أغسطس 2021 الساعة 22:52
-- إصدار الخادم: 10.4.19-MariaDB
-- PHP Version: 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mahal`
--
CREATE DATABASE IF NOT EXISTS `mahal` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `mahal`;

-- --------------------------------------------------------

--
-- بنية الجدول `aaaaa`
--

CREATE TABLE `aaaaa` (
  `caId` int(11) NOT NULL,
  `ffffff` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- بنية الجدول `achets`
--

CREATE TABLE `achets` (
  `acId` int(11) NOT NULL COMMENT 'primary key',
  `prNum` int(11) NOT NULL,
  `create_time` datetime DEFAULT NULL COMMENT 'create time',
  `update_time` datetime DEFAULT NULL COMMENT 'update time',
  `acNotes` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- بنية الجدول `category`
--

CREATE TABLE `category` (
  `caId` int(11) NOT NULL COMMENT 'primary key',
  `caName` varchar(255) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL COMMENT 'create time',
  `update_time` datetime DEFAULT NULL COMMENT 'update time'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- إرجاع أو استيراد بيانات الجدول `category`
--

INSERT INTO `category` (`caId`, `caName`, `create_time`, `update_time`) VALUES(1, 'عام', NULL, NULL);
INSERT INTO `category` (`caId`, `caName`, `create_time`, `update_time`) VALUES(2, 'اكسسوار', NULL, NULL);
INSERT INTO `category` (`caId`, `caName`, `create_time`, `update_time`) VALUES(3, 'انتي كاس', NULL, NULL);

-- --------------------------------------------------------

--
-- بنية الجدول `code`
--

CREATE TABLE `code` (
  `coId` int(11) NOT NULL,
  `coText` text NOT NULL,
  `coDesc` text NOT NULL,
  `coLang` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- إرجاع أو استيراد بيانات الجدول `code`
--

INSERT INTO `code` (`coId`, `coText`, `coDesc`, `coLang`) VALUES(1, 'vue add electron-builder', 'بعد انشاء مشروع فيو3', 3);
INSERT INTO `code` (`coId`, `coText`, `coDesc`, `coLang`) VALUES(13, 'electron-packager', '{\n  \"name\": \"ele_fc\",\n  \"version\": \"1.0.0\",\n  \"description\": \"Electron ele_fc desktop app\",\n  \"main\": \"main.js\",\n  \"scripts\": {\n    \"start\": \"electron .\",\n    \"package-mac\": \"electron-packager . --overwrite --platform=darwin --arch=x64 --icon=assets/icons/mac/icon.icns --prune=true --out=release-builds\",\n    \"package-win\": \"electron-packager . --overwrite --asar=true --platform=win32 --arch=ia32 --icon=assets/icons/win/icon.ico --prune=true --out=release-builds --version-string.CompanyName=CE --version-string.FileDescription=CE --version-string.ProductName=\\\"ele_fc\\\"\",\n    \"package-linux\": \"electron-packager . --overwrite --platform=linux --arch=x64 --icon=assets/icons/png/icon.png --prune=true --out=release-builds\"\n  },\n  \"author\": \"Brad Traversy\",\n  \"license\": \"ISC\",\n  \"dependencies\": {\n    \"electron\": \"^13.1.7\"\n  },\n  \"devDependencies\": {\n    \"electron-packager\": \"^15.3.0\"\n  }\n}', 2);
INSERT INTO `code` (`coId`, `coText`, `coDesc`, `coLang`) VALUES(14, 'main.js electror', 'const electron = require(\"electron\");\nconst path = require(\"path\");\nconst url = require(\"url\");\n \n \n\n// SET ENV\nprocess.env.NODE_ENV = \"development\";\n\nconst { app, BrowserWindow, Menu, ipcMain } = electron;\n\nlet mainWindow;\nlet addWindow;\n\n// Listen for app to be ready\napp.on(\"ready\", function () {\n  // Create new window\n  mainWindow = new BrowserWindow({});\n  // Load html in window\n  mainWindow.loadURL(\n    url.format({\n      pathname: path.join(__dirname, \"mainWindow.html\"),\n      protocol: \"file:\",\n      slashes: true,\n    })\n  );\n  // Quit app when closed\n  mainWindow.on(\"closed\", function () {\n    app.quit();\n  });\n\n  // Build menu from template\n  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);\n  // Insert menu\n  Menu.setApplicationMenu(mainMenu);\n});\n\n// Handle add item window\nfunction createAddWindow() {\n  addWindow = new BrowserWindow({\n    width: 300,\n    height: 200,\n    title: \"Add Shopping List Item\",\n  });\n  addWindow.loadURL(\n    url.format({\n      pathname: path.join(__dirname, \"addWindow.html\"),\n      protocol: \"file:\",\n      slashes: true,\n    })\n  );\n  // Handle garbage collection\n  addWindow.on(\"close\", function () {\n    addWindow = null;\n  });\n}\n\n// Catch item:add\nipcMain.on(\"item:add\", function (e, item) {\n  mainWindow.webContents.send(\"item:add\", item);\n  addWindow.close();\n  // Still have a reference to addWindow in memory. Need to reclaim memory (Grabage collection)\n  //addWindow = null;\n});\n\n// Create menu template\nconst mainMenuTemplate = [\n  // Each object is a dropdown\n  {\n    label: \"File\",\n    submenu: [\n      {\n        label: \"Add Item\",\n        click() {\n          createAddWindow();\n        },\n      },\n      {\n        label: \"Clear Items\",\n        click() {\n          mainWindow.webContents.send(\"item:clear\");\n        },\n      },\n      {\n        label: \"Quit\",\n        accelerator: process.platform == \"darwin\" ? \"Command+Q\" : \"Ctrl+Q\",\n        click() {\n          app.quit();\n        },\n      },\n    ],\n  },\n];\n\n// If OSX, add empty object to menu\nif (process.platform == \"darwin\") {\n  mainMenuTemplate.unshift({});\n}\n\n// Add developer tools option if in dev\nif (process.env.NODE_ENV !== \"production\") {\n  mainMenuTemplate.push({\n    label: \"Developer Tools\",\n    submenu: [\n      {\n        role: \"reload\",\n      },\n      {\n        label: \"Toggle DevTools\",\n        accelerator: process.platform == \"darwin\" ? \"Command+I\" : \"Ctrl+I\",\n        click(item, focusedWindow) {\n          focusedWindow.toggleDevTools();\n        },\n      },\n    ],\n  });\n}\n', 2);
INSERT INTO `code` (`coId`, `coText`, `coDesc`, `coLang`) VALUES(15, 'ele pg example formC', '\n <!DOCTYPE html>\n <html lang=\"en\">\n\n <head>\n     <meta charset=\"UTF-8\">\n     <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n     <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n     <title>Form Creature</title>\n\n     <link rel=\"stylesheet\" href=\"./admin/layout/css/bootstrap.min.css\">\n\n     <link rel=\"stylesheet\" href=\"./admin/layout/css/all.min.css\">\n     <link rel=\"stylesheet\" href=\"./layout/myCss/createForm.css\">\n </head>\n\n <body>\n     <div id=\"app\" class=\"container-fluid\">\n\n         <div class=\"container \">\n\n             <h1 class=\"text-center  mt-3 bg-info p-2 w-50 mx-auto\"> createForm bootstrap</h1>\n\n\n             <div class=\"row\">\n\n                 <div class=\"col-3\" v-if=\"visible_addCol\" id=\"section_enterCols\">\n\n                     <div class=\"row mb-3 \">\n                         <form action=\"\" id=\"frm\">\n                             <label for=\"txt_colNameEnter\" class=\"form-label\">Choose name : </label>\n                             <input type=\"text\" id=\"txt_colNameEnter\" name=\"txt_colNameEnter\" placeholder=\" colName\"\n                                 class=\"form-control\">\n\n\n                             <label for=\"txt_coltypeEnter\" class=\"form-label\">Choose type : </label>\n\n                             <input type=\"text\" id=\"txt_coltypeEnter\" name=\"txt_coltypeEnter\" placeholder=\"type\"\n                                 class=\"form-control\">\n\n\n                             <div class=\"form-check-control\">\n                                 <label for=\"ch_selEnter\" class=\"form-label\">Choose sel : &nbsp &nbsp </label>\n                                 <input type=\"checkbox\" id=\"ch_selEnter\" name=\"ch_selEnter\" class=\"form-check-control\"\n                                     checked=\"false\">\n\n\n                             </div>\n                             <div class=\"form-check-control\">\n                                 <label for=\"ch_ifEnter\" class=\"form-label\">Choose if : &nbsp &nbsp</label>\n                                 <input type=\"checkbox\" id=\"ch_ifEnter\" name=\"ch_ifEnter\" class=\"form-check-control\"\n                                     checked=\"false\" value=\"\">\n\n                             </div>\n\n\n\n                             <input type=\"text\" id=\"txt_captionEnter\" name=\"txt_captionEnter\" placeholder=\" caption\"\n                                 class=\"form-control\">\n                             <label for=\"txt_captionEnter\" class=\"form-label\">Choose caption : </label>\n\n                             <label for=\"cbx_control\" class=\"form-label\">Choose Control : </label>\n\n                             <select name=\"cbx_control\" id=\"cbx_control\" class=\"form-select mb-3\">\n                                 <option value=\"\" v-for=\"(item, index) in myJsonData.cbx\" :key=\"index\">{{item}}</option>\n                             </select>\n\n                             <div class=\"row \">\n                                 <label for=\"txt_tableFk\" class=\"form-label\">tableFk :</label>\n                                 <input type=\"text\" class=\"form-control\" id=\"txt_tableFk\" name=\"txt_tableFk\" value=\"\">\n\n                                 <label for=\"_id\" class=\"form-label\">FK ID :</label>\n                                 <input type=\"text\" class=\"form-control\" id=\"_id\" name=\"_id\" value=\"\">\n\n                                 <label for=\"_text\" class=\"form-label\">FK TEXT :</label>\n                                 <input type=\"text\" class=\"form-control\" id=\"_text\" name=\"_text\" value=\"\">\n\n                             </div>\n\n                         </form>\n                     </div>\n                 </div>\n                 <!-- table -->\n                 <div class=\"col-9\">\n                     <div class=\"row mx-0 my-0\">\n\n                         <!-- s-cbx_tables -->\n\n                         <div class=\"col-3 border \" class=\"form-control\">\n                             <label for=\"cbx_tables\" class=\"form-label\">Choose Table : </label>\n                             <select id=\"cbx_tables\" class=\"form-select mb-3\" onchange=\"setTable()\">\n                                 <option>select table\n\n                                 </option>\n                                 <option v-for=\"table in allTables\" :key=\"table.tyId\">\n                                     {{table.table_name}}\n                                 </option>\n                             </select>\n                             <input type=\"text\" class=\"form-control\" id=\"txt_table\">\n\n\n                             <!-- s-cbx_colsdb -->\n\n                             <label for=\"cbx_cols\" class=\"form-label\">Choose columns : </label>\n                             <select id=\"cbx_cols\" class=\"form-select mb-3\" @mouseout=\"getCols(),setFields()\">\n                                 <option v-for=\"col in allCols\" :key=\"col.Field\">\n                                     {{col.Field}}\n                                 </option>\n\n                             </select>\n\n                             <label for=\"cbx_tablesfk\" class=\"form-label\">Choose Table fk: </label>\n\n                             <select id=\"cbx_tablesfk\" class=\"form-select mb-3\" @mouseout=\"setFk()\">\n                                 <option value=\"\">\n                                     select fk\n                                 </option>\n\n                                 <option value=\"\" v-for=\"table in allTables\" :key=\"table.tyId\">\n                                     {{table.table_name}}\n                                 </option>\n\n                             </select>\n\n\n\n\n                         </div>\n\n\n\n\n                         <div class=\"col-3 border \">\n                             <div class=\"row\"><label for=\"txtDb\" class=\"form-label\"> Db name :</label>\n                                 <div class=\"col-10\"> <input type=\"text\" id=\"txt_db\" name=\"txt_db\" class=\"form-control\"\n                                         v-model=\"db\">\n                                 </div>\n\n                             </div>\n                             <label for=\"txt_proj\" class=\"form-label\">Project name :</label>\n                             <input type=\"text\" :value=\"setProject\" id=\"txt_proj\" name=\"txt_proj\" class=\"form-control\">\n\n                             <div class=\"form-control\">\n\n                                 <button @click=\"fetchAllTables()\" class=\"btn btn-info\"> DB</button>\n                                 <button class=\"btn btn-info\" @click=\"getCols\">Fields</button>\n                                 <input type=\"button\" class=\"btn btn-success\" @click=\"add_row()\" value=\"Add\"\n                                     v-if=\"visible_addCol\">\n     <input type=\"button\" class=\"btn btn-success\" onclick=\"CopyToClipboard()\" value=\"copy\"\n                                     v-if=\"visible_addCol\">\n                             </div>\n\n                         </div>\n                         <div class=\"col-4 border \">\n\n                             <div class=\"form-control\">\n\n\n\n\n                                 <div> <input type=\"button\" value=\"HTML\" onclick=\"code()\" class=\"btn btn-primary\">\n                                     <button class=\"btn btn-info\" onclick=\"apiJsCode()\">Vue</button>\n                                     <button class=\"btn btn-danger\" onclick=\"apiCode()\">Php</button>\n                                 </div>\n\n                                 <input type=\"button\" class=\"btn btn-info\" value=\"جلب\" @click=\"GetColTable()\">\n                                 <input type=\"button\" value=\"م-الجدول\" class=\"btn btn-danger\" onclick=\"resetData()\">\n\n\n                                 <div class=\"mt-2 form-check\">\n                                     <input type=\"checkbox\" class=\"form-check-input\" id=\"ch_table\" value=\"false\">\n                                     <label class=\"form-check-label\" for=\"ch_table\">جدول</label>\n                                 </div>\n                                 <div class=\"mt-2 form-check\">\n                                     <input type=\"checkbox\" class=\"form-check-input\" id=\"ch_html\" checked=\"1\">\n                                     <label class=\"form-check-label\" for=\"ch_html\">مشاهدة الكود</label>\n                                 </div>\n\n                                 <!-- <div class=\"mt-1 form-check\">\n\n                                     <input type=\"checkbox\" class=\"form-check-input\" id=\"ch_GetColTable\" checked=\"0\">\n                                     <label class=\"form-check-label\" for=\"ch_GetColTable\">ادخل حقول </label>\n\n                                 </div> -->\n\n                             </div>\n\n                         </div>\n\n                         <div class=\"col-8\">\n\n\n                             <div class=\"col-12 border \">\n\n                                 <table class=\"table  table-hover table-bordered mt-2\" id=\"tbl\">\n\n                                     <thead class=\"table-dark\">\n\n                                         <tr>\n                                             <!--   <th name=\"th_coName\">#</th>-->\n                                             <th name=\"th_coName\">name</th>\n                                             <th name=\"th_coType\">type</th>\n                                             <th name=\"th_sel\">sel</th>\n                                             <th name=\"th_if\">if</th>\n                                             <th name=\"th_caption\">caption</th>\n                                             <th name=\"th_control\">control</th>\n                                             <th name=\"tableFk\">tableFk</th>\n                                             <th id=\"th_fk_id\" name=\"tableFk\" value=\"\">fk_id</th>\n                                             <th id=\"th_fk_text\" name=\"tableFk\" value=\"\">fk_text</th>\n                                             <th name=\"th_caption\">edited</th>\n                                             <th name=\"th_control\">del</th>\n\n                                         </tr>\n\n\n\n                                     </thead>\n\n                                     <tbody>\n\n\n                                     </tbody>\n                                 </table>\n\n                             </div>\n\n                         </div>\n\n                     </div>\n                 </div>\n\n\n\n\n                 <!-- e-table -->\n             </div>\n             <div class=\"col-12\" style=\"color:black;background:#eee;font-size:18px\">\n                 <p id=\"code\" type=\"text-area\" class=\"form-control\">\n\n                     \n                 </p>\n             </div>\n         </div>\n     </div>\n\n\n\n\n     <!-- <script src=\"./admin/layout/js/bootstrap.min.js\"></script>\n     <script src=\"./admin/layout/js/popper.min.js\"></script> -->\n     <script src=\"./admin/layout/js/bootstrap.bundle.min.js\"></script>\n\n     <script src=\"./admin/layout/js/axios.min.js\"></script>\n     <script src=\"./admin/layout/js/vue3.js\"></script>\n\n     <!--\n        <script type=\"module\" src=\"./tools/main.js\"></script>\n        <script type=\"module\" src=\"./tools/tools.js\"></script>-->\n     <!-- -->\n     <script src=\"./layout/myJs/createForm.js\"></script>\n     <script src=\"./App.js\"></script>\n </body>\n\n\n </html>', 1);
INSERT INTO `code` (`coId`, `coText`, `coDesc`, `coLang`) VALUES(16, 'mount', 'const App = {\n  props: [\"title\"],\n  data() {\n    return {\n      appName: \"ele_fc\",\n      ti: \"Form Creature\",\n      allTables: \"\",\n      ursPhp: \"\",\n      urlJson: \"\",\n      myJsonData: \"\",\n      allCols: \"\",\n      visible_addCol: true,\n      rowIndex: 0,\n      db: \"mahal\",\n      txt_table: \"\",\n    };\n  },\n  computed: {\n    setProject: function () {\n      return \"pr_\" + this.db;\n    },\n    \n  },\n  methods: {\n    getJsonData: function () {\n      var db = \"./api/db.json\";\n      var me = this;\n\n      axios.get(db, {}).then(function (response) {\n        me.myJsonData = response.data;\n        me.visible_addCol = me.myJsonData.visible_addCol;\n        me.ursPhp = me.myJsonData.url;\n      });\n    },\n    fetchAllTables: function () {\n      var me = this;\n      var newDb = document.getElementById(\"txt_db\").value;\n\n      axios\n        .post(me.ursPhp, {\n          action: \"getTables\",\n          _db: newDb,\n        })\n        .then(function (response) {\n          me.allTables = response.data;\n        });\n    },\n    getCols: function () {\n      var me = this;\n      try {\n        var self = this;\n        // var cbx_tables = document.getElementById(\"cbx_tables\");\n        // var text = cbx_tables.options[cbx_tables.selectedIndex].text;\n        //var   text=    self.txt_table;\n        var text = document.getElementById(\"txt_table\").value;\n\n        axios\n          .post(self.ursPhp, {\n            action: \"getCols\",\n            table: text,\n            _db: me.db,\n          })\n          .then(function (response) {\n            self.allCols = null;\n            self.allCols = response.data;\n            // console.log(response.data);\n          });\n      } catch (error) {\n        console.error(error);\n      }\n    },\n    setFk: function () {\n      try {\n        var self = this;\n        var cbx_tables = document.getElementById(\"cbx_tablesfk\");\n        var text = cbx_tables.options[cbx_tables.selectedIndex].text;\n\n        if (text.trim() != \"select fk\" && text.trim() != \"\") {\n          document.getElementById(\"txt_tableFk\").value = text;\n\n          var urlOk = self.ursPhp;\n\n          axios\n            .post(urlOk, {\n              action: \"getCols\",\n              table: text,\n              _db: document.getElementById(\"txt_db\").value,\n            })\n            .then(function (response) {\n              /**console.log(response.data);*/\n              document.getElementById(\"_id\").value = response.data[0].Field;\n              document.getElementById(\"_text\").value = response.data[1].Field;\n            });\n        } else {\n          document.getElementById(\"txt_tableFk\").value = \"\";\n        }\n      } catch (error) {\n        console.error(error);\n      }\n    },\n    GetColTable: function () {\n      this.deleteRowsTable();\n      var tbl = document.getElementById(\"tbl\");\n\n      this.allCols.forEach((element) => {\n        let template = `<tr>\n             <td id=\"coName\" name=\"coName\">${element.Field}</td>\n             <td id=\"coType\" name=\"coType\">${element.Type}</td>\n             <td><input type=\"checkbox\" id=\"sel\" name=\"sel\" checked=\"${1}\" value=\"\" ></td>\n              <td><input type=\"checkbox\" id=\"if\" name=\"if\" checked=\"${0}\" value=\"\"  ></td>\n             <td id=\"caption\" name=\"caption\">${element.Field.toUpperCase()}</td>\n             <td id=\"control\" name=\"control\"  value=\"\"> \n              <select name=\"cbx_control\" id=\"cbx_control\" class=\"form-select mb-3\">\n              <option value=\"\">text</option>\n              <option value=\"\">checkbox</option>\n             <option value=\"\">number</option>\n             <option value=\"\">date</option>\n             <option value=\"\">password</option>\n             <option value=\"\">datetime-local</option>\n             <option value=\"\">email</option>\n             <option value=\"\">color</option>\n             <option value=\"\">file</option>\n             <option value=\"\">hidden</option>\n             <option value=\"\">image</option>\n             <option value=\"\">month</option>\n             <option value=\"\">reset</option>\n             <option value=\"\">button</option>\n             <option value=\"\">radio</option>\n             <option value=\"\">range</option>\n             <option value=\"\">search</option>\n             <option value=\"\">submit</option>\n             <option value=\"\">tel</option>\n             <option value=\"\">time</option>\n             <option value=\"\">url</option>\n             <option value=\"\">week</option>\n         </select></td>\n            </tr>`;\n\n        tbl.innerHTML += template;\n      });\n    },\n    deleteRowsTable: function () {\n      var myTable = document.getElementById(\"tbl\");\n      var rowCount = myTable.rows.length;\n      for (var x = rowCount - 1; x > 0; x--) {\n        myTable.deleteRow(x);\n      }\n    },\n    log: function (any = \"\") {\n      console.log(\"===================\");\n      console.log(any);\n    },\n    setFields: function () {\n      var e = document.getElementById(\"cbx_cols\");\n      var text = e.options[e.selectedIndex].text;\n\n      this.allCols.forEach((element) => {\n        if (element.Field == text) {\n          document.getElementById(\"txt_colNameEnter\").value = element.Field;\n          document.getElementById(\"txt_coltypeEnter\").value = element.Type;\n          document.getElementById(\"txt_captionEnter\").value =\n            element.Field.toUpperCase();\n        }\n      });\n    },\n    add_row: function () {\n      var tbl = document.getElementById(\"tbl\");\n\n      var txt_colNameEnter = document.getElementById(\"txt_colNameEnter\").value;\n      var txt_coltypeEnter = document.getElementById(\"txt_coltypeEnter\").value;\n\n      var _ch_selEnter = document.querySelector(\"#ch_selEnter\").checked;\n      var _ch_ifEnter = document.querySelector(\"#ch_ifEnter\").checked;\n\n      var fk_id = document.querySelector(\"#_id\").value;\n      var fk_text = document.querySelector(\"#_text\").value;\n\n      var txt_captionEnter = document.getElementById(\"txt_captionEnter\").value;\n\n      var cbx_control = getCbxTextById(\"cbx_control\");\n      var txt_tableFk = document.getElementById(\"txt_tableFk\").value;\n\n      if (txt_colNameEnter.length < 1) {\n        alert(\"please enter txt_colNameEnter\");\n        return;\n      }\n      if (txt_coltypeEnter.length < 1) {\n        alert(\"please enter txt_coltypeEnter\");\n        return;\n      }\n      if (txt_captionEnter.length < 1) {\n        txt_captionEnter = txt_colNameEnter.toUpperCase();\n        // alert(\"please enter txt_captionEnter\");\n        // return;\n      }\n\n      // alert(ch_selEnter);\n      //  <td id=\"index\" name=\"coName\">${this.rowIndex}</td>\n      let template = `<tr>\n           \n             <td id=\"coName\" name=\"coName\">${txt_colNameEnter}</td>\n             <td id=\"coType\" name=\"coType\">${txt_coltypeEnter}</td>\n             <td><input type=\"checkbox\" id=\"sel\" name=\"sel\" checked = \"${_ch_selEnter}\" value=\"\"></td>\n              <td><input type=\"checkbox\" id=\"if\" name=\"if\" checked =\"${_ch_ifEnter}\" value=\"\"  ></td>\n             <td id=\"caption\" name=\"caption\">${txt_captionEnter}</td>\n             <td id=\"control\" name=\"control\"  value=\"\">${cbx_control}</td>\n             <td id=\"tableFk\" name=\"tableFk\"  value=\"\">${txt_tableFk}</td>\n             <td id=\"td_fk_id\" name=\"td_fk_id\"  value=\"\">${fk_id}</td>\n             <td id=\"td_fk_text\" name=\"td_fk_text\"  value=\"\">${fk_text}</td>\n              <td><button type=\"button\" name=\"edit\" class=\"btn btn-primary btn-xs edit\" @click=\"fetchData_users(row.usID)\">Edit</button></td>\n             <td><button type=\"button\" name=\"delete\" class=\"btn btn-danger btn-xs delete\" @click=\"deleteData_users(row.usID)\">Del </button></td>\n            </tr>`;\n      tbl.innerHTML += template;\n      document.getElementById(\"frm\").reset();\n      var chs = document.querySelectorAll(\"#if\");\n      for (let index = 0; index < chs.length; index++) {\n        chs[index].checked = false;\n      }\n\n      this.rowIndex++;\n    },\n  },\n\n  created() {},\n  mounted() {\n    this.getJsonData();\n  },\n};\nVue.createApp(App).mount(\"#app\");\n', 2);

-- --------------------------------------------------------

--
-- بنية الجدول `doc`
--

CREATE TABLE `doc` (
  `doId` int(11) NOT NULL,
  `doName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- إرجاع أو استيراد بيانات الجدول `doc`
--

INSERT INTO `doc` (`doId`, `doName`) VALUES(1, 'شراء');
INSERT INTO `doc` (`doId`, `doName`) VALUES(2, 'م_شراء');
INSERT INTO `doc` (`doId`, `doName`) VALUES(3, 'بيع');
INSERT INTO `doc` (`doId`, `doName`) VALUES(4, 'م_بيع');
INSERT INTO `doc` (`doId`, `doName`) VALUES(5, 'مدفوعات');
INSERT INTO `doc` (`doId`, `doName`) VALUES(6, 'مقبوضات');
INSERT INTO `doc` (`doId`, `doName`) VALUES(7, 'مصاريف');
INSERT INTO `doc` (`doId`, `doName`) VALUES(8, 'ايرادات');
INSERT INTO `doc` (`doId`, `doName`) VALUES(9, 'افتتاحي');
INSERT INTO `doc` (`doId`, `doName`) VALUES(10, 'جرد');
INSERT INTO `doc` (`doId`, `doName`) VALUES(11, 'تحويل');
INSERT INTO `doc` (`doId`, `doName`) VALUES(12, 'نواقص');
INSERT INTO `doc` (`doId`, `doName`) VALUES(13, 'مدين');
INSERT INTO `doc` (`doId`, `doName`) VALUES(14, 'دائن');

-- --------------------------------------------------------

--
-- بنية الجدول `factor`
--

CREATE TABLE `factor` (
  `faId` int(11) NOT NULL,
  `doNum` int(11) NOT NULL,
  `paNum` int(11) NOT NULL,
  `stNum` int(11) NOT NULL,
  `faTotal` decimal(10,0) NOT NULL,
  `faPay` decimal(10,0) NOT NULL,
  `hiNum` int(11) NOT NULL,
  `usNum` int(11) NOT NULL,
  `faNotes` text NOT NULL,
  `faDt` date NOT NULL DEFAULT current_timestamp(),
  `faTm` time NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- بنية الجدول `hisab`
--

CREATE TABLE `hisab` (
  `hiId` int(11) NOT NULL,
  `hiName` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `usPw` varchar(255) DEFAULT NULL,
  `tyNum` int(11) NOT NULL,
  `dtEnter` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- بنية الجدول `khazina`
--

CREATE TABLE `khazina` (
  `khId` int(11) NOT NULL,
  `thName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- بنية الجدول `khfactor`
--

CREATE TABLE `khfactor` (
  `id` int(11) NOT NULL,
  `faIn` decimal(10,0) NOT NULL,
  `faOut` decimal(10,0) NOT NULL,
  `solde` decimal(10,0) NOT NULL,
  `hiNum` int(11) NOT NULL,
  `baNum` int(11) NOT NULL,
  `notes` varchar(500) NOT NULL,
  `khNum` int(11) NOT NULL,
  `faDt` date NOT NULL DEFAULT current_timestamp(),
  `faTm` time NOT NULL DEFAULT current_timestamp(),
  `usNum` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- بنية الجدول `khrec`
--

CREATE TABLE `khrec` (
  `id` int(11) NOT NULL,
  `reIn` decimal(10,0) NOT NULL,
  `reOut` decimal(10,0) NOT NULL,
  `hiNum` int(11) NOT NULL,
  `baNum` int(11) NOT NULL,
  `notes` varchar(500) NOT NULL,
  `khNum` int(11) NOT NULL,
  `reDt` date NOT NULL DEFAULT current_timestamp(),
  `reTm` time NOT NULL DEFAULT current_timestamp(),
  `usNum` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- بنية الجدول `lang`
--

CREATE TABLE `lang` (
  `laId` int(11) NOT NULL,
  `laName` text DEFAULT NULL,
  `laPlatform` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- إرجاع أو استيراد بيانات الجدول `lang`
--

INSERT INTO `lang` (`laId`, `laName`, `laPlatform`) VALUES(1, 'html', 1);
INSERT INTO `lang` (`laId`, `laName`, `laPlatform`) VALUES(2, 'js', 1);
INSERT INTO `lang` (`laId`, `laName`, `laPlatform`) VALUES(3, 'vue3', 1);

-- --------------------------------------------------------

--
-- بنية الجدول `move`
--

CREATE TABLE `move` (
  `id` int(11) NOT NULL,
  `faNum` int(11) NOT NULL,
  `prNum` int(11) NOT NULL,
  `qtyIn` int(11) NOT NULL,
  `qtyOut` int(11) NOT NULL,
  `prixA` int(11) NOT NULL,
  `prixS` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- بنية الجدول `payment`
--

CREATE TABLE `payment` (
  `paId` int(11) NOT NULL,
  `paName` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- إرجاع أو استيراد بيانات الجدول `payment`
--

INSERT INTO `payment` (`paId`, `paName`) VALUES(2, 'اجل');
INSERT INTO `payment` (`paId`, `paName`) VALUES(1, 'نقدي');

-- --------------------------------------------------------

--
-- بنية الجدول `phone`
--

CREATE TABLE `phone` (
  `id` int(11) NOT NULL,
  `phone` varchar(200) NOT NULL COMMENT 'رقم الهاتف',
  `hiNum` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- بنية الجدول `platform`
--

CREATE TABLE `platform` (
  `plId` int(11) NOT NULL,
  `plName` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- إرجاع أو استيراد بيانات الجدول `platform`
--

INSERT INTO `platform` (`plId`, `plName`) VALUES(1, 'web');
INSERT INTO `platform` (`plId`, `plName`) VALUES(2, 'mobile');
INSERT INTO `platform` (`plId`, `plName`) VALUES(3, 'desktop');

-- --------------------------------------------------------

--
-- بنية الجدول `prod`
--

CREATE TABLE `prod` (
  `prId` int(11) NOT NULL COMMENT 'primary key',
  `prName` varchar(255) DEFAULT NULL,
  `prPrixA` decimal(8,2) NOT NULL,
  `prPrixS` decimal(8,2) NOT NULL,
  `prQtyLast` int(11) NOT NULL COMMENT 'حد-الطلب',
  `caNum` int(11) NOT NULL,
  `active` tinyint(1) NOT NULL,
  `create_time` datetime DEFAULT NULL COMMENT 'create time',
  `update_time` datetime DEFAULT NULL COMMENT 'update time'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- إرجاع أو استيراد بيانات الجدول `prod`
--

INSERT INTO `prod` (`prId`, `prName`, `prPrixA`, `prPrixS`, `prQtyLast`, `caNum`, `active`, `create_time`, `update_time`) VALUES(1, 'بيس 3 جي', '0.00', '0.00', 0, 2, 0, NULL, NULL);
INSERT INTO `prod` (`prId`, `prName`, `prPrixA`, `prPrixS`, `prQtyLast`, `caNum`, `active`, `create_time`, `update_time`) VALUES(2, 'eeeee', '0.00', '0.00', 0, 3, 0, NULL, NULL);

-- --------------------------------------------------------

--
-- بنية الجدول `store`
--

CREATE TABLE `store` (
  `stId` int(11) NOT NULL,
  `stName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- إرجاع أو استيراد بيانات الجدول `store`
--

INSERT INTO `store` (`stId`, `stName`) VALUES(1, 'الرئيسي');

-- --------------------------------------------------------

--
-- بنية الجدول `types`
--

CREATE TABLE `types` (
  `tyId` int(11) NOT NULL COMMENT 'primary key',
  `tyName` varchar(255) DEFAULT NULL COMMENT 'التصنيف',
  `create_time` datetime DEFAULT NULL COMMENT 'create time',
  `update_time` datetime DEFAULT NULL COMMENT 'update time'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='نوع الحساب';

--
-- إرجاع أو استيراد بيانات الجدول `types`
--

INSERT INTO `types` (`tyId`, `tyName`, `create_time`, `update_time`) VALUES(1, 'admin', NULL, NULL);
INSERT INTO `types` (`tyId`, `tyName`, `create_time`, `update_time`) VALUES(2, 'user', NULL, NULL);
INSERT INTO `types` (`tyId`, `tyName`, `create_time`, `update_time`) VALUES(5, 'مورد', '2021-06-04 18:48:14', '2021-06-04 18:48:14');
INSERT INTO `types` (`tyId`, `tyName`, `create_time`, `update_time`) VALUES(6, 'عميل', '2021-06-04 18:48:14', '2021-06-04 18:48:14');

-- --------------------------------------------------------

--
-- بنية الجدول `users`
--

CREATE TABLE `users` (
  `usId` int(11) NOT NULL COMMENT 'primary key',
  `usName` varchar(255) DEFAULT NULL COMMENT 'الحساب',
  `usPw` varchar(255) NOT NULL,
  `tyNum` int(11) NOT NULL,
  `create_time` datetime DEFAULT NULL COMMENT 'create time',
  `update_time` datetime DEFAULT NULL COMMENT 'update time'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT=' الحسابات';

--
-- إرجاع أو استيراد بيانات الجدول `users`
--

INSERT INTO `users` (`usId`, `usName`, `usPw`, `tyNum`, `create_time`, `update_time`) VALUES(1, 'admin', '1', 1, '2021-08-01 15:36:32', NULL);
INSERT INTO `users` (`usId`, `usName`, `usPw`, `tyNum`, `create_time`, `update_time`) VALUES(2, 'user', '2', 2, '2021-08-04 15:36:28', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `aaaaa`
--
ALTER TABLE `aaaaa`
  ADD PRIMARY KEY (`caId`);

--
-- Indexes for table `achets`
--
ALTER TABLE `achets`
  ADD PRIMARY KEY (`acId`),
  ADD KEY `prNum` (`prNum`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`caId`);

--
-- Indexes for table `code`
--
ALTER TABLE `code`
  ADD PRIMARY KEY (`coId`),
  ADD KEY `coLang` (`coLang`);

--
-- Indexes for table `doc`
--
ALTER TABLE `doc`
  ADD PRIMARY KEY (`doId`);

--
-- Indexes for table `factor`
--
ALTER TABLE `factor`
  ADD PRIMARY KEY (`faId`),
  ADD KEY `doNum` (`doNum`),
  ADD KEY `hiNum` (`hiNum`),
  ADD KEY `stNum` (`stNum`),
  ADD KEY `usNum` (`usNum`),
  ADD KEY `paNum` (`paNum`);

--
-- Indexes for table `hisab`
--
ALTER TABLE `hisab`
  ADD PRIMARY KEY (`hiId`),
  ADD UNIQUE KEY `hiName` (`hiName`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `tyNum` (`tyNum`);

--
-- Indexes for table `khazina`
--
ALTER TABLE `khazina`
  ADD PRIMARY KEY (`khId`),
  ADD UNIQUE KEY `thName` (`thName`);

--
-- Indexes for table `khfactor`
--
ALTER TABLE `khfactor`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `khrec`
--
ALTER TABLE `khrec`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lang`
--
ALTER TABLE `lang`
  ADD PRIMARY KEY (`laId`),
  ADD KEY `laPlatform` (`laPlatform`);

--
-- Indexes for table `move`
--
ALTER TABLE `move`
  ADD PRIMARY KEY (`id`),
  ADD KEY `faNum` (`faNum`),
  ADD KEY `prNum` (`prNum`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`paId`),
  ADD UNIQUE KEY `paName` (`paName`);

--
-- Indexes for table `phone`
--
ALTER TABLE `phone`
  ADD KEY `hiNum` (`hiNum`);

--
-- Indexes for table `platform`
--
ALTER TABLE `platform`
  ADD PRIMARY KEY (`plId`);

--
-- Indexes for table `prod`
--
ALTER TABLE `prod`
  ADD PRIMARY KEY (`prId`),
  ADD KEY `caNum` (`caNum`);

--
-- Indexes for table `store`
--
ALTER TABLE `store`
  ADD PRIMARY KEY (`stId`);

--
-- Indexes for table `types`
--
ALTER TABLE `types`
  ADD PRIMARY KEY (`tyId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`usId`),
  ADD KEY `tyNum` (`tyNum`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `achets`
--
ALTER TABLE `achets`
  MODIFY `acId` int(11) NOT NULL AUTO_INCREMENT COMMENT 'primary key';

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `caId` int(11) NOT NULL AUTO_INCREMENT COMMENT 'primary key', AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `code`
--
ALTER TABLE `code`
  MODIFY `coId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `doc`
--
ALTER TABLE `doc`
  MODIFY `doId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `factor`
--
ALTER TABLE `factor`
  MODIFY `faId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hisab`
--
ALTER TABLE `hisab`
  MODIFY `hiId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `khazina`
--
ALTER TABLE `khazina`
  MODIFY `khId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `khfactor`
--
ALTER TABLE `khfactor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `khrec`
--
ALTER TABLE `khrec`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lang`
--
ALTER TABLE `lang`
  MODIFY `laId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `move`
--
ALTER TABLE `move`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `paId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `platform`
--
ALTER TABLE `platform`
  MODIFY `plId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `prod`
--
ALTER TABLE `prod`
  MODIFY `prId` int(11) NOT NULL AUTO_INCREMENT COMMENT 'primary key', AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `store`
--
ALTER TABLE `store`
  MODIFY `stId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `types`
--
ALTER TABLE `types`
  MODIFY `tyId` int(11) NOT NULL AUTO_INCREMENT COMMENT 'primary key', AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `usId` int(11) NOT NULL AUTO_INCREMENT COMMENT 'primary key', AUTO_INCREMENT=6;

--
-- قيود الجداول المحفوظة
--

--
-- القيود للجدول `achets`
--
ALTER TABLE `achets`
  ADD CONSTRAINT `achets_ibfk_1` FOREIGN KEY (`prNum`) REFERENCES `prod` (`prId`);

--
-- القيود للجدول `code`
--
ALTER TABLE `code`
  ADD CONSTRAINT `code_ibfk_1` FOREIGN KEY (`coLang`) REFERENCES `lang` (`laId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- القيود للجدول `factor`
--
ALTER TABLE `factor`
  ADD CONSTRAINT `factor_ibfk_1` FOREIGN KEY (`doNum`) REFERENCES `doc` (`doId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `factor_ibfk_2` FOREIGN KEY (`hiNum`) REFERENCES `hisab` (`hiId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `factor_ibfk_3` FOREIGN KEY (`stNum`) REFERENCES `store` (`stId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `factor_ibfk_4` FOREIGN KEY (`usNum`) REFERENCES `users` (`usId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `factor_ibfk_5` FOREIGN KEY (`paNum`) REFERENCES `payment` (`paId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- القيود للجدول `hisab`
--
ALTER TABLE `hisab`
  ADD CONSTRAINT `hisab_ibfk_1` FOREIGN KEY (`tyNum`) REFERENCES `types` (`tyId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- القيود للجدول `lang`
--
ALTER TABLE `lang`
  ADD CONSTRAINT `lang_ibfk_1` FOREIGN KEY (`laPlatform`) REFERENCES `platform` (`plId`);

--
-- القيود للجدول `move`
--
ALTER TABLE `move`
  ADD CONSTRAINT `move_ibfk_1` FOREIGN KEY (`faNum`) REFERENCES `factor` (`faId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `move_ibfk_2` FOREIGN KEY (`prNum`) REFERENCES `prod` (`prId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- القيود للجدول `phone`
--
ALTER TABLE `phone`
  ADD CONSTRAINT `phone_ibfk_1` FOREIGN KEY (`hiNum`) REFERENCES `hisab` (`hiId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- القيود للجدول `prod`
--
ALTER TABLE `prod`
  ADD CONSTRAINT `prod_ibfk_1` FOREIGN KEY (`caNum`) REFERENCES `category` (`caId`);

--
-- القيود للجدول `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`tyNum`) REFERENCES `types` (`tyId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

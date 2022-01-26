/**
 * themeName/
 *  style.css
 *  index.php
 *  screenshot.png
 *  header.php
 *  footer.php
 *  functions.php
 *
 */

function get_index(sidebar = false, search_form = false) {
  var text = ` // index.php
  
  <?php get_header(); ?> \n`;
  if (search_form) text += ` <?php get_search_form(); ?>\n `;
  if (sidebar) text += ` <?php get_sidebar(); ?> \n`;
  text += ` <?php get_footer(); ?> \n `;

  return text;
}

function get_header(themeName = "wp_template") {
  var text = `
  //header.php

  <?php
  /**
   * The header for our theme
   *
   * This is the template that displays all of the <head> section and everything up until <div id="content">
   *
   * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
   *
   * @package WordPress
   * @subpackage ${themeName}
   * @since ${themeName} 1.0
   */
  ?><!doctype html>

  <html <?php language_attributes(); ?> >
  
  <head>
      <meta charset="<?php bloginfo( 'charset' ); ?>" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
     <link rel="pingback" href="<?php bloginfo('pingback_url'); ?>"/>
    
    <title><?php bloginfo('name'); ?></title>
 
      <?php wp_head(); ?>
  </head>
  \n `;

  //print(get_header) ;
  return text;
}
function get_footer() {
  var text = `//footer.php `;
  text += `
 <!-- Copyright -->
 <div class="text-center p-4" style="background-color: rgba(0, 0, 0, 0.05);">
   © 2021 Copyright:
   <a class="text-reset fw-bold" href="#">MDBootstrap.com</a>
 </div>
 <!-- Copyright -->
 <?php wp_footer();?>
  </body>
  </html>
  \n `;

  return text;
}

function wp_style(
  cssName = "",
  dir = "",
  deps = "",
  ver = false,
  media = "all"
) {
  if (deps == "") {
    deps = "array()";
  }
  var text = ` `;
  text = `
     wp_enqueue_style( 'style-${cssName}', get_template_directory_uri() .\"/${dir}\" ,${deps},${ver},\"${media}\");\n
   `;

  return text;
}
function wp_script(
  jsName = "",
  dir = "",
  deps = "",
  ver = false,
  infolter = true
) {
  if (deps == "") {
    deps = "array()";
  }
  var text = ` `;
  text = ` 
     wp_enqueue_script( 'script-${jsName}', get_template_directory_uri() .\"/${dir}\" ,${deps},${ver},${infolter});\n 
  `;

  return text;
}
function print(params, merge = false) {
  if (merge) document.getElementById("p_code").innerText += params;
  else document.getElementById("p_code").innerText = params;
}
/*print(index(), true);
 print(get_header());
print(wp_script("bootstrap", "/layout/js/bootstrap.js"), true);
*/
function get_func() {
  var bs = document.getElementById("ch_bs").value;
  var root = document.getElementById("txt_root").value;
  var txt_ver = document.getElementById("txt_ver").value;

  var text = `<?php
  
  //functions.php

   function  my_css(){ \n `;
  if (document.getElementById("ch_bs").checked) {
    text += wp_style(
      "bootstrap",
      root + "/css/bootstrap.min.css",
      "",
      txt_ver,
      "all"
    );
  }
  if (document.getElementById("ch_fa").checked) {
    text += wp_style(
      "fontAwesome",
      root + "/css/fontAwesome.min.css",
      "",
      txt_ver,
      "all"
    );
    text += wp_style("main", root + "/css/main.css", "", txt_ver, "all");
  }
  text += "}\n";
  text += " function my_js(){ \n";
  if (document.getElementById("ch_vue3").checked) {
    text += wp_script(
      "bundle",
      root + "/js/bootstrap.bundle.min.js",
      "",
      txt_ver,
      true
    );
    text += wp_script("vue3", root + "/js/vue3.js", "", txt_ver, true);
    text += wp_script("vue3", root + "/js/vue3.js", "", txt_ver, true);
  }
  text += wp_script("main", root + "/js/main.js", "", txt_ver, true);
  text += "}\n";
  text += " add_action( 'wp_enqueue_scripts', 'my_css' ); \n";
  text += " add_action( 'wp_enqueue_scripts', 'my_js' );\n \n";
  text += get_register_nav_menus();
 text += `add_theme_support( 'post-thumbnails' );`;
  
  return text;
}
function get_register_nav_menus(
  name = "bootstrap-navbar",
  description = "bootstrap navbar"
) {
  let funName = `${name.trim().replace(/-/g, "_")}_register_menus`;

  var text = `function ${funName} (){ 
   register_nav_menu('${name.trim()}',  __('${description.trim()}'));  
  }  
  add_action( 'init', '${funName}' );  
  `;

  return text;
}
function get_style(
  themeName = "",
  Author = "Amor-tecno-Dz",
  description = "",
  tags = ""
) {
  if (themeName == "") {
    themeName = document.getElementById("txt_temName").value;
  }

  var the_tags =
    " blog, one-column, custom-background, custom-colors, custom-logo, custom-menu, editor-style, featured-images, footer-widgets, full-width-template, rtl-language-support, sticky-post, theme-options, threaded-comments, translation-ready, block-styles, wide-blocks, accessibility-ready";
  if (tags == "") tags = the_tags;
  var the_desc = `Our theme is designed to benefit organizations and businesses with the ability to create dynamic pages with endless layouts using group and column blocks. Its central content column and fine typography make it ideal for traditional blogging. Full editor styles give you a good idea of ​​what your content will look like, even before you publish. You can personalize your site by changing the background and highlight colors in the customizer. The colors of all the elements on your site are automatically calculated based on the colors you choose, ensuring high color contrast is accessible to your visitors.`;
  if (description == "") description = the_desc;
  var text = `/*
  Theme Name: ${themeName}
  Theme URI: https://wordpress.org/themes/${themeName}/
  Author: ${Author}
  Author URI: https://wordpress.org/
  Description: ${description}
  Tags:${tags}
  Version: 1.3
  Requires at least: 5.0
  Tested up to: 5.4
  Requires PHP: 7.0
  License: GNU General Public License v2 or later
  License URI: http://www.gnu.org/licenses/gpl-2.0.html
  Text Domain: ${themeName}
  This theme, like WordPress, is licensed under the GPL.
  Use it to make something cool, have fun, and share what you've learned with others.
  */  
  `;

  return text;
}
function name() {
  let text = `function custom_menu(){
    register_nav_menus(array(
    'bootstrap-menu'=>'Navigation Bar',
    'footer-menu'=>'Footer Menu'
    ))
    }
    
    function custom_menu2(){
    wp_nav_menu(array(
    'them_location'=>'bootstrap-menu',
    'menu_class'=>'nav navbar-nav'
    ))
    }`;

  return text;
}

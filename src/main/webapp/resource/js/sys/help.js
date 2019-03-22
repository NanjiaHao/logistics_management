/**
 * 帮助信息定义
 */
//PR
var pr_query_string='pr/pr_help_query_display.html';

var pr_create_string='pr/pr_help_create_display.html';
var pr_update_string='pr/pr_help_update_display.html';
var pr_view_string='pr/pr_help_view_display.html';
var pr_print_string='pr/pr_help_print_display.html';

//合同
var pr_contract_query_string="contract/contract_help_query_display.html";
var pr_contract_create_string="contract/contract_help_create_display.html"
var pr_contract_update_string="contract/contract_help_update_display.html";
var pr_contract_view_string="contract/contract_help_view_display.html";
var pr_contract_print_string="contract/contract_help_print_display.html";

//付款
var pr_payment_create_string="pay/payment_help_create_display.html";
var pr_payment_query_string="pay/payment_help_query_display.html";
var pr_payment_update_string="pay/payment_help_update_display.html";
var pr_payment_print_string="pay/payment_help_print_display.html";
var pr_payment_view_string="pay/payment_help_view_display.html";

//日常报销
var exp_daily_create_string="daily/daily_help_create_display.html";
var exp_daily_query_string="daily/daily_help_query_display.html";
var exp_daily_view_string="daily/daily_help_view_display.html";
//加班报销
var exp_overtime_create_string="overtime/overtime_help_create_display.html";
var exp_overtime_query_string="overtime/overtime_help_query_display.html";
var exp_overtime_view_string="overtime/overtime_help_view_display.html";

//差旅报销

var exp_travel_create_string="travel/travel_help_create_display.html";
var exp_travel_query_string="travel/travel_help_query_display.html";
var exp_travel_view_string="travel/travel_help_view_display.html";


//差旅
var trip_apply_query_string="trip/trip_apply_query.html";
var trip_apply_userlines_string="trip/trip_apply_userlines.html";
var trip_apply_hotellines_string="trip/trip_apply_hotellines.html";
var trip_apply_ticketlines_string="trip/trip_apply_ticketlines.html";
var trip_apply_preview_string="trip/trip_apply_preview.html";
//加载正在载入图片
function loadPic()
{
  var loadd = document.getElementById('loading');
  var wx = document.body.clientWidth||document.documentElement.clientWidth;
  var wy = document.body.clientHeight||document.documentElement.clientHeight;
  var wt = document.body.scrollTop||document.documentElement.scrollTop;
  $(loadd).css("left",parseInt(wx)/2);
  $(loadd).css("top",parseInt(wy)/2+wt); 
  loadd.style.display="block"; 
}
function removeloadPic()
{
  var loadd = document.getElementById('loading');
  loadd.style.display="none"; 

  loadd.style.top=document.body.clientHeight/2;
  loadd.style.left=document.body.clientWidth/2;
}

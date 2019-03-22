 $(function(){ 
	 var $table = $('table'); 
	 var currentPage = 0;//当前页默认值为0 
	 var pageSize = 3;//每一页显示的数目 
	 $table.bind('paging',function(){ 
	  $table.find('tbody tr').hide().slice(currentPage*pageSize,(currentPage+1)*pageSize).show(); 
	 }); 
	 var sumRows = $table.find('tbody tr').length; 
	 var sumPages = Math.ceil(sumRows/pageSize);//总页数 
	  
	 var $pager = $('<div class="page"></div>'); //新建div，放入a标签,显示底部分页码 
	 for(var pageIndex = 0 ; pageIndex<sumPages ; pageIndex++){ 
	  $('<a href="#" rel="external nofollow" id="pageStyle" onclick="changCss(this)"><span>'+(pageIndex+1)+'</span></a>').bind("click",{"newPage":pageIndex},function(event){ 
	  currentPage = event.data["newPage"]; 
	  $table.trigger("paging"); 
	  //触发分页函数 
	  }).appendTo($pager); 
	  $pager.append(" "); 
	  } 
	  $pager.insertAfter($table); 
	  $table.trigger("paging"); 
	   
	  //默认第一页的a标签效果 
	  var $pagess = $('#pageStyle'); 
	  $pagess[0].style.backgroundColor="#006B00"; 
	  $pagess[0].style.color="#ffffff"; 
	}); 
	  
	//a链接点击变色，再点其他回复原色 
	 function changCss(obj){ 
	 var arr = document.getElementsByTagName("a"); 
	 for(var i=0;i<arr.length;i++){ 
	 if(obj==arr[i]){ //当前页样式 
	 obj.style.backgroundColor="#006B00"; 
	 obj.style.color="#ffffff"; 
	 } 
	 else
	 { 
	 arr[i].style.color=""; 
	 arr[i].style.backgroundColor=""; 
	 } 
	 } 
 } 
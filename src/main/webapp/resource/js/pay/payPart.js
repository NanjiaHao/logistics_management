

//引入angular
var app = angular.module('myApp',['angularFileUpload']);

app.controller('myCtrl',function($scope,$http){
	$scope.applyState = ['提交','申请中','申请成功','申请失败'];	
	$scope.payListLength ;	
	//侧边栏的显示与隐藏
	$scope.clickedAdd = function(event){
		$(event.target).parent().siblings('.painters').removeClass('hide');
		$(event.target).addClass('hide').siblings('.degreeIcon').removeClass('hide');
	}
	$scope.degreeClicked = function (){
		$(event.target).parent().siblings('.painters').addClass('hide');
		$(event.target).addClass('hide').siblings('.addIcon').removeClass('hide');
	}
   $scope.quitClicked = function (){
   	 $('#afordNameBox').addClass('hide');
   }
  //导航条变化
   $scope.xialaItem = function(){
   	   $scope.navName = $(event.target).children('p').html();
		$('.top li:nth-child(4)').children().children('a').html($scope.navName);
   }
	
	
	
    //获取查询结果
	 $http({
	    method: 'GET',
	    url: 'http://127.0.0.1:8020/%E4%BB%98%E6%AC%BE%E6%94%B9%E9%80%A0/json/data.json'
	}).then(function successCallback(response) {
	        // 请求成功执行代码	      
	      $scope.payListLength = response.data.payList.length;
	      $scope.payList = response.data.payList;
	      console.log($scope.payList);
	      //分页总数
		    $scope.pageSize = 5;
		    $scope.pages = Math.ceil($scope.payList.length / $scope.pageSize); //分页数
		    $scope.newPages = $scope.pages > 5? 5 : $scope.pages;
		    $scope.pageList = [];
		    $scope.selPage = 1;
		    //设置表格数据源(分页)
		    $scope.setData = function () {
		        $scope.items = $scope.payList.slice(($scope.pageSize * ($scope.selPage - 1)), ($scope.selPage * $scope.pageSize));
		        //通过当前页数筛选出表格当前显示数据
		       
		    }
		    $scope.items = $scope.payList.slice(0, $scope.pageSize);
		     for (var i = 0; i < $scope.newPages; i++) {
		        $scope.pageList.push(i + 1);
		    }
		    //打印当前选中页索引
		    $scope.selectPage = function (page) {
		        //不能小于1大于最大
		        if (page < 1 || page > $scope.pages) return;
		        //最多显示分页数5
		        if (page > 2) {
		            //因为只显示5个页数，大于2页开始分页转换
		            var newpageList = [];
		            for (var i = (page - 3) ; i < ((page + 2) > $scope.pages ? $scope.pages : (page + 2)) ; i++) {
		                newpageList.push(i + 1);
		            }
		            $scope.pageList = newpageList;
		        }
		        $scope.selPage = page;
		        $scope.setData();
		        $scope.isActivePage(page);
		        console.log("选择的页：" + page);
		    };
		    //设置当前选中页样式
		    $scope.isActivePage = function (page) {
		        return $scope.selPage == page;
		    };
		    //上一页
		    $scope.Previous = function () {
		        $scope.selectPage($scope.selPage - 1);
		    }
		    //下一页
		    $scope.Next = function () {
		        $scope.selectPage($scope.selPage + 1);
		    };
		    //尾页点击
			$scope.LastPage = function () {
		        $scope.selectPage($scope.pages);
		   } 
		   //首页
		   $scope.firstPage = function (){
		   	    $scope.selectPage(1);
		   	    $scope.pageList =[];
						//循环数据
					for(var i = 0;i<$scope.pages;i++){
						$scope.pageList.push(i+1)//页码的显示
					}
		   	    
		   }
	    }, function errorCallback(response) {
	        // 请求失败执行代码
	        $scope.payList = response.payList;
	     
	});
	
	//获取供应商的数据
	$http({
		method:'GET',
		url:'http://127.0.0.1:8020/%E4%BB%98%E6%AC%BE%E6%94%B9%E9%80%A0/json/tableName.json'
		}).then(function successCallback(response){
			console.log(response.data.afordNameList);
			$scope.afordNameList = response.data.afordNameList;		   
		  //分页总数
		    $scope.pageSizeAford = 5;
		    $scope.pagesAford = Math.ceil($scope.afordNameList.length / $scope.pageSizeAford); //分页数
		    $scope.newPagesAford = $scope.pagesAford > 5 ? 5 : $scope.pagesAford;
		    $scope.pageListAford = [];
		    $scope.selPageAford = 1;
		    //设置表格数据源(分页)
		    $scope.setDataAford = function () {
		        $scope.itemsAford = $scope.afordNameList.slice(($scope.pageSizeAford * ($scope.selPageAford - 1)), ($scope.selPageAford * $scope.pageSizeAford));//通过当前页数筛选出表格当前显示数据
		         console.log($scope.itemsAford)
		    }
		    $scope.itemsAford = $scope.afordNameList.slice(0, $scope.pageSizeAford);
		     for (var i = 0; i < $scope.newPagesAford; i++) {
		        $scope.pageListAford.push(i + 1);
		    }
		    //打印当前选中页索引
		    $scope.selectPageAford = function (page) {
		        //不能小于1大于最大
		        if (page < 1 || page > $scope.pagesAford) return;
		        //最多显示分页数5
		        if (page > 2) {
		            //因为只显示5个页数，大于2页开始分页转换
		            var newpageList = [];
		            for (var i = (page - 3) ; i < ((page + 2) > $scope.pagesAford ? $scope.pagesAford : (page + 2)) ; i++) {
		                newpageList.push(i + 1);
		            }
		            $scope.pageListAford = newpageList;
		        }
		        $scope.selPageAford = page;
		        $scope.setDataAford();
		        $scope.isActivePageAford(page);
		        console.log("选择的页：" + page);
		    };
		    //设置当前选中页样式
		    $scope.isActivePageAford = function (page) {			    	
		        return $scope.selPageAford == page;
		    };
		    //上一页
		    $scope.PreviousAford = function () {
		        $scope.selectPageAford($scope.selPageAford - 1);
		    }
		    //下一页
		    $scope.NextAford = function () {
		        $scope.selectPageAford($scope.selPageAford + 1);
		    };
		    //尾页
			$scope.LastPageAford = function () {
		                $scope.selectPageAford($scope.pagesAford);
		   }
			//首页
            $scope.firstPageAford = function (e){           	
            	console.log($scope.pagesAford-($scope.pagesAford-1));            	
		   	    $scope.selectPageAford();
		   	    $scope.pageListAford =[];
						//循环数据
//					for(var i = 0;i<$scope.pagesAford;i++){
//						$scope.pageListAford.push(i+1)//页码的显示
//					}
		   	   
		   }
	},function errorCallback(response) {
	        // 请求失败执行代码
	        $scope.payList = response.payList;
	})
    
   $scope.showsBox = function (){
   	  $('#afordNameBox').removeClass('hide')
   }
   $scope.closeWin = function (){
   	   $('#afordNameBox').addClass('hide');
   	   $('.fileBox').addClass('hide');
// 	   $(this).parent().parent().parent().addClass('hide');
   }
       
  
  //表格的全选与未全选
   $scope.sel = function() {    	   
        for (var i = $scope.payList.length - 1; i >= 0; i--) {
            $scope.payList[i].flag = $scope.selectAll;
           
        }
        $scope.seleItem = $scope.selectAll;
    }
  //删除全部的项
  $scope.bigdele = function() {	
  	//待修改
        for (var ii = $scope.payList.length - 1; ii >= 0; ii--) {       	
            var p = $scope.payList[ii];
            if (p.flag) {
                $scope.payList.splice("ii", 1);
            }
        }
    }


//模糊查询
  $scope.selectResult = function(){
//	selectedName--下拉选框的值
//  $scope.danhaoValue--单据编号
//  $scope.applyPeople --申请的人
//  $scope.appliDate2 ---申请日期
//  $scope.appliDate1---申请日期
//  $scope.payReason ---付款原因
//  $scope.payMoney1/2
    $http({
    	//请求后台数据获得查询数据
    	method:"GET",
    	url:""
    }).then(function successCallback(response){
    	
    },function errorCallback(response){
    	
    })
  
  
  }

//查询供应商
$scope.selectProvider =function (){
	   $scope.pattern = /^([1-9]{1})(\d{14}|\d{18})$/,
//	 $scope.providerNames;--供应商名称
//	 $scope.bandCardNum;银行账号的验证
	 $scope.isRights = $scope.pattern.test($scope.bandCardNum);

	 if($scope.providerNames || $scope.isRights){
	 	//可继续进行查询
	 	
	 }
}

   //获取上传历史
       $http({
       	 method:"GET",
       	 url:"http://127.0.0.1:8020/付款改造/json/uploadHistory.json"
       }).then(function successCallback(response){
       	  $scope.uploadHistoryList = response.data.fileHistory;
       	  console.log($scope.uploadHistoryList);
       	  
       },function errorCallback (response){
       	
       })
      
     $scope.deleteHistory = function ($index){
     	 $scope.uploadHistoryList.splice("$index", 1);
     }
})


//上传文件
app.controller("myUploader",['$scope','FileUploader', function($scope, FileUploader) {
        var uploader = $scope.uploader = new FileUploader({
            url: 'upload.php'//上传的后台的路径  java的后台处理'
           
            
        });
        
        $scope.uploads = uploader.queue;
        console.log($scope.uploads)
        // FILTERS
      
        // a sync filter
        uploader.filters.push({
            name: 'syncFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                console.log('syncFilter');
                return this.queue.length < 10;
            }
        });
      
        // an async filter
        uploader.filters.push({
            name: 'asyncFilter',
            fn: function(item /*{File|FileLikeObject}*/, options, deferred) {
                console.log('asyncFilter');
                setTimeout(deferred.resolve, 1e3);
            }
        });

        // CALLBACKS

        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
            console.log(uploader.queue[0]._file.name)
            $scope.fileNames = uploader.queue[0]._file.name;
            
        };
        uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };

        console.info('uploader', uploader);
        $scope.UploadFile = function(){
        	console.log('upload.php?describeInfo='+$scope.describeInfo)       	
	        uploader.uploadAll();	        
	        
      } ;
     
    }])

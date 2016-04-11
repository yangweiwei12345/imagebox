;(function($){ 

	var ImageBox = function(options){ 
		var self = this;

		//所有有类js-imagebox
		this.imageBoxLi = $(".js-imagebox");
		//所有删除按钮
		//this.deleteBtns = 

		this.options = $.extend(defaultOptions, options, {});
		console.log(this.options);

		//初始化插件
		this.initImageBox();

	};


	ImageBox.prototype = {
		//初始化
		initImageBox: function() { 
			//插入删除按钮
			this.renderDelete();

			this.loadPicSize();
			this.deleteImg();
		},
		//删除事件
		deleteImg: function(){ 
			var self = this;
			$('.js-imagebox i').on('click', function(){ 
				if(self.options.delete()){ 
					$(this).parent().remove();
				}else{ 
					console.log('删除失败');
				}
			}); 
		},
		//得到图片的实际大小，并显示合适位置
		loadPicSize: function(sourceSrc) { 
			var self = this;
			
			this.imageBoxLi.find('img').each(function(i, k){
				//当前图片的src 
				var currPicSrc = $(k).attr('src');
				self.preLoadImg(currPicSrc, function(){ 
					//当前图片的宽和高
					var picWidth = $(k).width(),
						picHeight = $(k).height();

					//li的宽和高
					var liWidth = self.imageBoxLi.width(),
						liHeight = self.imageBoxLi.height();

					//计算宽高比
					var scale = Math.min(liWidth/picWidth, liHeight/picHeight, 1);
					//计算出图片左后的宽高
					var realWidth = picWidth * scale;
					var realHeight = picHeight * scale;

					$(k).css({ 
						'width': realWidth,
						'height': realHeight,
						'marginLeft': -(realWidth/2),
						'top': (liHeight-realHeight)/2
					});

				});

			});
		},
		//图片预加载
		preLoadImg: function(src, callback){ 
			var img = new Image();

			if(!!window.ActiveXObject){ 
				img.onreadystatechange = function(){ 
					if(this.readyState == "complete"){ 
						callback();
					}
				}
			}else{ 
				img.onload = function(){ 
					callback();
				}
			}
			img.src = src;
		},
		//渲染添加删除按钮
		renderDelete: function(){ 
			var deleteDOM = '<i class="deleteBtn">X</i>';
			//添加删除DOM结构
			this.imageBoxLi.append(deleteDOM);
		}
	};
	window["ImageBox"] = ImageBox;


	var defaultOptions = { 
		delete: callback
	}

	function callback(){ 
		console.log('没有回调函数');
		return false;
	}

})(jQuery);
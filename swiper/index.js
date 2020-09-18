

(function () {
    /**
     * 
     * @param {Object} opt 轮播图对象数据
     * @param {Element} wrap 要添加的元素
     */

    function Slider(opt, wrap) {
        // 构造函数中的this指向，指向的是构造函数构造出来的对象
        this.wrap = wrap;
        this.list = opt.list || [];
        this.listLength = opt.list.length;
        this.width = opt.width || wrap.width();
        this.height = opt.height || wrap.height();
        this.type = opt.type || 'fade';
        // 设置是否显示左右按钮，如果没有传递这个属性，则默认显示
        this.showChangeBtn = opt.showChangeBtn || opt.showChangeBtn == undefined ? true : opt.showChangeBtn;
        this.showSpotBtn = opt.showSpotBtn || opt.showSpotBtn == undefined ? true : opt.showSpotBtn;
        this.autoTime = opt.autoTime || 5000;
        this.isAuto = opt.isAuto || opt.isAuto == undefined ? true : opt.isAuto;
        this.nowIndex = 0;
        this.isAnimate = false;
        this.timer = null;
        // console.log(this.type)
        this.init = function () {   
            // 初始化轮播图样式，结构，行为
            // 1、轮播图结构的构建
            this.createDom();
            // 2、样式的初始化
            this.initStyle();
            // 3、绑定事件
            this.bindEvent()
            if (this.isAuto) {
                this.autoChange();
            }
        }

    }
    // 创建轮播图结构
    Slider.prototype.createDom = function () {
        var sliderWrapper = $('<div class = "my-swiper-wrapper"></div>');
        var sliderContent = $('<ul class = "my-swiper-list"></ul>');
        var leftBtn = $('<div class = "my-swiper-btn my-swiper-lBtn"> &lt; </div>')
        var rightBtn = $('<div class = "my-swiper-btn my-swiper-rBtn"> &gt; </div>')
        var spotBtn = $('<div class = "my-swiper-spots"></div>');
        for (var i = 0; i < this.list.length; i++) {
            $('<li class = "my-swiper-item"></li>').append(this.list[i]).appendTo(sliderContent);
            $('<span></span>').appendTo(spotBtn)
        }
        if (this.type == 'animate') {
            $('<li class = "my-swiper-item"></li>').append($(this.list[0]).clone()).appendTo(sliderContent);
        }
        sliderWrapper.append(sliderContent)
            .append(leftBtn)
            .append(rightBtn)
            .append(spotBtn)
            .appendTo(this.wrap)
            .addClass('my-swiper-' + this.type)
    }
    // 初始化样式
    Slider.prototype.initStyle = function () {
        // 在选择器中添加第二个参数，进行添加作用域，以免产生作用域碰撞
        $('.my-swiper-wrapper', this.wrap).css({
                width: this.width,
                height: this.height
            }).find(".my-swiper-item ", this.wrap)
            .css({
                width: this.width,
                height: this.height
            });
        // 如果是淡入淡出效果
        if (this.type == 'fade') {
            $('.my-swiper-item', this.wrap).hide().eq(this.nowIndex).show();
            // console.log($('.my-swiper-item',this.wrap).eq(this.nowIndex))
        } else if (this.type == 'animate') {
            $('.my-swiper-list').css({
                width: this.width * (this.listLength + 1),
            })

            // alert('111')
            // console.log(this.width)
            // $('.my-swiper-item', this.wrap)
        }
        // 是否显示左右按钮
        if (!this.showChangeBtn) {
            $('.my-swiper-btn', this.wrap).hide()
        } else {
            $('.my-swiper-btn', this.wrap).show()
        }
        // 是否显示小圆点
        if (!this.showSpotBtn) {
            $('.my-swiper-spots', this.wrap).hide()
        } else {
            $('.my-swiper-spots', this.wrap).show()
        }
        // 设置小圆点的属性
        $('.my-swiper-spots > span', this.wrap).eq(this.nowIndex).addClass('active');

    }
    // 绑定事件
    Slider.prototype.bindEvent = function () {
        var self = this;
        $('.my-swiper-lBtn', this.wrap).click(function () {
            // console.log('left')
            if (self.isAnimate) {
                return false;
                // console.log('isAnimate == true')
            }
            self.isAnimate = true;
            // console.log('isAnimate == false')
            // 如果当前图片的索引值为0 则点击左侧按钮的时候显示最后一张图片  索引值为listLength - 1
            if (self.nowIndex == 0) {
                if (self.type == 'animate') {
                    $(".my-swiper-list", self.wrap).css({
                        left: -self.width * self.listLength
                    });
                }
                self.nowIndex = self.listLength - 1;
            } else {
                self.nowIndex--;
            }
            self.change();
        });
        $('.my-swiper-rBtn', this.wrap).click(function () {
            // console.log('right')
            // console.log(self.listLength)
            // console.log(self.nowIndex)
            // console.log(this.type)
            if (self.isAnimate) {
                return false;
            }
            self.isAnimate = true;
            // console.log(self.isAnimate)
            // 如果当前图片的索引值为最后一张图片的索引值  则点击右侧按钮的时候显示第一张图片 索引值为0
            if (self.type == 'fade' && self.nowIndex == self.listLength - 1) {
                self.nowIndex = 0;
                // console.log('success in fade')
            } else if (self.type == 'animate' && self.nowIndex == self.listLength) {
                // console.log('success in animate')
                $('.my-swiper-list', this.wrap).css({
                    left: 0
                })
                // console.log('11')
                self.nowIndex = 1;
            } else {
                self.nowIndex++;
                // console.log(self.nowIndex)
            }
            self.change();
            // console.log(self.isAnimate)
        })
        $(".my-swiper-wrapper", this.wrap).mouseenter(function () {
            clearInterval(self.timer);
        }).mouseleave(function () {
            if (self.isAuto) {
                self.autoChange();
            }
        });
        $(".my-swiper-spots > span", this.wrap).mouseenter(function () {
            if (self.isAnimate) {
                return false;
            }
            self.isAnimate = true;
            self.nowIndex = $(this).index();
            self.change();
        });
    }
    // 样式切换
    Slider.prototype.change = function () {
        var self = this;
        // 淡入淡出效果，原有显示的进行淡出，当前图片进行淡入
        if (this.type == 'fade') {
            $('.my-swiper-item', this.wrap).fadeOut().eq(this.nowIndex).fadeIn(function () {
                self.isAnimate = false;
            });
        } else if (this.type == 'animate') {
            $('.my-swiper-list', this.wrap).animate({
                left: -this.width * this.nowIndex,
            }, 1000, function () {
                self.isAnimate = false;
            })
            // alert('111')
            // console.log(this.left)
        }
        // 切换小圆点的效果
        // mowIndex == listLength 代表的是当前是最后一张照片，这应该让第零个小圆点产生样式
        $('.my-swiper-spots > span', this.wrap).removeClass('active').eq(this.nowIndex % this.listLength).addClass('active')
    }
    // 自动切换
    Slider.prototype.autoChange = function () {
        var self = this;
        this.timer = setInterval(function () {
            $(".my-swiper-rBtn", self.wrap).click();
        }, this.autoTime);
    }
    // 封装插件
    $.fn.extend({
        swiper: function (options) {
            var obj = new Slider(options, this);
            obj.init();
        }
    })
})();
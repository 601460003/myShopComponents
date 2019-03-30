<template>
  <div>
    <div class="g-panel">
      <div class="device" id="page-list">
        <!--头部路由-->
        <div class="header-router">
          <router-link to="/"> <span class="header-title">1.商品列表</span></router-link>
          <router-link to="/shopcar"><span class="header-title">2.购物车列表</span></router-link>
        </div>
        <div class="page">
          <div class="tab-wrap">
            <!--导航列表-->
            <ul class="cate-tab">
              <li class="cate" :class="{'tab-active': cate_index === index}"
                  v-for="(item, index) in cate" @click="toggleCate(index)" :key="index">
                {{ item.des }}
              </li>
            </ul>
          </div>
          <!--综合排行-->
          <ul class="filter-bar">
            <li class="filter-opt" :class="{'filter-active': filter_index === index,
             'filter-price': item.method === 'sortPrice', 'price-down': price_isAsc,
              'price-up': !price_isAsc}" v-for="(item, index) in sortMethods"
                @click="sortBy(item.method)">{{ item.name }}
            </li>
          </ul>
          <!--商品展示区-->
          <ul class="goods-list">
            <li class="goods-item" v-for="(item, index) in list">
              <div class="goods-img">
                <img :src="item.img" />
                <div class="flag" v-if="item.ishot">热</div>
              </div>
              <!--选项卡操作-->
              <div class="goods-info">
                <!--名字-->
                <p class="goods-title">{{ item.name }}</p>
                <!--价格-->
                <div class="goods-price">
                  <span>¥<b>{{ item.price }}</b></span>
                </div>
                <!--多少人付款-->
                <span class="des">{{ item.sales }}人付款</span>
                <span class="save" @click="addToCart(item)">+</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export  default {
    created: function () {
      this.setList()
    },
    data(){
      return{
        cate_index: 0, // 当前分类项下标
        filter_index: 0, // 当前条件筛选项下标
        price_isAsc: false, // 价格是否升序
        checkAllFlag: false,
        selectedNum: 0,
        delFlag: false,
        cate: [
          { id: 0, des: '推荐' },
          { id: 1, des: '母婴' },
          { id: 2, des: '饰品' },
          { id: 3, des: '食品' },
          { id: 4, des: '家电' },
          { id: 5, des: '百货' }
        ],
        cart: [],
        sortMethods: [
          { name: '综合排序', method: 'setList' },
          { name: '销量优先', method: 'sortSales' },
          { name: '商品价格', method: 'sortPrice' }
        ],
        goods: [{
          id: 1001,
          name: 'Beats EP头戴式耳机',
          price: 558,
          type: 4,
          stock: 128,
          sales: 1872,
          img: 'http://img11.360buyimg.com/n1/s528x528_jfs/t3109/194/2435573156/46587/e0e867ac/57e10978N87220944.jpg!q70.jpg'
        }, {
          id: 1002,
          name: '雀巢（Nestle）高钙成人奶粉',
          price: 60,
          type: 3,
          stock: 5,
          sales: 2374,
          img: 'http://m.360buyimg.com/babel/jfs/t5197/28/400249159/97561/304ce550/58ff0dbeN88884779.jpg!q50.jpg.webp'
        }, {
          id: 1003,
          name: '煎炒烹炸一锅多用',
          price: 216,
          type: 5,
          stock: 2,
          sales: 351,
          ishot: true,
          img: 'http://gw.alicdn.com/tps/TB19OfQRXXXXXbmXXXXL6TaGpXX_760x760q90s150.jpg_.webp'
        }, {
          id: 1004,
          name: 'ANNE KLEIN 潮流经典美式轻奢',
          price: 585,
          type: 2,
          stock: 465,
          sales: 8191,
          img: 'http://gw.alicdn.com/tps/TB1l5psQVXXXXcXaXXXL6TaGpXX_760x760q90s150.jpg_.webp'
        }, {
          id: 1005,
          name: '乐高EV3机器人积木玩具',
          price: 3099,
          type: 1,
          stock: 154,
          sales: 165,
          img: 'https://m.360buyimg.com/mobilecms/s357x357_jfs/t6490/168/1052550216/653858/9eef28d1/594922a8Nc3afa743.jpg!q50.jpg'
        }, {
          id: 1006,
          name: '全球购 路易威登（Louis Vuitton）新款女士LV印花手袋 M41112',
          price: 10967,
          type: 2,
          stock: 12,
          sales: 6,
          img: 'https://m.360buyimg.com/n1/s220x220_jfs/t1429/17/1007119837/464370/310392f4/55b5e5bfN75daf703.png!q70.jpg'
        }, {
          id: 1007,
          name: 'Kindle Paperwhite3 黑色经典版电纸书',
          price: 805,
          type: 4,
          stock: 3,
          sales: 395,
          img: 'http://img12.360buyimg.com/n1/s528x528_jfs/t4954/76/635213328/51972/ec4a3c3c/58e5f717N4031d162.jpg!q70.jpg'
        }, {
          id: 1008,
          name: 'DELSEY 男士双肩背包',
          price: 269,
          type: 2,
          stock: 18,
          sales: 69,
          ishot: true,
          img: 'http://gw.alicdn.com/tps/LB1HL0mQVXXXXbzXVXXXXXXXXXX.png'
        }, {
          id: 1009,
          name: '荷兰 天赋力 Herobaby 婴儿配方奶粉 4段 1岁以上700g',
          price: 89,
          type: 1,
          stock: 36,
          sales: 1895,
          img: 'http://m.360buyimg.com/babel/s330x330_jfs/t4597/175/4364374663/125149/4fbbaf21/590d4f5aN0467dc26.jpg!q50.jpg.webp'
        }, {
          id: 1010,
          name: '【全球购】越南acecook河粉牛肉河粉特产 速食即食方便面粉丝 牛肉河粉米粉65克*5袋',
          price: 19.9,
          type: 3,
          stock: 353,
          sales: 3041,
          ishot: true,
          img: 'https://m.360buyimg.com/mobilecms/s357x357_jfs/t3169/228/5426689121/95568/d463e211/586dbf56N37fcd503.jpg!q50.jpg'
        }, {
          id: 1011,
          name: '正品FENDI/芬迪女包钱包女长款 百搭真皮钱夹 女士小怪兽手拿包',
          price: 3580,
          type: 2,
          stock: 5,
          sales: 18,
          img: 'http://img.alicdn.com/imgextra/i3/TB16avCQXXXXXcsXpXXXXXXXXXX_!!0-item_pic.jpg_400x400q60s30.jpg_.webp'
        }],
        list: []
      }
    },
    methods: {

      /**
       * @method 设置商品列表
       * 一个空数组存放这些方法
       * 用一个方法把商品分类 根据type值进行分类
       * 达到选项卡的效果
       */
      setList () {
        this.list = this.goods.filter(item=>{
          return this.cate_index !== 0 ? item.type === this.cate_index : item
        });
      },

      /**
       * @method 切换分类
       * @param {Number} index 需要切换类目的数组下标
       */
      toggleCate (index) {
        this.cate_index = index;
        // 分类操作
        this.setList();
        // 价格排序状态保持不变
        var filterIndex = this.filter_index;
        (filterIndex === 2) && (this.price_isAsc = !this.price_isAsc);
        // 商品排序
        this.sortBy(this.sortMethods[filterIndex].method);
      },

      /**
       * 根据属性值进行升序或降序的比较器
       *
       * @method 属性比较器
       * @param {String} prop 属性名
       * @param {String} type 排序方法 (desc: 降序, asc: 升序)
       */
      compare: function (prop, type) {
        type = type || 'desc';

        var flag1, flag2;
        if (type === 'desc') {
          flag1 = -1;
          flag2 = 1;
        } else if (type === 'asc') {
          flag1 = 1;
          flag2 = -1;
        }

        return function (obj1, obj2) {
          var val1 = obj1[prop],
            val2 = obj2[prop];

          if (val2 < val1) {
            return flag1;
          } else if (val2 > val1) {
            return flag2;
          } else {
            return 0;
          }
        }
      },

      /**
       * @method 按销量排序
       */
      sortSales() {
        this.list.sort(this.compare('sales'));
      },

      /**
       * @method 按价格排序
       */
      sortPrice: function () {
        var type = this.price_isAsc ? 'desc' : 'asc';
        this.list.sort(this.compare('price', type));
        this.price_isAsc = !this.price_isAsc;
      },

      /**
       * @method 排序调度器
       * @param {String} method 方法名
       */
      sortBy: function (method) {
        this.filter_index = this.sortMethods.findIndex(function(item) {
          return item.method === method;
        });
        method = method || 'setList';
        method !== 'sortPrice' && (this.price_isAsc = false);
        this[method]();
      },

      /**
       * @method 添加到购物车
       * @param {Object} goods 商品
       */
      addToCart (goods) {
       // 把需要的数据存在一个数组里
         var shopCar =
           {
             id: goods.id,
             img: goods.img,
             name: goods.name,
             price: goods.price, stock: goods.stock
           };
         this.$store.commit('addToCar',shopCar)
      },
    },
  }
</script>

<style scoped>
  body {
    font-size: 14px;
    color: #363636;
    background-color: #333;
    margin: 0!important;
  }

  h1,
  ul,
  li,
  p {
    margin: 0;
    padding: 0;
  }

  li {
    list-style: none;
  }

  .cate,
  .filter-opt,
  .save {
    cursor: pointer;
  }

a{text-decoration: none}
  .header-router {
    height: 50px;
    line-height: 50px;
    background-color: #38f;
    width: 100%;
    text-align: center;
  }
  .header-title{
    color: #ffffff;
    font-size: 16px;
    padding:0 20px;
  }

  .tab-wrap {
    height: 50px;
    background: #ffebcd;
    overflow: hidden;
  }

  .cate-tab {
    /*white-space: nowrap;*/
    /*overflow-x: scroll;*/
    /*-webkit-overflow-scrolling: touch;*/
    /*background-color: #5D4285;*/
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: #f3f5f7;
  }

  .cate {
    /*display: inline-block;*/
    /*width: 80px;*/
    /*height: 70px;*/
    width: 20%;
    color: #333;
    line-height: 50px;
    text-align: center;
  }

  .tab-active {
    /*background-color:#38f ;*/
    color: #ffffff;
    background-color: #f44;
    border-radius: 3px;
  }

  .filter-bar {
    display: flex;
    height: 40px;
    background-color: #fff;
    line-height: 40px;
    justify-content: space-between;
    padding: 0 10px;
  }

  .filter-opt {
    position: relative;
    /*width: 33.3%;*/
    color: #333;
    font-size: 14px;
    text-align: center;
  }

  .filter-active {
    color: #f44;
    border-bottom: 2px solid
  }



  .goods-list {
    padding-top: 8px;
    /*overflow-y: scroll;*/
  }

  .cart-list {
    height: 560px;
  }

  .goods-item {
    display: flex;
    margin-bottom: 8px;
    padding: 10px 6px;
    min-height: 62px;
    background: #fff;
    border-bottom: 1px solid #f4f0ea;
  }

  .goods-img {
    position: relative;
    margin-right: 4%;
    display: block;
    width: 16%;
  }

  .goods-img img {
    /*position: absolute;*/
    /*top: 0;*/
    /*left: 0;*/
    /*width: 100%;*/
    width: 110%;
    height: 80%;
  }

  .goods-item .flag {
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    font-size: 12px;
    color: #fff;
    text-align: center;
    line-height: 20px;
    background-color: #FC5951;
    border-radius: 50%;
  }

  .goods-info {
    position: relative;
    width: 80%;
  }

  .goods-title {
    width: 80%;
    height: 38px;
    color: #363636;
    line-height: 1.2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .goods-price {
    margin-top: 6px;
    line-height: 1;
  }

  .goods-price span {
    font-size: 15px;
    color: #333;
    /*   background: linear-gradient(90deg, #03D2B3 0, #2181FB 80%, #2181FB 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent; */
  }

  .des {
    font-size: 12px;
    color: #888;
  }

  .save {
    position: absolute;
    right: 10px;
    bottom: 2px;
    width: 23px;
    height: 23px;
    background-color: #f44;
    font-size: 29px;
    line-height: 19px;
    text-align: center;
    color: #fff;
    border-radius: 12px;
    overflow: hidden;
  }

  .empty-states {
    padding-top: 60px;
    font-size: 18px;
    color: #AEB0B7;
    text-align: center;
  }

  .cart-list .goods-info {
    width: 68%;
  }

  .item-selector {
    width: 12%;
  }

  .icon-selector {
    position: relative;
    margin: 16px auto 0 auto;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 2px solid #ccc;
    cursor: pointer;
  }

  .selector-active {
    background-color: #7a45e5;
    border-color: #7a45e5;
  }

  .selector-active .icon {
    position: absolute;
    top: 2px;
    left: 2px;
  }


  .g-selector .item-selector {
    position: relative;
    display: inline-block;
  }

  .g-selector span {
    position: absolute;
    margin-left: 20px;
    color: #5F646E;
    top: 15px;
  }

  .total {
    float: right;
    color: #363636;
    font-size: 14px;
    line-height: 50px;
    margin-right: 20px;
  }

  .total span {
    color: #7A45E5;
  }

  .total b {
    font-size: 17px;
    margin-left: 4px;
  }

  .del-box .total {
    display: none;
  }

  .del-box .buy-btn {
    display: none;
  }

  .del-box .del-btn {
    display: block;
  }

</style>


<template>
  <div class="device" id="page-cart">
    <header>
      <div class="header-router">
        <router-link to="/"><span class="header-title">1.商品列表</span></router-link>
        <router-link to="/shopcar"><span class="header-title">2.购物车列表</span></router-link>
      </div>
    </header>
    <div class="page">
      <div class="empty-states" v-if="cart.length === 0">
        <div class="noShop">
          <img src="http://img3.imgtn.bdimg.com/it/u=4214290751,1455904856&fm=26&gp=0.jpg"/>
          <span>购物车空空如也，去逛逛吧～</span>
        </div>
      </div>
      <!--商品信息-->
      <ul class="goods-list cart-list" v-else>
        <li class="goods-item" v-for="(item, index) in cart">
          <!--图片-->
          <div class="item-selector">
            <div class="icon-selector" v-bind:class="{'selector-active': item.checked}" @click="selectGoods(item)">
              <svg t="1504061791962" class="icon" style="" viewBox="0 0 1024 1024" version="1.1"
                   xmlns="http://www.w3.org/2000/svg" p-id="2922" xmlns:xlink="http://www.w3.org/1999/xlink" width="12"
                   height="12">
                <path
                  d="M908.288 127.488l-537.6 537.6-254.976-254.976L0 525.824l254.976 254.976 115.712 115.712L486.4 780.8l537.6-537.6z"
                  fill="#ffffff" p-id="2923"></path>
              </svg>
            </div>
          </div>
          <div class="goods-img">
            <img :src="item.img"/>
          </div>
          <!--名字加价格-->
          <div class="goods-info">
            <p class="goods-title">{{ item.name }}</p>
            <div class="goods-price">
              <span>¥<b>{{ item.price }}</b></span>
            </div>
            <!--库存-->
            <span class="des">库存{{ item.stock }}件</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="action-bar">
      <div class="g-selector" @click="checkAll">
        <div class="item-selector">
          <div class="icon-selector" :class="{'selector-active': checkAllFlag}">
            <svg t="1504061791962" class="icon" style="" viewBox="0 0 1024 1024" version="1.1"
                 xmlns="http://www.w3.org/2000/svg" p-id="2922" xmlns:xlink="http://www.w3.org/1999/xlink" width="12"
                 height="12">
              <path
                d="M908.288 127.488l-537.6 537.6-254.976-254.976L0 525.824l254.976 254.976 115.712 115.712L486.4 780.8l537.6-537.6z"
                fill="#ffffff" p-id="2923"></path>
            </svg>
          </div>
        </div>
        <span>全选</span>
      </div>
      <div class="action-btn buy-btn">结算({{shopCount}})</div>
      <div class="total">合计：<span>¥<b>{{selectedNum}}</b></span></div>
    </div>
  </div>
</template>

<script>
  export  default {
    data(){
      return{
        checkAllFlag: false,
        selectedNum: 0,
        shopCount:0,
        cart: [],
        list: [],
      }
    },
    created(){
      // 获取localStorage里面的数据
      this.cart=JSON.parse(localStorage.getItem("car")||'[]')
    },
    methods:{
      /**
       * 1.全选的方法
       */
      checkAll(){
       this.checkAllFlag=!this.checkAllFlag;
        this.cart.forEach(shop=>{
          this.$set(shop,'checked',!shop.checked)
          if(this.checkAllFlag){
            shop.checked=true
          }
        })
        this.__totalMoney();
      },
      /**
       * 2.单选的方法
       */
      selectGoods(item){
          if (!item.checked){
            this.$set(item,'checked',!item.checked)
          }else {
            item.checked=!item.checked
          }
          this.__isAllcheck();
          this.__totalMoney();
      },
      /**
       *3.用数组的长度的方法判断是否全部选上
       */
      __isAllcheck(){
        var carLength=0;
        this.cart.forEach(shop=>{
          if (shop.checked){
            carLength++
          }
        })
        if(this.cart.length===carLength){
          this.checkAllFlag=true
        }else {
          this.checkAllFlag=false
        }
      },
      /**
       *4.总价格已经数量的方法
       */
      __totalMoney(){
        let selectedNum=0;
        let shopCount=0;
        this.cart.forEach(shop=>{
          if(shop.checked){
            selectedNum+=shop.price;
            shopCount++
          }
        })
        this.selectedNum=selectedNum;
        this.shopCount=shopCount
      },
    },
  }
</script>

<style scoped>
.page{
  margin-bottom: 50px;
}
  header {
    position: relative;
    height: 50px;
    line-height: 50px;
    background-color: #38f;
    color: #ffffff;
    width: 100%;
    text-align: center;
  }

  .goods-list {
    padding-top: 8px;
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
  }

  .des {
    font-size: 12px;
    color: #888;
  }
.noShop{
  background: #f3f5f7;
  text-align: center;
  height: 200px;
  padding-top: 30px;
}
  .noShop img{
    width: 120px;
    height: 120px;
  }
  .noShop span{
    display: block;
    color: #999;

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
    background-color: #f44;
    border-color: #f44;
  }

  .selector-active .icon {
    position: absolute;
    top: 2px;
    left: 2px;
  }

  .goods-num {
    position: absolute;
    right: 10px;
    top: 4px;
    width: 32px;
    color: #999;
    text-align: center;
  }

  .show-num {
    line-height: 28px;
  }

  .num-btn {
    width: 100%;
    height: 24px;
    font-size: 20px;
    line-height: 20px;
    cursor: pointer;
  }

  .action-bar {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 52px;
    font-size: 15px;
    background-color: #fff;
    border-top: 1px solid #fff;
  }

  .g-selector {
    float: left;
    width: 70px;
    margin-left: 4%;
    height: 52px;
    cursor: pointer;
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
    color: #f44;
  }

  .total b {
    font-size: 17px;
    margin-left: 4px;
  }

  .action-btn {
    float: right;
    width: 120px;
    height: 100%;
    color: #fff;
    text-align: center;
    font-weight: 300;
    line-height: 52px;
    cursor: pointer;
  }

  .buy-btn {
    background-color: #f44;
  }

  .del-btn {
    display: none;
    background-color: #FF4069;
  }


  .del-box .buy-btn {
    display: none;
  }

  .del-box .del-btn {
    display: block;
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

</style>

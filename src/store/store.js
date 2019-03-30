import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
   carList:[]
  },
  mutations:{
      addToCar(state,shopCar){
        var flag=false;
        state.carList.some(item=>{
          if(item.id==shopCar.id){
            console.log(11)
            flag=true;
            return true
          }
        })
        if(!flag){
          state.carList.push(shopCar)
        }
        localStorage.setItem('car',JSON.stringify(state.carList))
      }
  },
  getters:{

  }
});

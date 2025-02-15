import { createStore } from 'vuex'
import axios from 'axios';
import router from '@/router';

export default createStore({
  state: {
    BASE_URL:'http://localhost:8080/',
    isSignUp:false,
    isLogin:false,
    isError:false,
    debugFlg:true,
    showErrMsg:[],
    ERR_MSG_LIST:{
      require:"未入力の入力必須項目があります。",
      nomatch:"ログイン情報およびパスワードが一致しません。"
    },
    SUC_MSG_LIST:{
      signupOK:'新規ユーザーを追加しました。'
    },
    tmpData:{},
    userInfo:{},
    requestInfo:{},
    purchasedList:[],
    nonpurchasedList:[],
    startShoppingList:{},
    communityRequest:{},
    communityList:{},
    joinCommunityIds:[],
    allCommunityList:{},
    FLASH_MSG:"",
    deliveryList:{},
    confirmFlgs:{
      // 1:buycode+seq 2:r_uid+b_uid
      registMethod:0,
      buycode:0,
      seq:0,
      r_uid:0,
      b_uid:0
    }
  },
  getters: {
  },
  mutations: {
    // ログイン状態管理=============================
    loginFalse(state){
      state.isLogin = false;
    },
    loginTrue(state){
      state.isLogin = true;
    },
    toggleLogin(state){
      state.isLogin != state.isLogin;
    },
    signUpFalse(state){
      state.isSignUp = false;
    },
    signUpTrue(state){
      state.isSignUp = true;
    },
    checkLogin(state){
      if(!state.isLogin){
        router.push({name:'login'})
      }
    },
    // ユーザー情報操作=============================
    placeUserInfo(state,info){
      state.userInfo = info;
    },
    initUserInfo(state){
      state.userInfo = {};
    },
    // リクエスト情報操作============================
    placeRequestInfo(state,req){
      state.requestInfo = req;
    },
    initRequestInfo(state){
      state.requestInfo = {}
    },
    getRequestInfo(state){
      axios.get(state.BASE_URL + "request/community", {
        params:{
            id:state.userInfo.id
        }
        }).then((res) => {
            state.requestInfo = res.data;
        }).catch(err => {
            console.log(err);
        })
      },
      getRequestInfoForMypage(state){
        console.log('state.userInfo.id')
        console.log(state.userInfo.id)
        state.purchasedList = [];
        state.nonpurchasedList = [];
        axios.get(state.BASE_URL + "request/mypage", {
          params:{
            user_id:state.userInfo.id
          }
        }).then((res) => {
            console.log(res.data.purchasedList);
            state.purchasedList = res.data.purchasedList;
            state.nonpurchasedList = res.data.nonpurchasedList;
        }).catch(err => {
            console.log(err);
        })
      },
      getStartShoppingList(state){
        axios.get(state.BASE_URL + "start/shopping", {
          params:{
            user_id:state.userInfo.id
          }
        }).then((res) => {
          console.log(res.data);
          state.startShoppingList = res.data;
        }).catch(err => {
          console.log(err);
        })
      },
      sortRequests(state){
        console.log('user_id start SortReqests')
        console.log(state.userInfo.id)
        state.isBuyList = [];
        state.noBuyList = [];
        let comUsrList = state.communityRequest;
        for(let i in comUsrList){
          let comReqList = comUsrList[i].requests;
          let isBuyTmpList = {};
          let noBuyTmpList = {};
          let isBuyTmpReqList = [];
          let noBuyTmpReqList = [];
          isBuyTmpList.user_id = comUsrList[i].user_id;
          noBuyTmpList.user_id = comUsrList[i].user_id;
          isBuyTmpList.user_name = comUsrList[i].user_name;
          noBuyTmpList.user_name = comUsrList[i].user_name;
          for(let j in comReqList){
              let comReqItem = comReqList[j];
              if(comReqItem.isbuy && comReqItem.buy_user_id == state.userInfo.id){
                  isBuyTmpReqList.push(comReqItem);
              }else if(!comReqItem.isbuy){
                  noBuyTmpReqList.push(comReqItem);
              }
          }
          if(isBuyTmpReqList.length !== 0){
              isBuyTmpList.requests = isBuyTmpReqList;
              state.isBuyList.push(isBuyTmpList);
          }
          if(noBuyTmpReqList.length !== 0){
              noBuyTmpList.requests = noBuyTmpReqList
              state.noBuyList.push(noBuyTmpList);
          }
        }
      },
      getDeliveryPageInfo(state, re_uid){
        // let that = this;
        console.log('情報の取得開始')
        return new Promise(function(resolve, reject){
          axios.get(state.BASE_URL + 'delivery', {
            params:{
              r_uid:re_uid,
              b_uid:state.userInfo.id
            }
          }).then((res) => {
            console.log('取得したデータ');
            console.log(res.data);
            state.deliveryList = res.data;
            resolve();
            console.log('配達ページへ遷移します。');
            router.push({name: 'delivery'});
          }).catch(err => {
            reject(err)
          })
        }
        )
      },
      // コミュニティー情報操作======================
      getCommunityList(state){
        axios.get(state.BASE_URL + "community/get", {
          params:{
            user_id:state.userInfo.id
          }
        }).then((res) => {
          let returnList = []
          // console.log(res);
          let idCnt = 0;
          // let i = 0;
          res.data.forEach((elm) => {
            // console.log(elm);
            if(elm.user_id === state.userInfo.id && !state.joinCommunityIds.includes(elm.community_id)){
              state.joinCommunityIds.push(elm.community_id);
            }
              if(idCnt !== elm.community_id){
                let tmpList = {};
                let tmpMemberList = [];
                tmpList['community_id'] = elm.community_id;
                tmpList['community_name'] = elm.community_name;
                res.data.forEach(e => {
                  if(e.community_id == elm.community_id){
                    tmpMemberList.push({'user_id':e.user_id, 'name':e.name});
                  }
                })
                tmpList['member'] = tmpMemberList;
                returnList.push(tmpList);
                idCnt = elm.community_id;
                // i++;
              }
          });
          // console.log(returnList);
          state.communityList = returnList;
        }).catch(err => {
          console.log(err);
        })
      },
    getAllCommunityList(state){
      axios.get(state.BASE_URL + 'community/all')
        .then(res => {
          state.allCommunityList = res.data;
        }).catch(err => {
          console.log(err);
        })
    },
    // デバッグ用の関数です。開発終了後はstate内のdebugFlgをfalseに変更すること！
    debug(state, str){
      if(state.debugFlg){
        console.log(str);
      }
    },
    // マイページへの遷移用関数
    goMypage(){
      router.push({name: 'mypage'});
    },
    // 確認画面・方法設定用
    initConfirmFlgs(state){
      state.confirmFlgs.registMethod = 0;
      state.confirmFlgs.buycode = 0;
      state.confirmFlgs.seq = 0;
      state.confirmFlgs.r_uid = 0;
      state.confirmFlgs.b_uid = 0;
    },
    // 一時データ保存用
    setTmpData(state, data){
      state.tmpData[data.prpname] = data.value;
    },
    delTmpData(state, data){
      delete state.tmpData[data.prpname];
    }
  },
  actions: {
  },
  modules: {
  }
})

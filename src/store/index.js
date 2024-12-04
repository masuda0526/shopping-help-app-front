import { createStore } from 'vuex'
import axios from 'axios';

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
    userInfo:{},
    requestInfo:{},
    communityList:{},
    joinCommunityIds:[],
    allCommunityList:{},
    FLASH_MSG:""
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
    updateRequestInfo(state){
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
    }

  },
  actions: {
  },
  modules: {
  }
})

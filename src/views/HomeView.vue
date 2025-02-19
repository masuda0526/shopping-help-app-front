<template>
  <HeaderView title="このサイトについて"></HeaderView>
  <div class="linkArea">
    <div>
      <router-link to="/login">ログインページへ＞</router-link>
    </div>
    <div>
      <router-link to="/signup">新規登録画面へ＞</router-link>
    </div>
  </div>
  <div class="first">
    <div class="plainSection">
      <div class="p-titleBox">
        <span class="p-maintitle singleBorder">コンセプト</span>
      </div>
      <div class="p-box">
        <p class="p-text-strong">「買い物にいくついでに買ってきますよ。」と考えている方と、買い物にいけない方を結びます！</p>
      </div>
    </div>
    <div class="plainSection">
      <div class="p-titleBox">
        <span class="p-maintitle singleBorder">サイトの使い方</span>
      </div>
      <div class="p-box">
        <p>利用者様の善意によって運営しているサービスです、支払いを拒む方の利用はご遠慮ください。</p>
        <p>利用者様通しのトラブルには関与できません。</p>
      </div>
    </div>
    <div class="p-btnArea" v-if="!this.isSecondSec">
      <button class="button-square button-yellow" @click="this.showSecondSection()">詳しく見る</button>
    </div>
  </div>
  <div class="second" v-if="this.isSecondSec">
    <div class="plainSection">
      <div class="p-titleBox">
        <span class="p-maintitle singleBorder">頼みたい方</span>
      </div>
      <h3 class="p-subtitle">新規登録</h3>
      <div class="p-box">
        <p>新規登録画面から必要事項を入力してください。登録後にマイページへ移動します。</p>
        <div class="linkArea">
          <router-link to="/singup">新規登録画面へ＞</router-link>
        </div>
      </div>
      <h3 class="p-subtitle">ログイン</h3>
      <div class="p-box">
        <p>二回目以降は、登録したメールアドレスまたは電話番号・パスワードでログイン後、マイページへ移動します。</p>
        <div class="linkArea">
          <router-link to="/login">ログインページへ＞</router-link>
        </div>
      </div>
    </div>
    <h3 class="p-subtitle">買い物リストを共有するには？</h3>
    <div class="p-box">
      <p>買い物リストを共有するには、新規登録時に発行された認証コードをお互いに入力する必要があります。</p>
      <p>以下の手順で、お互いに相手の認証コードを登録することで、共有することができるようになります。</p>
      <p>認証コードはマイページから確認ができます。</p>
      <p>①マイページから共有ユーザー追加を押します</p>
      <p>②相手の6桁の認証コードを入力し、認証するボタンを押します</p>
      <p>③相手の名前が表示されるので、間違いなければ共有するボタンを押します</p>
      <p>④認証完了画面が表示されると、認証完了です。</p>
    </div>
    <h3 class="p-subtitle">買い物の頼み方</h3>
    <div class="p-box">
      <p>①マイページからリクエストボタンを押し、欲しい物と数量を入力します。追加ボタンを押すことで依頼できます。</p>
      <p>②リストの共有者が買い物ついでに、購入し届けてくれるのを待ちましょう。</p>
      <p>③購入品を届けてもらったら、支払いと画面に従って受取処理を完了してください。</p>
    </div>
    <div class="p-btnArea" v-if="!this.isThirdSec">
      <button class="button-square button-yellow" @click="this.showThirdSection()">届ける場合</button>
    </div>
  </div>
  <div class="third" v-if="this.isThirdSec">
    <div class="plainSection">
      <div class="p-titleBox">
        <div class="p-maintitle singleBorder">届けられる方</div>
      </div>
      <div class="p-box">
        <p>新規登録後、マイページから相手と買い物リストの共有をしてください（共有にはお互いの認証コードを入力する必要があります）</p>
        <p>購入時には、マイページの買い物するボタンを押すことで共有者の買い物リストが表示されます。</p>
        <p>スーパー等で買い物しながら、カートへボタンを押して購入済にしてください。（購入済になっている商品は他の方がカートに入れているので購入できません</p>
        <p>買い物が終了したら、下部にある買い物完了を押して、買い物を確定させてください。</p>
        <p>買い物したリストは、マイページのみんなの買い物リストボタンを押すことで表示できます。共有者ごとに表示されているので配達してあげてください。</p>
        <p>各共有者へ配達し、精算をおこない、画面に従って配達処理を完了させてください。</p>
      </div>
      <h3 class="p-subtitle">支払いに関しての注意事項</h3>
      <div class="p-box">
        <p>支払いは、現金、コード決済、クレジットカードなど任意の方法でおこなってください。（ポイントの活用などは自由です）</p>
        <p>利用者間のトラブルを防止するため、レシートなどは必ず受取り、相手へ提示してください</p>
      </div>
      <div class="linkArea">
        <div>
          <router-link to="/login">ログインページへ＞</router-link>
        </div>
        <div>
          <router-link to="/signup">新規登録画面へ＞</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderView from './HeaderView.vue';

// @ is an alias to /src
export default {
  data(){
    return{
      isSecondSec:false,
      isThirdSec:false,
    }
  },
  name: 'HomeView',
  components: {
    HeaderView
  },
  methods:{
    showSecondSection(){
      this.isSecondSec = true;
    },
    showThirdSection(){
      this.isThirdSec = true;
    }
  }
}
</script>

<style scoped>
.plainSection{
  margin-bottom: 20px;
}
.p-titleBox{
  text-align: center;
  position: relative;
  margin-bottom: 20px;
}
.p-maintitle{
  display: inline-block;
  margin: 0 auto;
  background: #fff;
  font-size: 24px;
  padding: 0 10px;
}
.p-subtitle{
  padding-left: 15px;
  border-left: solid 2px #a35e04;
  font-size: 22px;
  margin-bottom: 5px;
  color: #a35e04;
}
.p-box{
  padding: 20px 0;
}
.p-btnArea{
  text-align: center;
  margin-bottom: 25px;
}
.linkArea{
  text-align: right;
}
/* 文字強調 */
.p-text-strong{
  font-size: 20px;
  font-weight: bold;
}
/* 装飾 */
.singleBorder::after{
  content: "";
  width: 100%;
  height: 3px;
  background: #e2c105;
  position: absolute;
  top:18px;
  left:0;
  z-index: -1;
}

</style>

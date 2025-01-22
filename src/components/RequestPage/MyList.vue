<template>
    <div class="item-list">
        <div class="item-block">
            <div class="item">にんじんにんじん</div>
            <div class="amount">2個</div>
        </div>
        <button class="button button-red">削除</button>
    </div>
</template>

<script>

</script>

<style lang="css" scoped>
    .item-list{
        padding: 0px 0px;
        display: flex;
		border-bottom: solid;
    }
    .item-block{
        width: 262px;
        height: 58px;
		font-size: 20px;
		display: flex;
		text-align: center;
    }
    .item{
        width: 172px;
        height: 58px;
		font-size: 20px;
    }
    .amount{
		display: inline-block;
		margin-left: auto;
		margin-right: 20px;
		width: 68px;
        height: 58px;
		text-align: right;
    }
    .button{
        width: 93px;
        height: 44px;
		white-space: nowrap;
    }
</style>
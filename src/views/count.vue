<template>
  <div class="count flex-main-start">
    <div class="count-block box-shadow flex-main-start flex-column">
      <h3>今日销售</h3>
      <span class="top-10">￥<span class="color-danger">3500.00</span></span>
      <span class="top-20">
        <span class="color-warning">35</span>&nbsp;&nbsp;单</span
      >
    </div>
    <div class="count-block box-shadow flex-main-start flex-column">
      <h3>已提现</h3>
      <span class="top-10">￥<span class="color-danger">500.00</span></span>
    </div>
    <div class="count-block box-shadow flex-main-start flex-column">
      <h3>可提现</h3>
      <span class="top-10">￥<span class="color-danger">500.00</span></span>
    </div>
  </div>
</template>

<style lang="scss">
.count-block {
  width: 180px;
  height: 180px;
  background: white;
  margin-right: 30px;
  border-radius: 10px;
}
</style>
<script>
// @ is an alias to /src
export default {
  name: "count",
  components: {}
};
</script>

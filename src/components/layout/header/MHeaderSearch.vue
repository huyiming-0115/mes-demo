<template>
  <div class="header-search">
    <!-- <a-icon type="search" class="search-icon" @click="enterSearchMode" /> -->
    <a-auto-complete ref="input" class="search-input" placeholder="站内搜索"> </a-auto-complete>
  </div>
</template>
<script setup></script>
<style lang="less">
.header-search {
  .search-icon {
    font-size: 16px;
    cursor: pointer;
  }
  .search-input {
    border: 0;
    //border-bottom: 1px solid @border-color-split;
    transition: width 0.3s ease-in-out;
    input {
      border: 0;
      box-shadow: 0 0 0 0;
    }
    &.leave {
      width: 0px;
      input {
        display: none;
      }
    }
    &.enter {
      width: 200px;
      input:focus {
        box-shadow: 0 0 0 0;
      }
    }
  }
}
</style>

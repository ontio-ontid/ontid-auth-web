<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
html,
body {
  width: 100%;
  height: 100%;
}
* {
  padding: 0;
  margin: 0;
  list-style: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  text-align: center;
}
.form_area {
  margin: 0 auto;
  margin-top: 100px;
  width: 400px;
}
</style>

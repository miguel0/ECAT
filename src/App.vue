<template>
		<div>
      <div id='app'>
        <router-view />
      </div>
    
      <div>
        <footer class="page-footer font-small fixed-bottom">
          <div class="footer-copyright text-center py-3">
            ECAT v1.0 || Nov, 2020
          </div>
        </footer>
      </div>
	</div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style scoped>
  footer {
    background-color: #1f3564;
    color: white;
    margin-top: 10px;
  }
  #app{
    margin-bottom: 70px;
  }
</style>
<template>
		<div>
      <div id='app'>
        <router-view />
      </div>
    
      <div>
        <footer class="page-footer font-small blue fixed-bottom" variant='primary'>
          <div class="footer-copyright text-center py-3">ECAT v1.0 || Nov, 2020
          </div>
        </footer>
      </div>
	</div>
</template>

<script>
  export default {
    name: 'app',
    components: {
    }
  }
</script>

<style scoped>
  footer {
    background-color: #007bff;
    color: white;
  }
</style>
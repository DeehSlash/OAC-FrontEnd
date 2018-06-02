<template>
  <container>
  
    <page-title>About</page-title>

    <div class="about">
      This project has been developed by <b>André Luiz</b> and <b>Alberto Neto</b>.<br><br>
      GitHub repositories:<br><br>
      <a href="https://github.com/DeehSlash/OAC-FrontEnd" target="_blank">
        <vs-button vs-type="primary-line-down">OAC-FrontEnd</vs-button>
      </a>
      <a href="https://github.com/DeehSlash/OAC-API" target="_blank">
        <vs-button vs-type="primary-line-down">OAC-API</vs-button>
      </a>
    </div>

    <div class="footer">
      <a href="https://www.univali.br" target="_blank">UNIVALI - Universidade do Vale do Itajaí</a>
    </div>

  </container>
</template>

<style lang="scss" scoped>
  .about {
    margin-top: 25px;
  }

  .footer {
    margin-top: 50px;
  }

  a {
    color: #000;
    transition: opacity .3s ease;

    &:hover {
      opacity: 0.75;
      transition: opacity .3s ease;
    }
  }
</style>


<script>
  import Container from '~/components/Container'
  import PageTitle from '~/components/PageTitle'

  export default {
    components: {
      Container,
      PageTitle
    }
  }
</script>
<template>
  <div class="login">
    <Login />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Login from "@/components/Login.vue"; // @ is an alias to /src

@Component({
  components: {
    Login
  }
})
export default class LoginView extends Vue {}
</script>

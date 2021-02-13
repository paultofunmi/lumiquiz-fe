<template>
  <section class="container-fluid">
      <div class="row justify-content-center">
          <div class="col-lg-6">
              <div class="login-panel bg-white text-left">
                 <section class="login-panel__alert">
                     <div id="login-status" class="alert alert-primary" role="alert" :style=" {opacity: isAlertShowing ? 1: 0}">
                        Login successful <small>Waiting for redirection</small>
                        <loading-component width="35"></loading-component>
                    </div>

                    <div class="alert alert-warning" role="alert" v-if="invalidInput || authError.length > 0">
                        <ul v-if="invalidInput">
                            <li v-for="(error, index) in errors" :key="index"> {{ error }} </li>
                        </ul>

                        <ul v-if="authError.length > 0">                    
                            <li v-for="(error, index) in authError" :key="index"> {{ error }} </li>
                        </ul>                
                    </div>
                 </section>

                 <h1 class="display-3 font-weight-bold">Login</h1>
                 <p class="font-weight-bold">Welcome back</p>
                 <br>
                 <form action="" method="post" @submit.prevent="loginUser">
                     <div class="form-group">
                         <label for="email" class="input-label">Email</label>
                         <input type="email" class="form-control" v-model="email" placeholder="email">
                     </div>
                     <div class="form-group">
                         <label for="password" class="input-label">Password</label>
                         <input type="password" class="form-control" v-model="password" placeholder="passwrod">
                     </div>
                     <br>
                     <div class="form-group d-flex justify-content-center">
                         <button class="btn btn-primary w-25" v-if="isLoggingIn"> <loading-component width="35"></loading-component> </button>
                         <button class="btn btn-primary w-25" id="login" v-if="!isLoggingIn">Login</button> 
                     </div>
                 </form>
              </div>
          </div>
      </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LoadingComponent from '@/components/LoadingComponent.vue'; 

@Component({
  components: {
    LoadingComponent,
  },
})
export default class Login extends Vue {

  isLoggingIn = false;
  isAlertShowing = false;
  email = '';
  password = '';
  errors: string[] = [];
  invalidInput = false;

  get authError(): [] {
      return this.$store.getters.authError
  }

  loginUser(): void {
    
    this.errors = [];

    if(this.email == ''){
        this.errors.push("Email field cannot be empty");
        this.invalidInput = true;
    }  

    if(this.password == '' || this.password.length < 5){ 
        this.errors.push("Ensure that Password field is not empty and is at least 5 characters");
        this.invalidInput = true;
    }

    if(this.invalidInput) return;

    this.isLoggingIn = true        
    const data = {
        email: this.email,
        password: this.password
    }

    this.$store.dispatch('login', data)
    .then((response) => {        
        this.isAlertShowing = true;
        this.errors = [];
        setTimeout(() => this.redirect(), 400)
    }).catch(error => {
        this.isLoggingIn = false
    })
  }

  redirect(): void {
    this.$router.push({name: 'Guessing'})  
  }
}
</script>


<style lang="scss">

    .widget {
        margin: 0;
        height: unset;
    }
    
    .login-panel {
        padding: 200px 0;
        position: relative;

        &__alert {
            ul {
                list-style: none;
            }
        }

        #login-status {
            position:absolute;
            top: 100px;
            width: 100%;
            opacity: 0;
            
            &.alert-primary {
                background-color: #007BFF;
                color: #FFF;
                border: none;
                font-size: 18px;
            }

            .widget{
                position: absolute;
                top: 0;
                right: 5px;
                margin: 10px;
            }

        }
    }

</style>
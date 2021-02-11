<template>
  <section class="container-fluid">
      <div class="row justify-content-center">
          <div class="col-lg-6">
              <div class="register-panel bg-white text-left">
                  <section class="register-panel__alert mb-3">
                     <div id="register-status" class="alert alert-primary" role="alert" :style=" {opacity: isAlertShowing ? 1: 0}">
                        Registration successful <small> Preparing Movie Quiz Player ..</small>
                        <loading-component width="35"></loading-component>
                    </div>

                    <div class="alert alert-warning" role="alert" v-if="invalidInput || authError.length > 0">
                        <ul v-if="invalidInput">
                            <li v-for="(error, index) in errors" :key="index"> {{ error }} </li>
                        </ul>

                        <ul v-if="authError">
                            <li v-for="(error, index) in authError" :key="index"> {{ error }} </li>
                        </ul>                
                    </div>
                 </section>
                 <h1 class="display-3 font-weight-bold">Register</h1>
                 <p class="font-weight-bold">Join us today</p>
                 <br>
                 <form action="" method="post" @submit.prevent="registerUser">
                      <div class="form-group">
                         <label for="email" class="input-label">Email</label>
                         <input type="email" name="email" class="form-control" v-model="user.email" placeholder="email">
                     </div>
                     <div class="form-group">
                         <label for="password" class="input-label">Username</label>
                         <input type="text" name="username"  class="form-control" v-model="user.username" placeholder="Username">
                     </div>
                     <div class="form-group">
                         <label for="password" class="input-label">Password</label>
                         <input type="password" name="password" class="form-control" v-model="user.password" placeholder="password">
                     </div>
                     <div class="form-group">
                         <label for="password" class="input-label">Password Confirmation</label>
                         <input type="password" name="password-confirm" class="form-control" v-model="user.passwordconfirm" placeholder="password confirmation">
                     </div>
                     <br>
                     <div class="form-group d-flex justify-content-center">
                         <button class="btn btn-primary w-25" v-if="isLoggingIn"> <loading-component width="35"></loading-component> </button>
                         <button class="btn btn-primary w-25" id="register" v-if="!isLoggingIn">Register</button>
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
export default class Register extends Vue {

  user = {
    email : '',
    username : '',
    password : '',
    passwordconfirm : ''
  }
  
  isLoggingIn = false;
  isAlertShowing = false;
  errors: string[] = [];
  invalidInput = false;

  get authError(): [] {
      return this.$store.getters.authError
  }
  registerUser(): void {
    
    this.errors = [];
    this.invalidInput = false;

    if(this.user.email == ''){
        this.errors.push("Email field cannot be empty");
        this.invalidInput = true;
    }  

    if(this.user.username == ''){
        this.errors.push("Username field cannot be empty");
        this.invalidInput = true;
    }  

    if(this.user.passwordconfirm == '' ){ 
        this.errors.push("Ensure that Password confirmation field is not empty");
        this.invalidInput = true;
    }

    if(this.user.password == '' || this.user.password.length < 5){ 
        this.errors.push("Ensure that Password field is not empty and is at least 5 characters");
        this.invalidInput = true;
    }

    if(this.user.passwordconfirm != this.user.password){ 
        this.errors.push("Ensure that password field and password confirm field matches");
        this.invalidInput = true;
    }

    if(this.invalidInput) return;

    this.isLoggingIn = true
    const data = {
        "name": this.user.username,
        "email": this.user.email,
        "password": this.user.password,
        "password_confirmation": this.user.passwordconfirm
    }

    this.$store.dispatch('register', data)
    .then(() => {
        this.isAlertShowing = true;
        this.$router.push({name: 'Guessing'})  
    })
    .catch(error => this.isLoggingIn = false )

  }
}
</script>


<style lang="scss">

    .widget {
        margin: 0;
        height: unset;
    }
    
    .register-panel {
        padding: 200px 0;
        position: relative;

        ul {
            list-style: none;
        }

        .alert {
            position:absolute;
            top: 55px;
            width: 100%;
            
            &.alert-primary {
                opacity: 0;
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

        .alert-danger {
            ul{
                list-style: none;
            }
        }
    }

</style>
<template>
  <f7-page no-toolbar no-navbar no-swipeback login-screen>
    <f7-login-screen-title>
      <img src="static/img/logo.svg" class="img-fluid logo" alt />
      mr. Cashback
    </f7-login-screen-title>
    <form @submit="checkForm">
      <f7-list form>
        <f7-list-input
          label="e-Mail"
          type="email"
          v-model="email"
          id="email"
          name="email"
          placeholder="Your email"
          :value="email"
          @input="email = $event.target.value"
        ></f7-list-input>

        <f7-list-input
          label="Password"
          type="password"
          id="password"
          name="password"
          v-model="password"
          placeholder="Your password"
          :value="password"
          @input="password = $event.target.value"
        ></f7-list-input>
      </f7-list>

      <div class="error" v-for="error in errors.email">{{error}}</div>
      <div class="error" v-for="error in errors.password">{{error}}</div>
      <f7-list class="bottom-btn">
        <f7-list-button @click="signIn" type="submit">Sign In</f7-list-button>
        <f7-list-button
          type="submit"
          class="sign-up"
          @click="$f7router.navigate('/sign-up/', {reloadCurrent: true})"
        >Sign Up</f7-list-button>
      </f7-list>
    </form>
  </f7-page>
</template>

<script>
import { getUsers } from "../service/user";
export default {
  data() {
    return {
      errors: {
        email: [],
        password: []
      },
      username: "",
      password: "",
      email: "",
      userData: []
    };
  },
  beforeMount() {
    // check if theres item on localstorage named as users
    this.getUser();
  },
  methods: {
    getUser() {
      getUsers({})
        .then(res => {
          console.log(res.data);
          if (!localStorage.getItem("users")) {
            localStorage.setItem("users", JSON.stringify(res.data));
            this.userData = res.data;
          } else {
            localStorage.getItem("users");
            // set userData data from localstorage users item and parse it
            this.userData = JSON.parse(localStorage.getItem("users"));
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    signIn() {
      const self = this;
      const app = self.$f7;
      const router = self.$f7router;
      // call to validate the sigin in input form
      self.checkForm();
      // check if no errors from validate
      if (self.errors.email.length == 0 && self.errors.password.length == 0) {
        // Filter userData that match user input email and password
        console.log(self.userData);
        let loginMatch = self.userData.filter(function(user) {
          return user.email === self.email && user.password === self.password;
        });

        let loginMatchLength = loginMatch.length;
        console.log(loginMatchLength);
        // check if userData length > 0 it means that user input email and password match data from localstorage
        if (loginMatchLength == 1) {
          let authUser = Object.assign({}, loginMatch[0]);
          console.log(authUser);
          self.$store.dispatch("SET_USER", authUser);
          localStorage.setItem("auth-user", JSON.stringify(authUser));
          console.log("true");
          app.dialog.alert(`Welcome ${self.email} <br>`, () => {
            router.navigate("/home/", { reloadCurrent: true });
          });
        } else {
          app.dialog.alert(
            `The credentials doesnt match our records. <br>`,
            () => {
              router.back();
            }
          );
        }
      }
    },
    checkForm: function(e) {
      this.errors.email = [];
      this.errors.password = [];
      if (!this.password) {
        this.errors.password.push("password required");
      }
      if (!this.email) {
        this.errors.email.push("email required.");
      } else if (!this.validEmail(this.email)) {
        this.errors.email.push("Valid email required.");
      }
      console.log(this.errors);
      if (this.errors.email.length && this.errors.password.length) return true;

      //   e.preventDefault();
    },
    validEmail: function(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
  }
};
</script>
<style lang="scss">
.page.login-screen-page {
  img.logo {
    width: 72px;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  background: -webkit-linear-gradient(hsla(162, 69%, 22%, 0.79), #070303),
    url("");
  background-repeat: no-repeat;
  background-size: cover;
  background-blend-mode: hard-light;
  height: 100%;
  background-attachment: fixed;

  .page-content {
    background: none !important;

    .error {
      color: red;
      padding: 5px 20px;
    }
    div.login-screen-title {
      color: #ffffff;
    }
    .item-input .item-inner {
      margin-bottom: 10px;
    }
    .item-input .item-inner input {
      color: #ffffff !important;
    }
    .item-title.item-label {
      color: #ffffff;
    }
    a.list-button {
      background: #3b863e;
      color: #ffffff;
    }
    .bottom-btn ul li {
      padding: 0 20px;
      margin-bottom: 20px;
    }
    .item-input-wrap input {
      border-bottom: 1px solid #ffffff;
    }
    li.sign-up {
    }
    li.sign-up a.list-button {
      background: none;
      color: #ffffff;
    }
  }
}
</style>
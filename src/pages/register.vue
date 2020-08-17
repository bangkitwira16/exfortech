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
        <f7-list-input
          label="Confirm Password"
          type="password"
          id="password"
          name="password"
          v-model="confirm_pwd"
          placeholder="Confirm Your password"
          :value="confirm_pwd"
          @input="confirm_pwd = $event.target.value"
        ></f7-list-input>
      </f7-list>

      <div class="error" v-for="error in errors.email">{{error}}</div>
      <div class="error" v-for="error in errors.password">{{error}}</div>
      <f7-list class="bottom-btn">
        <f7-list-button @click="signIn" type="submit" class="sign-up">Sign Up</f7-list-button>
      </f7-list>
    </form>
  </f7-page>
</template>

<script>
export default {
  data() {
    return {
      errors: {
        email: [],
        password: []
      },
      username: "",
      password: "",
      confirm_pwd: "",
      email: "",
      userData: []
    };
  },
  beforeMount() {
    if (localStorage.getItem("users")) {
      // set authenticated userData data from localstorage auth-user item and parse it
      this.userData = JSON.parse(localStorage.getItem("users"));
    }
    console.log("user", this.userData);
  },
  methods: {
    signIn() {
      const self = this;
      const app = self.$f7;
      const router = self.$f7router;
      // call to validate the sigin in input form
      self.checkForm();
      // check if no errors from validate
      if (self.errors.email.length == 0 && self.errors.password.length == 0) {
        // Filter userData that match user input email and password
        let loginMatch = self.userData.filter(function(user) {
          return user.email === self.email && user.password === self.password;
        });
        // Filter email with Users email from localstorage
        let filterEmail = self.userData.filter(function(user) {
          return user.email === self.email;
        });
        // check if there is no user with same email then push to users
        let filterEmailMatch = filterEmail.length;
        if (filterEmailMatch == 0) {
          self.userData.push({
            email: self.email,
            password: self.password,
            roles: 1
          });
          // set new registered item to users
          localStorage.setItem('users', JSON.stringify(self.userData))
          app.dialog.alert(`You have been registered as ${self.email} <br>`, () => {
            router.navigate("/", { reloadCurrent: true });
          });
        }
      }
    },
    checkForm: function(e) {
      this.errors.email = [];
      this.errors.password = [];
      console.log(this.password, this.confirm_pwd);
      if (!this.password) {
        this.errors.password.push("password required");
      }
      if (!this.email) {
        this.errors.email.push("email required.");
      } else if (!this.validEmail(this.email)) {
        this.errors.email.push("Valid email required.");
      } else if (this.password !== this.confirm_pwd) {
        this.errors.password.push("password doesnt match");
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
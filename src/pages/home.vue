<template>
  <f7-page name="home" class="home">
    <!-- Top Navbar -->
    <f7-navbar>
      <f7-nav-title class="home-nav-title">
        <img src="static/img/logo.svg" class="img-fluid logo" alt />
        <span>mr. Cashback</span>
      </f7-nav-title>
      <f7-nav-right>
        <f7-link color="white" popover-open=".popover-menu">
          <f7-icon f7="power"></f7-icon>
        </f7-link>
      </f7-nav-right>
    </f7-navbar>
    <f7-popover class="popover-menu">
      <f7-list>
        <f7-list-item @click="logout" popover-close title="Logout"></f7-list-item>
      </f7-list>
    </f7-popover>
    <!-- Toolbar-->
    <f7-toolbar bottom>
      <div class="btn-cam"></div>
      <f7-link @click="takePicture">
        <img src="static/img/camera.svg" alt srcset class="btn-camera" />
      </f7-link>
      <div></div>
    </f7-toolbar>
    <!-- Page content-->
    <!-- <f7-block strong>
      <img :src="imgData" class="img-upload" alt="">
    </f7-block>-->
    <f7-block strong v-if="imgList.length != 0">
      <f7-card class="img-card" v-for="(img, index) in imgList" :key="index">
        <f7-card-header class="no-border">
          <div class="img-avatar">
            <img
              src="https://cdn.framework7.io/placeholder/people-68x68-1.jpg"
              width="34"
              height="34"
            />
          </div>
          <div class="img-name">{{img.author}}</div>
          <f7-link @click="removeImg(index)" v-if="userData.roles==0" color="red"><f7-icon f7="trash"></f7-icon></f7-link>
        </f7-card-header>
        <f7-card-content :padding="false">
          <img :src="img.image" width="100%" class="main-img" />
        </f7-card-content>
        <!-- <f7-card-footer class="no-border">
          <f7-link>Like</f7-link>
          <f7-link>Comment</f7-link>
          <f7-link>Share</f7-link>
        </f7-card-footer>-->
      </f7-card>
    </f7-block>
    <f7-block strong v-if="imgList.length == 0" class="no-data">
      <f7-icon f7="exclamationmark_triangle" size="72"></f7-icon>
      <h3>No image data</h3>
      <p>No image data in the list, please upload image first from the buttom menu button</p>
    </f7-block>
  </f7-page>
</template>
<script>
import routes from '../js/routes';
export default {
  data: function() {
    return {
      imgData: String,
      imgList: [],
      userData: {}
    };
  },
  beforeMount() {
    if (localStorage.getItem("auth-user")) {
      // set authenticated userData data from localstorage auth-user item and parse it
      this.userData = JSON.parse(localStorage.getItem("auth-user"));
    }
    console.log("user", this.userData);
  },
  mounted() {
    // document.addEventListener("deviceready", onDeviceReady, false);

    if (localStorage.getItem("auth-user")) {
      // set authenticated userData data from localstorage auth-user item and parse it
      this.userData = JSON.parse(localStorage.getItem("auth-user"));
    }
    console.log("user", this.userData);

    if (localStorage.getItem("imgList")) {
      this.imgList = JSON.parse(localStorage.getItem("imgList"));
    }
    this.$f7ready(f7 => {
      if (f7.device.cordova) {
        cordovaApp.init(f7);
        console.log("ready");
      }
    });
  },
  methods: {
    takePicture() {
      const self = this,
        app = self.$f7,
        $ = self.$$;
      document.addEventListener("deviceready", onDeviceReady, false);
      function onDeviceReady() {
        console.log("this", navigator.camera);
        navigator.camera.getPicture(onSuccess, onFail, {
          quality: 50,
          destinationType: Camera.DestinationType.DATA_URL,
          correctOrientation: true
        });

        function onSuccess(imageData) {
          // var image = document.getElementById("myImage");
          self.imgData = "data:image/jpeg;base64," + imageData;
          // image.src = "data:image/jpeg;base64," + imageData;
          self.imgList.push({
            author: self.userData.email,
            image: "data:image/jpeg;base64," + imageData
          });
          console.log("imglist", self.imgList);
          localStorage.setItem("imgList", JSON.stringify(self.imgList));
        }

        function onFail(message) {
          alert("Failed because: " + message);
        }
      }
    },
    removeImg(i) {
      console.log('clicked', i)
      this.imgList.splice(i, 1)
      localStorage.setItem('imgList', JSON.stringify(this.imgList))
    },
    logout() {
      const self = this;
      const app = self.$f7;
      const router = self.$f7router;
      localStorage.removeItem('auth-user')
      app.popover.close()
      router.navigate('/', {reloadCurrent: true})
    }
  }
};
</script>
<style lang="scss">
.page.home {
  background: -webkit-linear-gradient(hsla(162, 69%, 22%, 0.79), #070303),
    url("");
  background-repeat: no-repeat;
  background-size: cover;
  background-blend-mode: hard-light;
  height: 100%;
  background-attachment: fixed;

  .block.no-data {
    h3 {
      font-size: 1.4em;
    }
    margin-top: auto;
    margin-bottom: auto;
    top: 0;
    bottom: 0;
    text-align: center;
    color: #ffffff;
  }
  .page-content {
    display: flex;
  }
  .block.block-strong {
    background: none;
  }
}
.img-upload {
  object-fit: cover;
  max-width: 100%;
  max-height: 400px;
}
.home-nav-title {
  display: flex !important;
  margin-left: auto;
  margin-right: auto;

  img.img-fluid {
    width: 40px;
  }
  span {
    margin-left: 10px;
    margin-top: auto;
    margin-bottom: auto;
    font-size: 1.1em;
  }
}
.toolbar.toolbar-bottom {
  box-shadow: 0px 0px 10px 2px #000 !important;
  background: #00111a !important;
  height: 60px;

  a.link {
    color: #ffffff;
  }
}
img.btn-camera {
  padding: 13px;
  z-index: 99;
  position: fixed;
  width: 64px;
  margin-top: -25px;
  margin-left: auto;
  border: 1px solid #8f8f8f;
  margin-right: auto;
  box-shadow: 0 0 0 0 rgb(100, 116, 112);
  -webkit-animation: pulse 2s infinite;
  border-radius: 50%;
}
.toolbar-inner {
  display: block;
}
.img-card {
  margin-bottom: 25px;
  background: rgba(0, 0, 0, 0.5) !important;
  color: #fff;

  .img-avatar img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  img.main-img {
    height: 300px;
    object-fit: cover;
  }
}
</style>
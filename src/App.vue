<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col-md-6 col-md-offset-3">
          <h3>Vue Resource</h3>
          <div class="form-group">
            <input type="text" class="form-control" v-model="name">
          </div>
          <button class="btn btn-primary" @click="newUser">Kaydet</button>
          <button class="btn btn-success" @click="getUsers">Verileri Getir</button>
          <hr>
          <ul class="list-group">
            <li class="list-group-item" v-for="user in users"> {{user.name}}
              <button class="btn btn-danger" @click="remove(user.id)">Sil</button>
              <button class="btn btn-danger" @click="sil(user.id)">Kendi Sil Resource</button>
              <button class="btn btn-success" @click="update(user.id)">Güncelle</button>
              <button class="btn btn-success" @click="guncelle(user.id)">Kendi Güncelle Resource</button>
            </li>

          </ul>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        name: '',
        users: [],
        resource: {
          sil: {method: 'DELETE', url: 'users{/id}.json'},
          guncelle: {method: 'PUT', url: 'users{/id}.json'}
        }
      }
    },
    methods: {
      newUser() {
        this.$resource("users.json").save({}, {name: this.name})
          .then((response) => {
            console.log("Başarılı Şekilde Kayıt Edildi.");
          })
        /*this.$http.post("users.json",{name: this.name})
          .then((response)=>{
            console.log("Başarılı Şekilde Kayıt Edildi.");
          })*/
      },
      remove(id) {
        let result = confirm("Silmek İstediğiniz emin misiniz ? ");
        if (result) {
          this.$resource("users/" + id + ".json").delete()
            .then(response => {
              console.log("Başarılı Şekilde Silindi.");
            })
        }


        /* this.$http.delete("users/"+id+".json" ,{name:this.name})
           .then(response=>{
             console.log("Başarılı Şekilde Silindi.");
           })*/
      },
      sil(id) {
        this.resource.sil({id: id})
          .then(response => {
            console.log("Başarılı Şekilde Silindi.");
          })
      },
      update(id) {
        this.$resource("users/" + id + ".json").update({}, {name: this.name})
          .then(response => {
            console.log("Başarılı Şekilde Güncellendi.");
          });
        /* this.$http.put("users/"+id+".json" ,{name:this.name})
           .then(response=>{
             console.log("Başarılı Şekilde Güncellendi.");
           })*/
      },
      guncelle(id) {
        this.resource.guncelle({id: id}, {name: this.name})
          .then(response => {
            console.log("Başarılı Şekilde Güncellendi.");
          });
      },
      getUsers() {
        this.$resource("users.json").get()
          .then((response) => {
            let vUsers = [];
            for (let key in response.data) {
              let user = {};
              user.id = key;
              user.name = response.data[key].name;
              vUsers.push(user);
            }
            this.users = vUsers;
          });

        /*this.$http.get("users.json")
          .then((response) => {
            let vUsers = [];
            for (let key in response.data) {
              let user = {};
              user.id = key;
              user.name = response.data[key].name;
              vUsers.push(user);
            }
            this.users = vUsers;
          });*/
      }
    },
    created() {
      this.resource = this.$resource('users{/id}.json', {}, this.resource);
      console.log(this.resource);
    }
  }
</script>

<style>

</style>

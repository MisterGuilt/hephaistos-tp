<template>
  <v-container>
    <v-layout
      text-center
      wrap
    >
    <v-card
      class="mx-auto"
      max-width="400"
      tile
    >
      <v-form v-model="valid">
        <v-container>
          <v-row>
            <v-col
              cols="12"
              md="12"
            >
              <v-text-field
                v-model="email"
                :rules="textRules"
                label="Email"
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="12"
            >
              <v-text-field :type="'password'"
                v-model="password"
                :rules="textRules"
                label="Password"
                required
              ></v-text-field>
            </v-col>
            <v-col class="text-center" cols="12" sm="4">
              <div class="my-2">
                <v-btn color="primary"
                  @click="login"
                >Login</v-btn>
              </div>
            </v-col>
          </v-row>
        </v-container>
        </v-form>
    </v-card>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'HelloWorld',
  data: () => ({
    email: '',
    password: '',
    state: false,
    valid: false,
    textRules: [
      v => !!v || 'input required'
    ]
  }),
  methods: {
    async login () {
      const { email, password } = this
      try {
        const result = await this.axios.post('http://localhost:3000/api/v1/login', {
          email,
          password
        })
        this.user = result.data
        this.loggedIn = true
      } catch (err) {
        this.errorLogin = err
      }
    }
  }
}
</script>

<template>
  <v-container>
      <v-row dense justify="center" align="center">
          <v-col cols="12" xs="8" sm="5" md="6">
            <Card :loading="loading">
              <template v-slot:title>
                Iniciar sesión
              </template>

              <template v-slot:text>
                <v-row dense>
                  <v-col cols=12>
                    <v-text-field
                      v-model="email"
                      label="Email"
                      rounded="0"
                      variant="outlined"
                      density="comfortable"
                      hide-details
                    />
                  </v-col>

                  <v-col cols=12>
                    <v-text-field
                      v-model="password"
                      label="Contraseña"
                      rounded="0"
                      variant="outlined"
                      density="comfortable"
                      hide-details
                    />
                  </v-col>
                </v-row>
              </template>

              <template v-slot:actions>
                <v-spacer/>
                 
                <v-btn
                  variant="flat"
                  color="success"
                  @click="authenticate()"
                >
                  Acceder
                </v-btn>
              </template>
            </Card>
          </v-col>
      </v-row>
  </v-container>
</template>

<script lang="ts">
import Handler from '@/handlers/Handler';
import { SingleItem } from '@/handlers/interfaces/ContentUI';
import Session from '@/models/Session';
import AuthService from '@/services/AuthService';
import { useAppStore } from '@/stores/app';

export default defineComponent({
  data() {
    return {
      router: useRouter(),
      store: useAppStore(),
      loading: false,
      email: "",
      password: "",
    }
  },

  methods: {
    async authenticate() {
      let session: SingleItem<Session> = { item: {} }

      await Handler.getItem(this, session, () =>
        AuthService.login(this, this.email, this.password)
      )

      if (session.item.token) {
        this.store.setSession(session.item)
        this.store.saveSession()
        this.router.push("/")
      } else {
        // TODO: failed login message
      }
    }
  }
})
</script>
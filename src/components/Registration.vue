<template>
  <v-stepper v-model="e1">
    <div class="text-xs-center" mt-5>
      <h1>Registrasi Mahasiswa Baru</h1>
    </div>
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">Data Personal</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="e1 > 2" step="2">Data Alamat & Sekolah</v-stepper-step>
    </v-stepper-header>
    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card color="grey lighten-5" class="mb-5">
          <v-flex xs12 sm8 offset-sm2 mt-2>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="formData.no_daftar"
                :rules="noDaftarRules"
                label="No. Daftar"
                required
              ></v-text-field>
              <v-text-field
                v-model="formData.nama"
                :rules="namaRules"
                label="Nama Lengkap"
                required
              ></v-text-field>
              <v-text-field
                v-model="formData.nama_singkat"
                :rules="nameSingkatRules"
                label="Nama Singkat"
                required
              ></v-text-field>
              <v-text-field
                v-model="formData.email"
                :rules="emailRules"
                label="Email"
                required
              ></v-text-field>
              <v-text-field
                v-model="formData.phone"
                :rules="phoneRules"
                label="No. HP"
                required
              ></v-text-field>
              <v-radio-group v-model="formData.gender" label="Gender">
                <v-radio
                  label="Laki-laki"
                  value="1"
                ></v-radio>
                <v-radio
                  label="Perempuan"
                  value="2"
                ></v-radio>
              </v-radio-group>
              <v-text-field
                v-model="formData.tempat_lahir"
                :rules="tempatLahirRules"
                label="Tempat Lahir"
                required
              ></v-text-field>
              <v-menu
                :close-on-content-click="false"
                v-model="menu2"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  v-model="formData.tanggal_lahir"
                  :rules="tanggalLahirRules"
                  label="Tanggal Lahir"
                  hint="DD-MM-YYYY format"
                  persistent-hint
                  prepend-icon="event"
                  readonly
                  required
                ></v-text-field>
                <v-date-picker :max="currentDate" v-model="date" no-title @input="menu2 = false"></v-date-picker>
              </v-menu>
              <v-select
                :items="itemsAgama"
                v-model="formData.agama"
                label="Agama"
                single-line
                required
                :rules="agamaRules"
                item-text="nama"
                item-value="id"
              ></v-select>
            </v-form>
          </v-flex>
        </v-card>
        <v-btn color="primary" @click.native="e1 = 2" :disabled="!valid">Continue</v-btn>
        <v-btn flat>Cancel</v-btn>
      </v-stepper-content>
      <v-stepper-content step="2">
        <v-card color="grey lighten-5" class="mb-5">
          <v-flex xs12 sm8 offset-sm2 mt-2>
            <v-form v-model="valid" lazy-validation>
              <v-select
                :items="itemsProvinsi"
                v-model="formData.provinsi"
                label="Provinsi"
                single-line
                required
                :rules="provinsiRules"
                item-text="nama"
                item-value="id"
              ></v-select>
              <v-select
                :items="itemsKabupaten"
                v-model="formData.kabupaten"
                label="Kabupaten"
                single-line
                required
                :rules="kabupatenRules"
                item-text="nama"
                item-value="id"
              ></v-select>
              <v-select
                :items="itemsKecamatan"
                v-model="formData.kecamatan"
                label="Kecamatan"
                single-line
                required
                :rules="kecamatanRules"
                item-text="nama"
                item-value="id"
              ></v-select>
              <v-text-field
                v-model="formData.alamat"
                label="Alamat"
                :rules="alamatRules"
                multi-line
                required
              ></v-text-field>
              <v-text-field
                v-model="formData.pos"
                label="Kode POS"
                :rules="posRules"
                required
              ></v-text-field>
              <v-text-field
                v-model="formData.asal_sekolah"
                label="Asal Sekolah"
                :rules="asalSekolahRules"
                required
              ></v-text-field>
              <v-select
                :items="itemsJurusan"
                v-model="formData.jurusan_sekolah"
                label="Jurusan Sekolah"
                single-line
                required
                :rules="jurusanSekolahRules"
                item-text="nama"
                item-value="id"
              ></v-select>
              <v-text-field
                v-model="formData.jumlah_un"
                label="Jumlah Nilai UN"
                :rules="jumlahUnRules"
                required
              ></v-text-field>
            </v-form>
          </v-flex>
        </v-card>
        <v-btn flat @click.native="e1 = 1">Previous</v-btn>
        <v-btn color="primary" @click="submit" :disabled="!valid">Selesai</v-btn>
        <v-btn flat>Cancel</v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    data: () => ({
      formData: {
        no_daftar: '',
        nama: '',
        nama_singkat: '',
        phone: '',
        gender: '',
        tempat_lahir: '',
        tanggal_lahir: '',
        email: '',
        agama: '',
        provinsi: '',
        alamat: '',
        pos: '',
        jurusan_sekolah: '',
        asal_sekolah: '',
        jumlah_un: '',
        kabupaten: '',
        kecamatan: '',
      },
      e1: 0,
      currentDate: new Date().toISOString().substr(0, 10),
      valid: false,
      noDaftarRules: [
        v => !!v || 'No daftar is required',
      ],
      date: null,
      menu2: false,
      namaRules: [
        v => !!v || 'nama is required',
      ],
      nameSingkatRules: [
        v => !!v || 'nama_singkat is required',
      ],
      phoneRules: [
        v => !!v || 'phone is required',
      ],
      genderRules: [
        v => !!v || 'Gender is required',
      ],
      tempatLahirRules: [
        v => !!v || 'tempat_lahir is required',
      ],
      tanggalLahirRules: [
        v => !!v || 'tanggal_lahir is required',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid',
      ],
      select: null,
      agamaRules: [
        v => !!v || 'E-mail is required',
      ],
      itemsAgama: [
        { nama: 'Islam', id: '1' },
        { nama: 'Katolik', id: '2' },
        { nama: 'Protestan', id: '3' },
        { nama: 'Hindu', id: '4' },
        { nama: 'Budha', id: '5' },
        { nama: 'Konghucu', id: '6' },
      ],
      provinsiRules: [
        v => !!v || 'Provinsi is required',
      ],
      itemsProvinsi: [
        { nama: 'Jakarta', id: '1' },
        { nama: 'Jawa Barat', id: '2' },
        { nama: 'Sumatra Utara', id: '3' },
        { nama: 'Kalimantan Barat', id: '4' },
        { nama: 'Sulawesi Selatan', id: '5' },
        { nama: 'Maluku Uatara', id: '6' },
      ],
      alamatRules: [
        v => !!v || 'Alamat is required',
      ],
      posRules: [
        v => !!v || 'Kode POS is required',
      ],
      jurusanSekolahRules: [
        v => !!v || 'Jurusan sekolah is required',
      ],
      itemsJurusan: [
        { nama: 'IPA', id: '1' },
        { nama: 'IPS', id: '2' },
        { nama: 'Bahasa', id: '3' },
        { nama: 'Otomotif', id: '4' },
      ],
      asalSekolahRules: [
        v => !!v || 'Asal sekolah is required',
      ],
      jumlahUnRules: [
        v => !!v || 'jumlah_un is required',
      ],
      kabupatenRules: [
        v => !!v || 'Kabupaten is required',
      ],
      itemsKabupaten: [
        { nama: 'Kebumen', id: '1' },
        { nama: 'Bandung Barat', id: '2' },
        { nama: 'Langkat', id: '3' },
        { nama: 'Jakarta Utara', id: '4' },
        { nama: 'Tangerang Selatan', id: '5' },
        { nama: 'Malang', id: '6' },
      ],
      kecamatanRules: [
        v => !!v || 'Kecamatan is required',
      ],
      itemsKecamatan: [
        { nama: 'Kecamatan 1', id: '1' },
        { nama: 'Kecamatan 2', id: '2' },
        { nama: 'Kecamatan 3', id: '3' },
        { nama: 'Kecamatan 4', id: '4' },
        { nama: 'Kecamatan 5', id: '5' },
        { nama: 'Kecamatan 6', id: '6' },
      ],
    }),
    computed: {
      ...mapGetters(['isAuthenticated', 'authStatus', 'errorMessage', 'isRegister']),
      computedDateFormatted() {
        return this.formatDate(this.date);
      },
    },
    watch: {
      date() {
        this.formData.tanggal_lahir = this.formatDate(this.date);
      },
    },
    methods: {
      submit() {
        if (this.$refs.form.validate()) {
          // Native form submission is not yet supported
          // axios.post('/api/submit', {
          //   name: this.name,
          //   email: this.email,
          //   select: this.select,
          //   checkbox: this.checkbox,
          // });
        }
      },
      clear() {
        this.$refs.form.reset();
      },
      formatDate(date) {
        if (!date) return null;

        const [year, month, day] = date.split('-');
        return `${day}-${month}-${year}`;
      },
      parseDate(date) {
        if (!date) return null;

        const [month, day, year] = date.split('/');
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.form-container {
  margin-top: 25%;
}
</style>

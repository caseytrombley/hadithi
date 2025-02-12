<template>
  <div class="container">
    <div class="row">

      <base-loader v-if="loading" block large />

      <div>
        <h6>Page {{ page }} of {{ pages }}</h6>
      </div>
      <div class="pdf-wrapper">
        <em class="bi bi-arrow-left-square-fill" @click="scroll('up')"></em>
        <pdf
            v-if="('location' in pdf)"
            class="w-100 px-2"
            :resize="true"
            :src="getImageKitUrl(pdf.locationPath)"
            :page="page"
            :annotation="true"
            @numpages="setNumberPages"
        >
          <slot name="loading"> loading content here...</slot>
        </pdf>
        <em
            class="bi bi-arrow-right-square-fill"
            @click="scroll('down')" />
      </div>
    </div>
  </div>
</template>

<script>
import pdf from "pdfvuer";
import BaseLoader from "@/components/base/BaseLoader";
import { getImageKitUrl } from "@/utils/ImageKitUtil";

export default {
  name: "PdfItem",
  components: {
    BaseLoader,
    pdf,
  },
  props: {
    pdf: {
      type: Object,
      default: () => ({
        id: null,
        location: null,
      }),
    },
    category: {
      type: String
    }
  },
  data() {
    return {
      loading: true,
      page: 1,
      pages: 0,
    };
  },
  created() {
    window.addEventListener('keyup', (e) => {
      if (e.keyCode === 37) {
        this.scroll('up')
      }
      if (e.keyCode === 39) {
        this.scroll('down')
      }
    });
  },
  methods: {
    getImageKitUrl,
    setNumberPages(pages) {
      this.pages = pages;
      this.loading = false;
    },
    scroll(direction) {
      if (direction === "up" && this.page !== 1) {
        this.page--;
      }
      if (direction === "down" && this.page < this.pages) {
        this.page++;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.pdf-wrapper {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 2rem;
  box-shadow: 0 1rem 3rem rgba(0,0,0,.175);
  border: 1px solid #dee2e6;
  border-radius: 8px;
  overflow: hidden;
}

.bi {
  font-size: 2rem;
  cursor: pointer;
}
</style>

<template v-cloak>
  <layout-read @clickPrint="handlePrint" :is-loading="loading">
    <template #body>
      <pdf-item :category="category" :pdf="pdfItem" :key="reloadKey" />
    </template>
    <template #comments>
      <comments-box :resource-category="category" :resource-id="pdfItem.id" v-if="('id' in pdfItem)" />
    </template>
  </layout-read>
</template>

<script>
import LayoutRead from "@/views/layouts/LayoutRead";
import CommentsBox from "@/components/CommentsBox";
import PdfItem from "@/components/PdfItem";
import BooksService from "@/services/BooksService";
import { downloadPdfWithWatermark } from "@/utils/PdfUtil";

export default {
  name: "ReadBook",
  components: {
    CommentsBox,
    LayoutRead,
    PdfItem
  },
  data() {
    return {
      pdfItem: {},
      loading: false,
      reloadKey: 0,
      category: "books"
    };
  },
  async mounted() {
    this.loading = true;
    this.pdfItem = await this.getItem();
    this.loading = false;
    this.reloadKey++;
  },
  methods: {
    async getItem() {
      const bookId = this.$route.params.bookId;
      return BooksService.getBook(bookId);
    },
    async handlePrint() {
      const watermark = "hadithi.co";
      const downloadFileName = this.pdfItem.title.replaceAll(". ", "");
      await downloadPdfWithWatermark(this.pdfItem.location, watermark, downloadFileName);
    }
  }
};
</script>
<style lang="scss" scoped>
[v-cloak] {
  display: none
}
</style>

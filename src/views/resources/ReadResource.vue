<template v-cloak>
  <layout-read @clickPrint="handlePrint" :is-loading="loading">
    <template #body>
      <h1 v-if="pdfItem.title">{{ pdfItem.title }}</h1>
      <pdf-item :category="category" :pdf="pdfItem" :key="reloadKey" />
    </template>
    <template #comments>
      <comments-box :resource-category="category" :resource-id="pdfItem.id" v-if="('id' in pdfItem)"/>
    </template>
  </layout-read>
</template>

<script>
import LayoutRead from "@/views/layouts/LayoutRead";
import PdfItem from "@/components/PdfItem";
import ResourceService from "@/services/ResourcesService";
import { downloadPdfWithWatermark } from "@/utils/PdfUtil";
import CommentsBox from "@/components/CommentsBox";

export default {
  name: "ReadResource",
  components: {
    LayoutRead,
    PdfItem,
    CommentsBox
  },
  data() {
    return {
      pdfItem: {},
      loading: false,
      reloadKey: 0,
      category: "resources"
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
      const resourceId = this.$route.params.resourceId;
      return ResourceService.getResource(resourceId);
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

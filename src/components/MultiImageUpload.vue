<template>
  <div>
    <div
      class="mb-3 alert alert-warning d-flex align-items-center"
      role="alert"
    >
      <i class="bi bi-exclamation-triangle-fill"></i> &nbsp; Max of
      <strong>&nbsp;{{ maxImages }}&nbsp;</strong> Images
    </div>
    <vue-upload-multiple-image
      @upload-success="uploadImageSuccess"
      @limit-exceeded="limitExceeded"
      @before-remove="beforeRemove"
      drag-text="Drag images (multiple)"
      browse-text="(or) Select"
      primary-text="Default"
      mark-is-primary-text="Set as default"
      popup-text="This image will be displayed as default"
      drop-text="Drop your files here"
      :data-images="images"
      :max-image="maxImages"
      :show-primary="showPrimary"
      :show-edit="showEdit"
      :show-delete="showDelete"
    />
  </div>
</template>
<script>
import VueUploadMultipleImage from "vue-upload-multiple-image";
import StorageService from "@/services/StorageService";

export default {
  name: "MultiImageUpload",
  components: {
    VueUploadMultipleImage
  },
  props: {
    showPrimary: {
      type: Boolean,
      default: false
    },
    showEdit: {
      type: Boolean,
      default: false
    },
    showDelete: {
      type: Boolean,
      default: true
    },
    maxImagesSize: {
      type: Number,
      default: 209715200 //200MB
    },
    maxImages: {
      type: Number,
      default: 30
    },
    uploadedImages: {
      type: Array,
      default: () => []
    },
    dataSet: {
      type: String
    },
    storagePath: {
      type: String
    }
  },
  data() {
    return {
      images: [],
      localImages: this.uploadedImages
    };
  },
  mounted() {
    this.setImages(this.localImages);
  },
  methods: {
    setImages(images) {
      this.images = images.map((image) => ({
        path: image.imageUrl,
        default: 1,
        highlight: 1
      }));
    },
    async uploadImageSuccess(formData, index, fileList) {
      const file = fileList[index];
      const fileName = file.name;
      const filePath = `${this.storagePath}/${fileName}`;
      const newFile = await this.dataToFile(file.path, fileName);
      const fileUrl = await StorageService.uploadFile(this.storagePath, newFile);
      this.localImages.push({ imagePath: filePath, imageUrl: fileUrl });
      this.handleUpload();
      this.$toast.info(`Done uploading..: ${fileName}`);
    },
    async beforeRemove(index, done) {
      if (window.confirm("Delete! Are you sure?") === true) {
        const localImage = this.localImages[index];
        const filePath = localImage.imagePath;
        if (filePath !== null) {
          const fileName = filePath.split("\\").pop().split("/").pop();
          await StorageService.deleteFile(filePath);
          this.localImages = this.localImages.filter(
            (item) => item.imagePath !== filePath
          );
          this.handleUpload();
          this.$toast.error(`Done deleting..: ${fileName}`);
          done();
        }

        if (filePath === null) {
          this.$toast.error(`Image cannot be deleted!`);
        }
      }
    },
    limitExceeded(amount) {
      if (amount > this.maxImagesSize) {
        const exceededLimit = amount - this.maxImagesSize;
        const formattedBytes = this.formatBytes(exceededLimit);

        this.$toast.error(`Upload limit exceeded by..: ${formattedBytes}`);
      }
    },
    formatBytes(bytes, decimals = 2) {
      if (bytes === 0) return "0 Bytes";

      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

      const i = Math.floor(Math.log(bytes) / Math.log(k));

      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    },
    handleUpload() {
      this.$emit("handleUpload", {
        key: this.dataSet,
        values: this.localImages
      });
    },
    async dataToFile(dataURI, fileName) {
      const byteString = atob(dataURI.split(",")[1]);
      // separate out the mime component
      const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
      // write the bytes of the string to an ArrayBuffer
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new File([ab], fileName, { type: mimeString });
    }
  }
};
</script>

<template>
  <div id="document-item" class="document-item">
    <div class="container">
      <div class="section-title aos-init aos-animate" data-aos="zoom-out">
        <h2>{{ documentType }}</h2>
        <p>
          {{ document['title'] }}
          <span v-if="unpublished">(draft)</span>
          <label-tag v-if="document['isFree']">Free</label-tag>
        </p>
      </div>
      <div class="row content aos-init aos-animate" data-aos="fade-up">
        <div class="preview">
          <Ellipsis v-if="useEllipsis" :content="document['note']" :lines="2"/>
          <p v-else v-html="filterDocumentText(document['note'])"></p>
          <div class="preview-footer">
            <document-menu :document="document" @handleEvent="handleEvent" :permissions="permissions"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import LabelTag from "@/components/LabelTag";
import DocumentMenu from "@/components/menus/DocumentMenu";
import Ellipsis from "@/components/Ellipsis";

export default {
  name: "DocumentItem",
  components: {
    DocumentMenu,
    Ellipsis,
    LabelTag
  },
  props: {
    loggedIn: {
      default: false,
    },
    documentType: {
      type: String
    },
    document: {
      type: Object,
    },
    displayLimit: {
      type: Number,
      default: 300,
    },
    permissions: {
      type: Object,
    },
    useEllipsis:{
      type: Boolean,
      default: false
    }
  },
  computed: {
    unpublished: function () {
      return !this.document.published;
    },
  },
  methods: {
    handleEvent(eventName) {
      this.$emit(eventName, this.document);
    },
    filterDocumentText(arg) {
      const edited = arg.split('<p><br></p>').join('');
      return edited.substring(0, this.displayLimit) + " ...";
    }
  },
};
</script>
<style lang="scss" scoped>
@import "@/scss/_variables.scss";
.document-item {
  padding-top: 80px;
  margin-top: -1px;
}

.document-item .content h3 {
  font-weight: 600;
  font-size: 26px;
}

.document-item .content ul {
  list-style: none;
  padding: 0;
}

.document-item .content ul li {
  padding-left: 38px;
  position: relative;
}

.document-item .content ul li+li {
  margin-top: 10px;
}

.document-item .content ul i {
  position: absolute;
  left: 0;
  top: 0;
  font-size: 28px;
  color: $orange;
  line-height: 1;
}

.document-item .content p:last-child {
  margin-bottom: 0;
}

.document-item .content .btn-learn-more {
  font-family: "Raleway", sans-serif;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 1px;
  display: inline-block;
  padding: 12px 32px;
  border-radius: 5px;
  transition: 0.3s;
  line-height: 1;
  color: $orange;
  -webkit-animation-delay: 0.8s;
  animation-delay: 0.8s;
  margin-top: 6px;
  border: 2px solid $orange;
  text-decoration: none;
}

.document-item .content .btn-learn-more:hover {
  background: $orange;
  color: $white;
  text-decoration: none;
}
</style>

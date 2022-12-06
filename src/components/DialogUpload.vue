<template>
  <div class="dialog-upload">
    <div class="title">{{ mainTitle }}</div>
    <div class="subTitle">{{ subTitle }}</div>
    <el-upload
      action="/okc-operation/reservation/pic/upload"
      name="picture"
      list-type="picture-card"
      :limit="limit"
      :file-list="fileList"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="onSuccess"
      :on-error="onError"
      :class="{ 'upload-preview': fileList.length >= limit }"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog
      :visible.sync="dialogVisible"
      width="60%"
      top="8vh"
      append-to-body
    >
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "dialog-upload",
  data() {
    return {
      fileList: [],
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  props: {
    mainTitle: String,
    subTitle: String,
    limit: {
      type: Number,
      default: 1,
    },
    value: [String, Array],
  },
  model: {
    prop: "value",
    event: "change",
  },
  watch: {
    value: {
      handler(val) {
        if (!val) {
          this.fileList = [];
          return;
        }
        if (typeof val === "string") {
          this.fileList = [
            {
              url: val,
            },
          ];
        } else if (Array.isArray(this.fileList)) {
          this.fileList = val;
        }
      },
      immediate: true,
    },
  },
  mounted() {},
  methods: {
    handleRemove(file, fileList) {
      // console.log(file, fileList);
      this.fileList = fileList;
    },
    handlePictureCardPreview(file) {
      // console.log(file);
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    onSuccess(res, file, fileList) {
      this.fileList = fileList;
      this.$emit("change", res.message);
    },
    onError(err, file, fileList) {
      this.tipMessage(`文件上传失败:${err.status}`, "error");
    },
  },
};
</script>
<style lang="less" scoped>
.dialog-upload {
  .title {
    height: 24px;
    line-height: 24px;
    font-size: 20px;
    font-weight: 600;
  }
  .subTitle {
    font-size: 16px;
    line-height: 1;
    margin-top: 10px;
  }
  .upload-preview {
    /deep/ .el-upload {
      display: none;
    }
  }
  /deep/ .el-upload-list--picture-card .el-upload-list__item {
    width: 100%;
    height: auto;
    margin: 10px 0 0 0;
    img {
      float: left;
    }
  }
  /deep/ .el-upload {
    position: relative;
    width: 50%;
    height: 0;
    padding-bottom: 50%;
    margin-top: 10px;
  }
  /deep/ .el-upload--picture-card i {
    position: absolute;
    top: calc(50% - 14px);
    left: calc(50% - 14px);
  }
  /deep/
    .el-upload-list--picture-card.is-disabled
    + .el-upload--picture-card
    i {
    display: none;
  }
}
</style>

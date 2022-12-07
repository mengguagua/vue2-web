<template>
  <div class="dialog-form-items">
    <el-row>
      <el-col
        v-for="(formItem, i) in dialogFormList"
        :key="i"
        :span="formItem.span || 11"
        :offset="formItem.offset"
      >
        <div class="gap" v-if="formItem.type == 'gap'"></div>
        <el-form-item
          v-else
          v-show="formItem.show || formItem.show === 0 ? formItem.show : true"
          :label="formItem.label + ':'"
          :prop="formItem.name"
        >
          <el-select
            v-if="formItem.type == 'select'"
            v-model="dialogData[formItem.name]"
            :placeholder="formItem.placeholder || ''"
            :filterable="formItem.filterable"
            :clearable="formItem.filterable || formItem.clearable"
            :disabled="formItem.disabled"
            size="small"
            @change="selectChange"
            :data-formItem="formItem"
            ref="elSelect"
          >
            <el-option
              v-for="optionItem in formItem.options"
              :key="optionItem.value || optionItem.code"
              :label="optionItem.label || optionItem.name"
              :value="optionItem.value || optionItem.code"
            >
            </el-option>
          </el-select>
          <el-select
            v-else-if="formItem.type == 'selectRemote'"
            v-model="dialogData[formItem.name]"
            filterable
            remote
            reserve-keyword
            :placeholder="formItem.placeholder || ''"
            :remote-method="formItem.remoteMethod"
            :loading="formItem.loading || false"
            :disabled="formItem.disabled"
            size="small"
          >
            <el-option
              v-for="optionItem in formItem.options"
              :key="optionItem.value || optionItem.code"
              :label="optionItem.label || optionItem.name"
              :value="optionItem.value || optionItem.code"
            >
            </el-option>
          </el-select>
          <el-autocomplete
            v-else-if="formItem.type == 'autocomplete'"
            v-model="dialogData[formItem.name]"
            :fetch-suggestions="formItem.remoteMethod"
            @select="formItem.handleSelect"
            :placeholder="formItem.placeholder || ''"
            :disabled="formItem.disabled"
            size="small"
          ></el-autocomplete>
          <el-date-picker
            v-else-if="formItem.type == 'datePicker'"
            v-model="dialogData[formItem.name]"
            :type="formItem.dataType || 'date'"
            value-format="yyyy-MM-dd"
            :placeholder="formItem.placeholder || ''"
            :disabled="formItem.disabled"
            size="small"
          >
          </el-date-picker>
          <el-input
            v-else
            v-model="dialogData[formItem.name]"
            :placeholder="formItem.placeholder || ''"
            :disabled="formItem.disabled"
            size="small"
          >
            <template slot="append" v-if="formItem.appendText">
              {{ formItem.appendText }}
            </template>
            <template slot="append" v-if="formItem.appendBtnText">
              <el-button slot="append" @click="doClick(formItem)">{{formItem.appendBtnText}}</el-button>
            </template>
          </el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "dialog-form-items",
  data() {
    return {};
  },
  props: {
    dialogFormList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    dialogData: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  mounted() {
  },
  created() {},
  methods: {
    doClick(formItem) {
      this.$emit("doClick", formItem);
    },
    selectChange(value) {
      // console.log(this);
      let nodeItems = this.$refs['elSelect'];
      this.$emit("selectChange",value, nodeItems);
    }
  },
};
</script>
<style lang="less" scoped>
.gap {
  height: 40px;
}
/deep/ .el-form-item__content {
  height: 40px;
  .el-select {
    width: 100%;
  }
  .el-autocomplete {
    width: 100%;
  }
  .el-date-editor {
    width: 100%;
    .el-range-separator {
      padding: 0;
    }
  }
}
/deep/ .el-input.is-disabled .el-input__inner {
  color: #888;
}
</style>

<!--关联企业登记-->
<template lang="pug">
  div.top-content
    //- table-search(@submit="search")
    search-group(lableWidth="100" :need-reset="true" @submit="search" @reset="reset")
      div(slot="condition")
        el-form-item(label="企业名称")
          el-input(v-model="formData.companyName" size="small" placeholder="请输入" clearable)
        el-form-item(label="组织机构代码")
          el-input(v-model="formData.orgCode" size="small" placeholder="请输入" clearable)
        el-form-item(label="组织机构代码")
          el-input(v-model="formData.orgCode" size="small" placeholder="请输入" clearable)
        el-form-item(label="组织机构代码")
          el-input(v-model="formData.orgCode" size="small" placeholder="请输入" clearable)
        el-form-item(label="组织机构代码")
          el-input(v-model="formData.orgCode" size="small" placeholder="请输入" clearable)
        el-form-item(label="组织机构代码")
          el-input(v-model="formData.orgCode" size="small" placeholder="请输入" clearable)
    easy-table(
      :tableLoading="loading"
      :columns="tableColumns"
      :headerStyle="{background: '#f4f4f4'}"
      :data="tableData"
      @load-more="loadMore"
      :show-load-more="true"
      @current-change="(currentRow) => { selectedRow = currentRow }"
      ref="table"
    )
      el-button(type="primary" @click="addHandler()" size="small" icon="el-icon-plus") 新增
      el-button(type="primary" :disabled="selectedRow === null" @click="deleteHandler" size="small" icon="el-icon-minus") 删除
      el-button(type="primary" :disabled="selectedRow === null" @click="editHandler" size="small") 修改
    el-dialog(:visible.sync="dialogVisible" :title="type === 'add' ? '关联企业信息新增' : '关联企业信息修改'" :close-on-click-modal="false" width="55%" :show-close="false")
      div.dialog-top
        el-form(ref="form" :model="dialogFormData" :rules="rules")
          el-row(:gutter="10")
            el-col(:span="12")
              el-form-item(label="企业名称" :label-width="formLabelWidth" prop="companyName")
                el-input(v-model="dialogFormData.companyName" size="small")
            el-col(:span="12")
              el-form-item(label="统一社会信用代码" :label-width="formLabelWidth" prop="etpsSccd")
                el-input(v-model="dialogFormData.etpsSccd" size="small")
            el-col(:span="12")
              el-form-item(label="海关十位代码" :label-width="formLabelWidth")
                el-input(v-model="dialogFormData.companyCode" size="small")
                  el-button(size="mini" type="primary" slot="append" icon="el-icon-search" @click="searchCode") 查询
            el-col(:span="12")
              el-form-item(label="所属关区" :label-width="formLabelWidth")
                el-select.long(v-model="dialogFormData.customsCode" size="small" placeholder="请选择" filterable)
                  el-option( v-for="(item, index) in entryAndExitOptions" :key="index" :label="item.label" :value="item.value")
            el-col(:span="12")
              el-form-item(label="是否特殊区域企业" :label-width="formLabelWidth" prop="isSpecialBusiness")
                el-select.long(v-model="dialogFormData.isSpecialBusiness" size="small" placeholder="请选择" @change="changeRule")
                  el-option( v-for="(value, key, index) in truthOptions" :key="index" :label="value" :value="key")
            el-col(:span="12")
              el-form-item(label="企业类型" :label-width="formLabelWidth" prop="companyType")
                el-select.long(v-model="dialogFormData.companyType" size="small" placeholder="请选择")
                  el-option( v-for="(item, index) in companyTypeOptions" :key="index" :label="item.label" :value="item.value")
            el-col(:span="24")
              el-form-item(label="注册地址" :label-width="formLabelWidth" prop="registerAddress")
                el-input(v-model="dialogFormData.registerAddress" size="small")
            el-col(:span="24")
              el-form-item(label="经营地址" :label-width="formLabelWidth" prop="businessAddress")
                el-input(v-model="dialogFormData.businessAddress" size="small")
            el-col(:span="12")
              el-form-item(label="企业法人" :label-width="formLabelWidth" prop="legalMan")
                el-input(v-model="dialogFormData.legalMan" size="small")
            el-col(:span="12")
              el-form-item(label="法人证件号码" :label-width="formLabelWidth")
                el-input(v-model="dialogFormData.legalCardNumber" size="small")
          el-row(:gutter="10")
            el-col(:span="12")
              el-form-item(label="业务联系人" :label-width="formLabelWidth" prop="linkMan")
                el-input(v-model="dialogFormData.linkMan" size="small")
            el-col(:span="12")
              el-form-item(label="联系电话" :label-width="formLabelWidth" prop="phone")
                el-input(v-model="dialogFormData.phone" size="small")
            el-col(:span="24")
              el-form-item(label="涉及电商平台名称" :label-width="formLabelWidth")
                el-input(v-model="dialogFormData.ebpNames" size="small")
            el-col(:span="24")
              el-form-item(label="备注" :label-width="formLabelWidth")
                el-input(v-model="dialogFormData.rmk" size="small")
          span.title 股东信息
          el-divider
          div(v-for="(item,index) in shareHolderRow" :key="index")
            el-row(:gutter="10")
              el-col(:span="12")
                el-form-item(label="股东名称" :label-width="shortLabelWidth" prop="shareholderName")
                  el-input(v-model="item['shareholderName']" size="small")
              el-col(:span="12")
                el-form-item(label="证件类型" :label-width="shortLabelWidth" prop="cardType")
                  el-select.long(v-model="item['cardType']" size="small" placeholder="请选择")
                    el-option( v-for="(value, key, index) in cardTypeOptions" :key="index" :label="value" :value="key")
            el-row(:gutter="10")
              el-col(:span="12")
                el-form-item(label="证件号码" :label-width="shortLabelWidth" prop="cardNumber")
                  el-input(v-model="item['cardNumber']" size="small")
              el-col(:span="12")
                el-form-item
                  el-button.left-space(@click="addShareHolderRow", :loading="loading" type="primary" size="small" icon="el-icon-plus")
                  el-button.left-space(@click="deleteShareHolderRow(item, index)", :loading="loading" type="danger" size="small" icon="el-icon-minus" :disabled="shareHolderRow.length === 1")
                  el-button.left-space(@click="saveShareHolderRow(item)", :loading="loading" type="primary" size="small") 保存
            el-divider(v-if="shareHolderRow.length-1 !== index")
        div.footer(slot="footer")
          el-button(@click="cancel" size="small") 关 闭
          el-button(type="primary" @click="throttleSave" size="small") 确 定
</template>

<script>
import {
  aa, bb
} from '@/service/interface';
export default {
  data() {
    return {
      companyType: '',
      type: 'add',
      shortLabelWidth: '70px',
      formLabelWidth: '140px',
      selectedRow: null,
      dialogVisible: false,
      loading: false,
      dialogFormData: {
        etpsSccd: '',
        companyName: '',
        registerAddress: '',
        businessAddress: '111',
        legalMan: '',
        legalCardNumber: '',
        legalPhone: '',
        linkMan: '',
        phone: '',
        ebpNames: '',
        isSpecialBusiness: '',
        companyCode: '',
        customsCode: '',
        specialBusinessType: '',
      },
      rules: {},
      formData: {
        companyName: '',
        orgCode: '',
      },
      shareHolderRow: [
        {}
      ],
      truthOptions: {
        1: '是',
        0: '否',
      },
      cardTypeOptions: {
        100001: '身份证',
        100002: '军人证',
        100003: '护照',
        100004: '户口本',
        100005: '外国人永久居留证',
        100016: '港澳居民来往内地通行证',
        100017: '台湾居民来往大陆通行证',
        100018: '其他证件类型',
      },
      tableData: [
        {companyName: 'AA'},
        {companyName: 'BB'},
        {companyName: 'BB'},
        {companyName: 'BB'},
        {companyName: 'BB'},
        {companyName: 'BB'},
        {companyName: 'BB'},
        {companyName: 'BB'},
        {companyName: 'CC'},
        {companyName: 'DD'},
        {companyName: 'EE'},
        {companyName: 'BB'},
        {companyName: 'BB'},
      ],
      tableColumns: [
        {
          name: 'companyName',
          title: '字段1',
        },
        {
          name: 'etpsSccd',
          title: '字段1',
        },
        {
          name: 'linkMan',
          title: '字段1',
        },
        {
          name: 'phone',
          title: '字段1',
        },
        {
          name: 'isSpecialBusiness',
          title: '字段1',
          formatter(row, column, cellValue) {
            let specialBusiness = {
              1: '是',
              0: '否',
            };
            return specialBusiness[cellValue];
          },
        },
        {
          name: 'companyCode',
          title: '字段1',
        },
        {
          name: 'companyTypeName',
          title: '字段1',
        },
        {
          name: 'modifyTime',
          title: '字段1',
        },
      ],
    };
  },
  methods: {
    searchCode() {
      if (this.dialogFormData.companyCode) {
        aa(this.dialogFormData.companyCode).then((resp) => {
          this.dialogFormData.registerAddress = resp.registerAddress;
          this.dialogFormData.companyName = resp.companyName;
          this.dialogFormData.companyCode = resp.companyCode;
          this.dialogFormData.etpsSccd = resp.etpsSccd;
          this.dialogFormData.customsCode = resp.customsCode;
          this.dialogFormData.legalMan = resp.legalMan;
          this.dialogFormData.legalCardNumber = resp.legalCardNumber;
        });
      }
      console.log(this.dialogFormData);
    },
    search() {
      let data = {};
      data = {...this.formData};
      this.loading = true;
      aa(data).then((resp) => {
        this.loading = false;
        this.tableData = resp.data;
      });
    },
    loadMore() {},
    reset() {},
    addHandler() {
      this.type = 'add';
      this.shareHolderRow = [{}];
      this.objectAttributeReset(this.dialogFormData);
      this.dialogVisible = true;
    },
    editHandler() {
      let data = {};
      aa(data).then((resp) => {
        if (resp.data.length) {
          this.shareHolderRow = resp.data;
        } else {
          this.shareHolderRow = [{}];
        }
      });
      this.type = 'edit';
      this.dialogFormData = {...this.selectedRow};
      this.dialogVisible = true;
    },
    deleteHandler() {
      this.$confirm('确定删除当前行, 是否继续?', '提示', this.confirmItem).then(() => {
        let data = {...this.selectedRow};
        aa(data).then(() => {
          this.tipMessage('删除成功');
          this.search();
        });
      });
    },
    save() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let data = {...this.dialogFormData};
          if (this.type === 'add') {
            aa(data).then(() => {
              this.tipMessage('保存成功');
              this.search();
            });
          } else {
            aa(data).then(() => {
              this.tipMessage('修改成功');
              this.search();
            });
          }
        }
      });
    },
    cancel() {
      this.dialogVisible = false;
      this.$refs.form.resetFields();
    },
    addShareHolderRow() {
      this.shareHolderRow.push({});
    },
    deleteShareHolderRow(item, index) {
      let data = {...item};
      if (item.id) {
        this.$confirm('确定删除, 是否继续?', '提示', this.confirmItem).then(() => {
          aa(data).then(() => {
            this.shareHolderRow.splice(index, 1);
            this.tipMessage('删除成功');
          });
        });
      } else {
        // 删除指定数组下标的元素，index开始位置，1为数量
        this.shareHolderRow.splice(index, 1);
      }
    },
    saveShareHolderRow(item) {
      let data = {...item};
      if (item.id) {
        aa(data).then(() => {
          this.tipMessage('修改成功');
        });
      } else {
        aa(data).then(() => {
          this.tipMessage('保存成功');
        });
      }
    },
    changeRule(value) {
      // 1是 0否
      if (value === '1') {
        this.rules.companyCode = [ this.requiredRule ];
        this.rules.customsCode = [ this.requiredRule ];
      } else {
        this.rules.companyCode = [];
        this.rules.customsCode = [];
      }
    }
  },
  mounted() {
    this.throttleSave = this.throttle(this.save);
    // 表单校验
    this.rules = {
      etpsSccd: [
        this.requiredRule,
        { len: 18, message: '请填写18位社会信用代码', trigger: 'change' },
      ],
      companyName: [ this.requiredRule ],
      companyType: [ this.requiredRule ],
      registerAddress: [ this.requiredRule ],
      businessAddress: [ this.requiredRule ],
      legalMan: [ this.requiredRule ],
      legalCardNumber: [ this.requiredRule ],
      legalPhone: [ this.requiredRule ],
      linkMan: [ this.requiredRule ],
      phone: [ this.requiredRule ],
      isSpecialBusiness: [ this.requiredRule ],
      specialBusinessType: [ this.requiredRule ],
      companyCode: [ this.requiredRule ],
      customsCode: [ this.requiredRule ],
    };
  }
};
</script>

<style lang="less" scoped>
  // ---
  /deep/ .el-form-item {
    margin-bottom: 12px;
  }
  /deep/ .el-divider--horizontal {
    margin: 18px 0;
  }
  /deep/ .el-form-item__error{
    padding-top: 0px;
  }
</style>

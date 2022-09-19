<!--企业备案-->
<template lang="pug">
  div.top-content
    div
      el-form(ref="form" :model="form" :rules="rules")
        span.title 基本信息
        el-divider
        el-row
          el-col(:span="8")
            el-form-item(label="企业名称" :label-width="labelWidth" prop="companyName")
              el-input(v-model="form.companyName" disabled size="small")
          el-col(:span="8")
            el-form-item(label="社会信用代码" :label-width="labelWidth" prop="etpsSccd")
              el-input(v-model="form.etpsSccd" disabled size="small")
          el-col(:span="8")
            el-form-item(label="组织机构代码" :label-width="labelWidth" prop="orgCode")
              el-input(v-model="form.orgCode" disabled size="small")
        el-row
          el-col(:span="8")
            el-form-item(label="企业海关编码" :label-width="labelWidth" prop="companyCode")
              el-input(v-model="form.companyCode" disabled size="small")
          el-col(:span="5")
            el-form-item(label="是否特殊区域企业" :label-width="labelWidth" prop="isSpecialBusiness")
              el-select.long(v-model="form.isSpecialBusiness" size="small" placeholder="请选择" disabled)
                el-option( v-for="(value, key, index) in truthOptions" :key="index" :label="value" :value="key")
          el-col(:span="5")
            el-form-item(label="所属关区" :label-width="labelWidth" prop="customsCode")
              el-input(v-model="form.customsCodeName" disabled size="small")
          el-col(:span="5")
            el-form-item(label="企业类型" :label-width="labelWidth" prop="companyType")
              el-select.long(v-model="form.companyType" size="small" placeholder="请选择" :disabled="form.approveState === '2'")
                el-option( v-for="(item, index) in companyTypeOptions" :key="index" :label="item.label" :value="item.value")
        el-row
          el-col(:span="24")
            el-form-item(label="经营范围" :label-width="labelWidth" prop="businessScope")
              el-input(v-model="form.businessScope" size="small" :disabled="form.approveState === '2'" type="textarea" :row="2")
        el-row
          el-col(:span="24")
            el-form-item(label="经营地址" :label-width="labelWidth" prop="companyAddress")
              el-input(v-model="form.companyAddress" size="small" :disabled="form.approveState === '2'")
        el-row
          el-col(:span="8")
            el-form-item(label="注册类型" :label-width="labelWidth")
              el-select.long(v-model="form.registerCurrcd" size="small" placeholder="请选择" :disabled="form.approveState === '2'")
                el-option(label="人民币" value="1")
                el-option(label="外币" value="2")
          el-col(:span="8" v-if="form.registerCurrcd === '2'")
            el-form-item(label="外币注册（认缴）资本（万美元）" label-width="240px" prop="foreignRegisteredCapital")
              el-input(v-model="form.foreignRegisteredCapital" size="small" :disabled="form.approveState === '2'")
          el-col(:span="8" v-if="form.registerCurrcd === '1'")
            el-form-item(label="人民币注册（认缴）资本（万元）" label-width="240px" prop="rmbRegisteredCapital")
              el-input(v-model="form.rmbRegisteredCapital" size="small" :disabled="form.approveState === '2'")
        el-row
          el-col(:span="8")
            el-form-item(label="外币投资总额（万美元）" label-width="240px" prop="foreignTotalInvestment")
              el-input(v-model="form.foreignTotalInvestment" size="small" :disabled="form.approveState === '2'")
          el-col(:span="8")
            el-form-item(label="人民币投资总额（万元）" label-width="240px" prop="rmbTotalInvestment")
              el-input(v-model="form.rmbTotalInvestment" size="small" :disabled="form.approveState === '2'")
        span.title 法人信息
        el-divider
        el-row
          el-col(:span="8")
            el-form-item(label="法人代表" :label-width="labelWidth" prop="legalMan")
              el-input(v-model="form.legalMan" size="small" :disabled="form.approveState === '2'")
          el-col(:span="8")
            el-form-item(label="证件类型" :label-width="labelWidth" prop="legalCardType")
              el-select.long(v-model="form.legalCardType" size="small" placeholder="请选择" :disabled="form.approveState === '2'")
                el-option( v-for="(value, key, index) in cardTypeOptions" :key="index" :label="value" :value="key")
          el-col(:span="8")
            el-form-item(label="证件号码" :label-width="labelWidth" prop="legalCardNumber")
              el-input(v-model="form.legalCardNumber" size="small" :disabled="form.approveState === '2'")
        el-row
          el-col(:span="8")
            el-form-item(label="联系方式" :label-width="labelWidth" prop="legalPhone")
              el-input(v-model="form.legalPhone" size="small" :disabled="form.approveState === '2'")
        span.title 股东信息
        span.subTitle 股东比例在5%以上的需要填写
        el-divider
        div(v-for="(item,index) in shareHolderRow" :key="index")
          el-row(:gutter="10")
            el-col(:span="8")
              el-form-item(label="股东名称" :label-width="labelWidth" prop="shareholderName")
                el-input(v-model="item['shareholderName']" size="small")
            el-col(:span="8")
              el-form-item(label="证件类型" :label-width="labelWidth" prop="cardType")
                el-select.long(v-model="item['cardType']" size="small" placeholder="请选择")
                  el-option( v-for="(value, key, index) in cardTypeOptions" :key="index" :label="value" :value="key")
            el-col(:span="8")
              el-form-item(label="证件号码" :label-width="labelWidth" prop="cardNumber")
                el-input(v-model="item['cardNumber']" size="small")
          el-row(:gutter="10")
            el-col(:span="8")
              el-form-item(label="股东占比" :label-width="labelWidth" prop="cardNumber")
                el-input(v-model="item['percent']" size="small")
                  template(slot="append") %
            el-col(:span="6")
              el-form-item
                el-button.left-space(@click="addShareHolderRow", :loading="loading" type="primary" size="small" icon="el-icon-plus" :disabled="form.approveState === '2'")
                el-button.left-space(@click="deleteShareHolderRow(item, index)", :loading="loading" type="danger" size="small" icon="el-icon-minus" :disabled="form.approveState === '2' || shareHolderRow.length === 1")
                el-button.left-space(@click="saveShareHolderRow(item)", :loading="loading" type="primary" size="small" :disabled="form.approveState === '2'") 保存
          el-divider(v-if="shareHolderRow.length-1 !== index")
        span.title 业务联系人信息
        el-divider
        el-row
          el-col(:span="10")
            el-form-item(label="联系人" :label-width="labelWidth" prop="linkMan")
              el-input(v-model="form.linkMan" size="small" :disabled="form.approveState === '2'")
          el-col(:span="10")
            el-form-item(label="联系电话" :label-width="labelWidth" prop="phone")
              el-input(v-model="form.phone" size="small" :disabled="form.approveState === '2'")
        el-row
          el-col(:span="10")
            el-form-item(label="办公电话" :label-width="labelWidth" prop="tel")
              el-input(v-model="form.tel" size="small" :disabled="form.approveState === '2'")
          el-col(:span="10")
            el-form-item(label="联系邮箱" :label-width="labelWidth" prop="email")
              el-input(v-model="form.email" size="small" :disabled="form.approveState === '2'")
    fixed
      el-row(:gutter="20")
        el-col(:span="11") &nbsp;
        el-col(:span="3")
          el-button.long(@click="apply", :loading="loading" type="primary" v-if="form.approveState !== '2'") 申报
        el-col(:span="3")
          el-button.long(@click="submit", :loading="loading" type="primary" v-if="form.approveState !== '2'") 保存
        el-col(:span="3")
          el-button.long(@click="toUpdate", :loading="loading" type="primary" v-if="form.approveState === '2'") 变更
        el-col(:span="4") &nbsp;
</template>

<script>
import {
  queryComInfo, updateComInfo, declareComInfo, queryfeshInfoList,
  savefeshInfo, deletefeshInfo, updatefeshInfo, changeComInfo
} from '@/service/interface';
// import _ from 'lodash';

export default {
  data() {
    return {
      loading: false,
      countryOptions: '',
      form: {
        legalContry: '',
        companyName: '',
        etpsSccd: '',
        orgCode: '',
        companyCode: '',
        isSpecialBusiness: '1',
        customsCode: '',
        customsCodeName: '',
        companyType: '',
        companyAddress: '',
        businessScope: '',
        registerCurrcd: '1',
        foreignRegisteredCapital: '',
        rmbRegisteredCapital: '',
        foreignTotalInvestment: '',
        rmbTotalInvestment: '',
        legalMan: '',
        legalCardNumber: '',
        legalPhone: '',
        legalCardType: '',
        tel: '',
        email: '',
        phone: '',
        investorCountry: '',
        linkMan: '',
        approveState: '', // 1暂存，2已备案，3变更
      },
      shareHolderForm: {},
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
        100006: '企业统一信用代码',
        100016: '港澳居民来往内地通行证',
        100017: '台湾居民来往大陆通行证',
        100018: '其他证件类型',
      },
      labelWidth: '140px',
      shortLabelWidth: '100px',
      shareHolderRow: [
        {}
      ],
      rules: null,
    };
  },
  methods: {
    search() {
      let data = {
        pageSo: {
          pageIndex: 0,
          pageSize: 0,
        },
      };
      queryComInfo(data).then((resp) => {
        // this.form = {...resp};
        Object.assign(this.form, resp);
      });
    },
    searchShareHolder() {
      let data = {
        id: 0,
        pageSo: {
          pageIndex: 0,
          pageSize: 0,
        },
      };
      queryfeshInfoList(data).then((resp) => {
        if (resp.data.length) {
          this.shareHolderRow = resp.data;
        }
      });
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let data = {...this.form};
          updateComInfo(data).then(() => {
            this.tipMessage('保存成功');
            this.search();
          });
        }
      });
    },
    apply() {
      let data = {};
      Object.assign(data, this.form);
      declareComInfo(data).then(() => {
        this.tipMessage('操作成功');
        this.search();
      });
    },
    toUpdate() {
      let data = {...this.form};
      changeComInfo(data).then(() => {
        this.tipMessage('操作成功');
        this.search();
      });
    },
    addShareHolderRow() {
      this.shareHolderRow.push({});
    },
    deleteShareHolderRow(item, index) {
      let data = {};
      Object.assign(data, item);
      if (item.id) {
        this.$confirm('确定删除, 是否继续?', '提示', this.confirmItem).then(() => {
          deletefeshInfo(data).then(() => {
            this.shareHolderRow.splice(index, 1);
            this.tipMessage('删除成功');
          });
        });
      } else {
        // 删除指定数组下标的元素，index开始位置，1为数量
        this.shareHolderRow.splice(index, 1);
        // let temp = this.shareHolderRow.slice(0); // 深拷贝
        // 移除指定数组下标的元素
        // _.pullAt(temp, index);
        // this.shareHolderRow = temp;
      }
    },
    saveShareHolderRow(item) {
      let data = {};
      Object.assign(data, item);
      if (item.id) {
        updatefeshInfo(data).then(() => {
          this.tipMessage('修改成功');
        });
      } else {
        savefeshInfo(data).then(() => {
          this.tipMessage('保存成功');
        });
      }
    },
  },
  mounted() {
    // this.search();
    // this.searchShareHolder();
    // 表单校验
    this.rules = {
      companyType: [ this.requiredRule ],
      companyAddress: [ this.requiredRule ],
      businessScope: [ this.requiredRule ],
      registerCurrcd: [ this.requiredRule ],
      foreignRegisteredCapital: [ this.requiredRule ],
      rmbRegisteredCapital: [ this.requiredRule ],
      foreignTotalInvestment: [ this.requiredRule ],
      rmbTotalInvestment: [ this.requiredRule ],
      legalMan: [ this.requiredRule ],
      legalCardType: [ this.requiredRule ],
      legalCardNumber: [ this.requiredRule ],
      legalPhone: [ this.requiredRule ],
      phone: [ this.requiredRule ],
      linkMan: [ this.requiredRule ],
      legalContry: [ this.requiredRule ],
    };
  }
};
</script>
<style lang="less" scoped>
  // ---
  /deep/ .el-form-item {
    margin-bottom: 12px;
  }
  /deep/ .el-form-item__error{
    padding-top: 0px;
  }
  .subTitle {
    margin-left: 4px;
    font-size: 13px;
  }
</style>

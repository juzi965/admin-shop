<template>
  <div>
    <el-card shadow="hover">
      <div slot="header"
        class="clearfix">
        <span>新品上新</span>
      </div>
      <div style="text-align:center">
        <el-row type="flex"
          justify="center">
          <el-col v-if="currentStep==1"
            :span="12">
            <h3>
              服装基本信息
            </h3>
            <el-form label-position="right"
              label-width="80px"
              ref="clothingInfoRef"
              :rules="clothingInfoRules"
              :model="clothingFrom">
              <el-form-item label="服装名称"
                prop="clothingName">
                <el-input v-model="clothingFrom.clothingName"></el-input>
              </el-form-item>
              <el-form-item label="服装类别"
                prop="category">
                <el-input v-model="clothingFrom.category"></el-input>
              </el-form-item>
              <el-form-item label="服装介绍"
                prop="clothingContent">
                <el-input v-model="clothingFrom.clothingContent"
                  type="textarea"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col v-if="currentStep==2"
            :span="16">
            <h3>
              服装属性信息
            </h3>

            <el-form label-position="right"
              label-width="80px"
              ref="clothingAttrRef"
              :model="clothingFrom">
              <el-row v-for="(attr,index) in clothingFrom.attrList"
                :key="index">
                <el-col :span="1">
                  <el-button v-if="clothingFrom.attrList.length-1!==index"
                    type="success"
                    icon="el-icon-check"
                    circle></el-button>
                  <el-button v-if="clothingFrom.attrList.length-1===index"
                    @click="addAttr"
                    type="primary"
                    icon="el-icon-plus"
                    circle></el-button>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="尺码"
                    :prop="'attrList.'+index+'.size'"
                    :rules="sizeRule">
                    <el-input v-model="attr.size"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="价格"
                    :prop="'attrList.'+index+'.price'"
                    :rules="priceRule">
                    <el-input v-model="attr.price"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="库存量"
                    :prop="'attrList.'+index+'.stock'"
                    :rules="stockRule">
                    <el-input v-model="attr.stock"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="2">
                  <el-button @click.prevent="removeAttr(index)"
                    type="danger"
                    icon="el-icon-delete"
                    circle></el-button>
                </el-col>
              </el-row>
            </el-form>

          </el-col>
        </el-row>
        <div v-if="currentStep==3">
          <h3>
            上传服装图片
          </h3>
          <el-upload name="files"
            ref="upload"
            :file-list="fileList"
            :data="uploadData"
            :on-change="fileChange"
            :on-success="picSuccess"
            :auto-upload="false"
            action="https://api.hooya.top:8080/api/clothing/upload"
            list-type="picture-card">
            <i class="el-icon-plus"></i>
          </el-upload>
        </div>
      </div>
      <el-row type="flex"
        justify="center"
        style="text-align: center;">
        <el-col :span="3"
          style="padding-top: 30px">
          <el-button @click="currentStep--"
            v-show="currentStep>1"
            type="primary"
            round>上一步</el-button>
        </el-col>
        <el-col :span="18">
          <el-steps :active="currentStep"
            align-center
            style="margin-top:30px">
            <el-step title="基本属性"
              icon="el-icon-edit"></el-step>
            <el-step title="扩展属性"
              icon="el-icon-notebook-2"></el-step>
            <el-step title="图片信息"
              icon="el-icon-picture"></el-step>
          </el-steps>
        </el-col>
        <el-col :span="3"
          style="padding-top: 30px">
          <el-button @click="nextStep"
            v-if="currentStep<3"
            type="primary"
            round>下一步</el-button>
          <el-button @click="saveClothing"
            v-if="currentStep==3"
            type="success"
            round>提交</el-button>
        </el-col>
      </el-row>

    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentStep: 1,
      imageUrl: '',
      fileList: [],
      uploadData: {
        clothingId: ''
      },
      clothingFrom: {
        clothingName: '',
        category: '',
        clothingContent: '',
        attrList: [
          {
            size: '',
            price: '',
            stock: ''
          }
        ]
      },
      clothingInfoRules: {
        clothingName: [
          { required: true, message: '请输入服装名', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
        ],
        category: [
          { required: true, message: '请输入服装类别', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
        ],
        clothingContent: [
          { required: true, message: '请输入服装介绍', trigger: 'blur' },
          { min: 5, max: 50, message: '长度在 5 到 50 个字符', trigger: 'blur' }
        ]
      },
      sizeRule: {
        required: true,
        message: '尺码不能为空',
        trigger: 'blur'
      },
      priceRule: {
        required: true,
        message: '价格不能为空',
        trigger: 'blur'
      },
      stockRule: {
        required: true,
        message: '库存不能为空',
        trigger: 'blur'
      }
    }
  },
  methods: {
    removeAttr(index) {
      if (this.clothingFrom.attrList.length > 1) {
        this.clothingFrom.attrList.splice(index, 1)
      }
    },
    addAttr() {
      this.$refs.clothingAttrRef.validate((valid, errorObject) => {
        // 验证不通过不提交数据
        if (!valid) return
        this.clothingFrom.attrList.push({
          size: '',
          price: '',
          stock: ''
        })
      })
    },
    fileChange(file, dataList) {
      this.fileList = dataList
    },
    nextStep() {
      if (this.currentStep === 1) {
        this.$refs.clothingInfoRef.validate((valid, errorObject) => {
          if (!valid) return
          this.currentStep = 2
        })
      } else if (this.currentStep === 2) {
        this.$refs.clothingAttrRef.validate((valid, errorObject) => {
          if (!valid) return
          this.currentStep = 3
        })
      }
    },
    saveClothing() {
      this.$http.post('/clothing/add', this.clothingFrom).then(res => {
        if (res.data.code == 10000) {
          this.uploadData.clothingId = res.data.data
          this.$refs.upload.submit()
          this.$message.success('服装基本信息保存成功')
          // this.$router.push({
          //   path: '/clothing-info'
          // })
        }
      })
    },
    picSuccess(res, file, fileList) {
      this.$router.push({
        path: '/clothing-info'
      })
    }
  },
  computed: {},
  components: {},
  watch: {
    currentStep(newValue, oldValue) {
      if (newValue > 3) {
        this.currentStep = 1
      }
    }
  }
}
</script>

<style lang="less" scoped></style>

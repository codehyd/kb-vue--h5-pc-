<template>
  <div class="set-wrap">
    <el-alert
      title="自定义设置 这些设置为个人的个性化设置"
      type="info"
      show-icon
    />

    <template v-for="item in setupConfig" :key="item.class">
      <div class="setup-item">
        <div class="item-content" @click="handleItemClick(item)">
          <kb-icon
            :flag="item.flag"
            :size="30"
            :name="item.icon ?? 'Setting'"
          ></kb-icon>
          <span>
            {{ item.label }}
          </span>
        </div>
      </div>
    </template>

    <kb-dialog v-model:show="showSetupPanel" :title="title" :width="setupDidth">
      <div class="config-wrap">
        <el-form
          class="elForm"
          :label-position="labelPostion"
          :model="formData"
        >
          <template v-for="item in config" :key="item.id">
            <el-form-item
              style="width: 100%"
              :prop="item.id"
              class="elFormItem"
            >
              <template #label>
                <span class="select">
                  <el-tooltip
                    effect="dark"
                    :content="item.help"
                    placement="top-start"
                    :disabled="!item.help ? true : false"
                  >
                    <span>
                      {{ item.label }}
                    </span>
                  </el-tooltip>
                </span>
              </template>
              <!-- 数字类型 -->
              <template v-if="item.type == 'number'">
                <el-input-number
                  v-model="item.value"
                  v-bind="item.otherOptions"
                ></el-input-number>
              </template>
              <!-- switch -->
              <template v-if="item.type == 'switch'">
                <el-switch
                  v-bind="item.otherOptions"
                  v-model="item.value"
                ></el-switch>
              </template>
              <!-- checkbox -->
              <template v-if="item.type == 'checkbox'">
                <el-checkbox-group v-model="item.value">
                  <el-checkbox
                    v-for="(checkItem, index) in item.otherOptions.list"
                    :key="index"
                    :label="checkItem.label"
                    :disabled="checkItem.disabled"
                    size="large"
                  />
                </el-checkbox-group>
              </template>
              <template v-if="item.type == 'select'">
                <el-select
                  v-model="item.value"
                  :placeholder="item.otherOptions.placeholder"
                  size="large"
                >
                  <el-option
                    v-for="(checkItem, index) in item.otherOptions.list"
                    :key="index"
                    :label="checkItem"
                    :value="checkItem"
                  />
                </el-select>
              </template>
              <template v-if="item.type == 'status'">
                <el-button @click="statusShow = true">打开设置</el-button>

                <kb-dialog v-model:show="statusShow" :title="item.help">
                  <div>需要在上一级配置页面保存才生效</div>
                  <el-button
                    @click="handleAddNewBildStatus(item.value)"
                    type="primary"
                    icon="plus"
                  >
                    添加
                  </el-button>

                  <template
                    v-for="statusItem in item.value"
                    :key="statusItem.title"
                  >
                    <div
                      class="select"
                      style="justify-content: flex-start; margin: 10px 0 0 0"
                    >
                      单据状态文本:
                      <span :style="statusItemStyle(statusItem)">
                        {{ statusItem.title }}
                      </span>
                      <el-button
                        @click="handleRemoveStatus(item, statusItem)"
                        type="text"
                      >
                        删除
                      </el-button>
                    </div>
                    <div class="status-item">
                      <div class="status-item-color">
                        <el-color-picker
                          size="small"
                          v-model="statusItem.color"
                        />
                        <span class="demonstration"> 状态颜色</span>
                      </div>
                      <el-divider direction="vertical" />
                      <el-checkbox
                        v-model="statusItem.isBold"
                        label="是否加粗"
                        size="large"
                      />
                      <el-divider direction="vertical" />
                      <el-checkbox
                        v-model="statusItem.isUnderline"
                        label="是否下划线"
                        size="large"
                      />
                    </div>
                  </template>
                  <!-- <template #footer>
                    <el-button @click="handleSave" type="primary">保存关闭</el-button>
                  </template> -->
                </kb-dialog>
              </template>
            </el-form-item>
          </template>
        </el-form>
        <div class="options">
          <!-- <el-button @click="handleSaveClick(false)">本次保存</el-button> -->
          <el-button @click="handleSaveClick(true)"> 保存 </el-button>
        </div>
      </div>
    </kb-dialog>
  </div>
</template>

<script setup lang="ts">
import KbIcon from "@/base-ui/icon";
import KbDialog from "@/base-ui/dialog";
import { useStore } from "@/store";
import message from "@/utils/message";
const store = useStore();
const setupConfig = computed(() => {
  let newConfig: any = {};
  const config = store.state.setup.config;
  newConfig = {
    "pc-table": config["pc-table"],
    "pc-wechat": config["pc-wechat"],
    "pc-goods": config["pc-goods"],
  };
  return newConfig;
});

console.log(setupConfig.value);

const labelPostion = ref("left");
const setupDidth = ref(40);
const config = ref<any>([]);
const formData = ref({});
const title = ref("");
const configClass = ref("");
const showSetupPanel = ref(false);

const statusShow = ref(false);

const handleItemClick = (item: any) => {
  // 深拷贝item.setup
  config.value = JSON.parse(JSON.stringify(item.setup));
  const orgainData: any = {};
  for (const options of item.setup) {
    orgainData[options.id] = options.value;
  }
  formData.value = orgainData;
  title.value = item.label;
  configClass.value = item.class;
  showSetupPanel.value = true;
};

const handleSaveClick = (isSaveCloud?: boolean) => {
  store.dispatch("setup/updateConfigToClass", {
    class: configClass.value,
    config: config.value,
    isSaveCloud,
  });
};

onMounted(() => {
  // 获取当前的窗口大小
  const width = window.innerWidth;
  labelPostion.value = width < 1024 ? "top" : "left";
  setupDidth.value = width < 1024 ? 80 : 40;
  // 监听窗口大小的变化
  window.addEventListener("resize", () => {
    const width = window.innerWidth;
    labelPostion.value = width < 1024 ? "top" : "left";
    setupDidth.value = width < 1024 ? 80 : 40;
  });
});

const handleAddNewBildStatus = (item: any) => {
  message
    .prompt("请输入单据状态的名称(比如:未审核)", "单据状态")
    .then((val) => {
      const find = item.find((item: any) => item.title === val);
      if (!find) {
        item.push({
          title: val,
          color: "",
          isBold: false,
          isUnderline: false,
        });
      } else {
        message.error("该单据状态已存在");
      }
    });
};

const statusItemStyle = (item: any) => {
  return {
    color: item.color,
    fontWeight: item.isBold ? "bold" : "normal",
    textDecoration: item.isUnderline ? "underline" : "none",
    margin: "0 10px 0 0",
  } as any;
};

const handleRemoveStatus = (item: any, statusItem: any) => {
  const newConfig = item.value.filter(
    (config: any) => config.title !== statusItem.title
  );
  item.value = newConfig;
  message.success("删除成功");
};
</script>

<style lang="less" scoped>
.set-wrap {
  display: flex;
  flex-wrap: wrap;
}
.setup-item {
  width: 200px;
  height: 200px;
  margin-right: 10px;
  margin-bottom: 10px;
  background: #f4f4f5;
  cursor: pointer;
  .item-content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    transition: all 0.3s;
    &:hover {
      transform: scale(1.1);
    }
  }

  span {
    margin: 5px 0;
    font-size: 20px;
  }
}
.el-alert {
  margin: 0 0 10px;
}

.config-wrap {
  width: 100%;
  // display: flex;
}

.elForm {
  width: 100%;
  height: 600px;
  overflow: hidden;
  overflow-y: auto;
}

.options {
  display: flex;
  justify-content: flex-end;
}
.elFormItem {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid #f4f4f5;
  padding: 0 10px 10px;
  &:deep(.el-form-item__content) {
    flex: 0 0 auto;
  }
}

// 媒体查询 当分辨率小于1024的时候
@media screen and (max-width: 1024px) {
  .elFormItem {
    flex-direction: column;
    align-items: flex-start;
  }
}

.status-item {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding: 0 10px;
}
</style>

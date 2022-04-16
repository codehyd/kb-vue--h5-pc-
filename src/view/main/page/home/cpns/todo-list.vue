<template>
  <div class="todo-list card">
    <div class="options">
      <template v-for="item in selectOptions" :key="item.flag">
        <el-check-tag
          @change="handleChange(item)"
          :checked="item.checked"
          class="checkTag"
        >
          {{ item.title }}
        </el-check-tag>
      </template>
      <div class="header">
        <span>共{{ todoList.length }}条数据</span>
        <el-button @click="handleAddNewTodo" type="primary">
          +添加新事项
        </el-button>
      </div>
    </div>

    <div class="content">
      <template v-if="todoList.length == 0">
        <el-empty :image-size="70">
          <el-button @click="handleAddNewTodo" type="primary">
            添加新事项
          </el-button>
        </el-empty>
      </template>
      <template v-for="item in todoList" :key="item.fid">
        <div @click.stop="handleDetailClick(item)" class="item">
          <div>
            <kb-icon flag="elIcon" name="list" color="#ccc" />
          </div>
          <div class="item-content">
            <!-- 抬头 -->
            <div class="title">
              <div>
                <span class="createUser">{{ item.fromuser }}:</span>
                <span class="createTitle">{{ item.title }}</span>
              </div>
              <el-tooltip
                effect="dark"
                :content="item.createtime"
                placement="top"
              >
                <div class="timer">{{ fromNow(item.createtime) }}</div>
              </el-tooltip>
            </div>
            <!-- 内容 -->
            <div class="info">{{ item.content }}</div>
            <!-- 已通知 -->
            <div class="confirmUser">
              <el-tooltip
                effect="dark"
                content="该事项已通知的成员"
                placement="top"
              >
                <span class="confirm">已通知:</span>
              </el-tooltip>
              <template v-for="user in formatToUser(item.touser)" :key="user">
                <span class="userName">{{ user }}</span>
              </template>
            </div>

            <!-- 确认人 -->
            <div class="confirmUser">
              <el-tooltip
                effect="dark"
                content="该事项已确认的成员"
                placement="top"
              >
                <span class="confirm">确认人:</span>
              </el-tooltip>
              <template
                v-for="confirm in formatToConfirm(item.confirm)"
                :key="confirm"
              >
                <span class="userName">{{ confirm }}</span>
              </template>
            </div>
            <!-- 底部 -->
            <div class="footer">
              <el-tag
                :type="item.flag == 0 ? 'warning' : 'success'"
                effect="dark"
              >
                {{ item.flag == 0 ? "未完成" : "已完成" }}
              </el-tag>
              <div class="options">
                <!-- 编辑  -->
                <kb-icon
                  @click="handleEditClick(item)"
                  name="edit"
                  flag="elIcon"
                  type="button"
                ></kb-icon>
                <!-- 确认 -->
                <kb-icon
                  @click="handleConfirmClick(item)"
                  name="CircleCheckFilled"
                  flag="elIcon"
                  type="button"
                  buttonType="primary"
                ></kb-icon>
                <!-- 完成 -->
                <kb-icon
                  @click="handleFinishClick(item)"
                  name="Check"
                  flag="elIcon"
                  type="button"
                  buttonType="success"
                ></kb-icon>
                <!-- 删除 -->
                <kb-icon
                  @click="handleDeleteClick(item)"
                  name="Failed"
                  flag="elIcon"
                  type="button"
                  buttonType="danger"
                ></kb-icon>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>

    <kb-dialog v-model:show="isShowPanel">
      <template #title>
        <span class="select" style="--selectBg: #0094ff">
          {{ currentFlag == "edit" ? "修改" : "查看" }}代办事项
        </span>
      </template>
      <page-form
        v-if="currentFlag == 'edit'"
        ref="pageFormRef"
        :formConfig="createTodoFormConfig"
        :defaultData="todoItemDetailData"
      ></page-form>
      <div v-else class="bodyWrap">
        <div><span>事项标题:</span> {{ todoItemDetailData.title }}</div>
        <div><span>事项内容:</span> {{ todoItemDetailData.content }}</div>
        <div><span>事项创建人:</span> {{ todoItemDetailData.fromuser }}</div>
        <div>
          <span>事项创建时间:</span> {{ todoItemDetailData.createtime }}
        </div>
        <div>
          <span>已通知的成员: </span>
          <template
            v-for="item in formatToUser(todoItemDetailData.touser)"
            :key="'touser' + item"
          >
            {{ item }},
          </template>
        </div>
        <div>
          <span>已确认的成员: </span>
          <template
            v-for="item in formatToConfirm(todoItemDetailData.confirm)"
            :key="'confirm' + item"
          >
            {{ item }},
          </template>
        </div>
      </div>
      <template #footer>
        <el-button
          v-if="currentFlag == 'edit'"
          @click="handleSubmitClick"
          type="primary"
        >
          提交
        </el-button>
      </template>
    </kb-dialog>
  </div>
</template>

<script setup lang="ts">
import KbDialog from "@/base-ui/dialog";
import PageForm from "@/components/page-form";
import { useStore } from "@/store";
import { fromNow } from "@/utils/timer";
import KbIcon from "@/base-ui/icon";
import {
  selectOptions,
  ITodoOptionType,
  createTodoFormConfig,
} from "../config/todo-config";

import {
  httpSetTodoListData,
  httpDelTodoListData,
  httpFinishTodoListData,
  httpConfirmTodoListData,
} from "@/service/http/home";

import message from "@/utils/message";

const store = useStore();
store.dispatch("home/getTodoList", selectOptions.value[0].flag);
const todoList = computed(() => store.state.home.todoList ?? []);

const pageFormRef = ref<InstanceType<typeof PageForm>>();

// formatT to 通知人
const formatToUser = (use?: string) => {
  if (!use) return ["暂无通知人"];
  const toUser = JSON.parse(use!);
  return toUser;
};
// format to 确认人
const formatToConfirm = (use?: string) => {
  if (!use) return ["暂无确认人"];
  const toUser = use!.split(",");
  return toUser!.filter((item) => item != "");
};

// 改变选项
const handleChange = (item: ITodoOptionType) => {
  selectOptions.value.forEach((item) => {
    item.checked = false;
  });
  item.checked = true;
  store.dispatch("home/getTodoList", item.flag);
};

// 显示添加新事项的弹窗
const isShowPanel = ref(false);
const currentFlag = ref<"detail" | "edit">("detail");
// 事项详情数据
const todoItemDetailData: any = ref({});
let todoId = 0;

// 添加事项
const handleAddNewTodo = () => {
  const index = createTodoFormConfig.value.formItems.findIndex(
    (item) => item.field == "touser"
  );
  createTodoFormConfig.value.formItems[index].otherCheckList =
    store.state.selectOptions?.arrusername?.filter((item: any) => item != "") ??
    [];
  todoId = 0;
  isShowPanel.value = true;
  currentFlag.value = "edit";
};

// 提交事项
const handleSubmitClick = () => {
  pageFormRef.value
    ?.getFormData()
    .then(async (formData: any) => {
      // formData的touser需要将数组转化为字符串并且用逗号分割
      const newFormData = { ...formData };
      newFormData.touser =
        newFormData.touser.length > 0 ? formData.touser?.join(",") : "";

      // 如果没有id 则为新增 需要添加id = 0
      newFormData.id = todoId;
      const res = await httpSetTodoListData(newFormData);
      console.log(res);
      if (res.code >= 1) {
        // 新增
        if (todoId == 0) {
          store.commit("home/changeTodoList", res.data[0].data);
          isShowPanel.value = false;
          selectOptions.value.forEach((item) => {
            item.checked = false;
          });
          selectOptions.value[0].checked = true;
        }
        // 编辑
        else {
          // 拿到当前编辑的数据的索引
          const todoList = [...store.state.home.todoList];
          const index = todoList.findIndex((todo: any) => todo.fid == todoId);
          todoList[index] = res.data[0].data[0];
          console.log(todoList);
          store.commit("home/changeTodoList", todoList);
        }
      }
      message.show(res.msg, res.type);
    })
    .catch((err) => {
      console.log(err);
    });
};

// 点击详情
const handleDetailClick = (item: any) => {
  todoItemDetailData.value = item;
  isShowPanel.value = true;
  currentFlag.value = "detail";
};

// 点击编辑
const handleEditClick = (item: any) => {
  handleAddNewTodo();
  const newItem = { ...item };
  newItem.touser = item.touser ? JSON.parse(item.touser) : [];
  todoId = newItem.fid;
  todoItemDetailData.value = newItem;
};

// 点击确认
const handleConfirmClick = (item: any) => {
  message.confirm("是否确认该事项", async () => {
    const res = await httpConfirmTodoListData({ id: item.fid });
    if (res.code >= 1) {
      console.log(res);
      const todoList = [...store.state.home.todoList];
      // 拿到对应的id的索引
      const index = todoList.findIndex((todo: any) => todo.fid == item.fid);
      todoList[index].confirm = res.confirm;
      store.commit("home/changeTodoList", todoList);
    }
    message.show(res.msg, res.type);
  });
};

// 点击完成
const handleFinishClick = (item: any) => {
  message.confirm("是否完成该事项", async () => {
    const res = await httpFinishTodoListData({ id: item.fid });
    if (res.code >= 1) {
      const todoList = [...store.state.home.todoList];
      // 拿到对应的id的索引
      const index = todoList.findIndex((todo: any) => todo.fid == item.fid);
      todoList[index].flag = 1;
      store.commit("home/changeTodoList", todoList);
    }
    message.show(res.msg, res.type);
  });
};

// 点击删除
const handleDeleteClick = (item: any) => {
  message.confirm("是否删除该事项", async () => {
    const res = await httpDelTodoListData({ id: item.fid });
    if (res.code >= 1) {
      store.commit(
        "home/changeTodoList",
        store.state.home.todoList.filter((todo: any) => todo.fid != item.fid)
      );
    }
    message.show(res.msg, res.type);
  });
};
</script>

<style lang="less" scoped>
.todo-list {
  height: 350px;

  padding: 10px;

  .options {
    position: sticky;
    top: 0;
    z-index: 99;
    background-color: white;
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 10px;
      border-bottom: 1px solid #f0f0f0;
      padding-right: 10px;
    }
  }
  .content {
    height: calc(100% - 70px);
    overflow: hidden;
    overflow-y: auto;

    .item {
      display: flex;
      padding: 10px 0;
      border-bottom: 1px solid #f0f0f0;
      cursor: pointer;

      .item-content {
        margin: 0 10px;
        width: 100%;
        // 抬头
        .title {
          font-size: 12px;
          display: flex;
          justify-content: space-between;
          width: 100%;
          .createTitle {
            padding: 0 0 0 5px;
            font-weight: 700;
            cursor: pointer;

            &:hover {
              color: #6baaff;
            }
          }
        }

        // 内容
        .info {
          padding: 10px 0;
          border-bottom: 1px solid #f0f0f0;
        }

        //
        .confirmUser {
          display: flex;
          flex-wrap: wrap;
          margin-top: 10px;
          padding: 10px 0;
          border-bottom: 1px solid #f0f0f0;

          .userName {
            cursor: pointer;
            margin: 0 10px;
            &:hover {
              color: #6baaff;
            }
          }
        }
        // 底部
        .footer {
          padding: 10px 0;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;

          .options {
            display: flex;
            align-items: center;
          }
        }
      }
    }
  }
}

.timer,
.confirm {
  font-weight: 700;
  color: #ccc;
  cursor: pointer;
}
.bodyWrap {
  & > div {
    padding: 10px 0;

    & > span {
      font-weight: 700;
    }
  }
}
</style>

<template>
  <q-page class="q-pa-sm">
    <gantt-elastic
      :options="options"
      :tasks="tasks"
      @tasks-changed="tasksUpdate"
      @options-changed="optionsUpdate"
      @dynamic-style-changed="styleUpdate"
    >
      <gantt-header slot="header"></gantt-header>
    </gantt-elastic>
    <div class="q-mt-md" />
    <q-btn @click="addTask" icon="mdi-plus" label="Add task" />
  </q-page>
</template>

<style>
</style>

<script>
import GanttElastic from "gantt-elastic";
import GanttHeader from "gantt-elastic-header";
import dayjs from "dayjs";

// just helper to get current dates
function getDate(hours) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();
  const timeStamp = new Date(
    currentYear,
    currentMonth,
    currentDay,
    0,
    0,
    0
  ).getTime();
  return new Date(timeStamp + hours * 60 * 60 * 1000).getTime();
}

function getStr2Date(stringDate){
  return new Date(stringDate)
}
let tasks = [
  {
    id: 1,
    label: 
    '<a href="https://devops.aliyun.com/projex/project/0bc74494b3f35ee869ce55ba35/sprint/210e8a3da53128a1d166c06db7#activeTab=Workitem&viewIdentifier=ead4d6570d314e123d03122ecd" target="_blank" style="color:#0077c0;">一月一次迭代</a>',
    user:"-",
    // start: getDate(-24 * 5),
    start: getStr2Date("2024-01-26"),
    duration: 15 * 24 * 60 * 60 * 1000,
    percent: 85,
    type: "project"
    //collapsed: true,
  },
  {
    id: 2,
    label: 
    '<a href="https://devops.aliyun.com/projex/project/0bc74494b3f35ee869ce55ba35/sprint/210e8a3da53128a1d166c06db7#activeTab=Workitem&viewIdentifier=ead4d6570d314e123d03122ecd&openWorkitemIdentifier=4791e74a9633e0470a780392c9" target="_blank" style="color:#0077c0;">日计划签到限制及二维码有效判断</a>',
    user:"胡宇峰",
    parentId: 1,
    start: getStr2Date("2024-01-27"),
    duration: 6 * 24 * 60 * 60 * 1000,
    percent: 50,
    type: "milestone",
    collapsed: true,
    style: {
      base: {
        fill: "#1EBC61",
        stroke: "#0EAC51"
      }
    }
  },
  {
    id: 3,
    label: "后端开发",
    user:'莫尤清',
    parentId: 2,
    start: getStr2Date("2024-01-27"),
    duration: 5 * 24 * 60 * 60 * 1000,
    percent: 100,
    type: "task"
  },
  {
    id: 4,
    label: "前端开发",
    user: "张萧麒",
    parentId: 2,
    start: getStr2Date("2024-01-29"),
    duration: 2 * 24 * 60 * 60 * 1000,
    percent: 80,
    type: "task",
    dependentOn: [3]
  },
  {
    id: 5,
    label: "测试",
    user:'骆鹏辉',
    parentId: 2,
    start: getStr2Date("2024-01-31"),
    duration: 2 * 24 * 60 * 60 * 1000,
    percent: 10,
    type: "milestone",
    dependentOn: [3],
    style: {
      base: {
        fill: "#0287D0",
        stroke: "#0077C0"
      }
    }
  },
  
  {
    id: 10,
    label: 
     '<a href="https://devops.aliyun.com/projex/project/0bc74494b3f35ee869ce55ba35/sprint/210e8a3da53128a1d166c06db7#activeTab=Workitem&viewIdentifier=ead4d6570d314e123d03122ecd&openWorkitemIdentifier=4791e74a9633e0470a780392c9" target="_blank" style="color:#0077c0;">PC小程序搜索优化</a>',
    user:"胡宇峰",
    start: getStr2Date("2024-01-27"),
    duration: 15 * 60 * 60 * 1000,
    percent: 0,
    type: "milestone"
  },
  {
    id: 11,
    label: "仓储日计划提交后通过公众号的消息推送功能",
    user:
      '孟庆顺',
    start: getStr2Date("2024-02-8"),
    duration: 6*24 * 60 * 60 * 1000,
    percent: 0,
    type: "milestone"
  },
  
];
let options = {
  taskMapping: {
    progress: "percent"
  },
  maxRows: 100,
  maxHeight: 500,
  title: {
    label: "Your project title as html (link or whatever...)",
    html: false
  },
  row: {
    height: 24
  },
  calendar: {
    hour: {
      display: true
    }
  },
  chart: {
    progress: {
      bar: false
    },
    expander: {
      display: true
    }
  },
  // 任务属性列表
  taskList: {
    expander: {
      straight: false
    },
    columns: [
      {
        id: 1,
        label: "编号",
        value: "id",
        width: 80
      },
      {
        id: 2,
        label: "项目描述",
        value: "label",
        width: 200,
        expander: true,
        html: true,
        events: {
          click({ data, column }) {
            alert("description clicked!\n" + data.label);
          }
        }
      },
      {
        id: 3,
        label: "项目人员",
        value: "user",
        width: 130,
        html: true
      },
      {
        id: 3,
        label: "开始时间",
        value: task => dayjs(task.start).format("YYYY-MM-DD"),
        width: 78
      },
      {
        id: 4,
        label: "角色",
        value: "type",
        width: 68
      },
      {
        id: 5,
        label: "当前进度",
        value: "progress",
        width: 80,
        style: {
          "task-list-header-label": {
            "text-align": "center",
            width: "100%"
          },
          "task-list-item-value-container": {
            "text-align": "center",
            width: "100%"
          }
        }
      }
    ]
  },
  locale: {
    name: "en",
    Now: "Now",
    "X-Scale": "Zoom-X",
    "Y-Scale": "Zoom-Y",
    "Task list width": "Task list",
    "Before/After": "Expand",
    "Display task list": "Task list"
  }
};

export default {
  name: "Gantt",
  components: {
    GanttElastic,
    GanttHeader
  },
  data() {
    return {
      tasks,
      options,
      dynamicStyle: {},
      lastId: 16
    };
  },
  methods: {
    addTask() {
      this.tasks.push({
        id: this.lastId++,
        label:
          '<a href="https://images.pexels.com/photos/423364/pexels-photo-423364.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" target="_blank" style="color:#0077c0;">Yeaahh! you have added a task bro!</a>',
        user:
          '<a href="https://images.pexels.com/photos/423364/pexels-photo-423364.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" target="_blank" style="color:#0077c0;">Awesome!</a>',
        start: getDate(24 * 3),
        duration: 1 * 24 * 60 * 60 * 1000,
        percent: 50,
        type: "project"
      });
    },
    tasksUpdate(tasks) {
      this.tasks = tasks;
    },
    optionsUpdate(options) {
      this.options = options;
    },
    styleUpdate(style) {
      this.dynamicStyle = style;
    }
  }
};
</script>

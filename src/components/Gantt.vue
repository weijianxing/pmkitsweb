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
    <q-btn @click="addTask" icon="mdi-plus" label="添加项目" />
    <!-- <div v-modal="showAddTask">
      <input v-model="formPMData.name">
      <input v-model="formPMData.email">
      <button @click="submitPMData">提交</button>
    </div> -->
    <el-dialog title="新增项目" :visible.sync="dialogFormVisible">
      <el-form :model="formPMData">
        <el-form-item label="项目名称" :label-width="formLabelWidth" >
          <el-autocomplete
          v-model="formPMData.name" 
          :fetch-suggestions="queryPMinfos"
          :focus = "queryPMinfos"
          :trigger-on-focus="false"
          @select="handleSelect"
          placeholder="请输入项目名称" 
          value-key = "name"
          >
        </el-autocomplete>
        </el-form-item>
       
        <el-form-item label="产品线" :label-width="formLabelWidth">
            <el-select v-model="formPMData.region" placeholder="请选择业务线">
              <el-option label="仓储" value="仓储"></el-option>
              <el-option label="云集-噶顺" value="云集"></el-option>
              <el-option label="易焦煤" value="易焦煤"></el-option>
              <el-option label="其它" value="其它"></el-option>
            </el-select>
          </el-form-item>
        <el-form-item label="开始时间"  :label-width="formLabelWidth" >
          <!-- <span class="pm-begintime">开始时间</span> -->
          <el-date-picker
            v-model="formPMData.beginTime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
            <span class="pm-begintime">结束时间</span>
          <el-date-picker
            v-model="formPMData.endTime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
      </el-form-item>
        <div class="input-pmInfo" >
          <el-form-item label="参与人员" :label-width="formLabelWidth">
            <el-select v-model="formPMData.role" placeholder="请选择角色类型">
              <el-option label="产品经理" value="产品经理"></el-option>
              <el-option label="前端开发" value="前端开发"></el-option>
              <el-option label="后端开发" value="后端开发"></el-option>
              <el-option label="测试" value="测试"></el-option>
            </el-select>
          </el-form-item>
            <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input 
              placeholder="请输入姓名" 
              v-model="formPMData.username" :label-width="formLabelWidth" >
            </el-input>
          </el-form-item>
      </div>
      <el-form-item label="需求描述" 
        :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 6}"
            placeholder="请输入prd链接或项目描述"
            v-model="formPMData.desc">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitPMData">确 定</el-button>
      </div>
</el-dialog>



  </q-page>
</template>

<style>
</style>

<script>
import GanttElastic from "gantt-elastic";
import GanttHeader from "gantt-elastic-header";
import dayjs from "dayjs";
import axios from "axios";


// import VueCors from 'cors'
// const corsOptions = {
//   allowedOrigins: [
//     'https://your-frontend-domain.com',
//   ],
//   credentials: true,
// }
// Vue.cors.use(corsOptions)
// cors.cors({
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         credentials: true,
//         origin: '*'
//       }).then(function (response) {
//         console.log(response);
//       }).catch(function (error) {
//         console.log(error);
//       });
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
    start: getStr2Date("2024-03-20"),
    duration: 15 * 24 * 60 * 60 * 1000,
    percent: 85,
    type: "project"
    //collapsed: true,
  },
  // {
  //   id: 2,
  //   label: 
  //   '<a href="https://devops.aliyun.com/projex/project/0bc74494b3f35ee869ce55ba35/sprint/210e8a3da53128a1d166c06db7#activeTab=Workitem&viewIdentifier=ead4d6570d314e123d03122ecd&openWorkitemIdentifier=4791e74a9633e0470a780392c9" target="_blank" style="color:#0077c0;">日计划签到限制及二维码有效判断</a>',
  //   user:"胡宇峰",
  //   parentId: 1,
  //   start: getStr2Date("2024-01-27"),
  //   duration: 6 * 24 * 60 * 60 * 1000,
  //   percent: 50,
  //   type: "milestone",
  //   collapsed: true,
  //   style: {
  //     base: {
  //       fill: "#1EBC61",
  //       stroke: "#0EAC51"
  //     }
  //   }
  // },
  // {
  //   id: 3,
  //   label: "后端开发",
  //   user:'莫尤清',
  //   parentId: 2,
  //   start: getStr2Date("2024-01-27"),
  //   duration: 5 * 24 * 60 * 60 * 1000,
  //   percent: 100,
  //   type: "task"
  // },
  // {
  //   id: 4,
  //   label: "前端开发",
  //   user: "张萧麒",
  //   parentId: 2,
  //   start: getStr2Date("2024-01-29"),
  //   duration: 2 * 24 * 60 * 60 * 1000,
  //   percent: 80,
  //   type: "task",
  //   dependentOn: [3]
  // },
  // {
  //   id: 5,
  //   label: "测试",
  //   user:'骆鹏辉',
  //   parentId: 2,
  //   start: getStr2Date("2024-01-31"),
  //   duration: 2 * 24 * 60 * 60 * 1000,
  //   percent: 10,
  //   type: "milestone",
  //   dependentOn: [3],
  //   style: {
  //     base: {
  //       fill: "#0287D0",
  //       stroke: "#0077C0"
  //     }
  //   }
  // },
  
  // {
  //   id: 10,
  //   label: 
  //    '<a href="https://devops.aliyun.com/projex/project/0bc74494b3f35ee869ce55ba35/sprint/210e8a3da53128a1d166c06db7#activeTab=Workitem&viewIdentifier=ead4d6570d314e123d03122ecd&openWorkitemIdentifier=4791e74a9633e0470a780392c9" target="_blank" style="color:#0077c0;">PC小程序搜索优化</a>',
  //   user:"胡宇峰",
  //   start: getStr2Date("2024-01-27"),
  //   duration: 15 * 60 * 60 * 1000,
  //   percent: 0,
  //   type: "milestone"
  // },
  // {
  //   id: 11,
  //   label: "仓储日计划提交后通过公众号的消息推送功能",
  //   user:
  //     '孟庆顺',
  //   start: getStr2Date("2024-02-8"),
  //   duration: 6*24 * 60 * 60 * 1000,
  //   percent: 0,
  //   type: "milestone"
  // },
  
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
    // 是否显示小时
    hour: {
      display: false
    }
  },
  chart: {
    progress: {
      bar: true
    },
    expander: {
      display: true
    }
  },
  // 任务属性列表
  taskList: {
    expander: {
      straight: true
    },
    columns: [
    {
        id: 11,
        label: "操作",
        value: "opts",
        display: false,
        width: 80
      },
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
          // eslint-disable-next-line no-unused-vars
          click({ data, column }) {
            alert("description clicked!\n" + data.label);
          }
        }
      },
      {
        id: 3,
        label: "项目人员",
        value: "user",
        width: 68,
        html: true
      },
      {
        id: 7,
        label: "角色",
        value: "userType",
        width: 68,
        html: true
      },
      {
        id: 4,
        label: "开始时间",
        value: task => dayjs(getStr2Date(task.start)).format("YYYY-MM-DD"),
        width: 78
      },
      {
        id: 5,
        label: "项目类型",
        value: "type",
        width: 68
      },
      {
        id: 6,
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
  // publicPath: '/pm/',
  name: "Gantt",
  components: {
    GanttElastic,
    GanttHeader
  },
  
  data() {
    return {
      dialogFormVisible: false,
      pms: [ ],
      timeout:  null,
      tasks,
      options,
      dynamicStyle: {},
      lastId: 16,
      formLabelWidth: '120px',
      formPMData: {
        name: '',
        region: '',
        username: "",
        beginTime: "",
        endTime: "",
        role: "",
        desc: ''
      },
    };
  },
  
  mounted(){
      console.log("------------created ------------")
      this.getAllOjbect()
  },
  methods: {

     getAllOjbect(){
      // axios.defaults.baseURL = '/api'
      // axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
      // axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
      try{
        const api = axios.create({
          baseURL: 'http://127.0.0.1:8083', // Django的地址
          withCredentials: true
          })
          var res;
          api.get('/pm/allProject').then(response=>{
            
              this.tasks = []
               for(var i in response.data)
            {
              
              console.log(response.data[i])
              this.tasks.push(response.data[i])
            }
          })
          console.log("---get task info ------")
         
        // const response =  axios.get('http://127.0.0.1:8083/pm/allProject', { headers: {'Access-Control-Allow-Origin': '*'} } );
        // console.log(response.data)
        // this.task.concat(response.data )

    }catch(error){
      if (error.response) {
      // 服务器返回错误
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      // 网络错误
      console.log(error.message);
    }
        // console.log("get project info : ", error)
    }

    },
    queryPMinfos(queryString, cb){
        try{
          const api = axios.create({
            baseURL: 'http://127.0.0.1:8083', // Django的地址
            withCredentials: true
            })
            var res;
            var pmnames;
            var uri = '/pm/getPMNames/';
            console.log("user input:",queryString)
            if (queryString.trim() === ""){
              uri = '/pm/getAllPMNames/';
            }else{
               uri = uri+queryString;
            }
            api.get(uri).then(response=>{
              console.log(response.data)
              pmnames =  JSON.parse(response.data);
              for(var i in  pmnames)
              {
                var nameObj = {};
                nameObj.name = pmnames[i];
                pmnames.push(nameObj);
                console.log(nameObj)
                // this.pms.push(response.data[i])
              }
              
            })
            clearTimeout(this.timeout);
          this.timeout = setTimeout(() => {
            cb(pmnames);
          }, 2000 * Math.random());
              // console.log("---get task info ------")
      }catch(error){
        if (error.response) {
        // 服务器返回错误
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        // 网络错误
        console.log(error.message);
      }
          // console.log("get project info : ", error)
      }
      
    },
    handleSelect(item) {
        console.log(item);
      },

    addTask() {  
      this.dialogFormVisible = true
    },
    submitPMData(){
      //TODO 调用接口push data
      this.dialogFormVisible = false
      try{
          const api = axios.create({
            baseURL: 'http://127.0.0.1:8083', // Django的地址
            withCredentials: true
            })
            var res;
            api.get('/pm/allProject').then(response=>{
              
                this.tasks = []
                for(var i in response.data)
              {
                
                console.log(response.data[i])
                this.tasks.push(response.data[i])
              }
            })
            console.log("---get task info ------")
          
      }catch(error){
        if (error.response) {
        // 服务器返回错误
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        // 网络错误
        console.log(error.message);
      }
          // console.log("get project info : ", error)
      }


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

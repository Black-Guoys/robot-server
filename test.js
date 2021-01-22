const fs = require('fs');
// const url = require('url');
var express = require('express');
var router = express();
 
//跨域
router.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
 });

 router.get('/server', function(req, res){

    fs.readFile('./all.menu.json', function(err, data){
        if(err) console.log(err)

        res.end(data)
    })
})
const addon = require('./build/Release/addon');
const rob = new addon.robevent(10);
// const strDllPath = __dirname + "\\build\\Release\\RobotClient.dll"
// const rob = new addon.robevent(strDllPath);
var dwCmdId = 0;
var strKey;
//创建机器人客户端
strKey = "Robot";			//名字
rob.queryFromUpper(dwCmdId, strKey)

//ip地址
router.get('/ip', function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild");
  res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.setHeader("X-Powered-By", "3.2.1");
  res.setHeader("Content-Type", "application/json;charset=utf-8");
  var inputip = req.query.name;
  var robotname = "Robot"+1
  var portvalue = Number(req.query.port);
  console.log(robotname);
  console.log(portvalue);
  var strJs = "{\"robotname\":" + JSON.stringify(robotname) + ",\"ip\":\"" + inputip + "\", \"port\":" + portvalue + "}";
  // //连接机器人服务端    
  dwCmdId = 0x11;
  rob.queryFromUpper(dwCmdId, strJs);
  console.log(strJs);
  console.log("connect Success!");

  res.send();
});

router.get('/gys', function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild");
  res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.setHeader("X-Powered-By", "3.2.1");
  res.setHeader("Content-Type", "application/json;charset=utf-8");

  /* 自由度 */
  console.log("aaa");
  var strJs = "{\"robot_dof\":" + '8' + "}";
  const dof = rob.queryFromUpper(0x12, strJs);
  console.log(dof);
  res.send(dof);
});

router.get('/position', function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild");
  res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.setHeader("X-Powered-By", "3.2.1");
  res.setHeader("Content-Type", "application/json;charset=utf-8");

  /* 机器人位置 */
  var strJs = "{}";
  const robotMotion = rob.queryFromUpper(0x14, strJs);
  const jsonrobotMotion = JSON.stringify(robotMotion);
  // console.log(jsonrobotMotion);
  res.send(jsonrobotMotion);
});

//打开伺服 1:打开，0:关闭

router.get('/servo', function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild");
  res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.setHeader("X-Powered-By", "3.2.1");
  res.setHeader("Content-Type", "application/json;charset=utf-8");
  var servo = Number(req.query.servonumber);
  // console.log("hhhhhhhhhhhhhhh");
  console.log(servo);
  rob.setServoState(servo);
  rob.waitCMDFinishFlag();
  res.send();
});



// router.get('/servo', function (req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild");
//   res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//   res.setHeader("X-Powered-By", "3.2.1");
//   res.setHeader("Content-Type", "application/json;charset=utf-8");
//   var servo = req.query.servonumber;
//   console.log(servo);
//   rob.setServoState(Number(servo));
//   res.send(servo);
// })

// //等待命令返回
// rob.waitCMDFinishFlag();




//=======================================================↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓===========================================

router.get('/moveabsj', function (req, res) {//ABS关节 运动指令
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild");
  res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.setHeader("X-Powered-By", "3.2.1");
  res.setHeader("Content-Type", "application/json;charset=utf-8");
  var speed = Number(req.query.speed);
  var absj = req.query.absj;
  const moveABSJ = "{\"speed\":" + speed + ",\"joints\": " + absj + "}";
  console.log(typeof speed);
  console.log(typeof absj);
  console.log(moveABSJ);
  moveAbsj = rob.queryFromUpper(0x21, moveABSJ)
  rob.waitCMDFinishFlag();
  res.send();
});

router.get('/moveabsjr', function (req, res) {//相对ABS关节
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild");
  res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.setHeader("X-Powered-By", "3.2.1");
  res.setHeader("Content-Type", "application/json;charset=utf-8");
  var speed = Number(req.query.speed);
  var absj = req.query.absj;
  const moveABSJ = "{\"speed\":" + speed + ",\"joints\": " + absj + "}";
  console.log(speed);
  console.log(moveABSJ);
  moveAbsj = rob.queryFromUpper(0x22, moveABSJ)
  rob.waitCMDFinishFlag();
  res.send();
});


router.get('/movejoint', function (req, res) {//关节 运动指令
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild");
  res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.setHeader("X-Powered-By", "3.2.1");
  res.setHeader("Content-Type", "application/json;charset=utf-8");
  var speed = req.query.speed;
  var frame = req.query.frame;
  var movejoint = req.query.movejoint;
  // "{\"speed\": 0.3,\"frame\": 1,\"terminals\": [[10,10,10,10,10,10]]}";
  const moveJoint = "{\"speed\":" + speed + ",\"frame\":" + frame + ",\"terminals\": " + movejoint + "}";
  console.log(moveJoint);
  movejoint = rob.queryFromUpper(0x23, moveJoint)
  rob.waitCMDFinishFlag();
  res.send();
});

router.get('/movejointr', function (req, res) {//相对关节
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild");
  res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.setHeader("X-Powered-By", "3.2.1");
  res.setHeader("Content-Type", "application/json;charset=utf-8");
  var speed = req.query.speed;
  var frame = req.query.frame;
  var movejoint = req.query.movejoint;
  const moveJoint = "{\"speed\":" + speed + ",\"frame\":" + frame + ",\"terminals\": " + movejoint + "}";
  console.log(speed);
  console.log(frame);
  console.log(moveJoint);
  movejoint = rob.queryFromUpper(0x24, moveJoint)
  rob.waitCMDFinishFlag();
  res.send();
});


router.get('/moveline', function (req, res) {//直线  运动指令
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild");
  res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.setHeader("X-Powered-By", "3.2.1");
  res.setHeader("Content-Type", "application/json;charset=utf-8");
  var speed = req.query.speed;
  var frame = req.query.frame;
  var moveline = req.query.moveline;
  const moveLine = "{\"speed\":" + speed + ",\"frame\":" + frame + ",\"terminals\": " + moveline + "}";
  console.log(speed);
  console.log(frame);
  console.log(moveLine);
  moveline = rob.queryFromUpper(0x25, moveLine)
  rob.waitCMDFinishFlag();
  res.send();
});


router.get('/moveliner', function (req, res) {//相对直线
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild");
  res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.setHeader("X-Powered-By", "3.2.1");
  res.setHeader("Content-Type", "application/json;charset=utf-8");
  var speed = req.query.speed;
  var frame = req.query.frame;
  var moveline = req.query.moveline;
  const moveLine = "{\"speed\":" + speed + ",\"frame\":" + frame + ",\"terminals\": " + moveline + "}";
  console.log(speed);
  console.log(frame);
  console.log(moveLine);
  moveline = rob.queryFromUpper(0x26, moveLine)
  rob.waitCMDFinishFlag();
  res.send();
});


router.get('/circle', function (req, res) {//圆弧
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild");
  res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.setHeader("X-Powered-By", "3.2.1");
  res.setHeader("Content-Type", "application/json;charset=utf-8");
  var speed = req.query.speed;
  var frame = req.query.frame;
  var movecir = req.query.movecir;
  var circle = Number(req.query.circle);
  const moveCircle = "{\"speed\":" + speed + ",\"frame\":" + frame + ",\"circle\":" + circle + ",\"terminals\": " + movecir + "}";
  console.log(speed);
  console.log(frame);
  console.log(moveCircle);
  movecircle = rob.queryFromUpper(0x27, moveCircle)
  rob.waitCMDFinishFlag();
  res.send();
});

router.get('/circler', function (req, res) {//相对圆弧
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild");
  res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.setHeader("X-Powered-By", "3.2.1");
  res.setHeader("Content-Type", "application/json;charset=utf-8");
  var speed = req.query.speed;
  var frame = req.query.frame;
  var circle = req.query.moveline;
  const moveCircle = "{\"speed\":" + speed + ",\"frame\":" + frame + ",\"circle\":" + circle + ",\"terminals\": " + moveline + "}";
  console.log(speed);
  console.log(frame);
  console.log(circle);
  console.log(moveCircle);
  movecircle = rob.queryFromUpper(0x28, moveCircle)
  rob.waitCMDFinishFlag();
  res.send();
});
//=============================================================↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑=========================================


//操作加减按钮
router.get('/add_reduce', function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild");
  res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.setHeader("X-Powered-By", "3.2.1");
  res.setHeader("Content-Type", "application/json;charset=utf-8");
  console.log("ssss");
  var speed = req.query.speed / 100;
  var joint = req.query.joint;//关节 J1-J6
  var direction = req.query.direction;//加减方向（1  0）
  console.log(speed);
  console.log(joint);
  console.log(direction);
  var data = rob.jointJOG(joint, direction, speed);
  // var data = rob.jointJOG(0, 0, 2);
  res.send(data);
});
//停止
router.get('/stop', function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild");
  res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.setHeader("X-Powered-By", "3.2.1");
  res.setHeader("Content-Type", "application/json;charset=utf-8");
  const data = rob.stopJOG();
  res.end()
});
 
 
//配置服务端口
var server = router.listen(3002,function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log('listen at http://%s:%s',host,port)
})
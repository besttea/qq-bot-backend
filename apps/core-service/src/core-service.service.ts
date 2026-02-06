import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@ZKLib/database';

@Injectable()
export class CoreServiceService {
  constructor(private readonly db: DatabaseService) {}

  async bindUser(name: string, id: string): Promise<string> {
    try {
      const user = await this.db.client.user.upsert({
        where: { qq_openid: id },
        update: { name },
        create: {
          qq_openid: id,
          name,
          role: 'student', // Default role
        },
      });
      return `✅ 绑定成功！\n姓名: ${user.name}\n学号(QQ ID): ${user.qq_openid}\n角色: ${user.role}`;
    } catch (error) {
      return `❌ 绑定失败: ${error.message}`;
    }
  }

  getHello(): string {
    return `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>QQBot Blackboard</title>
<style>
  body {
    background-color: #e0e0e0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    font-family: 'Courier New', Courier, monospace;
  }
  .blackboard {
    width: 800px;
    height: 500px;
    background-color: #3a4a3b; /* Chalkboard Green */
    border: 20px solid #5d4037; /* Wood frame */
    border-radius: 8px;
    box-shadow: 0 15px 25px rgba(0,0,0,0.5);
    padding: 40px;
    color: #fff;
    position: relative;
    box-sizing: border-box;
  }
  .chalk-text {
    font-family: 'Comic Sans MS', 'Chalkboard SE', 'Marker Felt', sans-serif;
    color: rgba(255, 255, 255, 0.95);
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  }
  h1 {
    font-size: 3.5em;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 40px;
    transform: rotate(-1deg);
    border-bottom: 2px dashed rgba(255,255,255,0.5);
    padding-bottom: 10px;
  }
  .content {
    font-size: 1.8em;
    margin-left: 60px;
    line-height: 1.6;
  }
  ul {
    list-style-type: square;
  }
  .footer {
    position: absolute;
    bottom: 20px;
    right: 30px;
    font-size: 1em;
    opacity: 0.7;
    transform: rotate(-2deg);
  }
  .eraser {
    position: absolute;
    bottom: 10px;
    left: 100px;
    width: 100px;
    height: 30px;
    background-color: #d7ccc8;
    border-bottom: 5px solid #5d4037;
    border-radius: 2px;
    box-shadow: 2px 2px 5px rgba(0,0,0,0.5);
  }
</style>
</head>
<body>
  <div class="blackboard">
    <h1 class="chalk-text">QQ 智能教学助手</h1>
    <div class="content chalk-text">
      <p>今日值日生：AI 助教</p>
      <ul>
        <li>身份绑定(指令): /bind 姓名 学号</li>
        <li>身份绑定(Web): <a href="/bind/张三/1001" style="color: #81d4fa">/bind/张三/1001</a></li>
        <li>提交作业: /submit [内容]</li>
        <li>查询成绩: /score [作业ID]</li>
      </ul>
    </div>
    <div class="footer chalk-text">System Status: Online 🟢</div>
    <div class="eraser"></div>
  </div>
</body>
</html>
    `;
  }
}

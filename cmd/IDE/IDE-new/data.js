const cmds = [
    "?",
    "ability",
    "advancement",
    "alwaysday",
    "attribute",
    "agent",
    "ban",
    "ban-ip",
    "banlist",
    "bossbar",
    "classroommode",
    "clear",
    "clone",
    "closewebsocket",
    "connect",
    "data",
    "datapack",
    "debug",
    "defaultgamemode",
    "deop",
    "difficulty",
    "effect",
    "enableencryption",
    "enchant",
    "execute",
    "experience",
    "fill",
    "forceload",
    "function",
    "gamemode",
    "gamerule",
    "give",
    "help",
    "immutableworld",
    "kick",
    "kill",
    "list",
    "listd",
    "locate",
    "locatebiome",
    "loot",
    "me",
    "mixer",
    "mobevent",
    "msg",
    "op",
    "pardon",
    "particle",
    "playsound",
    "publish",
    "querytarget",
    "recipe",
    "reload",
    "remove",
    "replaceitem",
    "save",
    "save-all",
    "save-off",
    "save-on",
    "say",
    "schedule",
    "scoreboard",
    "seed",
    "setblock",
    "setidletimeout",
    "setmaxplayers",
    "setworldspawn",
    "spawnpoint",
    "spreadplayers",
    "stop",
    "stopsound",
    "summon",
    "tag",
    "team",
    "teleport",
    "teammsg",
    "tell",
    "tellraw",
    "testfor",
    "testforblock",
    "testforblocks",
    "tickingarea",
    "time",
    "title",
    "toggledownfall",
    "tp",
    "transferserver",
    "trigger",
    "w",
    "weather",
    "whitelist",
    "worldborder",
    "worldbuilder",
    "wsserver",
    "xp",
];
const cmdComments = [
    "help的替代命令，提供命令使用帮助。",
    "赋予或剥夺玩家的能力。",
    "添加、移除或查询玩家的进度。",
    "即daylock，锁定或解锁日夜循环。",
    "修改、查询玩家和生物的属性",
    "创建一个吉祥物。",
    "将玩家加入封禁列表。",
    "将IP地址加入封禁列表。",
    "显示封禁列表。",
    "添加查询设置移除一个Boss栏或列出所有已创建的Boss栏。",
    "编辑受限制方块的能力。",
    "从玩家物品栏中删除物品。",
    "将特定区域的方块复制到另一处。",
    "断开已连接的WebSocket服务器。",
    "wsserver的替代命令，连接至WebSocket服务器。",
    "允许玩家获取、合并或是移除实体或方块的数据标签。",
    "控制加载的数据包。",
    "开始或结束调试会话。",
    "更改默认的游戏模式。",
    "撤销玩家的管理员权限。",
    "设置难度等级。",
    "添加或移除状态效果。",
    "为当前WebSocket连接启用加密。",
    "附魔玩家的物品。",
    "代表实体执行另一命令。",
    "给予玩家经验。",
    "在某个区域填充特定方块。",
    "强制不断加载区块。",
    "运行一个函数。",
    "更改玩家的游戏模式。",
    "更改或查询游戏规则。",
    "给予玩家物品。",
    "提供命令使用帮助。",
    "设置世界的不可变状态。",
    "将玩家踢出服务器。",
    "清除实体（玩家、生物、掉落物等）。",
    "列出服务器中的玩家。",
    "以JSON形式列出服务器中的玩家。",
    "显示最近的给定结构的坐标。",
    "显示最近的给定生物群系的坐标。",
    "从一个物品栏中掉落物品到地面上。",
    "显示一条关于自己的信息。",
    "Mixer交互性控制。",
    "控制或查询允许运行的生物事件。",
    "tell的替代命令，向另一玩家发送私信。",
    "授予玩家管理员权限。",
    "从封禁列表中移除项目。",
    "创建颗粒。",
    "播放音效。",
    "向局域网开放单人游戏世界。",
    "检测某实体所在坐标、y旋转角度、所在维度及专用ID。",
    "给予或剥夺合成配方。",
    "从硬盘中重新加载战利品表、进度和函数。",
    "移除吉祥物。",
    "替换物品栏中的物品。",
    "准备备份，查询其状态或恢复。",
    "将服务器保存到硬盘。",
    "关闭服务器自动保存。",
    "开启服务器自动保存。",
    "向多个玩家发送消息。",
    "安排函数或标签在特定的游戏刻后运行。",
    "管理记分板目标、玩家、队伍与标签。",
    "显示世界种子。",
    "将方块替换为其他方块。",
    "设置无操作玩家被踢出的延时。",
    "设置可加入游戏的玩家数量上限。",
    "设置世界出生点。",
    "为玩家设置出生点。",
    "将实体传送到随机位置。",
    "关闭服务器。",
    "停止音效。",
    "生成实体。",
    "修改玩家或实体的标签。",
    "修改队伍。",
    "tp的替代命令，传送实体。",
    "指定要发送给队伍的消息。",
    "向另一玩家发送私信。",
    "向玩家显示JSON消息。",
    "统计符合给定条件的实体。",
    "测定某方块是否在某位置。",
    "测定两个区域中的方块是否相同。",
    "添加、删除或列出常加载区域。",
    "更改或查询游戏中的世界时间。",
    "管理屏幕上的标题。",
    "切换天气。",
    "传送实体。",
    "将玩家转送至另一服务器。",
    "设置一个触发器。",
    "tell的替代命令，向另一玩家发送私信。",
    "设置天气。",
    "管理服务器白名单。",
    "管理世界边界。",
    "即wb ，编辑受限制方块的能力。",
    "连接至WebSocket服务器。",
    "增加或减少经验。",
];
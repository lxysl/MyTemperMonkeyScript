from graia.broadcast import Broadcast
from graia.application import GraiaMiraiApplication, Session
from graia.application.message.chain import MessageChain
from graia.application.message.parser.kanata import Kanata
from graia.application.message.parser.signature import RegexMatch, RequireParam
import asyncio

from graia.application.message.elements.internal import Plain
from graia.application.friend import Friend
from graia.application.group import Group

import datetime
import random

loop = asyncio.get_event_loop()

groupID = 970877023
masterID = 764139720
num = 0
lastday = ""
randomN = -1

bcc = Broadcast(loop=loop)
app = GraiaMiraiApplication(
    broadcast=bcc,
    connect_info=Session(
        host="http://localhost:8765", # 填入 httpapi 服务运行的地址
        authKey="1234567890", # 填入 authKey
        account=2803356421, # 你的机器人的 qq 号
        websocket=True # Graia 已经可以根据所配置的消息接收的方式来保证消息接收部分的正常运作.
    )
)

master = app.getFriend(masterID)

@bcc.receiver("FriendMessage")
async def friend_message_listener(app: GraiaMiraiApplication, friend: Friend):
    await app.sendFriendMessage(friend, MessageChain.create([
        Plain("请联系我的主号：764139720")
    ]))

@bcc.receiver("GroupMessage")
async def baoqin(message: MessageChain, app: GraiaMiraiApplication, group: Group):
    if group.id == groupID:
        today = str(datetime.date.today())[-5:]
        global lastday, num, randomN
        if '齐' in message.asDisplay():
            if today != lastday:
                num = 1
                lastday = today
                randomN = random.randint(2, 5)
            else:
                num += 1
                if num == randomN:
                    await app.sendGroupMessage(group, MessageChain.create([
                        Plain("齐")
                    ]))
                    await app.sendFriendMessage(masterID, MessageChain.create([
                        Plain("今日报寝完毕")
                    ]))
        # print(lastday, today, num, randomN)

app.launch_blocking()

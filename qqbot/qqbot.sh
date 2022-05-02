qqbot_screen="qqbot"
screen -d -m -S $qqbot_screen

screen -x -S $qqbot_screen -p 0 -X stuff "cd /root/Document\n"
screen -x -S $qqbot_screen -p 0 -X stuff "conda activate qqbot\n"
screen -x -S $qqbot_screen -p 0 -X stuff "python bot.py\n"

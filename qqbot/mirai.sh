# The port is 8765
mirai_screen="mirai"
screen -d -m -S $mirai_screen

screen -x -S $mirai_screen -p 0 -X stuff "cd /root/Documents/mcl-1.2.2\n"
screen -x -S $mirai_screen -p 0 -X stuff "sudo sh ./mcl\n"
screen -x -S $mirai_screen -p 0 -X stuff "login xxxxxxxx xxxxxxxx\n" # login account password

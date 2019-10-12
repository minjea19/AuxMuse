from socketIO_client import SocketIO
import time

socket_url = "http://localhost"

socketIO = SocketIO(socket_url, 5000, verify=False)

def welcome():
    print('welcome received')

socketIO.on('welcome', welcome)
socketIO.wait()

while True:
    pass

#!/usr/bin/env python3
import socket
import sys

HOST = 'localhost'  # Standard loopback interface address (localhost)
PORT = 7002        # Port to listen on (non-privileged ports are > 1023)

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.bind((HOST, PORT))
    s.listen()
    conn, addr = s.accept()
    with conn:
        print('Connected by', addr)
        while True:
            #song = sys.stdin.readlines()
            fake = "fuck"
            conn.sendall(fake.encode())



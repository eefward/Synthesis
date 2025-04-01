import os
import time

dir = "C:\\Users\\guest_febloj2\\Coding\\GitRepos\\Synthesis\\static\\sounds\\soundPack2"
ls = []
for file in os.scandir(dir):
    a = file.path.split("\\")[-1] # if you're using linux do .split("/")
    ls.append(a)

for a in ls:
    old = dir + "\\" + a

    if "448573" in a: name = "A#0"
    elif "448572" in a: name = "A#1"
    elif "448571" in a: name = "A#2"
    elif "448570" in a: name = "A#3"
    elif "448577" in a: name = "A#4"
    elif "448576" in a: name = "A#5"
    elif "448575" in a: name = "A#6"
    elif "448574" in a: name = "A#7"
    elif "448540" in a: name = "C#1"
    elif "448541" in a: name = "C#2"
    elif "448538" in a: name = "C#3"
    elif "448539" in a: name = "C#4"
    elif "448532" in a: name = "C#5"
    elif "448533" in a: name = "C#6"
    elif "448545" in a: name = "C#7"
    elif "448542" in a: name = "D#1"
    elif "448600" in a: name = "D#2"
    elif "448601" in a: name = "D#3"
    elif "448602" in a: name = "D#4"
    elif "448603" in a: name = "D#5"
    elif "448604" in a: name = "D#6"
    elif "448605" in a: name = "D#7"
    elif "448586" in a: name = "F#1"
    elif "448587" in a: name = "F#2"
    elif "448584" in a: name = "F#3"
    elif "448585" in a: name = "F#4"
    elif "448582" in a: name = "F#5"
    elif "448583" in a: name = "F#6"
    elif "448580" in a: name = "F#7"
    elif "448591" in a: name = "G#1"
    elif "448590" in a: name = "G#2"
    elif "448593" in a: name = "G#3"
    elif "448592" in a: name = "G#4"
    elif "448599" in a: name = "G#5"
    elif "448598" in a: name = "G#6"
    elif "448556" in a: name = "G#7"
    else: name = a[18:20].upper()
    
    c = name + ".ogg"
    print(c)
    
    new = os.path.join(dir, c)
    os.rename(old, new)
    
    time.sleep(.1) # idk
    
    

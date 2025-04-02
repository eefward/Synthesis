import os

dir = "fullpath" # C:\Users\username\Synthesis\static\sounds\soundPack1
notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']

for file in os.scandir(dir):
    a = file.path.split("\\")[-1]
    # if you're using linux do .split("/")

    b = a.split(".")
    i = int(b[0]) - 1

    note = notes[i % 12]
    octave = (i + 9) // 12
    
    c = f"{note}{octave}" + ".mp3"

    old = file.path
    new = os.path.join(dir, c)
    os.rename(old, new)
    
    

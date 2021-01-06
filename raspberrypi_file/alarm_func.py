from gtts import gTTS
from pygame import mixer

def networkError():
    tts = gTTS( text='네트워크를 확인해 주세요', lang='ko', slow=False )
    tts.save('/home/pi/Music/networkError.mp3')
    mixer.init()
    mixer.music.load('/home/pi/Music/networkError.mp3')
    mixer.music.play()

if __name__ == '__main__':
    networkError()

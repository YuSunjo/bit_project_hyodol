#!/usr/bin/env python3
# Copyright 2017 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""A demo of the Google Assistant GRPC recognizer."""

import argparse
import locale
import logging
import signal
import sys

from aiy.cloudspeech import CloudSpeechClient
from aiy.assistant.grpc import AssistantServiceClientWithLed
from aiy.board import Board, Led

class Malddomi:
    def __init__(self):
        pass
    
    def volume(self, string):
        value = int(string)
        if value < 0 or value > 100:
            raise argparse.ArgumentTypeError('Volume must be in [0...100] range.')
        return value
    
    def locale_language(self):
        language, _ = locale.getdefaultlocale()
        return language  

    def thread_assistant(self):
        logging.basicConfig(level=logging.DEBUG)
        signal.signal(signal.SIGTERM, lambda signum, frame: sys.exit(0))

        parser = argparse.ArgumentParser(description='Assistant service example.')
        parser.add_argument('--language', default=self.locale_language())
        parser.add_argument('--volume', type=self.volume, default=100)
        args = parser.parse_args()
 

        with Board() as board:
            assistant = AssistantServiceClientWithLed(board=board,
                                                      volume_percentage=args.volume,
                                                      language_code=args.language)
            logging.info('Press button to start conversation...')
            logging.info('Conversation started!')
            board.button.wait_for_press()
            assistant.conversation()
            return 
           
                
                

if __name__ == '__main__':
    main()

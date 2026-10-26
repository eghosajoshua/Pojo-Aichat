import {StatusBar} from 'react-native';
import Popover from 'react-native-popover-view/dist/Popover';
import {PopoverPlacement} from 'react-native-popover-view';
import * as Clipboard from 'expo-clipboard';
import * as Speech from 'expo-speech';
import {scale} from 'react-native-size-matters';
import {useState} from 'react';
import markdownToTxt from 'markdown-to-txt';
import PopOverItems from './pop-over-items';

const ChatPopover = ({
  children,
  chatText,
}: {
  children: React.ReactNode;
  chatText: string;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyToClipboard = () => {
    Clipboard.setStringAsync(markdownToTxt(chatText));
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 50);
  };

  const handleSpeakText = () => {
    Speech.speak(markdownToTxt(chatText));
  };

  const popOverItems = [
    {
      title: 'Copy',
      onPress: handleCopyToClipboard,
      icon: copied ? 'check' : 'copy',
      iconColor: copied ? '#00FF00' : 'white',
    },
    {
      title: 'Read aloud',
      onPress: handleSpeakText,
      icon: 'volume-high',
    },
  ];

  return (
    <Popover
      popoverStyle={{
        backgroundColor: '#0D0D0D',
        minWidth: scale(150),
        padding: scale(8),
        borderRadius: 10,
      }}
      placement={PopoverPlacement.AUTO}
      arrowSize={{width: 0, height: 0}}
      verticalOffset={
        StatusBar.currentHeight != undefined ? -StatusBar.currentHeight : -20
      }
      from={children}>
      <PopOverItems items={popOverItems} />
    </Popover>
  );
};

export default ChatPopover;

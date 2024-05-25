import {ColorValue} from 'react-native';
import {Text, TextProps} from 'react-native';

interface IProps extends TextProps {
  fontSizeFirstText: number;
  colorFirstText: ColorValue;
  textFirstText: string;
  fontSizeSecondText: number;
  colorSecondText: ColorValue;
  textSecondText: string | string[] | number;
}

export default function TwoTextApp({
  fontSizeFirstText,
  colorFirstText,
  fontSizeSecondText,
  colorSecondText,
  textFirstText,
  textSecondText,
  ...props
}: IProps) {
  return (
    <Text
      style={{
        fontSize: fontSizeFirstText,
        color: colorFirstText,
        fontWeight: '600',
      }}
      {...props}>
      {textFirstText}
      <Text
        style={{
          fontSize: fontSizeSecondText,
          color: colorSecondText,
          fontWeight: '400',
        }}>
        {textSecondText}
      </Text>
    </Text>
  );
}

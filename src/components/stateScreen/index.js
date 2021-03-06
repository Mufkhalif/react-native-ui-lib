import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet} from 'react-native';
import {LogService} from '../../services';
import {Constants} from '../../helpers';
import {Typography, Colors} from '../../style';
import {BaseComponent} from '../../commons';
import View from '../../components/view';
import Image from '../../components/image';
import Button from '../../components/button';
import Text from '../../components/text';

/**
 * @description: Component that shows a full screen for a certain state, like an empty state
 * @image: https://user-images.githubusercontent.com/33805983/34672894-f262ab84-f488-11e7-83f0-4ee0f0ac34ba.png
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/EmptyStateScreen.js
 */
export default class StateScreen extends BaseComponent {
  static displayName = 'StateScreen';
  static propTypes = {
    /**
     * The image source that's showing at the top. use an image that was required locally
     */
    imageSource: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    source: PropTypes.oneOfType([PropTypes.object, PropTypes.number]), // TODO: remove after deprecation
    /**
     * To to show as the title
     */
    title: PropTypes.string.isRequired,
    /**
     * Text to to show as the subtitle
     */
    subtitle: PropTypes.any,
    /**
     * Text to to show in the "call to action" button
     */
    ctaLabel: PropTypes.string,
    /**
     * Action handler for "call to action" button
     */
    onCtaPress: PropTypes.func,
    /**
     * Use to identify the container in tests
     */
    testId: PropTypes.string
  };

  constructor(props) {
    super(props);

    if (props.testId) {
      LogService.deprecationWarn({component: 'StateScreen', oldProp: 'testId', newProp: 'testID'});

    }
    if (props.source) {
      LogService.deprecationWarn({component: 'StateScreen', oldProp: 'source', newProp: 'imageSource'});
    }
  }

  generateStyles() {
    const {source, imageSource} = this.props;
    const finalSource = imageSource || source;

    const isRemoteImage = _.isObject(finalSource) && Boolean(finalSource.uri);
    this.styles = createStyles(isRemoteImage);
  }

  render() {
    // TODO: remove testId and source after deprecation
    const {title, subtitle, source, imageSource, ctaLabel, onCtaPress, testId, testID} = this.props;
    const finalSource = imageSource || source;

    return (
      <View style={this.styles.container} testID={testID || testId}>
        <Image style={this.styles.image} resizeMode={'contain'} source={finalSource}/>
        <Text style={[this.styles.title]}>{title}</Text>
        <Text style={[this.styles.subtitle]}>{subtitle}</Text>
        <Button
          link
          marginT-30
          onPress={onCtaPress}
          labelStyle={this.styles.ctaLabel}
          label={Constants.isAndroid ? _.toUpper(ctaLabel) : ctaLabel}
        />
      </View>
    );
  }
}

function createStyles(isRemoteImage) {
  const imageStyle = _.merge({height: 200}, isRemoteImage && {width: Constants.screenWidth * 0.9});
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 80,
      justifyContent: 'flex-start',
      alignItems: 'center'
    },
    image: imageStyle,
    title: {
      textAlign: 'center',
      ...Typography.text50,
      color: Colors.dark10,
      fontWeight: '300'
    },
    subtitle: {
      textAlign: 'center',
      ...Typography.text70,
      color: Colors.dark40,
      fontWeight: '300',
      marginTop: 12
    },
    ctaLabel: {
      color: Colors.primary,
      ...Typography.text70
    }
  });
}

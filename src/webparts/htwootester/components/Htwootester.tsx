import * as React from 'react';
import styles from './Htwootester.module.scss';
import { IHtwootesterProps } from './IHtwootesterProps';
import { escape } from '@microsoft/sp-lodash-subset';
// import HOOIcon from '../../../../../../htwoo/htwoo-react/lib/HOOIcon';

export default class Htwootester extends React.Component<IHtwootesterProps, { icon }> {

  constructor(props){
    super(props);
    this.state = {icon: ""};
  }

  private async _getIcon() {

    const iconsFile: string = require('icons.svg');
    const result = await fetch(iconsFile);
    console.debug(result);
    const symbolSetStream = await result.text();
    console.debug(symbolSetStream);

    const domParser = new DOMParser();
    const symbolSetContent = domParser.parseFromString(symbolSetStream, "image/svg+xml");

    console.debug(symbolSetContent);
    console.debug(symbolSetContent.getElementsByTagName('symbol'));

    console.debug('Close ICON', symbolSetContent.getElementById('icon-close'));

    const iconClose = symbolSetContent.getElementById('icon-close');

    console.debug('ViewBox::: ', iconClose.getAttribute('viewBox'));

    const realSVGIcon = document.createElementNS(iconClose.getAttribute('xmlns'), 'svg');
    realSVGIcon.setAttribute('viewBox', iconClose.getAttribute('viewBox'))
    realSVGIcon.append(...([].slice.call(iconClose.children)));
    return realSVGIcon.outerHTML;


  }

  async componentDidMount(){
    let iconComp = await this._getIcon()
    this.setState({icon: iconComp});
  }

  public render(): React.ReactElement<IHtwootesterProps> {
 

    return (
      <div className={styles.htwootester}>
        Hello World<br />
        Hello World<br />
        <div className={styles.testIcon} dangerouslySetInnerHTML={{__html: this.state.icon }}>
        </div>
        asd
      </div>
    );
  }
}

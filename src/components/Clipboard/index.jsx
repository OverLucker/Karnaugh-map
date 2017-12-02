import Text from 'components/Text';
import Button from 'components/Button';
import clipboard from 'clipboard-js';

import styles from './styles.scss';


@CSSModules(styles, { allowMultiple: true })
export default class extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            isCopied: false,
        };

        this.timeout = null;
    }

    clearTimeout = () => {
        if(this.timeout){
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    };

    setTimeout = () => {
        this.clearTimeout();
        this.timeout = setTimeout(() => this.setState({ isCopied: false }), 2000);
    };

    onCopy = () => {
        clipboard.copy(this.props.children);
        this.setTimeout();
        this.setState({ isCopied: true });
    };

    render(){
        const { children='', className='' } = this.props;
        const { isCopied } = this.state;

        return <div styleName="clipboard" className={className}>
            <Text styleName="clipboard__text">{ children }</Text>
            <Button onClick={this.onCopy}>Скопировать</Button>
            { isCopied && <span styleName="clipboard__ready">Скопировано</span> }
        </div>
    }

    componentWillUnmount(){
        this.clearTimeout();
    }
}
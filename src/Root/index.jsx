import { connect } from 'react-redux';
import { Switch, Redirect, Route, Router } from 'react-router-dom';

import { actions } from 'store';
import Spinner from 'components/Spinner';
import Input from 'components/Input';
import Title from 'components/Title';
import Button from 'components/Button';
import Text from 'components/Text';
import Clipboard from 'components/Clipboard';
import urls from 'config/urls';
import history from 'utils/history';

import styles from './styles.scss';


@CSSModules(styles, { allowMultiple: true })
export default class extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            minterms: '',
        }
    }

    onChangeMinterms = e => {
        const minterms = e.target.value.trim();
        this.setState({ minterms })
    };

    render() {
        const { minterms } = this.state;

        return <div styleName="root">
            <Title>Karnaugh Map</Title>
            <Input value={minterms} onChange={this.onChangeMinterms}/>
            <Button styleName="root__push">Push me!</Button>
            <Clipboard>Lorem Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet beatae dicta illum libero natus nobis omnis possimus rem saepe totam. Accusantium architecto blanditiis laudantium maxime natus officiis quasi, vel voluptatem?</Clipboard>
            {/*<Router history={history}>*/}
            {/*</Router>*/}
        </div>
    }
}

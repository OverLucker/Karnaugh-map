import { connect } from 'react-redux';
import { Switch, Redirect, Route, Router } from 'react-router-dom';
import { InlineMath } from 'react-katex';

import { actions } from 'store';
import Spinner from 'components/Spinner';
import Input from 'components/Input';
import Title from 'components/Title';
import Button from 'components/Button';
import Text from 'components/Text';
import Clipboard from 'components/Clipboard';
import RowInput from 'components/RowInput';
import urls from 'config/urls';
import history from 'utils/history';
import core from './core';
import { Term } from './core/utils';

import './katex.scss';
import styles from './styles.scss';


@CSSModules(styles, { allowMultiple: true })
export default class extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            minterms: '1, 2, 3',
            variables: ['x_1', 'x_2', 'x_3', ],
            FDNFForHuman: null,
            FDNFForComputer: null,
            SOPForHuman: null,
            SOPForComputer: null,
            SOPAllForHuman: null,
            SOPAllForComputer: null,
            SOPBestForHuman: null,
            SOPBestForComputer: null,
        }
    }

    onChangeMinterms = e => {
        const minterms = e.target.value.trim();
        this.setState({ minterms })
    };

    onChangeVariable = (e, index) => {
        const { variables } = this.state;
        variables[index] = e.target.value.trim();
        this.setState({ variables });
    };

    onDeleteVariable = index => {
        const { variables } = this.state;
        variables.splice(index, 1);
        this.setState({ variables });
    };

    addVariable = () => {
        const { variables } = this.state;
        variables.push(variables.length + 1);
        this.setState({ variables });
    };

    calculate = () => {
        let { minterms, variables }= this.state;
        minterms = minterms.split(',');
        const max = Math.max(...minterms);
        const num = Math.ceil(Math.log(max) / Math.log(2));
        const terms = minterms.map(x => new Term(x, num));
        const resultFDNF = core.calculateFDNF(terms, variables);
        const resultSOP = core.calculateSOP(terms, variables);

        this.setState({
            ...resultFDNF,
            ...resultSOP,
        });
    };

    render() {
        const {
            minterms,
            variables,
            FDNFForHuman,
            FDNFForComputer,
            SOPForHuman,
            SOPForComputer,
            SOPAllForHuman,
            SOPAllForComputer,
            SOPBestForHuman,
            SOPBestForComputer,
        } = this.state;

        return <div styleName="root">
            <Title>Karnaugh Map</Title>
            <Input value={minterms} onChange={this.onChangeMinterms} placeholder="Minterms"/>
            <Title size="4">Variables</Title>
            { variables.map((variableName, index) =>
                <RowInput
                    key={index}
                    value={variableName}
                    onChange={e => this.onChangeVariable(e, index)}
                    onDelete={e => this.onDeleteVariable(index)}
                />
            ) }
            <Button styleName="root__push" onClick={this.addVariable}>Add variable</Button>
            <Button styleName="root__push root__push_bold" onClick={this.calculate}>Push me!</Button>

            { FDNFForHuman && <Title size="4">FDNF for human</Title> }
            { FDNFForHuman && <Text styleName="root__end-of-block"><InlineMath>{ FDNFForHuman }</InlineMath></Text> }

            { FDNFForComputer && <Title size="4">FDNF for Computer</Title> }
            { FDNFForComputer && <Clipboard styleName="root__end-of-block">{ FDNFForComputer }</Clipboard> }

            { SOPForHuman && <Title size="4">SOP for human</Title> }
            { SOPForHuman && <Text styleName="root__end-of-block"><InlineMath>{ SOPForHuman }</InlineMath></Text> }

            { SOPForComputer && <Title size="4">SOP for Computer</Title> }
            { SOPForComputer && <Clipboard styleName="root__end-of-block">{ SOPForComputer }</Clipboard> }

            { SOPAllForHuman && <Title size="4">SOP for human</Title> }
            { SOPAllForHuman && <div styleName="root__end-of-block">
                { SOPAllForHuman.map((value, index) => <Text key={index} >
                    <InlineMath>{ value }</InlineMath>
                </Text>) }
            </div> }

            { SOPAllForComputer && <Title size="4">SOP for Computer</Title> }
            { SOPAllForComputer && <div styleName="root__end-of-block">
                { SOPAllForComputer.map((value, index) => <Clipboard key={index} >{ value }</Clipboard>) }
            </div> }

            { SOPBestForHuman && <Title size="4">BEST SOP for human</Title> }
            { SOPBestForHuman && <Text styleName="root__end-of-block"><InlineMath>{ SOPBestForHuman }</InlineMath></Text> }

            { SOPBestForComputer && <Title size="4">BEST SOP for Computer</Title> }
            { SOPBestForComputer && <Clipboard styleName="root__end-of-block">{ SOPBestForComputer }</Clipboard> }
        </div>
    }
}

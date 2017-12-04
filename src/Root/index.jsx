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
            minterms: '0,2,4,5,6,7,9,11,14,16,17,18,20,21,23,25,26,27,29,30',
            variables: ['x_1', 'x_2', 'x_3', 'x_4', 'x_5'],
            FDNFForHuman: null,
            FDNFForComputer: null,
            SOPForHuman: null,
            SOPForComputer: null,
            SOPAllForHuman: null,
            SOPAllForComputer: null,
            SOPBestForHuman: null,
            SOPBestForComputer: null,
            showAll: false,
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
        minterms = minterms.split(',').map(val => parseInt(val));
        const max = Math.max(...minterms);
        const num = Math.ceil(Math.log(max + 1) / Math.log(2));
        const terms = minterms.map(x => new Term(x, num));
        const resultFDNF = core.calculateFDNF(terms, variables);
        const resultSOP = core.calculateSOP(terms, variables);

        this.setState({
            ...resultFDNF,
            ...resultSOP,
        });
    };

    toggleShowAll = () => {
        const { state } = this;
        state.showAll = !state.showAll;
        this.setState({ state });
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
            showAll,
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


            { SOPAllForHuman && SOPAllForComputer && <Button styleName="root__button root__button_danger" onClick={this.toggleShowAll}>
                { showAll ? 'Hide' : 'Show' } all solutions. Are you really need it? { SOPAllForHuman.length } solutions here
            </Button> }

            { showAll && <div>
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
            </div> }


            { SOPBestForHuman && <Title size="4">BEST SOP for human</Title> }
            { SOPBestForHuman && <Text styleName="root__end-of-block"><InlineMath>{ SOPBestForHuman }</InlineMath></Text> }

            { SOPBestForComputer && <Title size="4">BEST SOP for Computer</Title> }
            { SOPBestForComputer && <Clipboard styleName="root__end-of-block">{ SOPBestForComputer }</Clipboard> }

            <Title size="4">Vlad Yankovsky - <a style={{color: 'blue'}} href="https://telegram.me/overlucker" target="_blank">@overlucker</a></Title>
            <Title size="4">Anton Chashchin - <a style={{color: 'blue'}} href="https://telegram.me/casinX" target="_blank">@casinX</a></Title>
        </div>
    }
}

import Input from 'components/Input';
import Button from 'components/Button';

import styles from './styles.scss';


export default CSSModules(({ onChange=()=>{}, onDelete=()=>{}, value='' }) => (
    <div styleName="row">
        <Input styleName="row__input" value={value} onChange={onChange}/>
        <Button styleName="row__button" onClick={onDelete}>×</Button>
    </div>
), styles, {allowMultiple: true})